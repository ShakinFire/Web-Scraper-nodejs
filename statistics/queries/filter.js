const Sequelize = require('sequelize');

const {
    model,
    spec,
    store,
    vendor,
} = require('../../models');

const filterBy = async (column, cond, extendedValue) => {
    let op = Sequelize.Op;
    let filteredData;
    if (cond === 'gt') {
        op = op.gt;
    } else if (cond === 'lt') {
        op = op.lt;
    }

    if (column === 'os') {
        filteredData = await model.findAll({
            include: [
                {
                    model: spec,
                    attributes: ['type', 'value'],
                    order: Sequelize.col('value'),
                    where: {
                        type: column,
                        value: cond,
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
    } else if (column === 'brand') {
        filteredData = await model.findAll({
            include: [
                {
                    model: spec,
                    attributes: ['type', 'value'],
                },
                {
                    model: vendor,
                    attributes: ['brand'],
                    order: Sequelize.col(column),
                    where: {
                        brand: cond,
                    },
                },
                {
                    model: store,
                    attributes: ['name'],
                },
            ],
        });
    } else if (column === 'store') {
        filteredData = await model.findAll({
            include: [
                {
                    model: spec,
                    attributes: ['type', 'value'],
                },
                {
                    model: vendor,
                    attributes: ['brand'],
                },
                {
                    model: store,
                    attributes: ['name'],
                    order: Sequelize.col(column),
                    where: {
                        name: cond,
                    },
                },
            ],
        });
    } else if (column === 'price') {
        filteredData = await model.findAll({
            include: [
                {
                    model: spec,
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
            order: Sequelize.col('price'),
            where: {
                price: {
                    [op]: +extendedValue,
                },
            },
        });
    } else if (column === 'memory' || column === 'battery'
        || column === 'camera') {
        filteredData = await model.findAll({
            include: [
                {
                    model: spec,
                    attributes: ['type', 'value'],
                    order: Sequelize.col('value'),
                    where: {
                        type: column,
                        value: {
                            [op]: +extendedValue,
                        },
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
        console.log('invalid command');
    }

    if (filteredData.length === 0) {
        console.log('Nothing found, check your command!');
    }

    if (typeof filteredData !== 'undefined') {
        filteredData.map((record) => record.get({
            plain: true,
        }));
    }
    return filteredData;
};

module.exports = {
    filterBy,
};
