import { IUser, IUserSchema } from 'src/interfaces';
import users from 'src/api/db/users';

class UsersService {
    getAllUsers() {
        return users;
    }

    getUserById(id: string) {
        return users.find((user: IUserSchema) => user.id === id);
    }

    createUser(user: IUser) {
        users.push(user);
    }

    updateUser(userData: IUserSchema) {
        users.forEach((user: IUserSchema) => {
            if (user.id === userData.id) {
                Object.keys(user).forEach((key) => {
                    user[key] = userData[key];
                });
            }
        });
    }

    deleteUser(id: string) {
        users.forEach((user: IUserSchema, index) => {
            if (user.id === id) {
                users.splice(index, 1);
            }
        });
    }
}

export const usersService = new UsersService();