const {
    model,
    spec,
    store,
    vendor,
} = require('../models');

const {
    iterateData,
} = require('../filldb/fill');

const destroyAll = async () => {
    model.destroy({
        where: {},
    });
    spec.destroy({
        where: {},
    });
    store.destroy({
        where: {},
    });
    vendor.destroy({
        where: {},
    });
};

destroyAll();
iterateData();
