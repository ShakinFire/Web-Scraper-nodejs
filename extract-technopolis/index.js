const {
    getTotalPages,
} = require('./extract-technopolis-pages.js');

const {
    getAllUrlsPages,
} = require('./extract-technopolis-url.js');

const {
    allTechnopolisData,
} = require('./extract-technopolis-data.js');

module.exports = {
    getTotalPages,
    getAllUrlsPages,
    allTechnopolisData,
};
