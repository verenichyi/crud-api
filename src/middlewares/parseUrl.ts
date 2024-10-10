import parseQuery from 'src/helpers/parseQuery';
import parseParams from 'src/helpers/parseParams';
import { RequestCustom } from 'src/interfaces';

const parseUrl = (baseURL: string, paths: string[], req: RequestCustom): void => {
    const { searchParams, pathname } = new URL(req.url, baseURL);

    const query = parseQuery(searchParams);
    const { pattern, params } = parseParams(pathname, paths);

    if (Object.keys(params).length) {
        req.pathname = pattern;
        req.params = params;
    } else {
        req.pathname = pathname;
    }

    req.query = query;
};

export default parseUrl;