# 📧 MJML Email Studio

Sistema multi-proyecto para crear plantillas de email profesionales y responsivas usando MJML. Gestiona múltiples proyectos con diferentes design systems desde un solo repositorio.

---

## ✨ Características

- 🎨 **Multi-Proyecto** - Gestiona emails para múltiples marcas/proyectos
- 🎯 **Design System por Proyecto** - Cada proyecto tiene su propio sistema de diseño
- 🔧 **Scripts Compartidos** - Herramientas reutilizables para todos los proyectos
- 📦 **Build Inteligente** - Compila proyectos individuales o todos a la vez
- ☁️ **AWS SES Ready** - Scripts integrados para envíos masivos
- 📱 **100% Responsive** - Compatible con todos los clientes de email
- 🚀 **Generador de Proyectos** - Crea nuevos proyectos en segundos

---

## 🚀 Quick Start

### 1. Instalación

```bash
git clone <repo-url> mjml-email-studio
cd mjml-email-studio
npm install
```

### 2. Crear tu Primer Proyecto

```bash
npm run new:project
```

Sigue el asistente interactivo para configurar tu proyecto.

### 3. Compilar Templates

```bash
# Compilar proyecto específico
npm run build -- --project=tu-proyecto

# Compilar todos los proyectos
npm run build:all
```

Los archivos HTML compilados estarán en `dist/{nombre-proyecto}/`

---

## 📁 Estructura del Proyecto

```
mjml-email-studio/
│
├── projects/                       # 📂 Tus proyectos
│   ├── todoconta/                  # Proyecto de ejemplo
│   │   ├── config/
│   │   │   ├── design-tokens.json  # Sistema de diseño
│   │   │   └── project.json        # Configuración del proyecto
│   │   ├── components/             # Componentes reutilizables
│   │   │   ├── header.mjml
│   │   │   └── footer.mjml
│   │   ├── templates/              # Templates MJML
│   │   │   ├── transactional/
│   │   │   ├── promotional/
│   │   │   └── newsletter/
│   │   ├── data/                   # Datos de prueba
│   │   └── docs/                   # Documentación específica
│   │
│   └── tu-proyecto/                # Tu nuevo proyecto aquí
│       └── ...
│
├── shared/                         # 🔧 Recursos compartidos
│   ├── scripts/
│   │   ├── build.js                # Compilador multi-proyecto
│   │   ├── prepare-ses-template.js # Preparar para AWS SES
│   │   └── send-bulk-templated.js  # Envío masivo
│   └── utils/
│       └── generate-project.js     # Generador de proyectos
│
├── dist/                           # 📦 Salida compilada
│   ├── todoconta/
│   └── tu-proyecto/
│
├── docs/                           # 📚 Documentación global
│   ├── QUICK_START.md
│   ├── CREATING_PROJECTS.md
│   └── DESIGN_TOKENS_GUIDE.md
│
└── package.json
```

---

## 💻 Comandos Principales

### Desarrollo

```bash
# Crear nuevo proyecto
npm run new:project

# Compilar proyecto específico
npm run build -- --project=nombre-proyecto

# Compilar todos los proyectos
npm run build:all
```

### AWS SES

```bash
# Preparar template para SES
npm run prepare:ses -- --project=nombre-proyecto --template=ruta/template --name=template-v1

# Enviar emails masivos
npm run send:bulk -- --project=nombre-proyecto --template=template-v1 --data=data/recipients.csv
```

---

## 📦 Proyectos Incluidos

### Todoconta (Ejemplo)

Proyecto completo con múltiples templates:
- ✅ Emails transaccionales (confirmaciones, bienvenida)
- ✅ Emails promocionales (ofertas, descuentos)
- ✅ Newsletters personalizadas
- ✅ Templates para Gmail
- ✅ Sistema completo de seguimiento

**Ver:** [`projects/todoconta/`](projects/todoconta/)

---

## 🎨 Creando un Nuevo Proyecto

### Opción 1: Generador Automático (Recomendado)

```bash
npm run new:project
```

El generador te pedirá:
- Nombre del proyecto (ej: `despacho-contable`)
- Nombre para mostrar (ej: `Despacho Contable`)
- Descripción
- Email del remitente
- Sitio web
- Color primario

Y creará automáticamente:
- ✅ Estructura completa de carpetas
- ✅ `project.json` con tu configuración
- ✅ `design-tokens.json` basado en tu color primario
- ✅ Componentes base (header, footer)
- ✅ Template de bienvenida de ejemplo
- ✅ Documentación inicial

### Opción 2: Manual

Ver la guía completa: [**Creating Projects Guide**](docs/CREATING_PROJECTS.md)

---

## 🎨 Sistema de Design Tokens

Cada proyecto tiene su propio sistema de diseño en `config/design-tokens.json`:

```json
{
  "colors": {
    "primary": "#3B82F6",
    "background": "#f6f7fb",
    "textPrimary": "#1f2937"
  },
  "fonts": {
    "primary": "'Inter', -apple-system, sans-serif"
  },
  "spacing": {
    "sm": "8px",
    "md": "16px",
    "lg": "24px"
  }
}
```

**Aprende más:** [**Design Tokens Guide**](docs/DESIGN_TOKENS_GUIDE.md)

---

## 🔨 Workflow Completo

### 1. Crear Proyecto

```bash
npm run new:project
```

### 2. Personalizar Design System

