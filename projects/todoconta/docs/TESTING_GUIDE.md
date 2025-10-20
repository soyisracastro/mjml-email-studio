# 🧪 Guía de Testing - Email Templates

## Checklist de Testing Completo

### ✅ Pre-envío

- [ ] Compilar plantilla con `npm run build:prod`
- [ ] Verificar que no hay errores de compilación
- [ ] Revisar HTML generado en `dist/`
- [ ] Todas las imágenes usan URLs absolutas (https://)
- [ ] Todos los links son válidos y funcionan
- [ ] Variables están en el formato correcto `[VARIABLE]`

---

## 🖥️ Testing en Clientes de Email

### Clientes Prioritarios

#### 1. Gmail (Desktop)
- [ ] Imágenes se cargan
- [ ] Botones son clickeables
- [ ] Colores se muestran correctamente
- [ ] Tipografía es legible
- [ ] Links funcionan

#### 2. Gmail (Mobile)
- [ ] Layout responsive
- [ ] Texto legible sin zoom
- [ ] Botones tienen buen tamaño (mínimo 44px)
- [ ] Imágenes se ajustan al ancho

#### 3. Outlook 2016/2019
- [ ] Layout no se rompe
- [ ] Botones se ven correctamente
- [ ] Espaciados son consistentes
- [ ] Colores de fondo funcionan

#### 4. Apple Mail (iOS)
- [ ] Renderizado correcto
- [ ] Links telefónicos funcionan
- [ ] Dark mode se ve bien (opcional)

#### 5. Apple Mail (macOS)
- [ ] Tipografía correcta
- [ ] Imágenes en alta resolución
- [ ] Interacciones funcionan

---

## 🔍 Aspectos Específicos a Verificar

### Imágenes
```
✅ URLs absolutas: https://todoconta.com/images/logo.png
✅ Alt text presente
✅ Tamaño apropiado (max 600px ancho)
✅ Formato optimizado (JPG/PNG)
✅ Peso < 200KB por imagen
```

### Links
```
✅ Todos los href son válidos
✅ Links externos abren en nueva pestaña
✅ UTM parameters si aplica
✅ Links de desuscripción funcionan
```

### Botones
```
✅ Tamaño mínimo 44x44px (mobile)
✅ Contraste adecuado (WCAG AA)
✅ Padding suficiente
✅ Hover states (donde aplique)
```

### Texto
```
✅ Sin errores ortográficos
✅ Tamaño mínimo 14px
✅ Line-height adecuado (1.5-1.7)
✅ Contraste suficiente con fondo
```

### Responsive
```
✅ Se adapta a 320px (iPhone SE)
✅ Se adapta a 375px (iPhone estándar)
✅ Se adapta a 768px (iPad)
✅ Máximo ancho 600px en desktop
```

---

## 🛠️ Herramientas de Testing

### Gratuitas

#### 1. Mailtrap
**URL:** https://mailtrap.io/
**Uso:** Testing en desarrollo
```bash
# Configurar SMTP en tu app
Host: smtp.mailtrap.io
Port: 2525
Username: [tu-username]
Password: [tu-password]
```

#### 2. Putsmail
**URL:** https://putsmail.com/
**Uso:** Enviar emails de prueba rápidamente
- Pega tu HTML
- Ingresa tu email
- Envía y revisa

#### 3. Can I Email
**URL:** https://www.caniemail.com/
**Uso:** Verificar compatibilidad CSS
- Busca la propiedad CSS
- Ve qué clientes la soportan

### De Pago (Recomendadas)

#### 1. Litmus
**URL:** https://litmus.com/
**Precio:** Desde $99/mes (7 días gratis)
**Características:**
- Testing en 90+ clientes
- Screenshots automáticos
- Análisis de spam
- Validación de links

#### 2. Email on Acid
**URL:** https://www.emailonacid.com/
**Precio:** Desde $99/mes (trial disponible)
**Características:**
- Testing en 70+ clientes
- Validación de accesibilidad
- Análisis de rendimiento

---

## 📱 Testing Manual Rápido

### Método 1: Envío Directo
1. Compila la plantilla
2. Copia el HTML de `dist/`
3. Envía desde Sendy a tu email
4. Revisa en diferentes dispositivos

### Método 2: Putsmail
1. Ve a https://putsmail.com/
2. Pega el HTML compilado
3. Ingresa tu email
4. Envía y revisa

### Método 3: Mailtrap
1. Configura Mailtrap en tu app
2. Envía el email
3. Revisa en el inbox de Mailtrap
4. Usa las herramientas de análisis

---

## 🎯 Testing por Tipo de Email

### Transaccional
- [ ] Información del pedido correcta
- [ ] Links de descarga funcionan
- [ ] Datos de contacto visibles
- [ ] Número de orden legible

### Promocional
- [ ] Oferta destacada claramente
- [ ] Fecha de expiración visible
- [ ] CTAs prominentes
- [ ] Precios legibles

### Seguimiento
- [ ] Nombre personalizado
- [ ] Links de feedback funcionan
- [ ] Servicios relacionados relevantes
- [ ] Fácil de responder

---

## 🚨 Problemas Comunes y Soluciones

### Problema: Imágenes no se cargan en Gmail

**Causa:** URLs relativas o bloqueadas

**Solución:**
```xml
<!-- ❌ Incorrecto -->
<mj-image src="/images/logo.png" />

<!-- ✅ Correcto -->
<mj-image src="https://todoconta.com/images/logo.png" />
```

---

### Problema: Layout roto en Outlook

**Causa:** CSS no soportado

**Solución:**
- MJML ya maneja esto automáticamente
- Evita CSS avanzado (flexbox, grid)
- Usa componentes MJML nativos

---

### Problema: Botones no clickeables en móvil

**Causa:** Tamaño muy pequeño

**Solución:**
```xml
<mj-button 
  inner-padding="14px 40px"  <!-- Mínimo 44px altura -->
  font-size="16px"
>
  Click aquí
</mj-button>
```

---

### Problema: Texto muy pequeño en móvil

**Causa:** Font-size fijo muy pequeño

**Solución:**
```xml
<!-- Mínimo 14px para texto normal -->
<mj-text font-size="16px">
  Tu texto aquí
</mj-text>
```

---

## 📊 Métricas a Monitorear

### En Sendy
- [ ] Tasa de apertura (>20% es bueno)
- [ ] Tasa de clicks (>2% es bueno)
- [ ] Tasa de desuscripción (<0.5% es bueno)
- [ ] Bounces (<2% es bueno)

### En Analytics (si aplica)
- [ ] Conversiones desde email
- [ ] Tiempo en página
- [ ] Páginas visitadas
- [ ] Objetivos completados

---

## ✅ Checklist Final Pre-Envío

### Contenido
- [ ] Asunto atractivo y claro
- [ ] Preview text optimizado
- [ ] Sin errores ortográficos
- [ ] Llamados a la acción claros
- [ ] Información de contacto correcta

### Técnico
- [ ] HTML compilado y minificado
- [ ] Todas las imágenes cargadas
- [ ] Todos los links probados
- [ ] Variables reemplazadas
- [ ] Link de desuscripción presente

### Legal
- [ ] Dirección física incluida
- [ ] Link de desuscripción funcional
- [ ] Política de privacidad enlazada
- [ ] Cumple con CAN-SPAM / GDPR

### Testing
- [ ] Probado en Gmail
- [ ] Probado en Outlook
- [ ] Probado en móvil
- [ ] Enviado email de prueba
- [ ] Revisado por otra persona

---

## 📝 Template de Reporte de Testing

```markdown
# Reporte de Testing - [Nombre del Email]

**Fecha:** [DD/MM/YYYY]
**Tester:** [Nombre]
**Plantilla:** [Nombre del archivo]

## Clientes Probados
- [ ] Gmail Desktop - ✅ OK / ❌ Issues
- [ ] Gmail Mobile - ✅ OK / ❌ Issues
- [ ] Outlook 2019 - ✅ OK / ❌ Issues
- [ ] Apple Mail iOS - ✅ OK / ❌ Issues

## Issues Encontrados
1. [Descripción del issue]
   - Severidad: Alta/Media/Baja
   - Cliente afectado: [Cliente]
   - Solución propuesta: [Solución]

## Aprobación
- [ ] Aprobado para envío
- [ ] Requiere cambios

**Notas adicionales:**
[Comentarios]
```

---

## 🎓 Recursos Adicionales

### Documentación
- [MJML Testing Guide](https://documentation.mjml.io/#testing)
- [Email Client Market Share](https://www.litmus.com/email-client-market-share/)
- [Email Accessibility](https://www.emailonacid.com/blog/article/email-development/email-accessibilty-in-2021/)

### Herramientas
- [HTML Email Check](https://www.htmlemailcheck.com/)
- [Mail Tester](https://www.mail-tester.com/)
- [Spam Assassin](https://spamassassin.apache.org/)

---

## 📞 Soporte

Si encuentras problemas durante el testing:

- 📧 soporte@todoconta.com
- 📱 +52 55 4475 3602
- 🌐 https://todoconta.com

---

**¡Testing completo = Emails exitosos! 🎯**