import createApp from './createApp.js';
import lowdbRepository from './repositories/lowdbRepository.js';

const PORT = 3000;

const app = createApp({
    repository: lowdbRepository,
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});