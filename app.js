// index.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/kendaraan', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/views', 'listKendaraan.html'));
});

app.get('/kendaraan/add', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/views', 'addKendaraan.html'));
});

app.get('/kendaraan/detail', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/views', 'detailKendaraan.html'));
});

app.get('/kendaraan/edit', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/views', 'editKendaraan.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
