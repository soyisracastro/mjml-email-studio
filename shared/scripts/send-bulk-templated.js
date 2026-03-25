#!/usr/bin/env node

/**
 * Send bulk templated emails via AWS SES
 *
 * Usage:
 *   node shared/scripts/send-bulk-templated.js --project=todoconta --template=workshop-welcome-v1 --data=data/participants.csv
 */

require('dotenv').config();
const AWS = require('aws-sdk');
const path = require('path');
const {
  ROOT_DIR,
  getArg,
  loadProjectConfig,
  resolveDataPath,
  readCsv,
  isValidEmail,
} = require('../utils/cli-helpers');

const projectName = getArg('project');
const templateName = getArg('template');
const dataPath = getArg('data');

if (!projectName || !templateName || !dataPath) {
  console.error('❌ Usage: node send-bulk-templated.js --project=<project> --template=<template-name> --data=<csv-file>');
  console.error('   Example: node send-bulk-templated.js --project=todoconta --template=workshop-welcome-v1 --data=data/participants.csv');
  process.exit(1);
}

// Load project config
const projectConfig = loadProjectConfig(projectName);

// Initialize AWS SES
const ses = new AWS.SES({ region: projectConfig.aws.region });

// Resolve data path
const fullDataPath = resolveDataPath(dataPath, projectName);

async function sendTemplatedEmail(recipientEmail, templateData) {
  const params = {
    Source: projectConfig.aws.sourceEmail,
    Destination: {
      ToAddresses: [recipientEmail]
    },
    Template: templateName,
    TemplateData: JSON.stringify(templateData)
  };

  return ses.sendTemplatedEmail(params).promise();
}

/**
 * Send with 1 retry on throttling errors
 */
async function sendWithRetry(recipientEmail, templateData) {
  try {
    return await sendTemplatedEmail(recipientEmail, templateData);
  } catch (error) {
    if (error.code === 'Throttling') {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return sendTemplatedEmail(recipientEmail, templateData);
    }
    throw error;
  }
}

async function sendBulkFromCSV(csvPath) {
  const recipients = await readCsv(csvPath);

  console.log('🚀 AWS SES Bulk Email Sender\n');
  console.log('='.repeat(50));
  console.log(`Project: ${projectConfig.displayName}`);
  console.log(`Template: ${templateName}`);
  console.log(`Data: ${path.relative(ROOT_DIR, csvPath)}`);
  console.log('='.repeat(50));
  console.log(`\n📧 Processing ${recipients.length} emails...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const [index, data] of recipients.entries()) {
    const { email, ...templateData } = data;

    if (!email || !isValidEmail(email.trim())) {
      errorCount++;
      console.error(`❌ [${index + 1}/${recipients.length}] Invalid or missing email: ${email || '(empty)'}`);
      continue;
    }

    try {
      await sendWithRetry(email.trim(), templateData);
      successCount++;
      console.log(`✅ [${index + 1}/${recipients.length}] ${email}`);

      // Delay to respect rate limits
      await new Promise(resolve => setTimeout(resolve, 100));
    } catch (error) {
      errorCount++;
      console.error(`❌ [${index + 1}/${recipients.length}] ${email}: ${error.message}`);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('\n📊 Final Results:');
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Failed: ${errorCount}`);
  console.log(`   📝 Total: ${recipients.length}`);
  console.log('\n' + '='.repeat(50));
}

// Execute
sendBulkFromCSV(fullDataPath);
