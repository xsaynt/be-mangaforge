import { listen } from './app';
const { PORT = 9090 } = process.env;

listen(PORT, () => console.log(`Listening on ${PORT}...`));
