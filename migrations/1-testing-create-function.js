'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "phone-tests", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "testing-create-function",
    "created": "2018-03-04T16:30:47.745Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "createTable",
    params: [
        "phone-tests",
        {
            "id": {
                "type": Sequelize.INTEGER,
                "autoIncrement": true,
                "primaryKey": true,
                "allowNull": false
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
