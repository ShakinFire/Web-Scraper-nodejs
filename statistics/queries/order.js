const {
    model,
    spec,
    store,
    vendor,
} = require('../../models');

const Sequelize = require('sequelize');

const orderBy = async (column) => {
    let orderedData;
    if (column === 'model' || column === 'brand' || column === 'stores'
        || column === 'price') {
        if (column === 'stores') {
            column += '.name';
        }

        orderedData = await model.findAll({
            include: [
                {
                    model: vendor,
                    attributes: ['brand'],
                },
                {
                    model: store,
                    attributes: ['name'],
                },
                {
                    model: spec,
                },
            ],
            order: Sequelize.col(column),
        });
    } else if (column === 'memory' || column === 'battery' || column === 'os'
    || column === 'camera' || column === 'sim' || column === 'ean') {
        orderedData = await model.findAll({
            include: [
                {
                    model: spec,
                    attributes: ['type', 'value'],
                    order: Sequelize.col('value'),
                    where: {
                        type: column,
                    },
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
    } else {
        console.log('Invalid column');
    }

    if (typeof orderedData !== 'undefined') {
        orderedData.map((record) => console.log(record.get({
            plain: true,
        })));
    }
    return orderedData;
};

module.exports = {
    orderBy,
};
