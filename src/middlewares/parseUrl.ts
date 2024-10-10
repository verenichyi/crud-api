import parseQuery from 'src/utils/parseQuery';
import parseParams from 'src/utils/parseParams';
import { RequestCustom } from 'src/interfaces';

const parseUrl = (baseURL: string, paths: string[], req: RequestCustom): void => {
    const { searchParams, pathname } = new URL(req.url, baseURL);

    const query = parseQuery(searchParams);
    const { pattern, params } = parseParams(pathname, paths);

    if (Object.keys(params).length) {
        req.pathname = pattern;
    } else {
        req.pathname = pathname;
    }

    req.params = params;
    req.query = query;
};

export default parseUrl;