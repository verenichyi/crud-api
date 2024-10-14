import { ResponseCustom } from 'src/interfaces';

const parseJson = (res: ResponseCustom): void => {
    res.send = (statusCode, data) => {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = statusCode;
        res.end(JSON.stringify(data));
    };
};

export default parseJson;