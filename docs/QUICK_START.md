# ⚡ Quick Start Guide

Fast reference for common tasks in MJML Email Studio.

## Installation

```bash
cd mjml-email-studio
npm install
```

---

## Creating a New Project

```bash
npm run new:project
```

Follow the prompts to create your project structure.

---

## Building Templates

```bash
# Build specific project
npm run build -- --project=todoconta

# Build all projects
npm run build:all

# Watch mode (rebuild on changes)
npm run build:watch -- --project=todoconta
```

Output: `dist/{project-name}/`

---

## Common Tasks

### 1. Add a New Email Template

```bash
# Create file
touch projects/your-project/templates/transactional/welcome.mjml

# Edit with your favorite editor
code projects/your-project/templates/transactional/welcome.mjml

# Build
npm run build -- --project=your-project
```

### 2. Change Brand Colors

```bash
# Edit design tokens
code projects/your-project/config/design-tokens.json

# Rebuild to apply changes
npm run build -- --project=your-project
```

### 3. Update Logo

Edit `projects/your-project/components/header.mjml`:

```xml
<mj-image 
  src="https://your-cdn.com/new-logo.png" 
  alt="Your Brand" 
  width="50px"
/>
```

Then rebuild.

### 4. Test Email Locally

```bash
# Build first
npm run build -- --project=your-project

# Open in browser
open dist/your-project/transactional/welcome.html
```

---

## AWS SES Workflow

### 1. Prepare Template for SES

```bash
node shared/scripts/prepare-ses-template.js \
  --project=your-project \
  --template=transactional/welcome \
  --name=welcome-v1 \
  --subject="Welcome to {{displayName}}"
```

### 2. Upload to AWS SES

```bash
aws ses create-template \
  --cli-input-json file://projects/your-project/docs/ses-welcome.json
```

### 3. Send Bulk Emails

```bash
node shared/scripts/send-bulk-templated.js \
  --project=your-project \
  --template=welcome-v1 \
  --data=data/recipients.csv
```

---

## Project Structure

```
mjml-email-studio/
├── projects/
│   ├── todoconta/              ← Example project
│   └── your-project/           ← Your projects here
│       ├── config/
│       │   ├── project.json
│       │   └── design-tokens.json
│       ├── components/
│       │   ├── header.mjml
│       │   └── footer.mjml
│       ├── templates/
│       │   ├── transactional/
│       │   ├── promotional/
│       │   └── newsletter/
│       ├── data/
│       └── docs/
├── shared/
│   ├── scripts/               ← Build & AWS tools
│   └── utils/                 ← Project generator
├── dist/                      ← Compiled output
└── docs/                      ← Documentation
```

---

## File Locations

| What | Where |
|------|-------|
| New project | `projects/{name}/` |
| Templates | `projects/{name}/templates/` |
| Components | `projects/{name}/components/` |
| Design system | `projects/{name}/config/design-tokens.json` |
| Project config | `projects/{name}/config/project.json` |
| Build output | `dist/{name}/` |
| Test data | `projects/{name}/data/` |

---

## Common Commands Reference

```bash
# Projects
npm run new:project                          # Create new project
npm run build -- --project={name}            # Build one project
npm run build:all                            # Build all projects

# AWS SES
node shared/scripts/prepare-ses-template.js  # Create SES config
node shared/scripts/send-bulk-templated.js   # Send bulk emails

# Package management
npm install                                  # Install dependencies
npm update                                   # Update dependencies
```

---

## Template Variables

Use mustache syntax for dynamic content:

```xml
<mj-text>Hello {{name}},</mj-text>
<mj-text>Your order #{{orderNumber}} is confirmed.</mj-text>
<mj-button href="{{ctaLink}}">Click Here</mj-button>
```

---

## Troubleshooting

### Build fails with "Project not found"
```bash
# Check project exists
ls projects/your-project

# Verify spelling
npm run build -- --project=your-project-name
```

### MJML validation errors
- Check all `<mj-include>` paths are correct
- Ensure all MJML tags are properly closed
- Verify component files exist

### Templates not updating
```bash
# Clear dist and rebuild
rm -rf dist
npm run build:all
```

### AWS SES errors
- Verify email is verified in SES console
- Check AWS credentials are configured
- Ensure correct region in `project.json`

---

## Next Steps

- 📖 [Creating Projects](./CREATING_PROJECTS.md) - Detailed project setup
- 🎨 [Design Tokens Guide](./DESIGN_TOKENS_GUIDE.md) - Customize your design system
- 📧 [MJML Documentation](https://documentation.mjml.io/) - Learn MJML components

---

**Need Help?** Check the main [README](../README.md) or review example projects.
