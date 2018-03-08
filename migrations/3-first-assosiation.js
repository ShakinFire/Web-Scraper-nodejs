'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * addColumn "modelId" to table "vendors"
 *
 **/

var info = {
    "revision": 3,
    "name": "first-assosiation",
    "created": "2018-03-08T12:39:03.940Z",
    "comment": ""
};

var migrationCommands = [{
    fn: "addColumn",
    params: [
        "vendors",
        "modelId",
        {
            "type": Sequelize.INTEGER,
            "onUpdate": "CASCADE",
            "onDelete": "CASCADE",
            "references": {
                "model": "models",
                "key": "id"
            },
            "allowNull": false
        }
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
