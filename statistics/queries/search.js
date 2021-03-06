const {
    model,
    spec,
    store,
    vendor,
} = require('../../models');

const searchFor = async (searchedValue) => {
    const searchedData = await model.findAll({
        include: [
            {
                model: spec,
                where: {
                    value: {
                        like: '%' + searchedValue + '%',
                    },
                },
                attributes: ['type', 'value'],
            },
            {
                model: vendor,
                attributes: ['brand'],
            },
            {
                model: store,
                attributes: ['name'],
            },
        ],
    });

    if (searchedData.length !== 0) {
        searchedData.map((record) => record.get({
            plain: true,
        }));
    } else {
        console.log('Nothing found!');
    }

    return searchedData;
};

module.exports = {
    searchFor,
};
