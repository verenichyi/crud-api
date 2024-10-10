import { ClientErrorMessage, StatusCodes } from 'src/constants';

export class ClientError extends Error {
    constructor(public status: number, public message: string) {
        super(message);
    }

    static BadRequest() {
        return new ClientError(StatusCodes.BadRequest, ClientErrorMessage.BadRequest);
    }

    static NotFound() {
        return new ClientError(StatusCodes.NotFound, ClientErrorMessage.NotFound);
    }
}