Edita `projects/tu-proyecto/config/design-tokens.json`

### 3. Actualizar Logo

Edita `projects/tu-proyecto/components/header.mjml`

### 4. Crear Templates

Crea archivos `.mjml` en `projects/tu-proyecto/templates/`

### 5. Compilar

```bash
npm run build -- --project=tu-proyecto
```

### 6. Probar Localmente

Abre `dist/tu-proyecto/tu-template.html` en el navegador

### 7. Subir a AWS SES (Opcional)

```bash
# Preparar template
npm run prepare:ses -- --project=tu-proyecto --template=welcome --name=welcome-v1

# Subir a AWS
aws ses create-template --cli-input-json file://projects/tu-proyecto/docs/ses-welcome.json

# Enviar masivamente
npm run send:bulk -- --project=tu-proyecto --template=welcome-v1 --data=data/users.csv
```

---

## 📧 Componentes MJML

Cada proyecto puede tener sus propios componentes en `projects/{proyecto}/components/`:

### Header (`header.mjml`)
Logo y barra superior con colores de marca

### Footer (`footer.mjml`)
Información de contacto, redes sociales, links legales

### Buttons (`button.mjml`)
Estilos de botones consistentes con el design system

### Uso en Templates

```xml
<mjml>
  <mj-body>
    <mj-include path="../components/header.mjml" />
    
    <!-- Tu contenido aquí -->
    
    <mj-include path="../components/footer.mjml" />
  </mj-body>
</mjml>
```

---

## 🧪 Testing

### Testing Local

```bash
# Compilar
npm run build -- --project=tu-proyecto

# Abrir en navegador
open dist/tu-proyecto/templates/tu-template.html
```

### Email Clients Recomendados

- ✅ Gmail (Desktop & Mobile)
- ✅ Outlook 2016/2019/365
- ✅ Apple Mail (iOS & macOS)
- ✅ Yahoo Mail
- ✅ Outlook.com

### Herramientas de Testing

- [Litmus](https://litmus.com/) - Testing profesional
- [Email on Acid](https://www.emailonacid.com/) - Testing exhaustivo
- [Mailtrap](https://mailtrap.io/) - Testing en desarrollo
- [Putsmail](https://putsmail.com/) - Envíos de prueba

---

## 📚 Documentación

| Guía | Descripción |
|------|-------------|
| [**Quick Start**](docs/QUICK_START.md) | Referencia rápida de comandos |
| [**Creating Projects**](docs/CREATING_PROJECTS.md) | Cómo crear nuevos proyectos |
| [**Design Tokens**](docs/DESIGN_TOKENS_GUIDE.md) | Sistema de diseño y tokens |

### Recursos Externos

- [MJML Documentation](https://documentation.mjml.io/) - Documentación oficial
- [MJML Try It Live](https://mjml.io/try-it-live) - Editor en línea
- [Can I Email](https://www.caniemail.com/) - Compatibilidad CSS

---

## 🔧 Configuración Avanzada

### mjml.config.js

Configuración global de MJML:

```javascript
module.exports = {
  beautify: true,
  minify: false,
  validationLevel: 'soft',
  fonts: {
    'Inter': 'https://fonts.googleapis.com/css2?family=Inter',
    'Plus Jakarta Sans': 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans'
  }
};
```

### AWS Configuration

Configura cada proyecto en `config/project.json`:

```json
{
  "aws": {
    "region": "us-east-1",
    "templatePrefix": "tu-proyecto-",
    "sourceEmail": "hello@tuproyecto.com"
  }
}
```

---

## 🐛 Troubleshooting

### Build Errors

```bash
# Verificar que el proyecto existe
ls projects/tu-proyecto

# Reinstalar dependencias
rm -rf node_modules
npm install

# Compilar con información detallada
npm run build -- --project=tu-proyecto
```

### MJML Validation

- Verifica que todos los `<mj-include>` apunten a archivos existentes
- Asegúrate de cerrar todas las etiquetas MJML
- Usa `validationLevel: 'soft'` en `mjml.config.js`

### AWS SES

- Verifica que tu email esté verificado en SES
- Configura AWS credentials: `aws configure`
- Revisa la región en `project.json`

---

## 🤝 Contribuir

Este es un sistema interno, pero si quieres sugerir mejoras:

1. Crea un nuevo proyecto de ejemplo
2. Documenta tus cambios
3. Comparte tu configuración de design tokens

---

## 📝 Changelog

### v2.0.0 (2025)
- 🎨 **Arquitectura multi-proyecto**
- 🔧 **Scripts compartidos reutilizables**
- 📦 **Generador automático de proyectos**
- 📚 **Documentación completa**
- ☁️ **Integración mejorada con AWS SES**
- 🎯 **Design system por proyecto**

### v1.0.0 (2024)
- ✨ Sistema inicial para Todoconta
- 📧 6 templates base
- 🔨 Build automatizado

---

## 📄 Licencia

MIT License

---

## 🚀 Próximos Pasos

1. **Explora el proyecto de ejemplo:** [`projects/todoconta/`](projects/todoconta/)
2. **Lee la guía de inicio:** [Quick Start](docs/QUICK_START.md)
3. **Crea tu primer proyecto:** `npm run new:project`
4. **Personaliza tu design system:** [Design Tokens Guide](docs/DESIGN_TOKENS_GUIDE.md)

---

**¿Listo para crear emails increíbles? 🎨✨**