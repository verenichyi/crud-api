const searchPattern = (source: string, paths: string[]): string => {
    const sourceElements = source.split('/').filter(el => el);
    let pattern = '';

    paths.forEach((path) => {
        const patternSlices = [];

        const patternElements = path.split('/').filter(el => el);
        const isLengthEqual = patternElements.length === sourceElements.length;

        if (!isLengthEqual) return;

        for (let i = 0; i < patternElements.length; i++) {
            const patternElement = patternElements[i];
            const sourceElement = sourceElements[i];
            const isElementsEqual = patternElement === sourceElement;

            if (!isElementsEqual && patternElement[0] === ':') {
                patternSlices.push(patternElement);
            }

            if (isElementsEqual) {
                patternSlices.push(patternElement);
            }
        }

        if (patternSlices.length === patternElements.length) {
            pattern = '/' + patternSlices.join('/');
        }
    });

    return pattern;
};

export default searchPattern;