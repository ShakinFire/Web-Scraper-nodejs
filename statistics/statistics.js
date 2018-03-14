/* global process */

const {
    orderBy,
    filterBy,
    searchFor,
} = require('./queries');

const {
    print,
 } = require('./output');

const runStatistics = async () => {
    const file = process.argv[2];
    const column = process.argv[3];
    const operation = process.argv[4];
    const extendedOperation = process.argv[5];
    let result;

    if (file === 'order-by') {
        result = await orderBy(column);
        if (result) {
            await print(result);
        }
    } else if (file === 'filter-by') {
        result = await filterBy(column, operation, extendedOperation);
        if (result) {
            await print(result);
        }
    } else if (file === 'search-for') {
        result = await searchFor(column);
        if (result) {
            await print(result);
        }
    } else {
        console.log('Invalid command');
    }
};

runStatistics();