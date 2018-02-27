const {
    JSDOM,
} = require('jsdom');
const $init = require('jquery');

const initDomParser = (url) => {
    return new Promise((resolve) => {
        const dom = JSDOM.fromURL(url);
        const $ = $init(dom.window);
        resolve($);
    });
};

module.exports = {
    initDomParser,
};
