# MJML Email Studio

Sistema multi-proyecto para crear plantillas de email profesionales y responsivas usando MJML. Gestiona multiples proyectos con diferentes design systems desde un solo repositorio y envia emails directamente via AWS SES.

---

## Caracteristicas

- **Multi-Proyecto** - Gestiona emails para multiples marcas/proyectos
- **Design System por Proyecto** - Cada proyecto tiene su propio sistema de diseno
- **Envio directo via AWS SES** - Test individual, envio masivo desde CSV, dry-run
- **Utilidades compartidas** - Funciones comunes centralizadas en `cli-helpers.js`
- **Build inteligente** - Compila proyectos individuales o todos a la vez
- **Generador de proyectos** - Crea nuevos proyectos en segundos
- **100% Responsive** - Compatible con todos los clientes de email

---

## Quick Start

### 1. Instalacion

```bash
git clone <repo-url> mjml-email-studio
cd mjml-email-studio
npm install
```

### 2. Compilar templates

```bash
# Compilar proyecto especifico
npm run build -- --project=todoconta

# Compilar todos los proyectos
npm run build:all
```

Los archivos HTML compilados estaran en `dist/{nombre-proyecto}/`.

### 3. Enviar email de prueba

```bash
# Configurar credenciales AWS
cp .env.example .env
# Editar .env con tus credenciales

# Enviar prueba (dry-run)
npm run send:email -- --project=todoconta --template=apps/diot-2026-upgrade --subject="Test" --test=tu@email.com --dry-run
```

Para la guia completa, ver [QUICK_START.md](QUICK_START.md).

---

## Estructura del Proyecto

```
mjml-email-studio/
|
├── projects/                          # Tus proyectos
│   └── todoconta/                     # Proyecto de ejemplo
│       ├── config/
│       │   ├── project.json           # Config AWS SES, sender, branding
│       │   └── design-tokens.json     # Colores, fuentes, espaciado
│       ├── components/                # Componentes MJML reutilizables
│       │   ├── header.mjml
│       │   ├── footer.mjml
│       │   ├── footer-simple.mjml
│       │   └── button.mjml
│       ├── templates/                 # Templates MJML por categoria
│       │   ├── apps/                  # Emails transaccionales de producto
│       │   ├── transactional/         # Confirmaciones, bienvenidas
│       │   ├── promotional/           # Ofertas, descuentos
│       │   ├── newsletter/            # Boletines, secuencias
│       │   ├── follow-up/             # Seguimiento post-servicio
│       │   └── gmail/                 # Templates simples para Gmail
│       ├── data/                      # CSVs de destinatarios (gitignored)
│       └── docs/                      # Documentacion del proyecto
|
├── shared/                            # Recursos compartidos
│   ├── scripts/
│   │   ├── build.js                   # Compilador MJML -> HTML
│   │   ├── send-raw-email.js          # Enviar HTML directo via SES
│   │   ├── send-bulk-templated.js     # Envio masivo con templates SES
│   │   └── prepare-ses-template.js    # Generar config de template SES
│   └── utils/
│       ├── cli-helpers.js             # Funciones compartidas entre scripts
│       └── generate-project.js        # Generador interactivo de proyectos
|
├── dist/                              # HTML compilado (gitignored)
├── docs/                              # Documentacion global
├── mjml.config.js                     # Config global de MJML
├── .env.example                       # Variables de entorno de ejemplo
└── package.json
```

---

## Comandos

### Desarrollo

```bash
# Crear nuevo proyecto
npm run new:project

# Compilar proyecto especifico
npm run build -- --project=nombre-proyecto

# Compilar todos los proyectos
npm run build:all
```

### Envio de emails (AWS SES)

```bash
# Enviar email de prueba
npm run send:email -- --project=todoconta --template=apps/diot-2026-upgrade \
  --subject="Tu plantilla DIOT se actualizo" --test=tu@email.com

# Envio masivo desde CSV
npm run send:email -- --project=todoconta --template=apps/diot-2026-upgrade \
  --subject="Tu plantilla DIOT se actualizo" --data=data/clientes.csv

# Dry-run (vista previa sin enviar)
npm run send:email -- ... --dry-run

# Personalizar nombre en test
npm run send:email -- ... --test=tu@email.com --test-name="Juan Perez"
```

### Templates SES (alternativo)

```bash
# Preparar template para SES
npm run prepare:ses -- --project=todoconta --template=workshop-welcome --name=workshop-welcome-v1

# Subir a AWS
aws ses create-template --cli-input-json file://projects/todoconta/docs/ses-workshop-welcome.json

# Envio masivo con template SES
npm run send:bulk -- --project=todoconta --template=workshop-welcome-v1 --data=data/participants.csv
```

---

## Crear un Nuevo Proyecto

### Generador automatico (recomendado)

```bash
npm run new:project
```

