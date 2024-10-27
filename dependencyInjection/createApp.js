import express from 'express';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(express.json());

function createApp({ repository }) {
    const app = express();
    app.use(express.json());

    app.use((req, _res, next) => {
        req.repository = repository;
        next();
    });

    app.use('/api/users', userRoutes);

    return app;
}

export default createApp;