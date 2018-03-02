const {
    getAllUrlsPages,
    } = require('./extract-technopolis-url.js');

const { technopolis } = require('../selectors');
const domParser = require('../dom-parser');

const getPrice = async ($) => {
    const wholeSpan = $(technopolis.price).html();

    const leftSide = wholeSpan
        .substring(0, wholeSpan.indexOf('<span'))
        .replace(/\s/g, '');
    const rightSide = wholeSpan
        .substring(wholeSpan.indexOf('sup>') + 4, wholeSpan.indexOf('</sup'));

    const price = +(leftSide + '.' + rightSide);
    return price.toFixed(2);
};

const domExtractData = async (productUrl) => {
    const $ = await domParser.initDomParser(productUrl);
    const data = {};
    const holdData = $(technopolis.dataCharacteristics);
    data.price = await getPrice($);
    data.img = technopolis.startUrl + $(technopolis.img).attr('src');

    [...holdData].forEach((element, index, arr) => {
        if (index % 2 === 0) {
            data[element.innerHTML] = '';
        } else {
            if (element.innerHTML[0] === '<') {
                let sub = element.innerHTML
                .substring(element.innerHTML
                .indexOf('option') + 7, element.innerHTML
                .indexOf('option') + 9);

                if (sub === 'ye') {
                    sub = 'yes';
                }
                sub = sub.toUpperCase();
                data[arr[index - 1].innerHTML] = sub;
            } else {
                data[arr[index - 1].innerHTML] = element.innerHTML;
            }
        }
    });

    return data;
};

const collectData = async (titles, finishedData) => {
    // const fullUrl = technopolis.startUrl + allTitles[0];
    // const data = await domExtractData(fullUrl);

    // const data = await Promise.all(allTitles.map((url) => {
    //     const fullUrl = technopolis.startUrl + url;
    //     return domExtractData(fullUrl);
    // }));

    if (titles.length === 0) {
        return finishedData;
    }

    const mainUrl = technopolis.startUrl;

    finishedData.push(await Promise.all([
        domExtractData(mainUrl + titles.pop()),
        domExtractData(mainUrl + titles.pop()),
        // domExtractData(mainUrl + titles.pop()),
        // domExtractData(mainUrl + titles.pop()),
        // domExtractData(mainUrl + titles.pop()),
    ]));
    console.log(finishedData);
    collectData(titles, finishedData);
};

const allData = async () => {
    const allTitles = await getAllUrlsPages();
    const all = await collectData(allTitles, []);

    console.log(all);
};


allData();

// module.exports = {
//     collectData,
// };