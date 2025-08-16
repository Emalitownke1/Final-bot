
//  [BWM-XMD QUANTUM EDITION]                                           
//  >> A superposition of elegant code states                           
//  >> Collapsed into optimal execution                                
//  >> Scripted by Sir Ibrahim Adams                                    
//  >> Version: 8.3.5-quantum.7

const fs = require('fs');
const path = require('path');
const { hybridConfig } = require('../config');

// Helper utilities for BWM XMD
class BWMHelper {
    constructor() {
        this.botName = 'BWM-XMD QUANTUM';
        this.version = '8.3.5-quantum.7';
    }

    // Get bot configuration
    getConfig(key, defaultValue = null) {
        return hybridConfig.getSetting(key, defaultValue);
    }

    // Set bot configuration
    async setConfig(key, value) {
        return await hybridConfig.setSetting(key, value);
    }

    // Log with timestamp
    log(message, type = 'info') {
        const timestamp = new Date().toISOString();
        const prefix = type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️';
        console.log(`${prefix} [${timestamp}] ${message}`);
    }

    // Format time
    formatTime(date = new Date()) {
        return date.toLocaleString('en-US', {
            timeZone: 'UTC',
            hour12: true,
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Generate random ID
    generateId(length = 8) {
        return Math.random().toString(36).substr(2, length);
    }

    // Sleep utility
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Format number with commas
    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // Clean phone number
    cleanPhoneNumber(phone) {
        return phone.replace(/[^\d]/g, '').replace(/^(\d)/, '+$1');
    }

    // Check if string is URL
    isUrl(string) {
        try {
            new URL(string);
            return true;
        } catch {
            return false;
        }
    }

    // Get file extension
    getFileExtension(filename) {
        return path.extname(filename).toLowerCase();
    }

    // Format bytes
    formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    // Get system stats
    getSystemStats() {
        const used = process.memoryUsage();
        return {
            memory: {
                rss: this.formatBytes(used.rss),
                heapTotal: this.formatBytes(used.heapTotal),
                heapUsed: this.formatBytes(used.heapUsed),
                external: this.formatBytes(used.external)
            },
            uptime: process.uptime(),
            platform: process.platform,
            nodeVersion: process.version
        };
    }

    // Random choice from array
    randomChoice(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    // Capitalize first letter
    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    // Get greeting based on time
    getGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        if (hour < 21) return 'Good Evening';
        return 'Good Night';
    }

    // Validate session ID
    isValidSessionId(sessionId) {
        return sessionId && sessionId.length > 20 && sessionId.includes('BWM');
    }

    // Get bot status
    getBotStatus() {
        return {
            name: this.botName,
            version: this.version,
            uptime: this.formatTime(new Date(Date.now() - process.uptime() * 1000)),
            memory: this.getSystemStats().memory,
            mode: this.getConfig('PUBLIC_MODE', 'yes') === 'yes' ? 'Public' : 'Private'
        };
    }
}

module.exports = new BWMHelper();
