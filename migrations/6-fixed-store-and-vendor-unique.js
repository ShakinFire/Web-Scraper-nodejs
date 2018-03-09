'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * changeColumn "name" on table "stores"
 * changeColumn "brand" on table "vendors"
 *
 **/

var info = {
    "revision": 6,
    "name": "fixed-store-and-vendor-unique",
    "created": "2018-03-09T13:47:32.802Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "changeColumn",
        params: [
            "stores",
            "name",
            {
                "type": Sequelize.STRING,
                "unique": true,
                "allowNull": false
            }
        ]
    },
    {
        fn: "changeColumn",
        params: [
            "vendors",
            "brand",
            {
                "type": Sequelize.STRING,
                "unique": true,
                "allowNull": false
            }
        ]
    }
];

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
