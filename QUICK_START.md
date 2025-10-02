# 🚀 Guía Rápida - Email Templates Todoconta

## Inicio Rápido en 5 Minutos

### 1️⃣ Instalar (1 min)

```bash
cd emails
npm install
```

### 2️⃣ Compilar (30 seg)

```bash
npm run build
```

Los archivos HTML estarán en la carpeta `dist/`

### 3️⃣ Usar en Sendy (3 min)

1. Abre el archivo HTML compilado (ej: `dist/transactional/purchase-confirmation.html`)
2. Copia todo el contenido
3. En Sendy: **Campaigns** → **Create new campaign**
4. Pega el HTML
5. Reemplaza las variables:
   - `[CUSTOMER_NAME]` → `[Name]`
   - `[Email]` → `[Email]`
   - Otras variables según necesites

### 4️⃣ Enviar Prueba

Usa "Send a test email" en Sendy para verificar que todo se vea bien.

---

## 📧 Plantillas Disponibles

### Transaccional
**Archivo:** `dist/transactional/purchase-confirmation.html`
- Confirmación de compra
- Detalles del pedido
- Instrucciones de descarga

### Promocional
**Archivo:** `dist/promotional/special-offer.html`
- Ofertas especiales
- Descuentos
- Múltiples servicios

### Seguimiento
**Archivo:** `dist/follow-up/post-service-feedback.html`
- Solicitud de feedback
- Servicios relacionados
- Encuesta de satisfacción

### Newsletter Personal
**Archivo:** `dist/newsletter/personal-newsletter.html`
- Boletín personalizado
- Contenido flexible
- Ideal para talleres y anuncios

**Ejemplo completo:** `dist/newsletter/workshop-example.html`

---

## 🔧 Comandos Útiles

```bash
# Compilar todas las plantillas
npm run build

# Compilar y observar cambios
npm run build:watch

# Compilar para producción (minificado)
npm run build:prod
```

---

## 📝 Variables Más Comunes

Reemplaza estas variables en Sendy:

| En la plantilla | En Sendy |
|----------------|----------|
| `[CUSTOMER_NAME]` | `[Name]` |
| `[Email]` | `[Email]` |
| `[PRODUCT_NAME]` | Tu variable personalizada |
| `[ORDER_NUMBER]` | Tu variable personalizada |
| `[AMOUNT]` | Tu variable personalizada |

---

## 🎨 Personalizar

### Cambiar Colores

Edita `src/config/design-tokens.json`:

```json
{
  "colors": {
    "primary": "#14b8a6",  // Color principal
    "background": "#f6f7fb" // Fondo
  }
}
```

### Cambiar Logo

Edita `src/components/header.mjml`:

```xml
<mj-image 
  src="https://tu-dominio.com/logo.png" 
  alt="Tu Logo" 
/>
```

### Cambiar Footer

Edita `src/components/footer.mjml` para actualizar:
- Redes sociales
- Información de contacto
- Links legales

---

## ❓ Problemas Comunes

### Las imágenes no se ven
✅ Usa URLs completas: `https://todoconta.com/images/logo.png`
❌ No uses rutas relativas: `/images/logo.png`

### Los estilos no funcionan
✅ Compila con `npm run build`
✅ Copia el HTML completo de `dist/`

### Variables no se reemplazan
✅ Formato correcto: `[Name]` (con corchetes)
✅ Sin espacios: `[Name]` no `[ Name ]`

---

## 📚 Más Información

Lee el [`README.md`](README.md) completo para:
- Documentación detallada
- Guía de personalización avanzada
- Testing y troubleshooting
- Mejores prácticas

---

## 🆘 Soporte

- 📧 soporte@todoconta.com
- 📱 +52 55 4475 3602
- 🌐 https://todoconta.com

---

**¡Listo! Ya puedes crear y enviar emails profesionales 🎉**