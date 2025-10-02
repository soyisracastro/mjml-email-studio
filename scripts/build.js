#!/usr/bin/env node

/**
 * Build script for MJML email templates
 * Compiles MJML files to HTML for use with Sendy
 */

const fs = require('fs');
const path = require('path');
const mjml2html = require('mjml');

// Directories
const SRC_DIR = path.join(__dirname, '../src/templates');
const DIST_DIR = path.join(__dirname, '../dist');

// Ensure dist directory exists
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR, { recursive: true });
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
function compileMjml(inputPath, outputPath) {
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
    console.log(`✅ Compiled: ${path.basename(inputPath)} → ${path.relative(DIST_DIR, outputPath)}`);
    
    return true;
  } catch (error) {
    console.error(`❌ Error compiling ${path.basename(inputPath)}:`, error.message);
    return false;
  }
}

/**
 * Main build function
 */
function build() {
  console.log('🚀 Building email templates...\n');
  
  const mjmlFiles = getMjmlFiles(SRC_DIR);
  let successCount = 0;
  let errorCount = 0;
  
  mjmlFiles.forEach(inputPath => {
    // Calculate output path maintaining directory structure
    const relativePath = path.relative(SRC_DIR, inputPath);
    const outputPath = path.join(DIST_DIR, relativePath.replace('.mjml', '.html'));
    
    if (compileMjml(inputPath, outputPath)) {
      successCount++;
    } else {
      errorCount++;
    }
  });
  
  console.log(`\n📊 Build Summary:`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Errors: ${errorCount}`);
  console.log(`\n📁 Output directory: ${DIST_DIR}`);
  
  if (errorCount > 0) {
    process.exit(1);
  }
}

// Run build
build();