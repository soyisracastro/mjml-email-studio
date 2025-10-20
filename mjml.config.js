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
};