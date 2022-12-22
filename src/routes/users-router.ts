import Router from 'src/router';
import { usersEndpoint } from 'src/constants';
import { usersController } from 'src/controllers';

export const usersRouter = new Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = usersController;

usersRouter.get(usersEndpoint, getAllUsers);
usersRouter.get(usersEndpoint + '/:id', getUserById);
usersRouter.post(usersEndpoint, createUser);
usersRouter.put(usersEndpoint + '/:id', updateUser);
usersRouter.delete(usersEndpoint + '/:id', deleteUser);