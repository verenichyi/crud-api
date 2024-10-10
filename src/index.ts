import http from 'node:http';
import { config } from 'dotenv';

config();
const { PORT = 5000 } = process.env;

const server = http.createServer((req, res) => {
    if (req.url === '/api/users') {
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        return res.end(JSON.stringify([]));
    } else {
        res.end('CRUD API');
    }
});

server.listen(PORT, () => console.log(`Server has been started on http://localhost:${PORT}`));