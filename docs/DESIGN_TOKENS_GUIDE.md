# 🎨 Design Tokens Guide

Design tokens are the visual design atoms of your email templates - colors, typography, spacing, etc. They ensure consistency across all your email communications.

## What are Design Tokens?

Design tokens are named entities that store visual design attributes. Instead of hardcoding `#3B82F6` throughout your templates, you define it once as `primary` and reference it everywhere.

**Benefits:**
- ✅ **Consistency** - All emails use the same colors, fonts, spacing
- ✅ **Maintainability** - Change once, update everywhere
- ✅ **Scalability** - Easy to create new templates with existing design system
- ✅ **Brand alignment** - Ensures emails match your brand guidelines

---

## Structure

The `design-tokens.json` file lives in each project's `config/` directory:

```
projects/
└── your-project/
    └── config/
        ├── project.json
        └── design-tokens.json  ← Your design system
```

---

## Complete Token Reference

### Colors

```json
{
  "colors": {
    // Primary brand color
    "primary": "#3B82F6",
    "primaryHover": "#2563EB",
    "primaryLight": "rgba(59, 130, 246, 0.08)",
    
    // Background colors
    "background": "#f6f7fb",
    "backgroundAlt": "#f0f4f3",
    
    // Text colors
    "textPrimary": "#1f2937",
    "textSecondary": "#6b7280",
    "white": "#ffffff",
    
    // Semantic colors
    "success": "#10b981",
    "warning": "#f59e0b",
    "error": "#ef4444",
    "info": "#3b82f6",
    
    // Borders
    "border": "rgba(107, 114, 128, 0.15)",
    "borderLight": "rgba(107, 114, 128, 0.08)"
  }
}
```

**Usage in MJML:**
```xml
<mj-button background-color="#3B82F6">Click me</mj-button>
<mj-text color="#1f2937">Your text here</mj-text>
```

### Typography

```json
{
  "fonts": {
    "primary": "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    "secondary": "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    "mono": "'SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace"
  },
  "fontSizes": {
    "xs": "12px",
    "sm": "14px",
    "base": "16px",
    "lg": "18px",
    "xl": "20px",
    "2xl": "24px",
    "3xl": "30px",
    "4xl": "36px",
    "5xl": "48px"
  },
  "fontWeights": {
    "normal": "400",
    "medium": "500",
    "semibold": "600",
    "bold": "700",
    "extrabold": "800"
  }
}
```

**Usage:**
```xml
<mj-text font-family="'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
         font-size="16px"
         font-weight="600">
  Heading text
</mj-text>
```

### Spacing

```json
{
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px",
    "2xl": "48px",
    "3xl": "64px"
  }
}
```

**Usage:**
```xml
<mj-section padding="24px 16px">
  <mj-text padding="8px 0">Content</mj-text>
</mj-section>
```

### Border Radius

```json
{
  "borderRadius": {
    "sm": "4px",
    "md": "6px",
    "lg": "8px",
    "xl": "12px",
    "2xl": "24px",
    "full": "9999px"
  }
}
```

**Usage:**
```xml
<mj-button border-radius="8px">Rounded button</mj-button>
```

### Shadows (Optional)

```json
{
  "shadows": {
    "sm": "0 1px 2px rgba(0, 0, 0, 0.04)",
    "md": "0 4px 8px rgba(0, 0, 0, 0.06)",
    "lg": "0 8px 16px rgba(0, 0, 0, 0.08)"
  }
}
```

---

## Creating From Your Design System

### Step 1: Extract Your Brand Colors

If you have an existing design system or brand guidelines:

```json
{
  "colors": {
    "primary": "#YOUR_PRIMARY_COLOR",
    "primaryHover": "#DARKER_VERSION",
    "primaryLight": "rgba(R, G, B, 0.08)",
    "background": "#YOUR_BG_COLOR",
    "textPrimary": "#YOUR_TEXT_COLOR"
  }
}
```

**Tips:**
- `primaryHover` should be 10-15% darker than `primary`
- `primaryLight` is your primary color at 8% opacity
- Use your website/app colors directly

### Step 2: Define Typography

Use the same fonts as your website:

```json
{
  "fonts": {
    "primary": "'YourFont', -apple-system, BlinkMacSystemFont, sans-serif"
  },
  "fontSizes": {
    "sm": "14px",
    "base": "16px",
    "lg": "18px",
    "xl": "20px",
    "2xl": "24px"
  }
}
```

**Important:** Always include fallback fonts for email compatibility.

### Step 3: Match Spacing System

If your design system uses 8px spacing units:

```json
{
  "spacing": {
    "xs": "4px",   // 0.5 unit
    "sm": "8px",   // 1 unit
    "md": "16px",  // 2 units
    "lg": "24px",  // 3 units
    "xl": "32px"   // 4 units
  }
}
```

---

## Common Design System Examples

### Tailwind CSS-inspired

```json
{
  "colors": {
    "primary": "#3b82f6",
    "primaryHover": "#2563eb",
    "background": "#f9fafb",
    "textPrimary": "#111827",
    "textSecondary": "#6b7280"
  },
  "spacing": {
    "1": "4px",
    "2": "8px",
    "4": "16px",
    "6": "24px",
    "8": "32px"
  }
}
```

