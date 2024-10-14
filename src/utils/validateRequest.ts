import * as uuid from 'uuid';
import { IUser, RequestCustom } from 'src/interfaces';
import { ClientError } from 'src/api/exceptions/ClientError';

const validateUuid = (id: string): void => {
    const isUuid = uuid.validate(id);
    if (!isUuid) {
        throw ClientError.BadRequest();
    }
};

const checkRequiredFields = (body: IUser): void => {
    const { username, age, hobbies } = body;
    const isUsernameValid = username && typeof username === 'string';
    const isAgeValid = age && typeof age === 'number';
    const isHobbiesValid = hobbies && Array.isArray(hobbies) && hobbies.every((hobby: string) => typeof hobby === 'string');

    if (!isUsernameValid || !isAgeValid || !isHobbiesValid) {
        throw ClientError.BadRequest();
    }
};

const validateRequest = (req: RequestCustom): void => {
    const { id } = req.params;
    const body = req.body;

    if (id) {
        validateUuid(id);
    }

    if (body) {
        checkRequiredFields(body);
    }
};

export default validateRequest;