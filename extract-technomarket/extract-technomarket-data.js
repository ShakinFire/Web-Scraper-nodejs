const domParser = require('../dom-parser');
const { technomarket } = require('../selectors');
const { getUrls } = require('./extract-technomarket-url');
const lodash = require('lodash');

const getPrice = async ($) => {
    const currentPrice = $(technomarket.price).html();
    const decimal = currentPrice.substring(0, currentPrice.indexOf('.') + 1);
    const sup = currentPrice
        .substring(currentPrice.indexOf('sup>') + 4,
        currentPrice.indexOf('</sup'));

    const fullPrice = +(decimal + sup);

    return fullPrice.toFixed(2);
};

const getVendor = async ($) => {
    let vendorModel = $(technomarket.productName).html();
    vendorModel = vendorModel.slice(16, vendorModel.length);
    const final = [vendorModel.substring(0, vendorModel.indexOf(' '))];
    final.push(vendorModel
        .substring(vendorModel.indexOf(' ') + 1, vendorModel.length));

    return final;
};

const instantExtract = async (data, $) => {
    let swap = false;
    if (typeof $(technomarket.SIM).html() !== 'undefined') {
        swap = true;
        const name = await getVendor($);
        data.Vendor = name[0];
        data.Model = name[1];
        data.Price = await getPrice($);
        data.EAN = $(technomarket.EAN).html();
        data.Image = $(technomarket.img).attr('src');
        data.SIM = $(technomarket.SIM).html().trim();
        data.Camera = $(technomarket.camera).html().trim();
        data.OS = $(technomarket.OS).html().trim();
        data.Battery = $(technomarket.battery).html().trim().replace(/\D/g, '');
        data.Memory = $(technomarket.memory).html().trim().replace(/\D/g, '');
    }
    return swap;
};

const extractData = async (url) => {
    const data = {
        Vendor: '',
        Model: '',
        Price: '',
        Image: '',
        Memory: '',
        Battery: '',
        OS: '',
        Camera: '',
        SIM: '',
        EAN: '',
        Store: 'technomarket',
    };
    const $ = await domParser.initDomParser(url);
    if (await instantExtract(data, $)) {
        return data;
    }

    return null;
};

const collectData = async (titles, finishedData) => {
    if (titles.length === 0) {
        return finishedData;
    }

    const phoneUrls = titles.splice(0, 5);
    finishedData.push(await Promise.all(phoneUrls.map((links) => {
        const fullUrl = technomarket.startUrl + links;
        return extractData(fullUrl);
    })));

    return collectData(titles, finishedData);
};

const getTechnomarketData = async () => {
    const allTitles = await getUrls();
    const all = await collectData(allTitles, []);

    return lodash.flatten(all).filter((obj) => obj !== null);
};

module.exports = {
    getTechnomarketData,
};
