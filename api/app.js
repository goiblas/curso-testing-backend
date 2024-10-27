import express from 'express';

const app = express();
app.use(express.json());

let users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' },
];

// Obtener todos los usuarios
app.get('/api/users', (req, res) => {
    res.status(200).json(users);
});

// Crear un nuevo usuario
app.post('/api/users', (req, res) => {
    const newUser = { id: users.length + 1, ...req.body };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Actualizar un usuario existente
app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
        users[userIndex] = { id: userId, ...req.body };
        res.status(200).json(users[userIndex]);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Eliminar un usuario
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    users = users.filter(user => user.id !== userId);

    res.status(200).json({ message: 'User deleted' });
});

export default app;
