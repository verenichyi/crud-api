import supertest from 'supertest';
import * as uuid from 'uuid';
import App from 'src/app';
import { usersRouter } from 'src/api/routes/users-router';
import { TEST_PORT, usersEndpoint } from 'src/constants';
import { IUser } from 'src/interfaces';

const mockUser: IUser = {
    username: 'user',
    age: 26,
    hobbies: [ 'tennis' ]
};

describe('Users API', () => {
    const app = new App();
    app.addRouter(usersRouter);
    app.listen(+TEST_PORT, () => {
    });

    const server = supertest(app.server);

    describe('Scenario 1', () => {
        let user;

        it('should respond with empty users array with GET /api/users request', async () => {
            const response = await server.get(usersEndpoint);
            expect(response.body.length).toBe(0);
        });

        it('should respond with user obj with POST /api/users request', async () => {
            const response = await server.post(usersEndpoint).send(mockUser);
            expect(response.body.id).toBeDefined();

            user = response.body;
        });

        it('should respond with certain user with GET /api/users/{userId} request', async () => {
            const response = await server.get(`${usersEndpoint}/${user.id}`);
            expect(response.body.username).toBe(mockUser.username);
        });

        it('should respond with the same user id as in request with PUT /api/users/{userId} request', async () => {
            const response = await server.put(`${usersEndpoint}/${user.id}`);
            expect(response.body.id).toBe(user.id);
        });

        it('should successfully delete user with DELETE /api/users/{userId} request', async () => {
            const response = await server.delete(`${usersEndpoint}/${user.id}`);
            expect(response.statusCode).toBe(204);
        });

        it('should respond with 404 status code when trying to get deleted user by id with GET /api/users/{userId} request', async () => {
            const response = await server.get(`${usersEndpoint}/${user.id}`);
            expect(response.statusCode).toBe(404);
        });
    });

    describe('Scenario 2', () => {
        it('should specify json in the content type header and respond with 200 status code with GET /api/users request', async () => {
            const response = await server.get(usersEndpoint);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
            expect(response.statusCode).toBe(200);
        });

        it('should specify json in the content type header and respond with 201 status code with POST /api/users request', async () => {
            const response = await server.post(usersEndpoint).send(mockUser);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
            expect(response.statusCode).toBe(201);
        });
    });

    describe('Scenario 3', () => {
        it('should respond with 400 status code with POST /api/users request when some data is missed or data is wrong', async () => {
            const bodyData = [
                {
                    username: 'user',
                    hobbies: []
                },
                {
                    age: 20,
                    hobbies: []
                },
                {
                    username: 'user',
                    age: 20,
                },
                {
                    username: 'user',
                    age: 20,
                    hobbies: 'tennis'
                },
            ];

            for (const body of bodyData) {
                const response = await server.post(usersEndpoint).send(body);
                expect(response.statusCode).toBe(400);
            }
        });

        it('should respond with 404 status code when path is wrong', async () => {
            const response = await server.get(`${usersEndpoint}wrongPath`);
            expect(response.statusCode).toBe(404);
        });

        it('should respond with 400 status code when uuid is wrong', async () => {
            const id = uuid.v4() + '0';
            const response = await server.get(`${usersEndpoint}/${id}`);
            expect(response.statusCode).toBe(400);
        });
    });
});