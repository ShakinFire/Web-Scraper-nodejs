const url = 'http://www.technopolis.bg/bg//%D0%9A%D0%BE%D0%BC%D0%BF%D1%8E%D1%82%D1%8A%D1%80%D0%BD%D0%B8-%D0%B0%D0%BA%D1%81%D0%B5%D1%81%D0%BE%D0%B0%D1%80%D0%B8/%D0%A3%D0%B5%D0%B1-%D0%BA%D0%B0%D0%BC%D0%B5%D1%80%D0%B8/c/P11020601';

const extractPageUrl = async () => {
    const pageSelect = '.paging ul a';
    const $ = await require('./dom-parser')(url);
    // return [...$(pageSelect)].map((link) => $(link).attr('href'));
    console.log($);
};

const run = async () => {
    const pageUrl = await extractPageUrl();
    console.log(pageUrl);
};

extractPageUrl();