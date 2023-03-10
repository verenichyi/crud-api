import { RequestCustom } from 'src/interfaces';

const parseBody = <T>(req: RequestCustom): Promise<T | null> => {
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

export default parseBody;