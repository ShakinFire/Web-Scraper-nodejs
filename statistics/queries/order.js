const {
    model,
    spec,
    store,
    vendor,
} = require('../../models');

const Sequelize = require('sequelize');

const orderBy = async (column) => {
    let orderedRecords;
    if (column === 'model' || column === 'brand' || column === 'stores'
        || column === 'price') {
        if (column === 'stores') {
            column += '.name';
        }

        orderedRecords = await model.findAll({
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
        orderedRecords = await model.findAll({
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

    orderedRecords.map((record) => console.log(record.get({
        plain: true,
    })));
};

module.exports = {
    orderBy,
};
