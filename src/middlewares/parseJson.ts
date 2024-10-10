import { RequestCustom, ResponseCustom } from 'src/interfaces';

const parseJson = (req: RequestCustom, res: ResponseCustom): void => {
    res.send = (data) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    };
};

export default parseJson;