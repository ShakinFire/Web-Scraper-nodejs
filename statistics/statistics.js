/* global process */

const {
    orderBy,
    filterBy,
    searchFor,
} = require('./queries');

const runStatistics = async () => {
    const file = process.argv[2];
    const column = process.argv[3];
    const operation = process.argv[4];
    const extendedOperation = process.argv[5];

    if (file === 'order-by') {
        await orderBy(column);
    } else if (file === 'filter-by') {
        await filterBy(column, operation, extendedOperation);
    } else if (file === 'search-for') {
        console.log('yes');
        await searchFor(column);
    } else {
        console.log('Invalid command');
    }
};

runStatistics();