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
    const stores = await store.findCreateFind({
        where: {
            name: phone.Store,
        },
    });

    const vendors = await vendor.findCreateFind({
        where: {
            brand: phone.Vendor,
        },
    });

    const models = await model.create({
        model: phone.Model,
        picture: phone.Image,
        price: phone.Price,
        vendorId: vendors[0].id,
    });

    const allSpecs = {
        Battery: phone.Battery,
        OS: phone.OS,
        Camera: phone.Camera,
        SIM: phone.SIM,
        EAN: phone.EAN,
        Memory: phone.Memory,
    };

    let keys = Object.keys(allSpecs);

    keys = await Promise.all(keys.map(async (key) => {
        const finishedSpecs = await spec.findCreateFind({
            where: {
                type: key,
                value: allSpecs[key],
            },
        });
        return finishedSpecs[0].id;
    }));

    models.setSpecs(keys);
    models.setStores([stores[0].id]);
};

const iterateData = async () => {
    const allData = lodash.flatten(await Promise.all([allTechnopolisData(),
        getTechnomarketData()]));

    await Promise.all(allData.map((phone) => {
        return filldb(phone);
    }));
};
iterateData();
// module.exports = {
//     iterateData,
// };
