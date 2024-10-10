import { ClientError } from 'src/api/exceptions/ClientError';
import { ServerErrorMessage, StatusCodes } from 'src/constants';

const handleError = (error, res) => {
    if (error instanceof ClientError) {
        const { status, message } = error;

        res.statusCode = status;
        res.send({ message });
    } else {
        res.statusCode = StatusCodes.InternalServerError;
        res.send({
            message: ServerErrorMessage.InternalServerError
        });
    }
};

export default handleError;