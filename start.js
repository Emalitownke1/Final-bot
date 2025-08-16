
//  [BWM-XMD QUANTUM EDITION]                                           
//  >> Startup Script with Dependency Management                        
//  >> Scripted by Sir Ibrahim Adams                                    
//  >> Version: 8.3.5-quantum.7

const { spawn } = require('child_process');
const fs = require('fs');

console.log('🚀 BWM XMD Quantum Bot Startup Script');
console.log('📦 Checking dependencies...');

// Check if node_modules exists
if (!fs.existsSync('node_modules')) {
    console.log('📦 Installing dependencies...');
    const install = spawn('yarn', ['install'], { stdio: 'inherit' });
    
    install.on('close', (code) => {
        if (code === 0) {
            console.log('✅ Dependencies installed successfully');
            startBot();
        } else {
            console.error('❌ Dependency installation failed');
            process.exit(1);
        }
    });
} else {
    console.log('✅ Dependencies already installed');
    startBot();
}

function startBot() {
    console.log('🔥 Starting BWM XMD Quantum Bot...');
    const bot = spawn('node', ['index.js'], { stdio: 'inherit' });
    
    bot.on('close', (code) => {
        console.log(`🔄 Bot process exited with code ${code}`);
        if (code !== 0) {
            console.log('🔄 Restarting bot in 5 seconds...');
            setTimeout(startBot, 5000);
        }
    });
    
    bot.on('error', (error) => {
        console.error('❌ Bot startup error:', error);
        console.log('🔄 Retrying in 10 seconds...');
        setTimeout(startBot, 10000);
    });
}
