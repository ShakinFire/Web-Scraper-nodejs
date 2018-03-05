const {
    getTotalPages,
    } = require('./extract-technopolis-pages.js');

const { technopolis } = require('../selectors');
const domParser = require('../dom-parser');
const lodash = require('lodash');

const getDomTree = async (titleUrl) => {
    const $ = await domParser.initDomParser(titleUrl);
    const allTitleArr = $(technopolis.allProductsUrl);
    return [...allTitleArr].map((link) => {
        link = $(link);
        return link.attr('href');
    });
};

const getAllUrlsPages = async () => {
    const allPages = await getTotalPages();
    const allUrls = Array.from({ length: allPages }).fill('');
    const url = technopolis.url;
    const endUrl = url.substring(url.indexOf('page=') + 6, url.length);
    const startUrl = url.substring(0, (url.indexOf('page=') + 5));

    const allTitles = await Promise.all(allUrls.map((value, index) => {
        value = startUrl + index + endUrl;
        return getDomTree(value);
    }));

    return lodash.flatten(allTitles);
};

module.exports = {
    getAllUrlsPages,
};
