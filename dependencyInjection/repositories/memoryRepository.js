let db = {
    users: []
};

const memoryRepository = {
    async getAll() {
        return db.users;
    },
    async create(user) {
        const newUser = {
            id: crypto.randomUUID(),
            ...user
        }

        db.users.push(newUser);

        return newUser;
    },

    // these methods are only used for testing
    setUsers(users) {
        db.users = users;
    },
    clear() {
        db.users = [];
    }
};

export default memoryRepository;