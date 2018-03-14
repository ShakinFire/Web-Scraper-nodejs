const consoleTable = require('console.table');

const print = async (arr) => {
    arr.forEach((phone) => {
        const specs = consoleTable.getTable(phone.specs.map((value) => {
            return {
                spec: value.type,
                val: value.value,
            };
        }));
        const store = consoleTable.getTable(phone.stores.map((value) => {
            return {
                store: value.name,
            };
        }));
        console.log('Brand:', phone.vendor.brand);
        console.log('Model:', phone.model);
        console.log('Price:', phone.price);
        console.log(store);
        console.log(specs);
        console.log('*'.repeat(50));
    });
};

module.exports = {
    print,
};
