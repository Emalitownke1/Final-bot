
//  [BWM-XMD QUANTUM EDITION]                                           
//  >> HTTP Server for Bot Management                                   
//  >> Scripted by Sir Ibrahim Adams                                    
//  >> Version: 8.3.5-quantum.7

const express = require('express');
const path = require('path');
const { hybridConfig } = require('./config');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('adams'));

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'adams', 'index.html'));
});

// Bot status endpoint
app.get('/status', (req, res) => {
    const stats = {
        name: 'BWM XMD QUANTUM',
        version: '8.3.5-quantum.7',
        status: 'online',
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        timestamp: new Date().toISOString()
    };
    res.json(stats);
});

// Bot restart endpoint
app.post('/restart', (req, res) => {
    res.json({ message: 'Restart initiated', timestamp: new Date().toISOString() });
    console.log('🔄 Restart request received via HTTP');
    
    setTimeout(() => {
        process.exit(0);
    }, 1000);
});

// Configuration endpoints
app.get('/config', (req, res) => {
    res.json(hybridConfig.getAllSettings());
});

app.post('/config', async (req, res) => {
    const { key, value } = req.body;
    if (!key) {
        return res.status(400).json({ error: 'Key is required' });
    }
    
    const success = await hybridConfig.setSetting(key, value);
    res.json({ success, key, value });
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌐 BWM XMD Server running on http://0.0.0.0:${PORT}`);
});

module.exports = app;
