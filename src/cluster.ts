import http, { Server } from 'node:http';
import { cpus } from 'node:os';
import cluster from 'node:cluster';
import App from 'src/app';
import { usersRouter } from 'src/api/routes/users-router';
import { PORT, ServerErrorMessage, StatusCodes } from 'src/constants';
import { RequestCustom, ResponseCustom } from 'src/interfaces';
import { usersService } from 'src/api/services';
import parseJson from 'src/middlewares/parseJson';

class Cluster {
    private app: App;
    private balancer: Server;

    constructor(private count: number = 0, private servers: string[] = []) {
    }

    private createBalancer() {
        return http.createServer((clientReq: RequestCustom, clientRes: ResponseCustom) => {
            parseJson(clientRes);
            const url = this.servers[this.count] + clientReq.url;

            const proxy = http.request(url, { method: clientReq.method, headers: clientReq.headers }, (res) => {
                clientRes.writeHead(res.statusCode, res.headers);
                res.pipe(clientRes);
            });

            clientReq.pipe(proxy);

            proxy.on('error', () => {
                clientRes.send(StatusCodes.InternalServerError, {
                    message: ServerErrorMessage.InternalServerError
                });
            });

            this.count = (this.count + 1) % this.servers.length;
        });
    }

    start() {
        if (cluster.isPrimary) {
            const numCPUs = cpus().length;
            console.log(`Number of CPUs is ${numCPUs}`);
            console.log(`Master process ${process.pid} started`);

            for (let i = 0; i < numCPUs; i++) {
                const workerPort = +PORT + i + 1;
                cluster.fork({ workerPort });

                this.servers.push(`http://localhost:${workerPort}`);
            }

            this.balancer = this.createBalancer();
            this.balancer.listen(PORT, () => console.log(`Server has been started on http://localhost:${PORT}, started process id: ${process.pid}`));

            cluster.on('exit', (worker, code) => {
                if (code !== 0 && !worker.exitedAfterDisconnect) {
                    console.log(`Worker ${worker.id} crashed. Starting a new worker...`);
                    const workerPort = +PORT + this.count;
                    cluster.fork({ workerPort });
                }
            });

            cluster.on('message', (worker, message) => {
                const data = usersService[message.method](...message.args);
                worker.send(data);
            });
        } else {
            console.log(`Worker ${process.pid} started`);
            const PORT = process.env.workerPort;

            this.app = new App();
            this.app.addRouter(usersRouter);
            this.app.listen(PORT, () => console.log(`Server has been started on http://localhost:${PORT}, started process id: ${process.pid}`));
        }
    }
}

export const serverWithCluster = new Cluster();
