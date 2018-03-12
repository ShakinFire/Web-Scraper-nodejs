/* global process */

const {
    orderBy,
    filterBy,
    searchBy,
} = require('./queries');

const runStatistics = async () => {
    const file = process.argv[2];
    const column = process.argv[3];
    const operation = process.argv[4];
    const extendOperation = process.argv[5];

    if (file === 'order-by') {
        await orderBy(column);
    } else if (file === 'filter-by') {

    } else if (file === 'search-by') {

    } else {
        console.log('Invalid command');
    }
};

runStatistics();