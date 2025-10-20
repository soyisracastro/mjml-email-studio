const fs = require('fs');

// Leer el HTML compilado
const htmlContent = fs.readFileSync('./dist/workshop-welcome.html', 'utf8');

// Crear la configuración del template para AWS SES
const templateConfig = {
  Template: {
    TemplateName: "workshop-welcome-v1",
    SubjectPart: "¡Bienvenido al Taller! Tus accesos + lo que sigue 🎓",
    HtmlPart: htmlContent,
    TextPart: "Bienvenido al taller, {{nombre}}. Revisa este email en tu cliente de correo para ver toda la información."
  }
};

// Guardar como JSON
fs.writeFileSync('./ses-template-config.json', JSON.stringify(templateConfig, null, 2));

console.log('✅ Archivo ses-template-config.json creado');
console.log('📝 Nombre del template: workshop-welcome-v1');