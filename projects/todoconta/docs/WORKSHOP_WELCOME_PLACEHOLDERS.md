# 📧 Email de Bienvenida al Taller - Guía de Placeholders

## Plantilla
**Archivo:** `emails/src/templates/transactional/workshop-welcome.mjml`

## 📋 Placeholders Disponibles

### Información del Participante
- `{{nombre}}` - Nombre del participante
- `{{plan_name}}` - Nombre del plan contratado (Básico/Pro/Premium)
- `{{monto}}` - Monto pagado (sin símbolo de moneda)
- `{{order_number}}` - Folio/número de orden

### Enlaces de Sesiones en Vivo
- `{{link_session_1}}` - Enlace a la sesión del 14 de octubre
- `{{link_session_2}}` - Enlace a la sesión del 16 de octubre
- `{{link_session_3}}` - Enlace a la sesión del 21 de octubre
- `{{link_session_4}}` - Enlace a la sesión del 23 de octubre
- `{{link_session_5}}` - Enlace a la sesión de Q&A del 24 de octubre

### Recursos y Accesos
- `{{link_whatsapp}}` - Enlace al grupo de WhatsApp
- `{{link_recursos}}` - Enlace a la carpeta de recursos (OneDrive/Notion/Sitio web)

---

## 🗂️ Ejemplo de Datos en CSV

```csv
nombre,plan_name,monto,order_number,link_session_1,link_session_2,link_session_3,link_session_4,link_session_5,link_whatsapp,link_recursos
Juan Pérez,Plan Pro,2997,TC-2025-001,https://zoom.us/j/session1,https://zoom.us/j/session2,https://zoom.us/j/session3,https://zoom.us/j/session4,https://zoom.us/j/session5,https://chat.whatsapp.com/grupo,https://drive.google.com/recursos
María González,Plan Premium,4997,TC-2025-002,https://zoom.us/j/session1,https://zoom.us/j/session2,https://zoom.us/j/session3,https://zoom.us/j/session4,https://zoom.us/j/session5,https://chat.whatsapp.com/grupo,https://drive.google.com/recursos
```

---

## 📦 Ejemplo de Objeto JSON para AWS SES

### Para envío individual:

```json
{
  "nombre": "Juan Pérez",
  "plan_name": "Plan Pro",
  "monto": "2997",
  "order_number": "TC-2025-001",
  "link_session_1": "https://zoom.us/j/session1",
  "link_session_2": "https://zoom.us/j/session2",
  "link_session_3": "https://zoom.us/j/session3",
  "link_session_4": "https://zoom.us/j/session4",
  "link_session_5": "https://zoom.us/j/session5",
  "link_whatsapp": "https://chat.whatsapp.com/grupo-taller",
  "link_recursos": "https://drive.google.com/carpeta-recursos"
}
```

### Para envío masivo (bulk):

```json
[
  {
    "email": "juan.perez@example.com",
    "nombre": "Juan Pérez",
    "plan_name": "Plan Pro",
    "monto": "2997",
    "order_number": "TC-2025-001",
    "link_session_1": "https://zoom.us/j/session1",
    "link_session_2": "https://zoom.us/j/session2",
    "link_session_3": "https://zoom.us/j/session3",
    "link_session_4": "https://zoom.us/j/session4",
    "link_session_5": "https://zoom.us/j/session5",
    "link_whatsapp": "https://chat.whatsapp.com/grupo-taller",
    "link_recursos": "https://drive.google.com/carpeta-recursos"
  },
  {
    "email": "maria.gonzalez@example.com",
    "nombre": "María González",
    "plan_name": "Plan Premium",
    "monto": "4997",
    "order_number": "TC-2025-002",
    "link_session_1": "https://zoom.us/j/session1",
    "link_session_2": "https://zoom.us/j/session2",
    "link_session_3": "https://zoom.us/j/session3",
    "link_session_4": "https://zoom.us/j/session4",
    "link_session_5": "https://zoom.us/j/session5",
    "link_whatsapp": "https://chat.whatsapp.com/grupo-taller",
    "link_recursos": "https://drive.google.com/carpeta-recursos"
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
    "TemplateName": "workshop-welcome-v1",
    "SubjectPart": "¡Bienvenido al Taller! Tus accesos + lo que sigue",
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
  --template "workshop-welcome-v1" \
  --template-data '{"nombre":"Juan Pérez","plan_name":"Plan Pro","monto":"2997",...}'
```

### Opción 2: Script Node.js con AWS SDK

```javascript
const AWS = require('aws-sdk');
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
  plan_name: "Plan Pro",
  monto: "2997",
  order_number: "TC-2025-001",
  link_session_1: "https://zoom.us/j/session1",
  link_session_2: "https://zoom.us/j/session2",
  link_session_3: "https://zoom.us/j/session3",
  link_session_4: "https://zoom.us/j/session4",
  link_session_5: "https://zoom.us/j/session5",
  link_whatsapp: "https://chat.whatsapp.com/grupo-taller",
  link_recursos: "https://drive.google.com/carpeta-recursos"
};

sendWelcomeEmail('juan.perez@example.com', templateData);
```

### Opción 3: Envío Masivo desde CSV

```javascript
const AWS = require('aws-sdk');
const fs = require('fs');
const csv = require('csv-parser');

const ses = new AWS.SES({ region: 'us-east-1' });

async function sendBulkEmails(csvPath) {
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
          await sendWelcomeEmail(email, templateData);
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
sendBulkEmails('./participantes.csv');
```

---

## 📝 Notas Importantes

1. **Límites de AWS SES:**
   - Cuenta sandbox: 200 emails/día, 1 email/segundo
   - Cuenta producción: Varía según tu límite aprobado
   - Considera usar delays entre envíos masivos

2. **Verificación de dominios:**
   - Verifica `todoconta.com` en AWS SES antes de enviar
   - En sandbox, también verifica cada email destinatario

3. **Personalización por plan:**
   - La sección del PD sobre Plan Premium se muestra siempre
   - Considera crear variantes del template si necesitas mostrar/ocultar secciones

4. **Testing:**
   - Prueba primero en sandbox con emails verificados
   - Envía a una lista pequeña antes del envío masivo
   - Revisa métricas de bounces y complaints

5. **Enlaces:**
   - Todos los enlaces deben ser absolutos (https://...)
   - Verifica que funcionen antes del envío masivo
   - Los enlaces de Zoom/Meet tienen límite de participantes

---

## 🎨 Compilar la Plantilla

```bash
# Desde el directorio emails/
npm run build

# El HTML compilado estará en emails/templates/
```

El archivo compilado será: `emails/templates/workshop-welcome.html`

---

## ✅ Checklist Pre-Envío

- [ ] HTML compilado y testeado
- [ ] Template creado en AWS SES
- [ ] Dominio verificado en AWS SES
- [ ] Enlaces de sesiones funcionando
- [ ] Grupo de WhatsApp creado y enlace válido
- [ ] Carpeta de recursos lista y enlace válido
- [ ] CSV o datos JSON preparados
- [ ] Email de prueba enviado y revisado
- [ ] Asunto del email confirmado
- [ ] From address configurado: israel@todoconta.com