### Material Design-inspired

```json
{
  "colors": {
    "primary": "#1976d2",
    "primaryHover": "#1565c0",
    "background": "#fafafa",
    "textPrimary": "#212121",
    "textSecondary": "#757575"
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px"
  }
}
```

### Corporate/Professional

```json
{
  "colors": {
    "primary": "#0066cc",
    "primaryHover": "#0052a3",
    "background": "#ffffff",
    "textPrimary": "#1a1a1a",
    "textSecondary": "#666666"
  },
  "fonts": {
    "primary": "'Arial', 'Helvetica', sans-serif"
  }
}
```

---

## Color Conversion Tools

### Hex to RGBA

To create light versions of your colors:

```javascript
// Example: #3B82F6 to rgba(59, 130, 246, 0.08)
const hex = '#3B82F6';
const r = parseInt(hex.slice(1, 3), 16); // 59
const g = parseInt(hex.slice(3, 5), 16); // 130
const b = parseInt(hex.slice(5, 7), 16); // 246

const rgba = `rgba(${r}, ${g}, ${b}, 0.08)`;
```

**Online tools:**
- https://hextoRGBA.com
- https://colorhexa.com

### Creating Hover Colors

Darken by 10-15%:
- Original: `#3B82F6`
- Hover: `#2563EB` (darker)

**Online tools:**
- https://pinetools.com/darken-color
- https://www.sessions.edu/color-calculator/

---

## Best Practices

### 1. Start Simple

Don't over-complicate. Start with:
- Primary color + hover state
- 2-3 text colors (heading, body, muted)
- Basic spacing scale
- One font family

### 2. Test in Email Clients

Not all CSS properties work in emails:
- ✅ Colors work everywhere
- ✅ Font sizes work everywhere
- ⚠️ Custom fonts may not load in all clients
- ⚠️ Complex shadows don't work in Outlook

### 3. Use Semantic Naming

Good:
```json
{
  "colors": {
    "primary": "#3B82F6",
    "success": "#10b981",
    "textPrimary": "#1f2937"
  }
}
```

Avoid:
```json
{
  "colors": {
    "blue": "#3B82F6",
    "green": "#10b981",
    "darkGray": "#1f2937"
  }
}
```

### 4. Maintain Accessibility

Ensure sufficient contrast:
- Body text: 4.5:1 minimum contrast ratio
- Large text (18px+): 3:1 minimum
- Use tools like https://webaim.org/resources/contrastchecker/

### 5. Document Custom Tokens

Add comments in your JSON:

```json
{
  "colors": {
    "primary": "#3B82F6",
    "_comment": "Primary blue from company brand guidelines v2.0"
  }
}
```

---

## Example: Converting from Brand Guidelines

**Given brand guidelines:**
- Primary Color: #FF6B35 (Orange)
- Secondary Color: #004E89 (Navy)
- Background: #F7F7FF (Light Blue)
- Heading Font: Montserrat
- Body Font: Open Sans

**Resulting `design-tokens.json`:**

```json
{
  "colors": {
    "primary": "#FF6B35",
    "primaryHover": "#E55A2B",
    "primaryLight": "rgba(255, 107, 53, 0.08)",
    "secondary": "#004E89",
    "secondaryHover": "#003D6B",
    "background": "#F7F7FF",
    "backgroundAlt": "#EBEBF5",
    "textPrimary": "#1a1a1a",
    "textSecondary": "#666666",
    "white": "#ffffff"
  },
  "fonts": {
    "heading": "'Montserrat', 'Arial', sans-serif",
    "body": "'Open Sans', 'Helvetica', sans-serif"
  },
  "fontSizes": {
    "sm": "14px",
    "base": "16px",
    "lg": "18px",
    "xl": "22px",
    "2xl": "28px",
    "3xl": "36px"
  },
  "spacing": {
    "sm": "8px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px"
  },
  "borderRadius": {
    "md": "6px",
    "lg": "10px"
  }
}
```

---

## Updating Existing Templates

When you change your design tokens, rebuild all templates:

```bash
# Rebuild specific project
npm run build -- --project=your-project

# Or rebuild all projects
npm run build:all
```

All templates will automatically use the new values.

---

## Advanced: Dynamic Tokens

While MJML doesn't support variable interpolation directly, you can create a build-time preprocessor to inject tokens. This is advanced and not covered in this guide.

**Workaround:** Create component templates with your commonly-used token values:

```xml
<!-- components/button-primary.mjml -->
<mj-button background-color="#3B82F6" 
           color="#ffffff" 
           border-radius="8px"
           font-weight="600">
</mj-button>
```

Then use:
```xml
<mj-include path="../components/button-primary.mjml" />
```

---

## Resources

- [Color Palette Generator](https://coolors.co/)
- [Type Scale Calculator](https://type-scale.com/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Design Systems Repo](https://designsystemsrepo.com/)

---

**Next:** [Creating Projects Guide](./CREATING_PROJECTS.md) to put your design tokens to use!
