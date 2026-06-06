const express = require('express');

const app = express();
app.use(express.json());

let usuarios = [
    { id: 1, nombre: 'Juan' }
];

// Leer usuarios
app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

// Crear usuario
app.post('/usuarios', (req, res) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre
    };

    usuarios.push(nuevoUsuario);
    res.json(nuevoUsuario);
});

// Actualizar usuario
app.put('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);

    const usuario = usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).send('Usuario no encontrado');
    }

    usuario.nombre = req.body.nombre;
    res.json(usuario);
});

// Eliminar usuario
app.delete('/usuarios/:id', (req, res) => {
    const id = parseInt(req.params.id);

    usuarios = usuarios.filter(u => u.id !== id);

    res.send('Usuario eliminado');
});

app.listen(3000, () => {
    console.log('Servidor ejecutándose en puerto 3000');
});
