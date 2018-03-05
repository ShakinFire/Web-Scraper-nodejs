const domParser = require('../dom-parser');
const { technomarket } = require('../selectors');

const extractUrls = async (pageUrl) => {
    const $ = await domParser.initDomParser(pageUrl);
    const allTitlesUrls = $(technomarket.allProductsUrl);

    return [...allTitlesUrls].map((link) => {
        link = $(link);
        return link.attr('href');
    });
};

const getUrls = async () => {
    const link = technomarket.url;
    const allUrls = await extractUrls(link);

    return allUrls;
};

module.exports = {
    getUrls,
};
