import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const db = new Low(new JSONFile('data/db.json'), {})

const lowdbRepository = {
    async getAll() {
        await db.read()
        return db.data.users;
    },
    async create(user) {
        await db.read();

        const newUser = {
            id: crypto.randomUUID(),
            ...user
        }

        db.data.users.push(newUser);

        await db.write();

        return newUser;
    },
};

export default lowdbRepository;