import Router from 'src/router';
import { usersEndpoint } from 'src/constants';
import { RequestCustom, ResponseCustom } from 'src/interfaces';

const usersRouter = new Router();

usersRouter.get(usersEndpoint, (req: RequestCustom, res: ResponseCustom) => {
    res.send([ { id: 1, username: 'user' } ]);
});

usersRouter.get(usersEndpoint + '/:id', (req: RequestCustom, res: ResponseCustom) => {
    const { id } = req.params;
    res.send({ id });
});

usersRouter.post(usersEndpoint, (req: RequestCustom, res: ResponseCustom) => {
    res.send(req.body);
});

usersRouter.put(usersEndpoint + '/:id', (req: RequestCustom, res: ResponseCustom) => {
    const { id } = req.params;
    res.send({ id });
});

usersRouter.delete(usersEndpoint + '/:id', (req: RequestCustom, res: ResponseCustom) => {
    const { id } = req.params;
    res.send({ id });
});

export default usersRouter;