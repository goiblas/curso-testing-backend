import request from 'supertest';
import createApp from '../createApp.js';
import { describe, test, expect, beforeEach } from 'vitest';
import memoryRepository from '../repositories/memoryRepository.js';

const defaultUsers = [
    { id: 1, name: 'John', role: 'admin' },
    { id: 2, name: 'Alice', role: 'user' },
];

describe('Users API', () => {
    beforeEach(() => {
        memoryRepository.clear();
    });

    test('GET /api/users - should return all public users', async () => {
        memoryRepository.setUsers(defaultUsers);
        const app = createApp({ repository: memoryRepository });

        const res = await request(app).get('/api/users');
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
        expect(res.body[0].name).toBe('Alice');
    });

    test('GET /api/users - should return all users', async () => {
        const app = createApp({ repository: memoryRepository });

        const res = await request(app).get('/api/users');
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(0);
    });
});
