import { RequestCustom, ResponseCustom } from 'src/interfaces';
import { usersService } from 'src/api/services';
import * as uuid from 'uuid';

const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = usersService;

class UsersController {
    getAllUsers(req: RequestCustom, res: ResponseCustom) {
        const users = getAllUsers();
        res.send(users);
    }

    getUserById(req: RequestCustom, res: ResponseCustom) {
        const { id } = req.params;
        const isUuid = uuid.validate(id);

        const user = getUserById(id);
        res.send(user);
    }

    createUser(req: RequestCustom, res: ResponseCustom) {
        const user = { id: uuid.v4(), ...req.body };

        createUser(user);
        res.send(user);
    }

    updateUser(req: RequestCustom, res: ResponseCustom) {
        const { id } = req.params;
        const body = req.body;

        const isUuid = uuid.validate(id);

        const user = { id, ...body };

        updateUser(user);
        res.send(user);
    }

    deleteUser(req: RequestCustom, res: ResponseCustom) {
        const { id } = req.params;

        const isUuid = uuid.validate(id);

        deleteUser(id);
        res.end();
    }
}

export const usersController = new UsersController();