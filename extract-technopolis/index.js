const {
    getTotalPages,
} = require('./extract-technopolis-pages.js');

const {
    getAllUrlsPages,
} = require('./extract-technopolis-url.js');

const {
    collectData,
} = require('./extraxt-technopolis-data.js');

module.exports = {
    getTotalPages,
    getAllUrlsPages,
    collectData,
};
