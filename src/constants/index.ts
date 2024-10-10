import { config } from 'dotenv';

config();

export const defaultPort = 5000;
export const PORT = process.env.PORT || defaultPort;
export const baseURL = `http://localhost:${PORT}`;
export const usersEndpoint = '/api/users';

export const enum StatusCodes {
    'OK' = 200,
    'Created' = 201,
    'No Content' = 204,
    'Bad Request' = 400,
    'Not Found' = 404,
    'Internal Server Error' = 500,
}