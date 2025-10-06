# 📧 Sistema de Plantillas de Email - Todoconta

Sistema completo de plantillas de email responsivas creadas con MJML, diseñadas para mantener consistencia con el design system de Todoconta y optimizadas para su uso con Sendy.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Uso](#uso)
- [Plantillas Disponibles](#plantillas-disponibles)
- [Personalización](#personalización)
- [Compilación](#compilación)
- [Integración con Sendy](#integración-con-sendy)
- [Variables Dinámicas](#variables-dinámicas)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

---

## ✨ Características

- ✅ **Responsive Design** - Compatible con todos los dispositivos
- ✅ **Design System Integrado** - Colores, tipografías y espaciados consistentes
- ✅ **Componentes Reutilizables** - Header, Footer, Buttons modulares
- ✅ **Optimizado para Sendy** - Variables y estructura compatible
- ✅ **Cross-Client Compatible** - Funciona en Gmail, Outlook, Apple Mail, etc.
- ✅ **Fácil Personalización** - Variables claramente definidas
- ✅ **Build Automatizado** - Scripts para compilar MJML a HTML

---

## 📁 Estructura del Proyecto

```
emails/
├── src/
│   ├── components/              # Componentes reutilizables
│   │   ├── header.mjml         # Header con logo
│   │   ├── footer.mjml         # Footer con links y contacto
│   │   └── button.mjml         # Estilos de botones
│   │
│   ├── templates/              # Plantillas completas
│   │   ├── transactional/      # Emails transaccionales
│   │   │   └── purchase-confirmation.mjml
│   │   ├── promotional/        # Emails promocionales
│   │   │   └── special-offer.mjml
│   │   ├── follow-up/          # Emails de seguimiento
│   │   │   └── post-service-feedback.mjml
│   │   ├── newsletter/         # Newsletters y boletines
│   │   │   ├── personal-newsletter.mjml
│   │   │   ├── workshop-example.mjml
│   │   │   └── workshop-update.mjml
│   │   └── gmail/              # Templates para Gmail 🆕
│   │       └── simple-template.mjml
│   │
│   └── config/
│       └── design-tokens.json  # Variables del design system
│
├── dist/                       # HTML compilado (generado)
├── scripts/
│   └── build.js               # Script de compilación
├── package.json
├── mjml.config.js
├── README.md
├── QUICK_START.md
├── TESTING_GUIDE.md
└── GMAIL_TEMPLATE_GUIDE.md    # Guía para Gmail 🆕
```

---

## 🚀 Instalación

### 1. Instalar dependencias

```bash
cd emails
npm install
```

### 2. Verificar instalación

```bash
npm run build
```

Esto compilará todas las plantillas MJML a HTML en la carpeta `dist/`.

---

## 💻 Uso

### Compilar todas las plantillas

```bash
npm run build
```

### Compilar en modo watch (desarrollo)

```bash
npm run build:watch
```

### Compilar para producción (minificado)

```bash
npm run build:prod
```

---

## 📧 Plantillas Disponibles

### 1. **Transaccional - Confirmación de Compra**
**Archivo:** `transactional/purchase-confirmation.mjml`

**Uso:** Enviar después de una compra exitosa

**Variables:**
- `[PRODUCT_NAME]` - Nombre del producto
- `[PLAN_NAME]` - Nombre del plan
- `[ORDER_NUMBER]` - Número de orden
- `[PURCHASE_DATE]` - Fecha de compra
- `[AMOUNT]` - Monto pagado
- `[DOWNLOAD_LINK]` - Link de descarga

**Ejemplo de uso en Sendy:**
```html
<!-- Copiar el contenido de dist/transactional/purchase-confirmation.html -->
<!-- Reemplazar variables con las de Sendy: [Name], [Email], etc. -->
```

---

### 2. **Promocional - Oferta Especial**
**Archivo:** `promotional/special-offer.mjml`

**Uso:** Campañas de descuentos y promociones

**Variables:**
- `[OFFER_TITLE]` - Título de la oferta
- `[DISCOUNT_PERCENTAGE]` - Porcentaje de descuento
- `[EXPIRY_DATE]` - Fecha de expiración
- `[CTA_LINK]` - Link del call-to-action
- `[SERVICE_X_NAME]` - Nombre del servicio
- `[SERVICE_X_DESCRIPTION]` - Descripción del servicio
- `[ORIGINAL_PRICE_X]` - Precio original
- `[DISCOUNTED_PRICE_X]` - Precio con descuento
- `[SERVICE_X_LINK]` - Link al servicio

---

### 3. **Seguimiento - Feedback Post-Servicio**
**Archivo:** `follow-up/post-service-feedback.mjml`

**Uso:** Solicitar feedback después de un servicio

**Variables:**
- `[CUSTOMER_NAME]` - Nombre del cliente
- `[SERVICE_NAME]` - Nombre del servicio
- `[SERVICE_DATE]` - Fecha del servicio
- `[REFERENCE_NUMBER]` - Número de referencia
- `[FEEDBACK_LINK]` - Link al formulario de feedback
- `[RELATED_SERVICE_X]` - Servicios relacionados
- `[RELATED_SERVICE_X_DESC]` - Descripción
- `[RELATED_SERVICE_X_LINK]` - Link

### 4. **Newsletter - Boletín Personal**
**Archivo:** `newsletter/personal-newsletter.mjml`

**Uso:** Enviar newsletters personales, anuncios de talleres, contenido educativo

**Características:**
- ✨ Área de contenido completamente flexible para escribir libremente
- ✨ Secciones opcionales para precios/planes (3 niveles)
- ✨ Espacio para firma personalizada
- ✨ Sección de P.S. (postdata) para mensajes finales
- ✨ Instrucciones de pago bancario integradas
- ✨ Secciones destacadas para puntos clave

**Variables:**
- `[Name]` - Nombre del suscriptor
- Todo el contenido es personalizable directamente en el MJML

**Ejemplo completo:** 
Ver [`newsletter/workshop-example.mjml`](src/templates/newsletter/workshop-example.mjml) para un ejemplo real completo basado en un taller de IA para contadores, incluyendo:
- Introducción personal
- Lista de beneficios
- 3 planes de precios
- Instrucciones de pago bancario
- Firma personalizada con P.S.

### 5. **Gmail Template** - Template Personal Simple 🆕
**Archivo:** `gmail/simple-template.mjml`

**Uso:** Template minimalista para usar directamente en Gmail como borrador o plantilla personal

**Características:**
- ✨ **Sin elementos de marketing** - No incluye unsubscribe, links legales, etc.
- ✨ **Header simple** - Solo logo y línea divisoria
- ✨ **Footer minimalista** - Solo información de contacto básica
- ✨ **Área de contenido limpia** - Espacio en blanco para escribir libremente
- ✨ **Optimizado para Gmail** - Compatible con el editor de Gmail
- ✨ **Fácil de personalizar** - Edita directamente en Gmail después de importar

**Cómo usar:**
1. Compila el template: `npm run build`
2. Copia el HTML de `dist/gmail/simple-template.html`
3. En Gmail: Redactar → Vista HTML → Pegar
4. Guarda como borrador o plantilla de Gmail

**Guía completa:** Ver [`GMAIL_TEMPLATE_GUIDE.md`](GMAIL_TEMPLATE_GUIDE.md) para instrucciones detalladas paso a paso.

**Ideal para:**
- Emails personales desde tu cuenta de Gmail
- Comunicación rápida con clientes
- Respuestas que necesitan el branding de Todoconta
- Emails que no requieren tracking o métricas

### 6. **Transaccional - Bienvenida al Taller** 🆕
**Archivo:** `transactional/workshop-welcome.mjml`

**Uso:** Email de bienvenida para participantes del taller Pro/Premium de IA

**Características:**
- ✨ **Confirmación completa** - Plan, fecha, horario, monto, folio
- ✨ **Calendario completo** - Todas las fechas con enlaces a sesiones en vivo
- ✨ **Accesos inmediatos** - Grupo de WhatsApp y carpeta de recursos
- ✨ **Preparación previa** - Tareas y contenido antes del taller
- ✨ **Comunicación continua** - Plan de actualizaciones semanales
- ✨ **Tono personal** - Mensaje cercano y motivador de Israel

**Variables requeridas:**
- `{{nombre}}` - Nombre del participante
- `{{plan_name}}` - Plan Básico/Pro/Premium
- `{{monto}}` - Monto pagado
- `{{order_number}}` - Folio de registro
- `{{link_session_1}}` - Enlace sesión 14 octubre
- `{{link_session_2}}` - Enlace sesión 16 octubre
- `{{link_session_3}}` - Enlace sesión 21 octubre
- `{{link_session_4}}` - Enlace sesión 23 octubre
- `{{link_session_5}}` - Enlace sesión Q&A 24 octubre
- `{{link_whatsapp}}` - Enlace grupo de WhatsApp
- `{{link_recursos}}` - Enlace carpeta de recursos

**Documentación completa:** Ver [`WORKSHOP_WELCOME_PLACEHOLDERS.md`](WORKSHOP_WELCOME_PLACEHOLDERS.md) para:
- Ejemplo de datos en CSV
- Ejemplo de objeto JSON
- Instrucciones para AWS SES
- Scripts de envío masivo

**Cómo usar con AWS SES:**
1. Compila el template: `npm run build`
2. Crea el template en AWS SES con el HTML compilado
3. Prepara tus datos en CSV o JSON
4. Envía usando AWS SDK o CLI

**Archivos de ejemplo incluidos:**
- `workshop-welcome-test-data.json` - Datos de prueba individuales
- `workshop-welcome-test-data.csv` - Datos para envíos masivos

---

**Cómo usar:**
1. Abre `personal-newsletter.mjml`
2. Reemplaza los textos entre `[CORCHETES]` con tu contenido
3. Elimina las secciones opcionales que no necesites
4. Compila con `npm run build`

---

---

## 🎨 Personalización

### Modificar Colores y Estilos

Edita el archivo [`src/config/design-tokens.json`](src/config/design-tokens.json):

```json
{
  "colors": {
    "primary": "#14b8a6",
    "background": "#f6f7fb",
    "textPrimary": "#1f2937"
  }
}
```

### Modificar Componentes

Los componentes están en [`src/components/`](src/components/):

- **Header:** Cambiar logo, agregar navegación
- **Footer:** Actualizar links, redes sociales, información legal
- **Buttons:** Ajustar estilos de botones

### Crear Nueva Plantilla

1. Crea un nuevo archivo `.mjml` en la carpeta correspondiente
2. Incluye los componentes base:

```xml
<mjml>
  <mj-head>
    <mj-title>Tu Título</mj-title>
    <mj-preview>Preview text</mj-preview>
  </mj-head>
  
  <mj-body background-color="#f6f7fb">
    <!-- Incluir header -->
    <mj-include path="../components/header.mjml" />
    
    <!-- Tu contenido aquí -->
    
    <!-- Incluir footer -->
    <mj-include path="../components/footer.mjml" />
  </mj-body>
</mjml>
```

3. Compila con `npm run build`

---

## 🔨 Compilación

### Script de Build

El script [`scripts/build.js`](scripts/build.js) compila automáticamente todos los archivos `.mjml` a HTML.

**Características:**
- Compila recursivamente todas las plantillas
- Mantiene la estructura de carpetas
- Minifica el HTML para producción
- Muestra errores y warnings

### Opciones de Compilación

```javascript
// En mjml.config.js
module.exports = {
  beautify: true,      // HTML legible
  minify: false,       // Sin minificar
  validationLevel: 'soft'  // Validación flexible
};
```

---

## 📮 Integración con Sendy

### Paso 1: Compilar la plantilla

```bash
npm run build:prod
```

### Paso 2: Copiar el HTML

Abre el archivo HTML generado en `dist/` y copia todo el contenido.

### Paso 3: Crear campaña en Sendy

1. Ve a **Campaigns** → **Create new campaign**
2. Pega el HTML en el editor
3. Reemplaza las variables personalizadas con las de Sendy:

**Mapeo de Variables:**

| Plantilla | Sendy |
|-----------|-------|
| `[CUSTOMER_NAME]` | `[Name]` |
| `[Email]` | `[Email]` |
| Variables personalizadas | Crear en Sendy |

### Paso 4: Variables de Sendy

Sendy incluye estas variables por defecto:
- `[Name]` - Nombre del suscriptor
- `[Email]` - Email del suscriptor
- `[Unsubscribe]` - Link de desuscripción (ya incluido en footer)
- `[Webversion]` - Ver en navegador

### Paso 5: Probar

Usa la función "Send a test email" de Sendy antes de enviar la campaña.

---

## 🔄 Variables Dinámicas

### Variables Comunes

Todas las plantillas usan estas variables que debes reemplazar:

```
[CUSTOMER_NAME]      → Nombre del cliente
[PRODUCT_NAME]       → Nombre del producto/servicio
[ORDER_NUMBER]       → Número de orden
[PURCHASE_DATE]      → Fecha de compra
[AMOUNT]             → Monto
[DOWNLOAD_LINK]      → Link de descarga
[CTA_LINK]           → Call-to-action link
[FEEDBACK_LINK]      → Link de feedback
```

### Cómo Reemplazar Variables

**Opción 1: Manualmente en Sendy**
```html
<!-- Antes -->
<p>Hola [CUSTOMER_NAME]</p>

<!-- Después -->
<p>Hola [Name]</p>
```

**Opción 2: Script de Reemplazo**
Puedes crear un script para automatizar el reemplazo:

```javascript
const html = fs.readFileSync('template.html', 'utf8');
const replaced = html
  .replace(/\[CUSTOMER_NAME\]/g, '[Name]')
  .replace(/\[Email\]/g, '[Email]');
```

---

## 🧪 Testing

### Clientes de Email Recomendados para Probar

- ✅ Gmail (Desktop & Mobile)
- ✅ Outlook 2016/2019/365
- ✅ Apple Mail (iOS & macOS)
- ✅ Yahoo Mail
- ✅ Outlook.com
- ✅ Thunderbird

### Herramientas de Testing

**Gratuitas:**
- [Litmus](https://litmus.com/) - 7 días gratis
- [Email on Acid](https://www.emailonacid.com/) - Trial disponible
- [Mailtrap](https://mailtrap.io/) - Testing en desarrollo
- [Putsmail](https://putsmail.com/) - Envío de pruebas

**Checklist de Testing:**
- [ ] Imágenes se cargan correctamente
- [ ] Links funcionan
- [ ] Botones son clickeables
- [ ] Texto es legible en todos los clientes
- [ ] Responsive en móvil
- [ ] Variables se reemplazan correctamente

---

## 🐛 Troubleshooting

### Problema: Las imágenes no se muestran

**Solución:**
- Asegúrate de usar URLs absolutas (no relativas)
- Verifica que las imágenes estén públicamente accesibles
- Usa HTTPS para las URLs de imágenes

```xml
<!-- ❌ Incorrecto -->
<mj-image src="/images/logo.png" />

<!-- ✅ Correcto -->
<mj-image src="https://todoconta.com/images/logo.png" />
```

---

### Problema: Los estilos no se aplican en Outlook

**Solución:**
- MJML ya maneja la compatibilidad con Outlook
- Evita usar CSS avanzado (flexbox, grid)
- Usa tablas para layouts (MJML lo hace automáticamente)

---

### Problema: Error al compilar MJML

**Solución:**
```bash
# Reinstalar dependencias
rm -rf node_modules
npm install

# Verificar versión de Node.js (requiere v14+)
node --version

# Compilar con más información
npm run build -- --verbose
```

---

### Problema: Variables no se reemplazan en Sendy

**Solución:**
- Verifica que las variables estén en el formato correcto: `[Variable]`
- Asegúrate de que las variables personalizadas estén creadas en Sendy
- Revisa que no haya espacios: `[Name]` no `[ Name ]`

---

## 📚 Recursos Adicionales

### Documentación MJML
- [MJML Documentation](https://documentation.mjml.io/)
- [MJML Components](https://documentation.mjml.io/#standard-body-components)
- [MJML Try It Live](https://mjml.io/try-it-live)

### Email Design Best Practices
- [Really Good Emails](https://reallygoodemails.com/)
- [Email Design Reference](https://templates.mailchimp.com/)
- [Can I Email](https://www.caniemail.com/) - Compatibilidad CSS

### Sendy
- [Sendy Documentation](https://sendy.co/api)
- [Sendy Forum](https://sendy.co/forum)

---

## 🤝 Soporte

Si tienes preguntas o necesitas ayuda:

- 📧 Email: soporte@todoconta.com
- 📱 WhatsApp: +52 55 4475 3602
- 🌐 Web: https://todoconta.com

---

## 📝 Changelog

### v1.1.0 (Octubre 2025)
- ✨ Nueva plantilla: Workshop Welcome (Bienvenida al Taller)
- ✨ Documentación completa con guía de placeholders para AWS SES
- ✨ Archivos de ejemplo: JSON y CSV para testing
- ✨ Soporte para envíos masivos con AWS SDK
- ✨ 11 placeholders dinámicos para personalización completa

### v1.0.0 (2024)
- ✨ Sistema inicial de plantillas
- ✨ 6 plantillas base (Transaccional, Promocional, Seguimiento, Newsletter, Gmail)
- ✨ Componentes reutilizables
- ✨ Sistema de build automatizado
- ✨ Integración con design system
- ✨ Documentación completa
- ✨ Plantilla de newsletter personal flexible

---

## 📄 Licencia

© 2024 Todoconta. Todos los derechos reservados.

Este sistema de plantillas es propiedad de Todoconta y está diseñado para uso interno.

---

**¡Listo para crear emails increíbles! 🚀**