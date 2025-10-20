# 🚀 Creating New Projects

This guide will help you create a new email project in MJML Email Studio.

## Quick Start

The easiest way to create a new project is using the project generator:

```bash
npm run new:project
```

This interactive wizard will guide you through the process of creating a new project with all the necessary files and structure.

---

## Manual Creation

If you prefer to create a project manually, follow these steps:

### 1. Create Project Structure

```bash
mkdir -p projects/your-project-name/{config,components,templates/{transactional,promotional,newsletter},data,docs}
```

### 2. Create `config/project.json`

This file contains all the metadata and configuration for your project:

```json
{
  "name": "your-project-name",
  "displayName": "Your Project Display Name",
  "description": "Brief description of your project",
  "author": "Your Name",
  "sender": {
    "name": "Your Name - Your Project",
    "email": "hello@yourproject.com",
    "replyTo": "hello@yourproject.com"
  },
  "aws": {
    "region": "us-east-1",
    "templatePrefix": "your-project-",
    "sourceEmail": "hello@yourproject.com"
  },
  "website": "https://yourproject.com",
  "social": {
    "facebook": "yourproject",
    "twitter": "yourproject",
    "linkedin": "company/yourproject",
    "instagram": "yourproject"
  },
  "contact": {
    "email": "hello@yourproject.com",
    "phone": "+1 234 567 8900",
    "whatsapp": "1234567890"
  },
  "branding": {
    "logo": "https://yourproject.com/logo.png",
    "logoWidth": "50px"
  },
  "legal": {
    "privacyPolicy": "https://yourproject.com/privacy",
    "termsAndConditions": "https://yourproject.com/terms"
  }
}
```

### 3. Create `config/design-tokens.json`

See [Design Tokens Guide](./DESIGN_TOKENS_GUIDE.md) for detailed information on creating your design system.

Basic structure:

```json
{
  "colors": {
    "primary": "#3B82F6",
    "primaryHover": "#2563EB",
    "primaryLight": "rgba(59, 130, 246, 0.08)",
    "background": "#f6f7fb",
    "textPrimary": "#1f2937",
    "textSecondary": "#6b7280",
    "white": "#ffffff"
  },
  "fonts": {
    "primary": "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
  },
  "fontSizes": {
    "sm": "14px",
    "base": "16px",
    "lg": "18px",
    "xl": "20px",
    "2xl": "24px"
  },
  "spacing": {
    "sm": "8px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px"
  }
}
```

### 4. Create Components

Create at minimum `header.mjml` and `footer.mjml` in the `components/` directory.

**Example `components/header.mjml`:**

```xml
<mj-section background-color="#ffffff" padding="20px 0">
  <mj-column>
    <mj-image 
      src="https://yourproject.com/logo.png" 
      alt="Your Project" 
      width="50px"
      align="center"
    />
  </mj-column>
</mj-section>

<mj-section background-color="#3B82F6" padding="0">
  <mj-column>
    <mj-divider border-width="2px" border-color="#3B82F6" />
  </mj-column>
</mj-section>
```

**Example `components/footer.mjml`:**

```xml
<mj-section background-color="#1f2937" padding="40px 20px">
  <mj-column>
    <mj-text align="center" color="#ffffff" font-size="20px" font-weight="700">
      Your Project
    </mj-text>
    <mj-text align="center" color="#9ca3af" font-size="14px">
      Brief description
    </mj-text>
    <mj-text align="center" color="#9ca3af" font-size="14px">
      📧 <a href="mailto:hello@yourproject.com" style="color: #3B82F6;">hello@yourproject.com</a>
    </mj-text>
    <mj-text align="center" color="#6b7280" font-size="12px">
      © 2025 Your Project. All rights reserved.
    </mj-text>
  </mj-column>
</mj-section>
```

### 5. Create Your First Template

Create a template in `templates/transactional/welcome.mjml`:

```xml
<mjml>
  <mj-head>
    <mj-title>Welcome Email</mj-title>
    <mj-preview>Welcome to our platform</mj-preview>
  </mj-head>
  
  <mj-body background-color="#f6f7fb">
    <mj-include path="../components/header.mjml" />
    
    <mj-section background-color="#ffffff" padding="40px 20px">
      <mj-column>
        <mj-text font-size="24px" font-weight="700" align="center">
          Welcome!
        </mj-text>
        <mj-text>
          Hello {{name}},
        </mj-text>
        <mj-text>
          Thank you for joining us.
        </mj-text>
        <mj-button background-color="#3B82F6" href="https://yourproject.com">
          Get Started
        </mj-button>
      </mj-column>
    </mj-section>
    
    <mj-include path="../components/footer.mjml" />
  </mj-body>
</mjml>
```

---

## Building Your Project

Once your project is set up:

```bash
# Build specific project
npm run build -- --project=your-project-name

# Build all projects
npm run build:all
```

Output will be in `dist/your-project-name/`

---

## Testing Your Templates

1. **Local Preview:** Open the compiled HTML files in `dist/` in your browser
2. **Send Test Email:** Use the AWS SES script to send test emails
3. **Email Clients:** Test in multiple email clients (Gmail, Outlook, Apple Mail, etc.)

---

## AWS SES Integration

### 1. Prepare SES Template

```bash
node shared/scripts/prepare-ses-template.js \
  --project=your-project-name \
  --template=transactional/welcome \
  --name=welcome-email-v1 \
  --subject="Welcome to {{displayName}}"
```

### 2. Upload to AWS

```bash
aws ses create-template --cli-input-json file://projects/your-project-name/docs/ses-welcome.json
```

### 3. Send Bulk Emails

```bash
node shared/scripts/send-bulk-templated.js \
  --project=your-project-name \
  --template=welcome-email-v1 \
  --data=data/recipients.csv
```

---

## Best Practices

### Project Naming
- Use lowercase letters, numbers, and hyphens only
- Be descriptive: `acme-corp-emails` not `emails`
- Keep it short but meaningful

### Design Tokens
- Start with your brand's design system
- Use consistent naming conventions
- Document any custom tokens

### Components
- Create reusable components for common elements
- Keep components focused and single-purpose
- Use descriptive file names

### Templates
- Organize by type: transactional, promotional, newsletter
- Use semantic naming: `welcome.mjml`, `password-reset.mjml`
- Include preview text in all templates

### Testing
- Test in at least 3-4 major email clients
- Check mobile responsiveness
- Verify all links and images load correctly
- Test with real data/placeholders

---

## Troubleshooting

### Build Errors
```bash
# Check project structure
ls -la projects/your-project-name

# Verify config files exist
cat projects/your-project-name/config/project.json
```

### MJML Validation
- Use `validationLevel: 'soft'` for flexibility
- Check MJML documentation for component requirements
- Ensure all paths to includes are correct

### AWS SES Issues
- Verify SES is configured in the correct region
- Check email address is verified in SES
- Ensure IAM permissions are correct

---

## Next Steps

- [Design Tokens Guide](./DESIGN_TOKENS_GUIDE.md) - Learn about customizing your design system
- [Quick Start](./QUICK_START.md) - Quick reference for common tasks
- [MJML Documentation](https://documentation.mjml.io/) - Official MJML docs

---

**Need Help?** Check the main [README.md](../README.md) or review existing projects in `projects/` for examples.
