import Router from '../../router';
import { usersEndpoint } from '../../constants';
import { usersController } from '../controllers';

export const usersRouter = new Router();
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = usersController;

usersRouter.get(usersEndpoint, getAllUsers);
usersRouter.get(usersEndpoint + '/:id', getUserById);
usersRouter.post(usersEndpoint, createUser);
usersRouter.put(usersEndpoint + '/:id', updateUser);
usersRouter.delete(usersEndpoint + '/:id', deleteUser);