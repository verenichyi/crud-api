import { IncomingMessage, ServerResponse } from 'node:http';

export interface RequestCustom extends IncomingMessage {
    body?: any;
    pathname?: string;
    params?: any;
    query?: any;
}

export interface ResponseCustom extends ServerResponse {
    send?: (statusCode: number, data: any) => void;
}

export interface IParsedParamsWithPattern {
    pattern: string,
    params: {
        [key: string]: string
    }
}

export interface IUser {
    username: string;
    age: number;
    hobbies: string[];
}

export interface IUserSchema {
    id: string;
    username: string;
    age: number;
    hobbies: string[];
}