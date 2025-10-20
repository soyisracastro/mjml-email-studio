# 🔄 Guía de Migración - MJML Email Studio v2.0

Esta guía documenta la migración del proyecto de un sistema mono-proyecto (Todoconta) a un sistema multi-proyecto.

---

## ✅ Cambios Completados

### 1. ✅ Estructura de Directorios
- Creada estructura `projects/` para múltiples proyectos
- Movido proyecto Todoconta a `projects/todoconta/`
- Creada carpeta `shared/` para recursos compartidos
- Creada carpeta `docs/` para documentación global

### 2. ✅ Scripts Actualizados
- **`build.js`**: Ahora soporta multi-proyecto con `--project=nombre`
- **`prepare-ses-template.js`**: Configuración por proyecto
- **`send-bulk-templated.js`**: Envíos con configuración por proyecto
- **`generate-project.js`**: Nuevo generador de proyectos

### 3. ✅ Configuración de Proyectos
- Creado `projects/todoconta/config/project.json`
- Configuración específica por proyecto (AWS, branding, etc.)

### 4. ✅ Documentación
- `docs/QUICK_START.md` - Referencia rápida
- `docs/CREATING_PROJECTS.md` - Guía detallada de creación
- `docs/DESIGN_TOKENS_GUIDE.md` - Sistema de diseño
- `README.md` - Actualizado para v2.0

### 5. ✅ Package.json
- Actualizados scripts npm
- Nuevo nombre: `mjml-email-studio`
- Version: `2.0.0`

---

## 🔧 Pasos Finales (Requieren Code Mode)

### Paso 1: Actualizar mjml.config.js

El archivo `mjml.config.js` necesita ser actualizado para la nueva estructura:

**Archivo actual:**
```javascript
module.exports = {
  beautify: true,
  minify: false,
  validationLevel: 'soft',
  filePath: './src/templates',  // ← Referencia antigua
  fonts: {
    'Inter': 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
    'Plus Jakarta Sans': 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'
  }
};
```

**Actualización necesaria:**
```javascript
/**
 * MJML Email Studio - Global Configuration
 * 
 * This config applies to all projects.
 * Individual projects can override settings in their templates.
 */
module.exports = {
  // Output settings
  beautify: true,
  minify: false,
  validationLevel: 'soft',
  
  // Fonts available for all projects
  fonts: {
    'Inter': 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
    'Plus Jakarta Sans': 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
    'Montserrat': 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap',
    'Open Sans': 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700;800&display=swap'
  }
  
  // Note: filePath is now handled by build.js per project
  // No need to specify it here
};
```

**Cambios:**
- ❌ Eliminar `filePath: './src/templates'` (ya no existe esa ruta)
- ✅ Agregar comentarios explicativos
- ✅ Agregar fuentes adicionales comunes
- ✅ Mantener configuración global

---

### Paso 2: Verificar Funcionamiento

#### Test 1: Build de Todoconta
```bash
npm run build -- --project=todoconta
```

**Resultado esperado:**
- ✅ Archivos compilados en `dist/todoconta/`
- ✅ Estructura de carpetas mantenida
- ✅ Sin errores de compilación

#### Test 2: Build de Todos los Proyectos
```bash
npm run build:all
```

**Resultado esperado:**
- ✅ Todos los proyectos compilados
- ✅ Reporte de éxitos/errores por proyecto

#### Test 3: Crear Nuevo Proyecto
```bash
npm run new:project
```

**Datos de prueba:**
- Nombre: `test-project`
- Display: `Test Project`
- Email: `test@example.com`
- Color: `#FF6B35`

**Resultado esperado:**
- ✅ Carpeta `projects/test-project/` creada
- ✅ Todos los archivos base generados
- ✅ Template de bienvenida funcional

#### Test 4: Compilar Nuevo Proyecto
```bash
npm run build -- --project=test-project
```

**Resultado esperado:**
- ✅ `dist/test-project/transactional/welcome.html` creado
- ✅ Colores personalizados aplicados
- ✅ Sin errores

---

### Paso 3: Limpieza (Opcional)

Archivos/carpetas que pueden eliminarse si ya no se necesitan:

```bash
# Archivos viejos que ya están movidos
rm -f QUICK_START.md  # Ya está en docs/
```

---

## 📋 Checklist de Migración

### Estructura
- [x] Carpeta `projects/` creada
- [x] Carpeta `shared/` creada
- [x] Carpeta `docs/` creada
- [x] Proyecto Todoconta movido a `projects/todoconta/`

### Archivos de Configuración
- [x] `package.json` actualizado
- [x] `README.md` actualizado
- [ ] `mjml.config.js` actualizado ← **Pendiente (requiere Code mode)**

### Scripts
- [x] `build.js` multi-proyecto
- [x] `prepare-ses-template.js` actualizado
- [x] `send-bulk-templated.js` actualizado
- [x] `generate-project.js` creado

### Documentación
- [x] `docs/QUICK_START.md`
- [x] `docs/CREATING_PROJECTS.md`
- [x] `docs/DESIGN_TOKENS_GUIDE.md`
- [x] `docs/MIGRATION_GUIDE.md` (este archivo)

### Testing
- [ ] Build de Todoconta funciona ← **Pendiente**
- [ ] Generador de proyectos funciona ← **Pendiente**
- [ ] Build de nuevo proyecto funciona ← **Pendiente**

---

## 🚀 Próximos Pasos

### Inmediatos (Code Mode)
1. Actualizar `mjml.config.js` según instrucciones arriba
2. Ejecutar tests de verificación
3. Crear proyecto de prueba
4. Documentar cualquier issue encontrado

### Futuros
1. **Agregar proyecto "Despacho Contable"** según requerimiento original
2. Crear templates específicos para ese proyecto
3. Configurar su design system
4. Probar envíos con AWS SES

---

## 📝 Notas de Migración

### Compatibilidad hacia atrás
- Los templates de Todoconta NO requieren cambios
- Los `<mj-include>` path relativos siguen funcionando
- Design tokens mantienen la misma estructura

### Breaking Changes
- ❌ Ya no se puede usar `npm run build` sin especificar proyecto
  - Usar: `npm run build -- --project=todoconta`
  - O bien: `npm run build:all`

### Mejoras
- ✅ Cada proyecto es independiente
- ✅ Design systems aislados
- ✅ Más fácil agregar nuevos proyectos
- ✅ Scripts reutilizables

---

## 🐛 Troubleshooting

### Error: "Project not found"
```bash
# Verificar que existe
ls projects/nombre-proyecto

# Verificar spelling
npm run build -- --project=nombre-correcto
```

### Error: "MJML include not found"
- Verificar que los paths en `<mj-include>` sean relativos al template
- Ejemplo: `path="../components/header.mjml"`

### Build sin output
- Verificar que existen archivos `.mjml` en `projects/{nombre}/templates/`
- Revisar logs de compilación

---

## ✅ Criterios de Éxito

La migración está completa cuando:

1. ✅ `npm run build:all` compila sin errores
2. ✅ `npm run new:project` crea proyectos funcionales
3. ✅ Todos los templates de Todoconta compilan correctamente
4. ✅ Se puede crear y compilar un nuevo proyecto de prueba
5. ✅ Documentación completa y actualizada

---

**Última actualización:** 2025-01-20

**Status:** 8/10 tareas completadas (80%)

**Pendiente:** mjml.config.js + testing (requiere Code mode)