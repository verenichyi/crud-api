import { RequestCustom, ResponseCustom } from '../../interfaces';
import { usersService } from '../services';

const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = usersService;

class UsersController {
    getAllUsers(req: RequestCustom, res: ResponseCustom) {
        const users = getAllUsers();
        res.send(users);
    }

    getUserById(req: RequestCustom, res: ResponseCustom) {
        const { id } = req.params;
        const user = getUserById(id);
        res.send(user);
    }

    createUser(req: RequestCustom, res: ResponseCustom) {
        const user = createUser(req.body);
        res.send(user);
    }

    updateUser(req: RequestCustom, res: ResponseCustom) {
        const { id } = req.params;
        const body = req.body;
        const user = updateUser(id, body);
        res.send(user);
    }

    deleteUser(req: RequestCustom, res: ResponseCustom) {
        const { id } = req.params;
        const result = deleteUser(id);
        res.send(result);
    }
}

export const usersController = new UsersController();