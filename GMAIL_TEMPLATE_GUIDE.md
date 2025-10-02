# 📧 Guía: Template para Gmail

## Cómo usar el Template Simple en Gmail

Este template está diseñado específicamente para crear borradores en Gmail que puedas guardar como plantillas personales.

---

## 🚀 Pasos Rápidos

### 1. Compilar el Template

```bash
cd emails
npm run build
```

El HTML estará en: `dist/gmail/simple-template.html`

### 2. Copiar el HTML

Abre el archivo `dist/gmail/simple-template.html` y copia **todo el contenido**.

### 3. Crear Borrador en Gmail

#### Método 1: Desde Gmail Web

1. Ve a Gmail
2. Click en "Redactar"
3. En el editor, click en los tres puntos (⋮) → "Vista HTML"
4. **Borra todo** el contenido
5. **Pega** el HTML copiado
6. Guarda como borrador

#### Método 2: Crear Plantilla (Gmail Labs)

1. Ve a **Configuración** → **Ver todas las configuraciones**
2. En la pestaña **Avanzado**, activa **Plantillas**
3. Guarda cambios
4. Crea un nuevo correo con tu HTML
5. Click en ⋮ → **Plantillas** → **Guardar borrador como plantilla** → **Guardar como plantilla nueva**

---

## ✏️ Cómo Editar el Contenido

### Opción A: Directamente en el MJML

Edita [`src/templates/gmail/simple-template.mjml`](src/templates/gmail/simple-template.mjml):

```xml
<!-- Reemplaza esto: -->
<mj-text padding-bottom="16px">
  Escribe tu mensaje aquí...
</mj-text>

<!-- Por tu contenido: -->
<mj-text padding-bottom="16px">
  Hola, quería compartirte información sobre...
</mj-text>
```

Luego compila de nuevo:
```bash
npm run build
```

### Opción B: Directamente en Gmail

Una vez que tengas el template en Gmail:

1. Abre el borrador
2. Selecciona el texto de ejemplo
3. Escribe tu contenido
4. Gmail mantendrá el formato automáticamente

---

## 📝 Estructura del Template

```
┌────────────────────────┐
│   Logo Todoconta       │ ← Header simple
├────────────────────────┤
│   Línea verde          │ ← Separador
├────────────────────────┤
│                        │
│   Hola 👋              │
│                        │
│   [Tu contenido aquí]  │ ← Área editable
│                        │
│   Saludos,             │
│   Israel Castro        │
│                        │
├────────────────────────┤
│   Todoconta            │
│   📧 hola@...          │ ← Footer simple
│   📱 +52...            │   (sin unsubscribe)
│   🌐 www...            │
└────────────────────────┘
```

---

## 🎨 Personalizar el Template

### Cambiar el Logo

Edita la línea 21 en el MJML:

```xml
<mj-image 
  src="https://tu-url-aqui.com/logo.png" 
  alt="Todoconta" 
  width="60px"
/>
```

### Cambiar Colores

El color principal es `#14b8a6` (verde Todoconta).

Para cambiar:
1. Busca `#14b8a6` en el MJML
2. Reemplaza por tu color hexadecimal
3. Recompila

### Cambiar Firma

Edita las líneas 99-107:

```xml
<mj-text 
  color="#6b7280" 
  font-style="italic"
>
  Tu firma aquí
</mj-text>

<mj-text 
  color="#1f2937" 
  font-weight="600"
>
  Tu Nombre
</mj-text>
```

### Cambiar Footer

Edita las líneas 113-135 con tu información de contacto.

---

## 💡 Tips para Gmail

### Formato de Texto

Gmail respetará:
- ✅ Negritas (`<strong>`)
- ✅ Cursivas (`<em>`)
- ✅ Links (`<a href="">`)
- ✅ Colores
- ✅ Tamaños de fuente

### Imágenes

- Las imágenes deben estar en URLs públicas (no archivos locales)
- Gmail puede bloquear imágenes por defecto
- Los destinatarios pueden necesitar "Mostrar imágenes"

### Testing

Antes de usar la plantilla ampliamente:
1. Envíate un correo de prueba
2. Revisa en diferentes dispositivos
3. Revisa en modo oscuro de Gmail (si aplica)

---

## 🔧 Scripts Útiles

### Compilar solo el template de Gmail

```bash
cd emails
npx mjml src/templates/gmail/simple-template.mjml -o dist/gmail/simple-template.html
```

### Ver cambios en vivo

```bash
npm run build:watch
```

Esto recompilará automáticamente cada vez que guardes cambios en el MJML.

---

## 📋 Checklist Pre-Uso

Antes de guardar como plantilla en Gmail:

- [ ] Compilar el MJML más reciente
- [ ] Verificar que el logo se carga correctamente
- [ ] Revisar información de contacto en el footer
- [ ] Probar enviándote un correo
- [ ] Verificar en móvil
- [ ] Guardar como borrador/plantilla en Gmail

---

## ❓ Troubleshooting

### El logo no se muestra

**Problema:** La URL de la imagen no es accesible públicamente

**Solución:** 
1. Sube tu logo a un servicio como:
   - AWS S3
   - Imgur
   - Tu propio servidor
2. Usa la URL completa: `https://...`

### Los estilos se ven diferentes en Gmail

**Problema:** Gmail puede modificar algunos estilos

**Solución:** 
- El template está optimizado para Gmail
- MJML maneja automáticamente las incompatibilidades
- Evita CSS avanzado

### El HTML es muy largo

**Problema:** MJML genera mucho código para compatibilidad

**Solución:** 
- Es normal, MJML usa tablas para máxima compatibilidad
- No intentes simplificarlo manualmente
- Gmail no tiene límite de tamaño para borradores

---

## 🆘 Soporte

Si tienes problemas:
- Revisa que Node.js y npm estén instalados
- Verifica que compiló sin errores: `npm run build`
- Prueba con `npx mjml --version` para confirmar que MJML está instalado

---

**¡Listo! Ahora tienes un template profesional para usar en Gmail 🎉**