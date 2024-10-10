import { config } from 'dotenv';

config();

export const MULTI = process.env.MULTI || false;
export const defaultPort = 5000;
export const PORT = process.env.PORT || defaultPort;
export const baseURL = `http://localhost:${PORT}`;
export const usersEndpoint = '/api/users';

export const enum StatusCodes {
    'OK' = 200,
    'Created' = 201,
    'NoContent' = 204,
    'BadRequest' = 400,
    'NotFound' = 404,
    'InternalServerError' = 500,
}

export const enum ClientErrorMessage {
    'BadRequest' = 'Invalid request',
    'NotFound' = `Resource doesn't exist`,
}

export const enum ServerErrorMessage {
    'InternalServerError' = 'Something went wrong',
}