
//  [BWM-XMD QUANTUM EDITION]                                           
//  >> A superposition of elegant code states                           
//  >> Collapsed into optimal execution                                
//  >> Scripted by Sir Ibrahim Adams                                    
//  >> Version: 8.3.5-quantum.7

// Adams module - Core functionality bridge
const fs = require('fs');
const path = require('path');

// Load all adams modules dynamically
const adamsModules = {};
const adamsPath = path.join(__dirname, '../adams');

if (fs.existsSync(adamsPath)) {
  const files = fs.readdirSync(adamsPath).filter(file => file.endsWith('.js'));
  
  files.forEach(file => {
    try {
      const moduleName = path.basename(file, '.js');
      adamsModules[moduleName] = require(path.join(adamsPath, file));
      console.log(`✅ Loaded adams module: ${moduleName}`);
    } catch (error) {
      console.error(`❌ Failed to load adams module ${file}:`, error.message);
    }
  });
}

// Export all loaded modules and core functions
module.exports = {
  ...adamsModules,
  
  // Core adams functions
  init: () => {
    console.log('🚀 Adams core initialized');
    return true;
  },
  
  getModules: () => {
    return Object.keys(adamsModules);
  },
  
  loadModule: (moduleName) => {
    return adamsModules[moduleName] || null;
  }
};
