import http, { Server } from 'node:http';
import EventEmitter from 'node:events';
import Router from 'src/router';
import { RequestCustom, ResponseCustom } from 'src/interfaces';
import parseJson from 'src/middlewares/parseJson';
import parseUrl from 'src/middlewares/parseUrl';
import bodyParser from 'src/middlewares/bodyParser';
import { baseURL, ClientErrorMessage, StatusCodes } from 'src/constants';

class App extends EventEmitter {
    private server: Server;
    private routersPaths: string[];

    constructor() {
        super()
        this.server = this.createServer();
        this.routersPaths = [];
    }

    private createServer() {
        return http.createServer((req: RequestCustom, res: ResponseCustom) => {
            parseUrl(baseURL, this.routersPaths, req);
            parseJson(res);

            bodyParser(req).then((body) => {
                req.body = body;

                const isEmitted = this.emit(`${req.pathname}:${req.method}`, req, res);
                if (!isEmitted) {
                    res.statusCode = StatusCodes.NotFound;
                    res.send({
                        message: ClientErrorMessage.NotFound
                    });
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
                this.on(`${path}:${method}`, (req: RequestCustom, res: ResponseCustom) => {
                    handler(req, res);
                });
            });
        });
    }
}

export default App;