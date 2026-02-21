/**
 * Shared CLI utilities for MJML Email Studio scripts
 */

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const ROOT_DIR = path.join(__dirname, '../..');

/**
 * Parse --name=value argument from process.argv
 */
function getArg(name, argv = process.argv.slice(2)) {
  const arg = argv.find((a) => a.startsWith(`--${name}=`));
  return arg ? arg.split('=').slice(1).join('=') : null;
}

/**
 * Check if a boolean --flag is present
 */
function hasFlag(name, argv = process.argv.slice(2)) {
  return argv.includes(`--${name}`);
}

/**
 * Load and validate a project's config/project.json
 */
function loadProjectConfig(projectName) {
  const configPath = path.join(ROOT_DIR, 'projects', projectName, 'config', 'project.json');

  if (!fs.existsSync(configPath)) {
    console.error(`❌ Project config not found: ${projectName}`);
    process.exit(1);
  }

  try {
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } catch (error) {
    console.error(`❌ Invalid project config for ${projectName}: ${error.message}`);
    process.exit(1);
  }
}

/**
 * Load a compiled HTML template from dist/
 */
function loadHtmlTemplate(projectName, templateName) {
  const htmlPath = path.join(ROOT_DIR, 'dist', projectName, `${templateName}.html`);

  if (!fs.existsSync(htmlPath)) {
    console.error(`❌ Compiled template not found: ${htmlPath}`);
    console.error('   Run "npm run build" first to compile MJML templates.');
    process.exit(1);
  }

  return fs.readFileSync(htmlPath, 'utf8');
}

/**
 * Resolve a CSV data path (relative to project or absolute)
 */
function resolveDataPath(csvPath, projectName) {
  const fullPath = path.isAbsolute(csvPath)
    ? csvPath
    : path.join(ROOT_DIR, 'projects', projectName, csvPath);

  if (!fs.existsSync(fullPath)) {
    console.error(`❌ CSV file not found: ${fullPath}`);
    process.exit(1);
  }

  return fullPath;
}

/**
 * Read a CSV file and return an array of row objects
 */
function readCsv(filePath) {
  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => rows.push(row))
      .on('end', () => resolve(rows))
      .on('error', reject);
  });
}

/**
 * Capitalize a name: "MARÍA ISABEL" → "María Isabel"
 * Handles accented characters correctly
 */
function capitalizeName(name) {
  if (!name || !name.trim()) return '';
  return name
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Escape HTML special characters to prevent injection
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Replace {{key}} placeholders in HTML with escaped values from data object
 */
function renderTemplate(html, data) {
  return html.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] !== undefined ? escapeHtml(data[key]) : match;
  });
}

/**
 * Validate email format (basic check)
 */
function isValidEmail(email) {
  return typeof email === 'string' && /^.+@.+\..+$/.test(email.trim());
}

module.exports = {
  ROOT_DIR,
  getArg,
  hasFlag,
  loadProjectConfig,
  loadHtmlTemplate,
  resolveDataPath,
  readCsv,
  capitalizeName,
  escapeHtml,
  renderTemplate,
  isValidEmail,
};
