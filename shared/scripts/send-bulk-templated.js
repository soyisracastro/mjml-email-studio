#!/usr/bin/env node

/**
 * Send bulk templated emails via AWS SES
 * 
 * Usage:
 *   node shared/scripts/send-bulk-templated.js --project=todoconta --template=workshop-welcome-v1 --data=data/participants.csv
 */

const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Parse arguments
const args = process.argv.slice(2);
const getArg = (name) => {
  const arg = args.find(a => a.startsWith(`--${name}=`));
  return arg ? arg.split('=')[1] : null;
};

const projectName = getArg('project');
const templateName = getArg('template');
const dataPath = getArg('data');

if (!projectName || !templateName || !dataPath) {
  console.error('❌ Usage: node send-bulk-templated.js --project=<project> --template=<template-name> --data=<csv-file>');
  console.error('   Example: node send-bulk-templated.js --project=todoconta --template=workshop-welcome-v1 --data=data/participants.csv');
  process.exit(1);
}

// Load project config
const ROOT_DIR = path.join(__dirname, '../..');
const projectConfigPath = path.join(ROOT_DIR, 'projects', projectName, 'config', 'project.json');

if (!fs.existsSync(projectConfigPath)) {
  console.error(`❌ Project config not found: ${projectName}`);
  process.exit(1);
}

const projectConfig = JSON.parse(fs.readFileSync(projectConfigPath, 'utf8'));

// Initialize AWS SES
const ses = new AWS.SES({ region: projectConfig.aws.region });

// Resolve data path
const fullDataPath = path.isAbsolute(dataPath) 
  ? dataPath 
  : path.join(ROOT_DIR, 'projects', projectName, dataPath);

if (!fs.existsSync(fullDataPath)) {
  console.error(`❌ Data file not found: ${fullDataPath}`);
  process.exit(1);
}

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

async function sendBulkFromCSV(csvPath) {
  const recipients = [];
  
  console.log('🚀 AWS SES Bulk Email Sender\n');
  console.log('='.repeat(50));
  console.log(`Project: ${projectConfig.displayName}`);
  console.log(`Template: ${templateName}`);
  console.log(`Data: ${path.relative(ROOT_DIR, csvPath)}`);
  console.log('='.repeat(50));
  console.log('\nReading data...\n');
  
  // Read CSV
  fs.createReadStream(csvPath)
    .pipe(csv())
    .on('data', (row) => recipients.push(row))
    .on('end', async () => {
      console.log(`📧 Processing ${recipients.length} emails...\n`);
      
      let successCount = 0;
      let errorCount = 0;

      for (const [index, data] of recipients.entries()) {
        const { email, ...templateData } = data;
        
        try {
          await sendTemplatedEmail(email, templateData);
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
    });
}

// Execute
sendBulkFromCSV(fullDataPath);
