module.exports = {
    technopolis: {
        totalProducts: `.filter-container .top-filter 
        label[for=pageselect] span`,
        url: 'http://www.technopolis.bg/bg//%D0%9C%D0%BE%D0%B1%D0%B8%D0%BB%D0%BD%D0%B8-%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B8-%D0%B8-%D0%A2%D0%B0%D0%B1%D0%BB%D0%B5%D1%82%D0%B8/%D0%9C%D0%BE%D0%B1%D0%B8%D0%BB%D0%BD%D0%B8-%D1%82%D0%B5%D0%BB%D0%B5%D1%84%D0%BE%D0%BD%D0%B8/c/P11040101?pageselect=48&page=0&q=:price-asc&text=&layout=List&sort=price-asc',
        startUrl: 'http://www.technopolis.bg',
        allProductsUrl: '.product-box .text h2 a',
        dataCharacteristics: '.line-tabs tbody td',
        price: '.product-description .priceValue',
        img: '.product-inner img',
    },
    technomarket: {
        url: 'https://www.technomarket.bg/product/filter?filter_key=%2Ftelefoni%7Cstatic%7Cstatic&size=999',
        allProductsUrl: 'div.product-name a',
        startUrl: 'https://www.technomarket.bg',
        price: '.contentholder .product-price .new',
        productName: '.contentholder .product-thumb span',
        mainInfo: '.contentholder .product-name .product-description li',
        EAN: '.product-model span[itemprop = "gtin13"]',
        img: '.product-thumb .product-image img',
        SIM: '.tab-content tbody tr:nth-child(12) td',
        camera: '.tab-content tbody tr:nth-child(5) td',
        OS: '.tab-content tbody tr:nth-child(11) td',
        battery: '.tab-content tbody tr:nth-child(9) td',
        memory: '.tab-content tbody tr:nth-child(4) td',
    },
};
