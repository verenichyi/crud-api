import App from 'src/app';
import { usersRouter } from 'src/api/routes/users-router';
import { baseURL, PORT } from 'src/constants';

class Server {
    constructor(private app: App = new App()) {}

    start() {
        this.app.addRouter(usersRouter);
        this.app.listen(+PORT, () => console.log(`Server has been started on ${baseURL}`));
    }
}

export const server = new Server();
