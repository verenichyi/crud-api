import { ClientError } from 'src/api/exceptions/ClientError';
import { ServerErrorMessage, StatusCodes } from 'src/constants';

const handleError = (error, res) => {
	if (error instanceof ClientError) {
		const { status, message } = error;

		res.send(status, { message });
	} else {
		res.send(StatusCodes.InternalServerError, {
			message: ServerErrorMessage.InternalServerError
		});
	}
};

export default handleError;