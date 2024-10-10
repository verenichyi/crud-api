import http, { Server } from 'node:http';
import EventEmitter from 'node:events';
import Router from 'src/router';
import { RequestCustom, ResponseCustom } from 'src/interfaces';
import parseJson from 'src/middlewares/parseJson';
import parseUrl from 'src/middlewares/parseUrl';
import bodyParser from 'src/middlewares/bodyParser';
import { baseURL } from 'src/constants';

class App {
    private server: Server;
    public emitter: EventEmitter;
    private routersPaths;

    constructor() {
        this.server = this.createServer();
        this.emitter = new EventEmitter();
        this.routersPaths = [];
    }

    private createServer() {
        return http.createServer((req: RequestCustom, res: ResponseCustom) => {
            parseUrl(baseURL, this.routersPaths, req);
            parseJson(res);

            bodyParser(req).then((body) => {
                req.body = body;

                const emitted = this.emitter.emit(`${req.pathname}:${req.method}`, req, res);
                if (!emitted) {
                    res.send(`Resource doesn't exist`);
                }
            });
        });
    }

    listen(PORT, cb) {
        this.server.listen(PORT, cb);
    }

    addRouter(router: Router) {
        Object.entries(router.endpoints).forEach(([ path, methods ]) => {
            this.routersPaths.push(path);

            Object.entries(methods).forEach(([ method, handler ]) => {
                this.emitter.on(`${path}:${method}`, (req: RequestCustom, res: ResponseCustom) => {
                    handler(req, res);
                });
            });
        });
    }
}

export default App;