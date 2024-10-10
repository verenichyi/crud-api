import { IUser } from '../../interfaces';

class UsersService {
    getAllUsers() {
        return [ { id: 1, username: 'user' } ];
    }

    getUserById(id: string) {
        return [ { id, username: 'user' } ];
    }

    createUser(body: IUser) {
        return body;
    }

    updateUser(id: string, body: IUser) {
        return { id, body };
    }

    deleteUser(id: string) {
        return id;
    }
}

export const usersService = new UsersService();