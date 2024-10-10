type Query = {
    [key: string]: string;
}

const parseQuery = (searchParams: URLSearchParams): Query => {
    const query = {};

    searchParams.forEach((value, name) => {
        query[name] = value;
    });

    return query;
};

export default parseQuery;