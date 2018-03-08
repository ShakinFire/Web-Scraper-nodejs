'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * removeColumn "modelId" from table "vendors"
 * addColumn "vendorId" to table "models"
 *
 **/

var info = {
    "revision": 5,
    "name": "changed-belongs-to-assosiation",
    "created": "2018-03-08T13:29:17.768Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "removeColumn",
        params: ["vendors", "modelId"]
    },
    {
        fn: "addColumn",
        params: [
            "models",
            "vendorId",
            {
                "type": Sequelize.INTEGER,
                "onUpdate": "CASCADE",
                "onDelete": "CASCADE",
                "references": {
                    "model": "vendors",
                    "key": "id"
                },
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
