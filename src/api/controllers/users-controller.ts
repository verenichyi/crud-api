import * as uuid from 'uuid';
import { RequestCustom, ResponseCustom } from 'src/interfaces';
import { usersService } from 'src/api/services';
import { StatusCodes } from 'src/constants';
import handleError from 'src/middlewares/handleError';
import validateRequest from 'src/utils/validateRequest';
import { ClientError } from 'src/api/exceptions/ClientError';

const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = usersService;

class UsersController {
    async getAllUsers(req: RequestCustom, res: ResponseCustom): Promise<void> {
        try {
            const users = await getAllUsers();

            res.send(StatusCodes.OK, users);
        } catch (error) {
            handleError(error, res);
        }
    }

    async getUserById(req: RequestCustom, res: ResponseCustom): Promise<void> {
        try {
            validateRequest(req);

            const { id } = req.params;
            const user = await getUserById(id);

            if (!user) {
                throw ClientError.NotFound();
            }

            res.send(StatusCodes.OK, user);
        } catch (error) {
            handleError(error, res);
        }
    }

    async createUser(req: RequestCustom, res: ResponseCustom): Promise<void> {
        try {
            validateRequest(req);

            const userData = { id: uuid.v4(), ...req.body };
            const user = await createUser(userData);

            res.send(StatusCodes.Created, user);
        } catch (error) {
            handleError(error, res);
        }
    }

    async updateUser(req: RequestCustom, res: ResponseCustom): Promise<void> {
        try {
            validateRequest(req);

            const { id } = req.params;
            const body = req.body;

            const userData = { id, ...body };
            const updatedUser = await updateUser(userData);

            if (!updatedUser) {
                throw ClientError.NotFound();
            }

            res.send(StatusCodes.OK, updatedUser);
        } catch (error) {
            handleError(error, res);
        }
    }

    async deleteUser(req: RequestCustom, res: ResponseCustom): Promise<void> {
        try {
            validateRequest(req);

            const { id } = req.params;
            const deletedUser = await deleteUser(id);

            if (!deletedUser) {
                throw ClientError.NotFound();
            }

            res.statusCode = StatusCodes.NoContent;
            res.end();
        } catch (error) {
            handleError(error, res);
        }
    }
}

export const usersController = new UsersController();