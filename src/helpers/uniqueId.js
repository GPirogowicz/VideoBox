function uniqueId() {
    const firstItem = {
        value: '0',
    };
    /*length can be increased for lists with more items.*/
    let counter = '123456789'.split('').reduce((acc, curValue) => {
        const curObj = {};
        curObj.value = curValue;
        curObj.prev = acc;

        return curObj;
    }, firstItem);
    firstItem.prev = counter;

    return function() {
        let now = Date.now();
        if (
            typeof performance === 'object' &&
            typeof performance.now === 'function'
        ) {
            now = performance
                .now()
                .toString()
                .replace('.', '');
        }
        counter = counter.prev;
        return `${now}${Math.random()
            .toString(16)
            .substr(2)}${counter.value}`;
    };
}

export default uniqueId;
