import cluster from 'node:cluster';
import { IUserSchema } from 'src/interfaces';
import { usersDb } from 'src/api/db/users-db';

class UsersService {
    public getAllUsers() {
        if (cluster.isWorker) {
            const message = { method: 'getAllUsers', args: [] };

            return new Promise((resolve) => {
                process.send(message);
                process.on('message', (message) => {
                    resolve(message);
                });
            });
        } else {
            return usersDb.getAll();
        }
    }

    public getUserById(id: string) {
        if (cluster.isWorker) {
            const message = { method: 'getUserById', args: [ id ] };

            return new Promise((resolve) => {
                process.send(message);
                process.on('message', (message) => {
                    resolve(message);
                });
            });
        } else {
            return usersDb.getOne(id);
        }
    }

    public createUser(user: IUserSchema) {
        if (cluster.isWorker) {
            const message = { method: 'createUser', args: [ user ] };

            return new Promise((resolve) => {
                process.send(message);
                process.on('message', (message) => {
                    resolve(message);
                });
            });
        } else {
            return usersDb.create(user);
        }
    }

    public updateUser(userData: IUserSchema) {
        if (cluster.isWorker) {
            const message = { method: 'updateUser', args: [ userData ] };

            return new Promise((resolve) => {
                process.send(message);
                process.on('message', (message) => {
                    resolve(message);
                });
            });
        } else {
            return usersDb.update(userData);
        }
    }

    public deleteUser(id: string) {
        if (cluster.isWorker) {
            const message = { method: 'deleteUser', args: [ id ] };

            return new Promise((resolve) => {
                process.send(message);
                process.on('message', (message) => {
                    resolve(message);
                });
            });
        } else {
            return usersDb.delete(id);
        }
    }
}

export const usersService = new UsersService();