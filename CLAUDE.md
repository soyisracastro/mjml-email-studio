# CLAUDE.md — MJML Email Studio

## What is this project?

Multi-project MJML email template studio. Compiles `.mjml` templates to HTML and sends them via AWS SES. Currently used for **Todoconta** (blog de información contable y fiscal en México, by Israel Castro).

## Project structure

```
projects/{project-name}/
  config/project.json        # AWS SES config, sender info, branding
  config/design-tokens.json  # Colors, fonts, spacing (not yet used in build)
  components/                # Reusable MJML partials (header.mjml, footer.mjml)
  templates/                 # MJML source files organized by category
    apps/                    # Transactional app emails (signup, magic-link, etc.)
    newsletter/              # Newsletter campaigns
    promotional/             # Sales and offers
    transactional/           # Purchase confirmations, workshop invites
    follow-up/               # Post-service feedback
  data/                      # CSV files for bulk sends (gitignored)

shared/
  scripts/
    build.js                 # MJML → HTML compiler (npm run build)
    send-raw-email.js        # Send HTML emails via SES (npm run send:email)
    send-bulk-templated.js   # Send SES-templated emails in bulk
    prepare-ses-template.js  # Generate SES template config JSON
  utils/
    cli-helpers.js           # Shared functions: getArg, loadProjectConfig, readCsv, etc.
    generate-project.js      # Interactive new project scaffolder

dist/{project-name}/         # Compiled HTML output (gitignored)
```

## Key commands

```bash
# Build templates
npm run build -- --project=todoconta

# Send single test email
npm run send:email -- --project=todoconta --template=apps/diot-2026-upgrade --subject="Subject" --test=email@example.com

# Bulk send from CSV
npm run send:email -- --project=todoconta --template=apps/diot-2026-upgrade --subject="Subject" --data=data/file.csv

# Dry run (preview without sending)
npm run send:email -- ... --dry-run

# Generate a new project
npm run new:project
```

## Important conventions

- **MJML includes**: Templates use `<mj-include path="./components/header.mjml" />`. Components in `components/` directories are excluded from build.
- **Template variables**: Use `{{key}}` placeholders (e.g., `{{nombre}}`). Replaced at send time, not build time.
- **CSV columns**: Bulk send expects `email` column (case-insensitive). Name from `nombre`/`name` column gets auto-capitalized (handles Spanish accents: MARÍA → María).
- **AWS credentials**: Loaded from `.env` via dotenv. Required: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`.
- **Language**: Email content and CLI output are in Spanish. Code comments and variable names are in English.

## Tech stack

- **MJML 4.x** (devDependency) for email template compilation
- **AWS SDK v2** for SES email sending (maintained, not yet migrated to v3)
- **csv-parser** for reading recipient CSV files
- **dotenv** for environment variables
- **Node.js** (no framework, plain CLI scripts)

## Things to watch out for

- `design-tokens.json` exists per project but is **not integrated** into the build pipeline yet — colors/fonts are hardcoded in templates.
- Some older templates reference `../components/` paths that don't resolve (shows warnings during build but still compiles).
- The `dist/` directory must exist before sending — always run `npm run build` first.
- SES rate limit: scripts add 100ms delay between bulk sends. Throttling errors get 1 retry with 1s backoff.
- `.env`, `.env.local`, and `**/data/` are gitignored — never commit credentials or customer CSVs.
