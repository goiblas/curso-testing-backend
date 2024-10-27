import request from 'supertest';
import app from './app.js';
import { describe, it, expect } from 'vitest';

describe('Users API', () => {
    it('GET /api/users - should return all users', async () => {
        const res = await request(app).get('/api/users');
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(2);
    });

    test('GET /api/users - supertest methods', async () => {
        await request(app)
            .get('/api/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
    });

    it('POST /api/users - should create a new user', async () => {
        const newUser = { name: 'Alice' };
        const res = await request(app)
            .post('/api/users')
            .send(newUser);

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe(newUser.name);
    });

    it('PUT /api/users/:id - should update an existing user', async () => {
        const updatedUser = { name: 'John Updated' };
        const res = await request(app)
            .put('/api/users/1')
            .send(updatedUser);

        expect(res.status).toBe(200);
        expect(res.body.name).toBe(updatedUser.name);
    });

    it('DELETE /api/users/:id - should delete a user', async () => {
        const res = await request(app).delete('/api/users/1');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('User deleted');
    });

    it('PUT /api/users/:id - should return 404 if user not found', async () => {
        const updatedUser = { name: 'Not Found User' };
        const res = await request(app)
            .put('/api/users/99')
            .send(updatedUser);

        expect(res.status).toBe(404);
        expect(res.body.message).toBe('User not found');
    });
});
