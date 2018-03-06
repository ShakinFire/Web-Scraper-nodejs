'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "phones", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "first-migration-test",
    "created": "2018-03-06T14:14:14.626Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "phones",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false
            },
            "vendor": {
                "type": Sequelize.STRING
            },
            "model": {
                "type": Sequelize.STRING
            },
            "createdAt": {
                "type": Sequelize.DATE,
                "allowNull": false
            },
            "updatedAt": {
                "type": Sequelize.DATE,
                "allowNull": false
            }
        },
        {}
    ]
}];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
