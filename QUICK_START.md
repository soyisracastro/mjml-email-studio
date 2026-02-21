# Guia Rapida - MJML Email Studio

## Inicio Rapido

### 1. Instalar

```bash
cd mjml-email-studio
npm install
```

### 2. Compilar

```bash
# Compilar un proyecto especifico
npm run build -- --project=todoconta

# Compilar todos los proyectos
npm run build:all
```

Los archivos HTML compilados estaran en `dist/{proyecto}/`.

### 3. Enviar un email de prueba

```bash
# Copiar las variables de entorno y configurar credenciales AWS
cp .env.example .env

# Enviar email de prueba (dry-run)
npm run send:email -- --project=todoconta --template=apps/diot-2026-upgrade --subject="Test" --test=tu@email.com --dry-run

# Enviar de verdad (sin --dry-run)
npm run send:email -- --project=todoconta --template=apps/diot-2026-upgrade --subject="Tu plantilla DIOT se actualizo" --test=tu@email.com
```

### 4. Envio masivo desde CSV

```bash
# Vista previa sin enviar
npm run send:email -- --project=todoconta --template=apps/diot-2026-upgrade --subject="Tu plantilla DIOT se actualizo" --data=data/clientes.csv --dry-run

# Enviar a todos los destinatarios
npm run send:email -- --project=todoconta --template=apps/diot-2026-upgrade --subject="Tu plantilla DIOT se actualizo" --data=data/clientes.csv
```

El CSV debe tener una columna `email`. La columna `nombre` se capitaliza automaticamente (MARIA ISABEL -> Maria Isabel).

---

## Plantillas Disponibles (Todoconta)

### Apps (transaccionales de producto)
- `dist/todoconta/apps/confirm-signup.html` - Confirmacion de registro
- `dist/todoconta/apps/email-change.html` - Cambio de email
- `dist/todoconta/apps/magic-link-access.html` - Acceso por magic link
- `dist/todoconta/apps/diot-2026-upgrade.html` - Upgrade DIOT 2026

### Transaccional
- `dist/todoconta/transactional/purchase-confirmation.html` - Confirmacion de compra
- `dist/todoconta/transactional/workshop-welcome.html` - Bienvenida a taller
- `dist/todoconta/transactional/workshop-pre-start.html` - Pre-inicio de taller

### Promocional
- `dist/todoconta/promotional/flash-offer.html` - Oferta flash
- `dist/todoconta/promotional/special-offer.html` - Oferta especial
- `dist/todoconta/promotional/reto-12-dias-navidad.html` - Reto 12 dias
- `dist/todoconta/promotional/workshop-last-chance.html` - Ultima oportunidad taller

### Newsletter
- `dist/todoconta/newsletter/personal-newsletter-v2.html` - Boletin personal
- `dist/todoconta/newsletter/lead-magnets/` - Secuencias de lead magnets
- `dist/todoconta/newsletter/masterclass-diciembre-2024/` - Serie masterclass

### Seguimiento
- `dist/todoconta/follow-up/post-service-feedback.html` - Feedback post-servicio
- `dist/todoconta/follow-up/sales-reminder.html` - Recordatorio de venta

---

## Comandos

| Comando | Descripcion |
|---------|-------------|
| `npm run build -- --project=nombre` | Compilar un proyecto |
| `npm run build:all` | Compilar todos los proyectos |
| `npm run send:email -- ...` | Enviar email via AWS SES |
| `npm run send:bulk -- ...` | Enviar masivo con templates SES |
| `npm run prepare:ses -- ...` | Generar config de template SES |
| `npm run new:project` | Crear nuevo proyecto |

---

## Variables de plantilla

Las plantillas usan `{{variable}}` como placeholders. Se reemplazan al momento de enviar, no al compilar.

| Variable | Descripcion |
|----------|-------------|
| `{{nombre}}` | Nombre del destinatario (capitalizado automaticamente) |

---

## Personalizar

### Cambiar colores y fuentes

Edita `projects/tu-proyecto/config/design-tokens.json`:

```json
{
  "colors": {
    "primary": "#14b8a6",
    "background": "#f6f7fb"
  }
}
```

> Nota: Los design tokens aun no se integran automaticamente al build. Por ahora los colores se configuran directamente en los templates MJML.

### Cambiar logo

Edita `projects/tu-proyecto/components/header.mjml`:

```xml
<mj-image
  src="https://tu-dominio.com/logo.png"
  alt="Tu Logo"
/>
```

### Cambiar footer

Edita `projects/tu-proyecto/components/footer.mjml` para actualizar redes sociales, contacto y links legales.

---

## Problemas comunes

### Las imagenes no se ven
Usa URLs completas (`https://...`), no rutas relativas.

### El template no existe al enviar
Ejecuta `npm run build` antes de enviar. Los scripts de envio leen el HTML compilado desde `dist/`.

### Error de credenciales AWS
Verifica tu `.env` con las variables `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` y `AWS_REGION`.

---

## Mas informacion

- [README.md](README.md) - Documentacion completa del proyecto
- [docs/CREATING_PROJECTS.md](docs/CREATING_PROJECTS.md) - Como crear nuevos proyectos
- [docs/DESIGN_TOKENS_GUIDE.md](docs/DESIGN_TOKENS_GUIDE.md) - Guia de design tokens
