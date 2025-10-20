# 📧 Email Pre-Taller - Guía de Placeholders

## Plantilla
**Archivo:** `emails/src/templates/transactional/workshop-pre-start.mjml`

## 📋 Placeholders Disponibles

### Información del Participante
- `{{nombre}}` - Nombre del participante
- `{{total_participants}}` - Número total de personas inscritas (ej: "47")

### Enlaces y Recursos
- `{{confidentiality_doc_link}}` - Link al documento de Google Docs del acuerdo de confidencialidad
- `{{zoom_link}}` - Enlace a la sesión de Zoom
- `{{whatsapp_group_link}}` - Enlace al grupo de WhatsApp

---

## 🗂️ Ejemplo de Datos en CSV

```csv
nombre,total_participants,confidentiality_doc_link,zoom_link,whatsapp_group_link
Juan Pérez,47,https://docs.google.com/document/d/1djFMWh-K_Cei9t56kVRd76z9pGdSvy2ww80toRay9l8/edit,https://us02web.zoom.us/j/84269970625?pwd=xkYH0OL5xSU4ODko3C03nAnSG2Y5Pc.1,https://chat.whatsapp.com/Hyp3LWigVJF69y3Kpf9Z5W
María González,47,https://docs.google.com/document/d/1djFMWh-K_Cei9t56kVRd76z9pGdSvy2ww80toRay9l8/edit,https://us02web.zoom.us/j/84269970625?pwd=xkYH0OL5xSU4ODko3C03nAnSG2Y5Pc.1,https://chat.whatsapp.com/Hyp3LWigVJF69y3Kpf9Z5W
```

---

## 📦 Ejemplo de Objeto JSON para AWS SES

### Para envío individual:

```json
{
  "nombre": "Juan Pérez",
  "total_participants": "47",
  "confidentiality_doc_link": "https://docs.google.com/document/d/1djFMWh-K_Cei9t56kVRd76z9pGdSvy2ww80toRay9l8/edit?usp=sharing",
  "zoom_link": "https://us02web.zoom.us/j/84269970625?pwd=xkYH0OL5xSU4ODko3C03nAnSG2Y5Pc.1",
  "whatsapp_group_link": "https://chat.whatsapp.com/Hyp3LWigVJF69y3Kpf9Z5W"
}
```

### Para envío masivo (bulk):

```json
[
  {
    "email": "juan.perez@example.com",
    "nombre": "Juan Pérez",
    "total_participants": "47",
    "confidentiality_doc_link": "https://docs.google.com/document/d/1djFMWh-K_Cei9t56kVRd76z9pGdSvy2ww80toRay9l8/edit?usp=sharing",
    "zoom_link": "https://us02web.zoom.us/j/84269970625?pwd=xkYH0OL5xSU4ODko3C03nAnSG2Y5Pc.1",
    "whatsapp_group_link": "https://chat.whatsapp.com/Hyp3LWigVJF69y3Kpf9Z5W"
  },
  {
    "email": "maria.gonzalez@example.com",
    "nombre": "María González",
    "total_participants": "47",
    "confidentiality_doc_link": "https://docs.google.com/document/d/1djFMWh-K_Cei9t56kVRd76z9pGdSvy2ww80toRay9l8/edit?usp=sharing",
    "zoom_link": "https://us02web.zoom.us/j/84269970625?pwd=xkYH0OL5xSU4ODko3C03nAnSG2Y5Pc.1",
    "whatsapp_group_link": "https://chat.whatsapp.com/Hyp3LWigVJF69y3Kpf9Z5W"
  }
]
```

---

## 🚀 Uso con AWS SES

### Opción 1: AWS SES con Templates

1. **Compilar el MJML a HTML:**
```bash
cd emails
npm run build
```

2. **Crear el template en AWS SES:**
```bash
aws ses create-template --cli-input-json file://template-config.json
```

**template-config.json:**
```json
{
  "Template": {
    "TemplateName": "workshop-pre-start-v1",
    "SubjectPart": "Mañana empezamos 🚀 - 3 cosas importantes antes de la primera sesión",
    "HtmlPart": "[CONTENIDO HTML COMPILADO AQUÍ]",
    "TextPart": "Versión texto del email..."
  }
}
```

3. **Enviar email usando el template:**
```bash
aws ses send-templated-email \
  --source "israel@todoconta.com" \
  --destination "ToAddresses=juan.perez@example.com" \
  --template "workshop-pre-start-v1" \
  --template-data '{"nombre":"Juan Pérez","total_participants":"47",...}'
```

### Opción 2: Script Node.js con AWS SDK

```javascript
const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'us-east-1' });

async function sendPreStartEmail(recipientEmail, templateData) {
  const params = {
    Source: 'israel@todoconta.com',
    Destination: {
      ToAddresses: [recipientEmail]
    },
    Template: 'workshop-pre-start-v1',
    TemplateData: JSON.stringify(templateData)
  };

  try {
    const result = await ses.sendTemplatedEmail(params).promise();
    console.log(`Email enviado a ${recipientEmail}:`, result.MessageId);
    return result;
  } catch (error) {
    console.error(`Error enviando email a ${recipientEmail}:`, error);
    throw error;
  }
}

// Ejemplo de uso
const templateData = {
  nombre: "Juan Pérez",
  total_participants: "47",
  confidentiality_doc_link: "https://docs.google.com/document/d/1djFMWh-K_Cei9t56kVRd76z9pGdSvy2ww80toRay9l8/edit?usp=sharing",
  zoom_link: "https://us02web.zoom.us/j/84269970625?pwd=xkYH0OL5xSU4ODko3C03nAnSG2Y5Pc.1",
  whatsapp_group_link: "https://chat.whatsapp.com/Hyp3LWigVJF69y3Kpf9Z5W"
};

sendPreStartEmail('juan.perez@example.com', templateData);
```

