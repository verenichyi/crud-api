import { RequestCustom } from 'src/interfaces';

const bodyParser = <T>(req: RequestCustom): Promise<T> | Promise<null> => {
    return new Promise((resolve, reject) => {
        try {
            const chunks = [];

            req.on('data', (chunk) => {
                chunks.push(chunk);
            });
            req.on('end', () => {
                if (chunks.length) {
                    resolve(JSON.parse(Buffer.concat(chunks).toString()));
                }
                resolve(null);
            });
        } catch (error) {
            reject(error);
        }
    });
};

export default bodyParser;