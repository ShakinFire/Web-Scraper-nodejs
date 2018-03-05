const domParser = require('../dom-parser');
const { technomarket } = require('../selectors');
const { getUrls } = require('./extract-technomarket-url');

const getMainInfo = async ($) => {
    const info = $(technomarket.mainInfo);
    return [...info].map((pair) => {
        pair = $(pair);
        return pair.html().split(':');
    });
};

const getPrice = async ($) => {
    const currentPrice = $(technomarket.price).html();
    const decimal = currentPrice.substring(0, currentPrice.indexOf('.') + 1);
    const sup = currentPrice
        .substring(currentPrice.indexOf('sup>') + 4,
        currentPrice.indexOf('</sup'));

    const fullPrice = +(decimal + sup);

    return fullPrice.toFixed(2);
};

const extractData = async (url) => {
    const data = {};
    const $ = await domParser.initDomParser(url);
    let name = $(technomarket.productName).html();
    name = name.slice(15, name.length);
    const price = await getPrice($);
    const mainInfo = await getMainInfo($);
    console.log(mainInfo);
};

extractData('https://www.technomarket.bg/telefoni/huawei-y6-2017-ds-gray-09158091');

const collectData = async (titles, finishedData) => {
    if (titles.length === 0) {
        return finishedData;
    }

    const phoneUrls = titles.splice(0, 5);
    finishedData.push(await Promise.all(phoneUrls.map((links) => {
        const fullUrl = technomarket.startUrl + links;
        return extractData(fullUrl);
    })));

    return finishedData;
};

const getAllData = async () => {
    const allTitles = await getUrls();
    const all = collectData(allTitles, []);

    return all;
};

// module.exports = {
//     getAllData,
// };