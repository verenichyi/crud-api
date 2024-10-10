import { IncomingMessage, ServerResponse } from 'node:http';

export interface RequestCustom extends IncomingMessage {
    body?: any;
    pathname?: string;
    params?: any;
    query?: any;
}

export interface ResponseCustom extends ServerResponse {
    send?: (data: any) => void;
}

export interface IUrlToParamsWithPattern {
    pattern: string,
    params: {
        [key: string]: string
    }
}