import { IUser, IUserSchema } from 'src/interfaces';

class UsersDb {
    constructor(private users: IUser[] = []) {
    }

    public getAll(): IUser[] {
        return this.users;
    }

    public getOne(id: string): IUser | null {
        return this.users.find((user: IUserSchema) => user.id === id) || null;
    }

    public create(user: IUserSchema): IUser {
        this.users.push(user);
        return user;
    }

    public update(userData: IUserSchema): IUser | null {
        const candidate = this.getOne(userData.id);
        if (!candidate) {
            return null;
        }

        this.users.forEach((user: IUserSchema) => {
            if (user.id === userData.id) {
                Object.keys(user).forEach((key) => {
                    user[key] = userData[key];
                });
            }
        });

        return userData;
    }

    public delete(id: string): IUser | null {
        const candidate = this.getOne(id);
        if (!candidate) {
            return null;
        }

        let result;
        this.users.forEach((user: IUserSchema, index) => {
            if (user.id === id) {
                result = this.users.splice(index, 1);
            }
        });

        return result;
    }
}

export const usersDb = new UsersDb();