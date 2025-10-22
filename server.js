const express = require('express');
const crypto = require('crypto');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Configurações
const CAKTO_WEBHOOK_SECRET = process.env.CAKTO_WEBHOOK_SECRET || 'webhook_secret_2024_mapa';

// Rota principal - serve o HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota da ferramenta
app.get('/mapa-autoridade', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota de teste
app.get('/webhook/test', (req, res) => {
    res.json({ 
        message: 'Webhook endpoint funcionando!',
        url: '/webhook/cakto',
        timestamp: new Date().toISOString()
    });
});

// Endpoint do webhook da Cakto
app.post('/webhook/cakto', (req, res) => {
    try {
        console.log('Webhook recebido:', req.body);
        
        const { event, data } = req.body;
        
        if (event === 'purchase_approved' && data.status === 'paid') {
            console.log('Compra aprovada para:', data.customer.email);
            // Aqui você pode processar a compra
        }
        
        res.status(200).send('OK');
        
    } catch (error) {
        console.error('Erro no webhook:', error);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
