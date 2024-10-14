import searchPattern from 'src/utils/searchPattern';
import { IParsedParamsWithPattern } from 'src/interfaces';

const parseParams = (source: string, paths: string[]): IParsedParamsWithPattern => {
    const pattern = searchPattern(source, paths);

    const sourceElements = source.split('/').filter(el => el);
    const patternElements = pattern.split('/').filter(el => el);

    const params = {};
    for (let i = 0; i < patternElements.length; i++) {
        const patternElement = patternElements[i];
        const sourceElement = sourceElements[i];

        if (patternElement[0] === ':') {
            params[patternElement.slice(1)] = sourceElement;
        }
    }

    return { pattern, params };
};

export default parseParams;