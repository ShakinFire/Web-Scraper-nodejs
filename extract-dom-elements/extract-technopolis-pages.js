const domParser = require('../dom-parser');
const { technopolis } = require('../selectors');

const extractProductsAmount = async () => {
    const $ = await domParser.initDomParser(technopolis.url);
    const total = $(technopolis.totalProducts).html().trim();
    return total;
};

const getTotalPages = async () => {
    const productsOnPage = 48;
    const total = await extractProductsAmount();
    return Math.ceil(total / productsOnPage);
};

module.exports = {
    getTotalPages,
};
