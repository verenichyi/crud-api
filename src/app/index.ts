import http, { Server } from 'node:http';
import EventEmitter from 'node:events';
import Router from 'src/router';
import { RequestCustom, ResponseCustom } from 'src/interfaces';
import parseJson from 'src/middlewares/parseJson';
import parseUrl from 'src/middlewares/parseUrl';
import bodyParser from 'src/middlewares/bodyParser';

class App {
    private server: Server;
    public emitter: EventEmitter;
    private middlewares;
    private routersPaths;

    constructor() {
        this.server = this.createServer();
        this.emitter = new EventEmitter();
        this.middlewares = [];
        this.routersPaths = [];
    }

    private createServer() {
        return http.createServer((req: RequestCustom, res: ResponseCustom) => {
            parseUrl(`http://localhost:5000`, this.routersPaths, req);
            parseJson(req, res);

            bodyParser(req).then((body) => {
                req.body = body;
                const emitted = this.emitter.emit(`${req.pathname}:${req.method}`, req, res);

                if (!emitted) {
                    res.send(`Resource doesn't exist`);
                }
            });
        });
    }

    listen(PORT, callback) {
        this.server.listen(PORT, callback);
    }

    addRouter(router: Router) {
        Object.keys(router.endpoints).forEach((path) => {
            this.routersPaths.push(path);
            const methods = router.endpoints[path];

            Object.keys(methods).forEach((method) => {
                const handler = methods[method];
                this.emitter.on(`${path}:${method}`, (req: RequestCustom, res: ResponseCustom) => {
                    handler(req, res);
                });
            });
        });
    }
}

export default App;