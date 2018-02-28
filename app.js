const { getTotalPages } = require('./extract-dom-elements');

const run = async () => {
    const allPages = await getTotalPages();
    const arr = Array.from({ length: allPages }).fill('');
    console.log(arr);
};

run();
