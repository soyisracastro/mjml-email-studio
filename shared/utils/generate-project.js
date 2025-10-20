#!/usr/bin/env node

/**
 * Generate a new email project
 * 
 * Usage:
 *   node shared/utils/generate-project.js --name=despacho-contable
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ROOT_DIR = path.join(__dirname, '../..');
const PROJECTS_DIR = path.join(ROOT_DIR, 'projects');

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function generateProject() {
  console.log('🚀 MJML Email Studio - Project Generator\n');
  console.log('='.repeat(50));
  console.log('Let\'s create a new email project!\n');

  // Get project details
  const projectName = await question('Project name (e.g., despacho-contable): ');
  
  if (!projectName || !/^[a-z0-9-]+$/.test(projectName)) {
    console.error('❌ Invalid project name. Use lowercase letters, numbers, and hyphens only.');
    rl.close();
    process.exit(1);
  }

  const projectPath = path.join(PROJECTS_DIR, projectName);
  
  if (fs.existsSync(projectPath)) {
    console.error(`❌ Project "${projectName}" already exists`);
    rl.close();
    process.exit(1);
  }

  const displayName = await question('Display name (e.g., Despacho Contable): ');
  const description = await question('Description: ');
  const author = await question('Author name: ');
  const senderEmail = await question('Sender email: ');
  const website = await question('Website URL: ');
  const primaryColor = await question('Primary color (hex, e.g., #14b8a6): ');

  console.log('\n' + '='.repeat(50));
  console.log('\nCreating project structure...\n');

  // Create directories
  const dirs = [
    'config',
    'components',
    'templates/transactional',
    'templates/promotional',
    'templates/newsletter',
    'data',
    'docs'
  ];

  dirs.forEach(dir => {
    const dirPath = path.join(projectPath, dir);
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`  ✅ Created: ${dir}/`);
  });

  // Create project.json
  const projectConfig = {
    name: projectName,
    displayName: displayName,
    description: description,
    author: author,
    sender: {
      name: `${author} - ${displayName}`,
      email: senderEmail,
      replyTo: senderEmail
    },
    aws: {
      region: 'us-east-1',
      templatePrefix: `${projectName}-`,
      sourceEmail: senderEmail
    },
    website: website,
    social: {
      facebook: '',
      twitter: '',
      linkedin: '',
      instagram: ''
    },
    contact: {
      email: senderEmail,
      phone: '',
      whatsapp: ''
    },
    branding: {
      logo: '',
      logoWidth: '50px'
    },
    legal: {
      privacyPolicy: `${website}/privacidad`,
      termsAndConditions: `${website}/terminos`
    }
  };

  fs.writeFileSync(
    path.join(projectPath, 'config', 'project.json'),
    JSON.stringify(projectConfig, null, 2)
  );
  console.log('  ✅ Created: config/project.json');

  // Create design-tokens.json
  const designTokens = {
    colors: {
      primary: primaryColor,
      primaryHover: adjustColor(primaryColor, -10),
      primaryLight: hexToRgba(primaryColor, 0.08),
      background: '#f6f7fb',
      backgroundAlt: '#f0f4f3',
      textPrimary: '#1f2937',
      textSecondary: '#6b7280',
      white: '#ffffff',
      border: 'rgba(107, 114, 128, 0.15)',
      borderLight: 'rgba(107, 114, 128, 0.08)'
    },
    fonts: {
      primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      secondary: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    },
    fontSizes: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px'
    },
    fontWeights: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700'
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      '2xl': '48px'
    },
    borderRadius: {
      sm: '4px',
      md: '6px',
      lg: '8px',
      xl: '12px'
    }
  };

  fs.writeFileSync(
    path.join(projectPath, 'config', 'design-tokens.json'),
    JSON.stringify(designTokens, null, 2)
  );
  console.log('  ✅ Created: config/design-tokens.json');

  // Create sample header component
  const headerComponent = `<mj-section background-color="#ffffff" padding="20px 0">
  <mj-column>
    <mj-image 
      src="YOUR_LOGO_URL_HERE" 
      alt="${displayName}" 
      width="50px"
      align="center"
      padding="0"
    />
  </mj-column>
</mj-section>

<mj-section background-color="${primaryColor}" padding="0">
  <mj-column>
    <mj-divider border-width="2px" border-color="${primaryColor}" padding="0" />
  </mj-column>
</mj-section>`;

  fs.writeFileSync(
    path.join(projectPath, 'components', 'header.mjml'),
    headerComponent
  );
  console.log('  ✅ Created: components/header.mjml');

  // Create sample footer component
  const footerComponent = `<mj-section background-color="#1f2937" padding="40px 20px">
  <mj-column>
    <mj-text align="center" color="#ffffff" font-size="20px" font-weight="700">
      ${displayName}
    </mj-text>
    <mj-text align="center" color="#9ca3af" font-size="14px">
      ${description}
    </mj-text>
    <mj-text align="center" color="#9ca3af" font-size="14px">
      📧 <a href="mailto:${senderEmail}" style="color: ${primaryColor};">${senderEmail}</a>
    </mj-text>
    <mj-text align="center" color="#9ca3af" font-size="14px">
      🌐 <a href="${website}" style="color: ${primaryColor};">${website}</a>
    </mj-text>
    <mj-text align="center" color="#6b7280" font-size="12px">
      © 2025 ${displayName}. Todos los derechos reservados.
    </mj-text>
  </mj-column>
</mj-section>`;

  fs.writeFileSync(
    path.join(projectPath, 'components', 'footer.mjml'),
    footerComponent
  );
  console.log('  ✅ Created: components/footer.mjml');

  // Create sample template
  const sampleTemplate = `<mjml>
  <mj-head>
    <mj-title>Welcome Email - ${displayName}</mj-title>
    <mj-preview>Welcome to ${displayName}</mj-preview>
    <mj-attributes>
      <mj-all font-family="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" />
      <mj-text font-size="16px" color="#1f2937" line-height="170%" />
      <mj-section background-color="#ffffff" padding="20px" />
    </mj-attributes>
  </mj-head>
  
  <mj-body background-color="#f6f7fb">
    <!-- Header -->
    <mj-include path="../components/header.mjml" />
    
    <!-- Content -->
    <mj-section background-color="#ffffff" padding="40px 20px">
      <mj-column>
        <mj-text font-size="24px" font-weight="700" align="center">
          ¡Bienvenido a ${displayName}!
        </mj-text>
        <mj-text>
          Hola {{name}},
        </mj-text>
        <mj-text>
          Gracias por unirte a ${displayName}. Estamos emocionados de tenerte con nosotros.
        </mj-text>
        <mj-button background-color="${primaryColor}" href="${website}">
          Comenzar
        </mj-button>
      </mj-column>
    </mj-section>
    
    <!-- Footer -->
    <mj-include path="../components/footer.mjml" />
  </mj-body>
</mjml>`;

  fs.writeFileSync(
    path.join(projectPath, 'templates', 'transactional', 'welcome.mjml'),
    sampleTemplate
  );
  console.log('  ✅ Created: templates/transactional/welcome.mjml');

  // Create README
  const readme = `# ${displayName} - Email Templates

Email templates for ${displayName} built with MJML.

## Build Templates

\`\`\`bash
npm run build -- --project=${projectName}
\`\`\`

## Project Info

- **Author:** ${author}
- **Website:** ${website}
- **Primary Color:** ${primaryColor}

## Templates

- \`transactional/welcome.mjml\` - Welcome email template

## Next Steps

1. Update logo URL in \`components/header.mjml\`
2. Customize colors in \`config/design-tokens.json\`
3. Add your email templates in \`templates/\`
4. Build and test your templates

For more information, see the main documentation in \`/docs/\`.
`;

  fs.writeFileSync(
    path.join(projectPath, 'docs', 'README.md'),
    readme
  );
  console.log('  ✅ Created: docs/README.md');

  console.log('\n' + '='.repeat(50));
  console.log('\n✅ Project created successfully!\n');
  console.log('📁 Location: projects/' + projectName);
  console.log('\n🚀 Next steps:');
  console.log(`   1. Update logo URL in components/header.mjml`);
  console.log(`   2. Customize design tokens in config/design-tokens.json`);
  console.log(`   3. Build templates: npm run build -- --project=${projectName}`);
  console.log(`   4. View output in: dist/${projectName}/\n`);

  rl.close();
}

// Utility functions
function adjustColor(hex, percent) {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255))
    .toString(16).slice(1).toUpperCase();
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Run generator
generateProject().catch(error => {
  console.error('❌ Error:', error.message);
  process.exit(1);
});
