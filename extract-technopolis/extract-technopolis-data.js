const { getAllUrlsPages } = require('./extract-technopolis-url.js');
const { technopolis } = require('../selectors');
const domParser = require('../dom-parser');
const lodash = require('lodash');

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

const getInfo = async (element, index, arr, data) => {
    if (index % 2 === 0) {
        if (element.innerHTML === 'Марка') {
            data.Vendor = arr[index + 1].innerHTML;
        } else if (element.innerHTML === 'МОДЕЛ') {
            data.Model = arr[index + 1].innerHTML;
        } else if (element.innerHTML === 'ВГРАДЕНА ПАМЕТ') {
            const number = arr[index + 1].innerHTML.replace(/\D/g, '');
            data.Memory = number;
        } else if (element.innerHTML === 'ТИП БАТЕРИЯ') {
            data.Battery = arr[index + 1].innerHTML.replace(/\D/g, '');
        } else if (element.innerHTML === 'ОПЕРАЦИОННА СИСТЕМА') {
            if (arr[index + 1].innerHTML[0] === '<') {
                data.OS = 'No information';
            } else {
                data.OS = arr[index + 1].innerHTML;
            }
        } else if (element.innerHTML === 'ТИП SIM КАРТА') {
            data.SIM = arr[index + 1].innerHTML;
        } else if (element.innerHTML === 'ЗАДНА КАМЕРА') {
            data.Camera = arr[index + 1].innerHTML.replace(/\D/g, '');
        } else if (element.innerHTML === 'EAN') {
            data.EAN = arr[index + 1].innerHTML;
        }
    }
};

const domExtractData = async (productUrl) => {
    const $ = await domParser.initDomParser(productUrl);
    const data = {
        Vendor: 'No information',
        Model: 'No information',
        Price: 'No information',
        Image: 'No information',
        Memory: 'No information',
        Battery: 'No information',
        OS: 'No information',
        Camera: 'No information',
        SIM: 'No information',
        EAN: 'No information',
        Store: 'technopolis',
    };
    const holdData = $(technopolis.dataCharacteristics);
    data.Price = await getPrice($);
    data.Image = technopolis.startUrl + $(technopolis.img).attr('src');

    [...holdData].forEach((element, index, arr) => {
        return getInfo(element, index, arr, data);
    });

    if (data.SIM === '') {
        data.SIM = 'DUAL SIM';
    }
    return data;
};

const collectData = async (titles, finishedData) => {
    if (titles.length === 0) {
        return finishedData;
    }

    const phoneUrls = titles.splice(0, 5);
    finishedData.push(await Promise.all(phoneUrls.map((value) => {
        const finalUrl = technopolis.startUrl + value;
        return domExtractData(finalUrl);
    })));

    return collectData(titles, finishedData);
};

const allTechnopolisData = async () => {
    const allTitles = await getAllUrlsPages();
    const all = await collectData(allTitles, []);
    return lodash.flatten(all);
};

module.exports = {
    allTechnopolisData,
};
