import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
    const users = await req.repository.getAll();

    // exclude admin users
    const publicUsers = users.filter(user => user.role !== 'admin');

    res.status(200).json(publicUsers);
});

export default router;