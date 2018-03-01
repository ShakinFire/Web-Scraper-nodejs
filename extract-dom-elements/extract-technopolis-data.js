const {
    getAllUrlsPages,
    } = require('./extract-technopolis-url.js');

const { technopolis } = require('../selectors');
const domParser = require('../dom-parser');

const domExtractData = async (productUrl) => {
    const $ = await domParser.initDomParser(productUrl);
    const data = {};
    const holdData = $(technopolis.dataCharacteristics);

    [...holdData].forEach((element, index, arr) => {
        if (index % 2 === 0) {
            data[element.innerHTML] = '';
        } else {
            if (element.innerHTML[0] === '<') {
                let sub = element.innerHTML.substring(element.innerHTML.indexOf('option') + 7, element.innerHTML.indexOf('option') + 9);
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

const collectData = async () => {
    const allTitles = await getAllUrlsPages();
    const fullUrl = technopolis.startUrl + allTitles[0];
    const data = await domExtractData(fullUrl);
    // const data = await Promise.all(allTitles.forEach((url) => {
    //     const fullUrl = technopolis.startUrl + url;
    //     return domExtractData(fullUrl);
    // }));

    console.log(data);
};

collectData();