### Opción 3: Envío Masivo desde CSV

```javascript
const AWS = require('aws-sdk');
const fs = require('fs');
const csv = require('csv-parser');

const ses = new AWS.SES({ region: 'us-east-1' });

async function sendBulkPreStartEmails(csvPath) {
  const emails = [];
  
  // Leer CSV
  fs.createReadStream(csvPath)
    .pipe(csv())
    .on('data', (row) => emails.push(row))
    .on('end', async () => {
      console.log(`Procesando ${emails.length} emails...`);
      
      for (const emailData of emails) {
        const { email, ...templateData } = emailData;
        
        try {
          await sendPreStartEmail(email, templateData);
          console.log(`✅ Email enviado a ${email}`);
          
          // Delay para respetar límites de AWS SES
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
          console.error(`❌ Error con ${email}:`, error.message);
        }
      }
      
      console.log('Proceso completado');
    });
}

// Uso
sendBulkPreStartEmails('./participantes-pre-start.csv');
```

---

## 📝 Notas Importantes

### Sobre el Acuerdo de Confidencialidad

1. **Documento de Google Docs:**
   - Asegúrate de que el documento esté configurado para "Anyone with the link can view"
   - El link debe permitir edición para que los participantes puedan llenar sus datos
   - Considera crear un template en Google Docs que cada participante descargue y complete

2. **Alternativa recomendada:**
   - Usa Google Forms con un formato de acuerdo
   - Recolecta firmas digitalmente
   - Exporta respuestas a una hoja de cálculo

### Sobre los Enlaces

1. **Zoom:**
   - Verifica que el enlace sea válido y el meeting esté programado
   - Considera si necesitas password o waiting room
   - El enlace debe ser el mismo para todos los participantes

2. **WhatsApp:**
   - Los enlaces de grupo tienen límite de personas (~1024)
   - Verifica que el enlace sea válido antes de enviar
   - Considera tener un grupo de respaldo si se llena

### Timing del Email

- **Cuándo enviar:** 24 horas antes del inicio del taller
- **Mejor hora:** Entre 9 AM - 11 AM para máxima visibilidad
- **Subject line:** Ya definido en la plantilla, pero puedes personalizarlo en AWS SES

### Seguimiento

1. **Tracking de respuestas:**
   - Monitorea quiénes responden con el acuerdo firmado
   - Envía recordatorio a quienes no respondan 6 horas antes

2. **Métricas a revisar:**
   - Open rate
   - Click rate en el documento de confidencialidad
   - Click rate en el link de Zoom
   - Bounces y complaints

---

## 🎨 Compilar la Plantilla

```bash
# Desde el directorio emails/
npm run build

# El HTML compilado estará en emails/dist/
```

El archivo compilado será: `emails/dist/workshop-pre-start.html`

---

## ✅ Checklist Pre-Envío

- [ ] HTML compilado y testeado
- [ ] Template creado en AWS SES
- [ ] Dominio verificado en AWS SES
- [ ] Documento de confidencialidad listo y accesible
- [ ] Link de Zoom válido y meeting programado
- [ ] Grupo de WhatsApp creado y link válido
- [ ] CSV o datos JSON preparados con info correcta
- [ ] Email de prueba enviado y revisado
- [ ] Subject configurado: "Mañana empezamos 🚀 - 3 cosas importantes antes de la primera sesión"
- [ ] From address configurado: israel@todoconta.com
- [ ] Timing verificado: 24 horas antes del taller

---

## 📞 Qué Esperar Después del Envío

### Respuestas típicas:

1. **Acuerdos de confidencialidad firmados** - Organízalos en una carpeta
2. **Solicitudes de factura** - Responde rápido con instrucciones
3. **Preguntas sobre cuentas de IA** - Prepara respuestas estándar
4. **Confirmaciones de asistencia** - Actualiza tu lista

### Acciones de seguimiento:

- **6 horas antes del taller:** Envía recordatorio a quienes no firmaron el acuerdo
- **2 horas antes:** Envía recordatorio general con el link de Zoom
- **1 hora antes:** Mensaje en el grupo de WhatsApp

---

## 🔧 Troubleshooting

### Problema: Algunos no pueden acceder al documento de confidencialidad

**Solución:**
- Verifica permisos del documento en Google Docs
- Envía el documento como PDF adjunto en un follow-up
- Ofrece alternativa por WhatsApp

### Problema: Link de Zoom no funciona

**Solución:**
- Verifica que el meeting esté programado correctamente
- Asegúrate de incluir el password en el link
- Ten un link de backup preparado

### Problema: Grupo de WhatsApp lleno

**Solución:**
- Crea un segundo grupo
- Usa Telegram como alternativa
- Considera usar Discord o Slack para comunidades más grandes