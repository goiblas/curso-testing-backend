import request from 'supertest';
import createApp from '../createApp.js';
import { describe, test, expect } from 'vitest';

describe('Users API', () => {
    test('GET /api/users - should return all users', async () => {
        const repository = {
            async getAll() {
                return [
                    { id: 1, name: 'John' },
                    { id: 2, name: 'Alice' },
                ];
            },
        };

        const app = createApp({ repository });

        const res = await request(app).get('/api/users');
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(2);
        expect(res.body[0].name).toBe('John');
    });

    test("Get /api/users - should return only public users", async () => {
        const repository = {
            async getAll() {
                return [
                    { id: 1, name: 'John', role: 'admin' },
                    { id: 2, name: 'Alice', role: 'user' },
                ];
            },
        };

        const app = createApp({ repository });

        const res = await request(app).get('/api/users');
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0].name).toBe('Alice');
    });

    test("example ", async () => {
        const repository = {
            async getAll() {
                return [
                    { id: 1, name: 'John', role: 'admin' },
                    { id: 2, name: 'Alice', role: 'user' },
                ];
            },
        };

        const app = createApp({ repository });

        await request(app)
            .get('/api/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
    });
});
