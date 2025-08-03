```javascript
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Servir archivos estáticos desde la carpeta raíz (para index.html)
app.use(express.static(path.join(__dirname)));

// Servir archivos JSON desde la carpeta 'graficos'
app.use('/graficos', express.static(path.join(__dirname, 'graficos')));

// Endpoint para listar los archivos JSON en la carpeta 'graficos'
app.get('/graficos/list', (req, res) => {
    const graficosDir = path.join(__dirname, 'graficos');
    fs.readdir(graficosDir, (err, files) => {
        if (err) {
            console.error('Error al leer la carpeta graficos:', err);
            return res.status(500).json({ error: 'Error al leer la carpeta' });
        }
        // Filtrar solo archivos JSON
        const jsonFiles = files.filter(file => file.endsWith('.json'));
        res.json(jsonFiles);
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
```