El generador te pedira nombre, email, sitio web y color primario. Crea automaticamente la estructura completa con config, componentes y un template de ejemplo.

### Manual

Ver la guia completa: [docs/CREATING_PROJECTS.md](docs/CREATING_PROJECTS.md)

---

## Variables de plantilla

Las plantillas usan `{{variable}}` como placeholders que se reemplazan al momento del envio:

```html
<!-- En el template MJML -->
<mj-text>Hola, {{nombre}}</mj-text>
```

Al enviar desde CSV, la columna `nombre` se capitaliza automaticamente:
- `MARIA ISABEL` -> `Maria Isabel`
- `jose angel` -> `Jose Angel`
- Filas sin nombre usan `Usuario` como fallback.

---

## Componentes MJML

Cada proyecto tiene sus componentes en `projects/{proyecto}/components/`:

- **header.mjml** - Logo y barra superior
- **footer.mjml** - Contacto, redes sociales, links legales
- **footer-simple.mjml** - Version ligera del footer
- **button.mjml** - Estilos de botones

### Uso en templates

```xml
<mjml>
  <mj-body>
    <mj-include path="../components/header.mjml" />

    <!-- Tu contenido aqui -->

    <mj-include path="../components/footer.mjml" />
  </mj-body>
</mjml>
```

> Nota: Algunos templates en subcarpetas (ej: `apps/`) tienen sus propios componentes en `templates/apps/components/` con rutas `./components/header.mjml`.

---

## Configuracion

### Variables de entorno (.env)

```bash
AWS_ACCESS_KEY_ID=tu-access-key
AWS_SECRET_ACCESS_KEY=tu-secret-key
AWS_REGION=us-east-1
```

### Proyecto (config/project.json)

```json
{
  "name": "todoconta",
  "displayName": "Todoconta",
  "sender": {
    "name": "Israel Castro - Todoconta",
    "email": "israel@todoconta.com",
    "replyTo": "israel@todoconta.com"
  },
  "aws": {
    "region": "us-east-1",
    "templatePrefix": "todoconta-",
    "sourceEmail": "israel@todoconta.com"
  }
}
```

### MJML global (mjml.config.js)

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

---

## Proyecto incluido: Todoconta

Proyecto completo con 29 templates:

| Categoria | Templates | Descripcion |
|-----------|-----------|-------------|
| `apps/` | 4 | Signup, email change, magic link, DIOT upgrade |
| `transactional/` | 3 | Compras, bienvenida taller, pre-inicio |
| `promotional/` | 4 | Ofertas, reto navidad, ultima oportunidad |
| `newsletter/` | 13 | Boletines, lead magnets, masterclass, workshops |
| `follow-up/` | 2 | Feedback, recordatorio de venta |
| `gmail/` | 1 | Template simple |

---

## Troubleshooting

### El template no existe al enviar
Ejecuta `npm run build` primero. Los scripts de envio leen HTML desde `dist/`.

### Error de credenciales AWS
Verifica que `.env` tenga `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` y `AWS_REGION`.

### Warnings de mj-include al compilar
Algunos templates antiguos referencian `../components/` que no existen en su directorio. El build completa con warnings pero sin errores.

### Las imagenes no se ven en el email
Usa URLs completas (`https://...`), nunca rutas relativas.

---

## Documentacion

| Guia | Descripcion |
|------|-------------|
| [QUICK_START.md](QUICK_START.md) | Referencia rapida de comandos |
| [docs/CREATING_PROJECTS.md](docs/CREATING_PROJECTS.md) | Como crear nuevos proyectos |
| [docs/DESIGN_TOKENS_GUIDE.md](docs/DESIGN_TOKENS_GUIDE.md) | Sistema de design tokens |
| [docs/MIGRATION_GUIDE.md](docs/MIGRATION_GUIDE.md) | Guia de migracion |

### Recursos externos

- [MJML Documentation](https://documentation.mjml.io/) - Documentacion oficial
- [MJML Try It Live](https://mjml.io/try-it-live) - Editor en linea
- [Can I Email](https://www.caniemail.com/) - Compatibilidad CSS en email

---

## Changelog

### v2.1.0 (2026)
- Utilidades compartidas centralizadas en `cli-helpers.js`
- Envio directo de HTML via SES (`send:email`) con test, bulk y dry-run
- Personalizacion de nombres desde CSV con soporte de acentos
- HTML escaping en variables de plantilla
- Validacion de email y retry con backoff para SES throttling
- Fix bug en `getArg()` para valores con `=`
- Copyright actualizado dinamicamente en el generador

### v2.0.0 (2025)
- Arquitectura multi-proyecto
- Scripts compartidos reutilizables
- Generador automatico de proyectos
- Integracion con AWS SES (templates + envio masivo)
- Design system por proyecto

### v1.0.0 (2024)
- Sistema inicial para Todoconta
- 6 templates base
- Build automatizado

---

## Licencia

MIT License
