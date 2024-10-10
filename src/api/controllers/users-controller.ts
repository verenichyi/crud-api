import * as uuid from 'uuid';
import { RequestCustom, ResponseCustom } from 'src/interfaces';
import { usersService } from 'src/api/services';
import { StatusCodes } from 'src/constants';
import handleError from 'src/utils/handleError';
import validateRequest from 'src/utils/validateRequest';

const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = usersService;

class UsersController {
    getAllUsers(req: RequestCustom, res: ResponseCustom) {
        try {
            const users = getAllUsers();

            res.statusCode = StatusCodes.OK;
            res.send(users);
        } catch (error) {
            handleError(error, res);
        }
    }

    getUserById(req: RequestCustom, res: ResponseCustom) {
        try {
            validateRequest(req);

            const { id } = req.params;
            const user = getUserById(id);

            res.statusCode = StatusCodes.OK;
            res.send(user);
        } catch (error) {
            handleError(error, res);
        }
    }

    createUser(req: RequestCustom, res: ResponseCustom) {
        try {
            validateRequest(req);

            const user = { id: uuid.v4(), ...req.body };
            createUser(user);

            res.statusCode = StatusCodes.Created;
            res.send(user);
        } catch (error) {
            handleError(error, res);
        }
    }

    updateUser(req: RequestCustom, res: ResponseCustom) {
        try {
            validateRequest(req);

            const { id } = req.params;
            const body = req.body;

            const user = { id, ...body };
            updateUser(user);

            res.statusCode = StatusCodes.OK;
            res.send(user);
        } catch (error) {
            handleError(error, res);
        }
    }

    deleteUser(req: RequestCustom, res: ResponseCustom) {
        try {
            validateRequest(req);

            const { id } = req.params;
            deleteUser(id);

            res.statusCode = StatusCodes.NoContent;
            res.end();
        } catch (error) {
            handleError(error, res);
        }
    }
}

export const usersController = new UsersController();