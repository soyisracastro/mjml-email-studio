const AWS = require('aws-sdk');
const fs = require('fs');
const csv = require('csv-parser');

const ses = new AWS.SES({ region: 'us-east-1' });

async function sendWelcomeEmail(recipientEmail, templateData) {
  const params = {
    Source: 'israel@todoconta.com',
    Destination: {
      ToAddresses: [recipientEmail]
    },
    Template: 'workshop-welcome-v1',
    TemplateData: JSON.stringify(templateData)
  };

  return ses.sendTemplatedEmail(params).promise();
}

async function sendBulkFromCSV(csvPath) {
  const participantes = [];
  
  // Leer CSV
  fs.createReadStream(csvPath)
    .pipe(csv())
    .on('data', (row) => participantes.push(row))
    .on('end', async () => {
      console.log(`📧 Procesando ${participantes.length} emails...\n`);
      
      let successCount = 0;
      let errorCount = 0;

      for (const [index, data] of participantes.entries()) {
        const { email, ...templateData } = data;
        
        try {
          await sendWelcomeEmail(email, templateData);
          successCount++;
          console.log(`✅ [${index + 1}/${participantes.length}] ${email}`);
          
          // Delay para respetar límites
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
          errorCount++;
          console.error(`❌ [${index + 1}/${participantes.length}] ${email}: ${error.message}`);
        }
      }

      console.log('\n' + '='.repeat(50));
      console.log(`✅ Exitosos: ${successCount}`);
      console.log(`❌ Fallidos: ${errorCount}`);
      console.log(`📝 Total: ${participantes.length}`);
      console.log('='.repeat(50));
    });
}

// Ejecutar con CSV
const csvPath = process.argv[2] || './participantes.csv';
sendBulkFromCSV(csvPath);
