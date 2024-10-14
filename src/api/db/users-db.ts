import { IUserSchema } from 'src/interfaces';

export class UsersDb {
    constructor(private users: IUserSchema[] = []) {
    }

    public getAll(): IUserSchema[] {
        return this.users;
    }

    public getOne(id: string): IUserSchema | null {
        return this.users.find((user: IUserSchema) => user.id === id) || null;
    }

    public create(user: IUserSchema): IUserSchema {
        this.users.push(user);
        return user;
    }

    public update(userData: IUserSchema): IUserSchema | null {
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

    public delete(id: string): IUserSchema | null {
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