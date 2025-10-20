#!/usr/bin/env node

/**
 * Build script for MJML email templates
 * Supports multiple projects with individual configurations
 * 
 * Usage:
 *   npm run build -- --project=todoconta
 *   npm run build:all
 */

const fs = require('fs');
const path = require('path');
const mjml2html = require('mjml');

// Parse command line arguments
const args = process.argv.slice(2);
const projectArg = args.find(arg => arg.startsWith('--project='));
const specificProject = projectArg ? projectArg.split('=')[1] : null;

// Root directories
const ROOT_DIR = path.join(__dirname, '../..');
const PROJECTS_DIR = path.join(ROOT_DIR, 'projects');
const DIST_DIR = path.join(ROOT_DIR, 'dist');

/**
 * Get all available projects
 */
function getProjects() {
  if (!fs.existsSync(PROJECTS_DIR)) {
    console.error('❌ Projects directory not found');
    process.exit(1);
  }
  
  return fs.readdirSync(PROJECTS_DIR)
    .filter(name => {
      const projectPath = path.join(PROJECTS_DIR, name);
      return fs.statSync(projectPath).isDirectory();
    });
}

/**
 * Load project configuration
 */
function loadProjectConfig(projectName) {
  const configPath = path.join(PROJECTS_DIR, projectName, 'config', 'project.json');
  
  if (!fs.existsSync(configPath)) {
    console.warn(`⚠️  No project.json found for ${projectName}`);
    return { name: projectName, displayName: projectName };
  }
  
  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

/**
 * Get all MJML files recursively
 */
function getMjmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getMjmlFiles(filePath, fileList);
    } else if (path.extname(file) === '.mjml') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

/**
 * Compile MJML to HTML
 */
function compileMjml(inputPath, outputPath, projectName) {
  try {
    const mjmlContent = fs.readFileSync(inputPath, 'utf8');
    
    const result = mjml2html(mjmlContent, {
      filePath: inputPath,
      minify: true,
      beautify: false,
      validationLevel: 'soft'
    });
    
    if (result.errors.length > 0) {
      console.warn(`⚠️  Warnings for ${path.basename(inputPath)}:`);
      result.errors.forEach(err => {
        console.warn(`   - ${err.formattedMessage}`);
      });
    }
    
    // Ensure output directory exists
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write HTML file
    fs.writeFileSync(outputPath, result.html);
    
    const relPath = path.relative(path.join(DIST_DIR, projectName), outputPath);
    console.log(`  ✅ ${path.basename(inputPath)} → ${relPath}`);
    
    return true;
  } catch (error) {
    console.error(`  ❌ Error: ${path.basename(inputPath)} - ${error.message}`);
    return false;
  }
}

/**
 * Build a single project
 */
function buildProject(projectName) {
  const config = loadProjectConfig(projectName);
  const templatesDir = path.join(PROJECTS_DIR, projectName, 'templates');
  const projectDistDir = path.join(DIST_DIR, projectName);
  
  if (!fs.existsSync(templatesDir)) {
    console.error(`  ❌ Templates directory not found for ${projectName}`);
    return { success: 0, errors: 1 };
  }
  
  console.log(`\n📦 Building: ${config.displayName || projectName}`);
  console.log(`   Path: projects/${projectName}`);
  
  const mjmlFiles = getMjmlFiles(templatesDir);
  let successCount = 0;
  let errorCount = 0;
  
  mjmlFiles.forEach(inputPath => {
    const relativePath = path.relative(templatesDir, inputPath);
    const outputPath = path.join(projectDistDir, relativePath.replace('.mjml', '.html'));
    
    if (compileMjml(inputPath, outputPath, projectName)) {
      successCount++;
    } else {
      errorCount++;
    }
  });
  
  console.log(`\n   📊 ${config.displayName}: ✅ ${successCount} | ❌ ${errorCount}`);
  
  return { success: successCount, errors: errorCount };
}

/**
 * Main build function
 */
function build() {
  console.log('🚀 MJML Email Studio - Multi-Project Builder\n');
  console.log('='.repeat(50));
  
  let projects = [];
  
  if (specificProject) {
    // Build specific project
    const projectPath = path.join(PROJECTS_DIR, specificProject);
    if (!fs.existsSync(projectPath)) {
      console.error(`❌ Project "${specificProject}" not found`);
      process.exit(1);
    }
    projects = [specificProject];
    console.log(`Building project: ${specificProject}`);
  } else {
    // Build all projects
    projects = getProjects();
    console.log(`Building all projects (${projects.length} found)`);
  }
  
  let totalSuccess = 0;
  let totalErrors = 0;
  
  projects.forEach(projectName => {
    const result = buildProject(projectName);
    totalSuccess += result.success;
    totalErrors += result.errors;
  });
  
  console.log('\n' + '='.repeat(50));
  console.log('\n📊 Final Summary:');
  console.log(`   Projects: ${projects.length}`);
  console.log(`   ✅ Success: ${totalSuccess}`);
  console.log(`   ❌ Errors: ${totalErrors}`);
  console.log(`\n📁 Output: ${path.relative(ROOT_DIR, DIST_DIR)}/`);
  
  if (totalErrors > 0) {
    process.exit(1);
  }
}

// Run build
build();
