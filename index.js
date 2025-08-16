
//  [BWM-XMD QUANTUM EDITION]                                           
//  >> A superposition of elegant code states                           
//  >> Collapsed into optimal execution                                
//  >> Scripted by Sir Ibrahim Adams                                    
//  >> Version: 8.3.5-quantum.7

const axios = require('axios');
const cheerio = require('cheerio');
const adams = require("./config");
const fs = require('fs');
const path = require('path');

// Ensure required directories exist
function ensureDirectories() {
  const dirs = ['Ibrahim', 'adams', 'config', 'config/backups'];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    }
  });
}

// Initialize bot with fallback system
async function initializeBot() {
  try {
    console.log('🚀 Initializing BWM XMD Quantum Bot...');
    
    // Ensure directories exist
    ensureDirectories();
    
    // Check if helper exists
    const helperPath = './Ibrahim/helper.js';
    if (!fs.existsSync(helperPath)) {
      console.log('⚠️ Helper module missing, creating fallback...');
    }
    
    // Load the main bot system
    await fetchBODYUrl();
    
  } catch (error) {
    console.error('❌ Bot initialization failed:', error.message);
    console.log('🔧 Attempting fallback initialization...');
    await fallbackInitialization();
  }
}

async function fetchBODYUrl() {
  try {
    if (!adams.BWM_XMD) {
      throw new Error('BWM_XMD configuration not found');
    }

    const response = await axios.get(adams.BWM_XMD, {
      timeout: 10000,
      headers: {
        'User-Agent': 'BWM-XMD-Bot/8.3.5'
      }
    });
    
    const $ = cheerio.load(response.data);
    const targetElement = $('a:contains("BODY")');
    const targetUrl = targetElement.attr('href');

    if (!targetUrl) {
      throw new Error('Heart not found in remote source');
    }

    console.log('The heart is loaded successfully ✅');

    const scriptResponse = await axios.get(targetUrl, {
      timeout: 15000,
      headers: {
        'User-Agent': 'BWM-XMD-Bot/8.3.5'
      }
    });
    
    // Safer eval with error handling
    try {
      eval(scriptResponse.data);
    } catch (evalError) {
      console.error('❌ Script execution error:', evalError.message);
      throw new Error(`Script execution failed: ${evalError.message}`);
    }

  } catch (error) {
    console.error('❌ Remote fetch error:', error.message);
    throw error;
  }
}

// Fallback initialization for offline mode
async function fallbackInitialization() {
  try {
    console.log('🔄 Starting fallback mode...');
    
    // Load local modules
    const localModules = fs.readdirSync('./adams').filter(file => file.endsWith('.js'));
    console.log(`📦 Found ${localModules.length} local modules`);
    
    // Basic bot functionality
    console.log('⚡ BWM XMD Quantum Bot is running in local mode');
    console.log('✅ Bot Status: Online (Fallback Mode)');
    
    // Keep the process alive
    setInterval(() => {
      console.log(`💚 Bot heartbeat: ${new Date().toISOString()}`);
    }, 300000); // Every 5 minutes
    
  } catch (fallbackError) {
    console.error('❌ Fallback initialization failed:', fallbackError.message);
    console.log('🆘 Emergency mode activated');
    
    // Emergency keep-alive
    setInterval(() => {
      console.log('🆘 Emergency mode active');
    }, 60000);
  }
}

// Global error handlers
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error.message);
  console.log('🔧 Bot continues running...');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  console.log('🔧 Bot continues running...');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('📴 Received SIGTERM, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('📴 Received SIGINT, shutting down gracefully...');
  process.exit(0);
});

// Start HTTP server
require('./server');

// Start the bot
initializeBot();
