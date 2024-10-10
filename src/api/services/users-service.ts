import cluster from 'node:cluster';
import { IUserSchema } from 'src/interfaces';
import { usersDb } from 'src/api/db/users-db';

type UserDbResponse = IUserSchema[] | IUserSchema | null;

class UsersService {
    constructor() {
        this.createChanel = this.createChanel.bind(this);
        this.getAllUsers = this.getAllUsers.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.createUser = this.createUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    private createChanel(message): Promise<UserDbResponse> {
        return new Promise((resolve) => {
            process.send(message);
            process.on('message', (message: UserDbResponse) => {
                resolve(message);
            });
        });
    }

    getAllUsers(): Promise<UserDbResponse> | UserDbResponse {
        if (cluster.isWorker) {
            const message = { method: 'getAllUsers', args: [] };
            return this.createChanel(message);
        }

        return usersDb.getAll();
    }

    getUserById(id: string): Promise<UserDbResponse> | UserDbResponse {
        if (cluster.isWorker) {
            const message = { method: 'getUserById', args: [ id ] };
            return this.createChanel(message);
        }

        return usersDb.getOne(id);
    }

    createUser(user: IUserSchema): Promise<UserDbResponse> | UserDbResponse {
        if (cluster.isWorker) {
            const message = { method: 'createUser', args: [ user ] };
            return this.createChanel(message);
        }

        return usersDb.create(user);
    }

    updateUser(userData: IUserSchema): Promise<UserDbResponse> | UserDbResponse {
        if (cluster.isWorker) {
            const message = { method: 'updateUser', args: [ userData ] };
            return this.createChanel(message);
        }

        return usersDb.update(userData);
    }

    deleteUser(id: string): Promise<UserDbResponse> | UserDbResponse {
        if (cluster.isWorker) {
            const message = { method: 'deleteUser', args: [ id ] };
            return this.createChanel(message);
        }

        return usersDb.delete(id);
    }
}

export const usersService = new UsersService();