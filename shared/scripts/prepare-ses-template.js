#!/usr/bin/env node

/**
 * Prepare AWS SES template configuration
 * 
 * Usage:
 *   node shared/scripts/prepare-ses-template.js --project=todoconta --template=workshop-welcome --name=workshop-welcome-v1
 */

const fs = require('fs');
const path = require('path');

// Parse arguments
const args = process.argv.slice(2);
const getArg = (name) => {
  const arg = args.find(a => a.startsWith(`--${name}=`));
  return arg ? arg.split('=')[1] : null;
};

const projectName = getArg('project');
const templateName = getArg('template');
const sesTemplateName = getArg('name');
const subject = getArg('subject') || 'Email from {{displayName}}';
const textPart = getArg('text') || 'Please view this email in an HTML-compatible client.';

if (!projectName || !templateName) {
  console.error('❌ Usage: node prepare-ses-template.js --project=<project> --template=<template> --name=<ses-name>');
  console.error('   Example: node prepare-ses-template.js --project=todoconta --template=workshop-welcome --name=workshop-welcome-v1');
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

// Find the HTML file
const htmlPath = path.join(ROOT_DIR, 'dist', projectName, `${templateName}.html`);

if (!fs.existsSync(htmlPath)) {
  console.error(`❌ Template not found: ${htmlPath}`);
  console.error('   Run npm run build first');
  process.exit(1);
}

const htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Create SES template config
const templateConfig = {
  Template: {
    TemplateName: sesTemplateName || `${projectConfig.aws.templatePrefix}${templateName}`,
    SubjectPart: subject,
    HtmlPart: htmlContent,
    TextPart: textPart
  }
};

// Save config
const outputPath = path.join(ROOT_DIR, 'projects', projectName, 'docs', `ses-${templateName}.json`);
fs.writeFileSync(outputPath, JSON.stringify(templateConfig, null, 2));

console.log('✅ SES template config created');
console.log(`   Project: ${projectConfig.displayName}`);
console.log(`   Template: ${templateConfig.Template.TemplateName}`);
console.log(`   Output: ${path.relative(ROOT_DIR, outputPath)}`);
console.log('\n📝 Next steps:');
console.log(`   aws ses create-template --cli-input-json file://${outputPath}`);
