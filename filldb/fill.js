const {
    vendor,
    store,
    model,
    spec,
} = require('../models');

const {
    allTechnopolisData,
} = require('../extract-technopolis');

const {
    getTechnomarketData,
} = require('../extract-technomarket');

const lodash = require('lodash');

const filldb = async (phone) => {
    const storesId = await store.findCreateFind({
        where: {
            name: phone.Store,
        },
    });

    const vendorsId = await vendor.findCreateFind({
        whre: {
            brand: phone.Vendor,
        },
    });

    const modelTable = {
        model: phone.Model,
        image: phone.Image,
        price: phone.Price,
        vendorId: vendorsId.id,
    };

    
};

const iterateData = async () => {
    // const allData = lodash.flatten([await allTechnopolisData(),
    //     await getTechnomarketData()]);

    // console.log(allData);
};

iterateData();
