#!/usr/bin/env node

/**
 * Send raw HTML emails via AWS SES (no SES templates needed)
 *
 * Usage:
 *   Test mode (single email):
 *     node shared/scripts/send-raw-email.js --project=todoconta --template=apps/diot-2026-upgrade --subject="Tu plantilla DIOT se actualizó" --test=israel.castro@gmail.com
 *
 *   Bulk mode (from CSV):
 *     node shared/scripts/send-raw-email.js --project=todoconta --template=apps/diot-2026-upgrade --subject="Tu plantilla DIOT se actualizó" --data=data/diot-2026-clientes.csv
 *
 *   Dry run (preview without sending):
 *     node shared/scripts/send-raw-email.js --project=todoconta --template=apps/diot-2026-upgrade --subject="Tu plantilla DIOT se actualizó" --data=data/diot-2026-clientes.csv --dry-run
 */

require('dotenv').config();
const AWS = require('aws-sdk');
const path = require('path');
const {
  ROOT_DIR,
  getArg,
  hasFlag,
  loadProjectConfig,
  loadHtmlTemplate,
  resolveDataPath,
  readCsv,
  capitalizeName,
  renderTemplate,
  isValidEmail,
} = require('../utils/cli-helpers');

// Parse arguments
const projectName = getArg('project');
const templateName = getArg('template');
const subject = getArg('subject');
const testEmail = getArg('test');
const dataPath = getArg('data');
const dryRun = hasFlag('dry-run');

if (!projectName || !templateName || !subject) {
  console.error(
    '❌ Usage: node send-raw-email.js --project=<project> --template=<path> --subject="<subject>" [--test=<email> | --data=<csv>] [--dry-run]'
  );
  console.error('\n  Examples:');
  console.error(
    '    node send-raw-email.js --project=todoconta --template=apps/diot-2026-upgrade --subject="Tu plantilla DIOT se actualizó" --test=test@example.com'
  );
  console.error(
    '    node send-raw-email.js --project=todoconta --template=apps/diot-2026-upgrade --subject="Tu plantilla DIOT se actualizó" --data=data/clientes.csv'
  );
  process.exit(1);
}

if (!testEmail && !dataPath) {
  console.error('❌ Specify --test=<email> for a single test or --data=<csv> for bulk sending');
  process.exit(1);
}

// Load project config and HTML template
const projectConfig = loadProjectConfig(projectName);
const htmlTemplate = loadHtmlTemplate(projectName, templateName);

// Initialize AWS SES
const ses = new AWS.SES({ region: projectConfig.aws.region });

const senderName = projectConfig.sender.name;
const senderEmail = projectConfig.aws.sourceEmail;
const replyTo = projectConfig.sender.replyTo;

async function sendEmail(recipientEmail, templateData = {}) {
  const htmlContent = renderTemplate(htmlTemplate, templateData);

  const params = {
    Source: `${senderName} <${senderEmail}>`,
    Destination: {
      ToAddresses: [recipientEmail],
    },
    ReplyToAddresses: [replyTo],
    Message: {
      Subject: {
        Data: subject,
        Charset: 'UTF-8',
      },
      Body: {
        Html: {
          Data: htmlContent,
          Charset: 'UTF-8',
        },
        Text: {
          Data: 'Para ver este email correctamente, ábrelo en un cliente que soporte HTML.',
          Charset: 'UTF-8',
        },
      },
    },
  };

  if (dryRun) {
    return { MessageId: 'DRY-RUN' };
  }

  return ses.sendEmail(params).promise();
}

/**
 * Send with 1 retry on throttling errors
 */
async function sendWithRetry(recipientEmail, templateData) {
  try {
    return await sendEmail(recipientEmail, templateData);
  } catch (error) {
    if (error.code === 'Throttling') {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return sendEmail(recipientEmail, templateData);
    }
    throw error;
  }
}

async function sendTest(email) {
  console.log('🧪 AWS SES — Test Email\n');
  console.log('='.repeat(50));
  console.log(`  Project:  ${projectConfig.displayName}`);
  console.log(`  Template: ${templateName}`);
  console.log(`  Subject:  ${subject}`);
  console.log(`  From:     ${senderName} <${senderEmail}>`);
  console.log(`  To:       ${email}`);
  if (dryRun) console.log(`  Mode:     🔍 DRY RUN (no email sent)`);
  console.log('='.repeat(50));

  const testName = getArg('test-name') || 'Usuario';
  try {
    const result = await sendWithRetry(email, { nombre: capitalizeName(testName) });
    console.log(`\n✅ Test email sent! MessageId: ${result.MessageId}`);
    console.log('\n📬 Check your inbox (and spam folder) to verify the email looks correct.');
  } catch (error) {
    console.error(`\n❌ Failed to send: ${error.message}`);
    process.exit(1);
  }
}

async function sendBulk(csvPath) {
  const fullPath = resolveDataPath(csvPath, projectName);
  const recipients = await readCsv(fullPath);

  console.log('🚀 AWS SES — Bulk Email Sender\n');
  console.log('='.repeat(50));
  console.log(`  Project:    ${projectConfig.displayName}`);
  console.log(`  Template:   ${templateName}`);
  console.log(`  Subject:    ${subject}`);
  console.log(`  From:       ${senderName} <${senderEmail}>`);
  console.log(`  Recipients: ${recipients.length}`);
  console.log(`  CSV:        ${path.relative(ROOT_DIR, fullPath)}`);
  if (dryRun) console.log(`  Mode:       🔍 DRY RUN (no emails sent)`);
  console.log('='.repeat(50));
  console.log('');

  let successCount = 0;
  let errorCount = 0;

  for (const [index, row] of recipients.entries()) {
    const email = row.email || row.Email || row.EMAIL;
    const rawName = row.nombre || row.Nombre || row.NOMBRE || row.name || row.Name || row.NAME || '';

    if (!email) {
      errorCount++;
      console.error(`❌ [${index + 1}/${recipients.length}] No email column found in row`);
      continue;
    }

    const trimmedEmail = email.trim();

    if (!isValidEmail(trimmedEmail)) {
      errorCount++;
      console.error(`❌ [${index + 1}/${recipients.length}] Invalid email: ${trimmedEmail}`);
      continue;
    }

    const templateData = {
      nombre: capitalizeName(rawName) || 'Usuario',
    };

    try {
      await sendWithRetry(trimmedEmail, templateData);
      successCount++;
      console.log(`✅ [${index + 1}/${recipients.length}] ${templateData.nombre} — ${trimmedEmail}`);

      // Rate limit: 100ms between sends
      if (!dryRun) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    } catch (error) {
      errorCount++;
      console.error(`❌ [${index + 1}/${recipients.length}] ${trimmedEmail}: ${error.message}`);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('\n📊 Results:');
  console.log(`   ✅ Sent:   ${successCount}`);
  console.log(`   ❌ Failed: ${errorCount}`);
  console.log(`   📝 Total:  ${recipients.length}`);
  if (dryRun) console.log(`\n   🔍 This was a DRY RUN. No emails were actually sent.`);
  console.log('\n' + '='.repeat(50));
}

// Execute
if (testEmail) {
  sendTest(testEmail);
} else {
  sendBulk(dataPath);
}
