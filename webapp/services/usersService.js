define(function (require) {
    var angular = require('angular');
    var app = require('../app');

    // put into a new module for demo
    var module = angular.module('my.mod.1', []);

    module.service('usersService', function () {
        return {
            list: function () {
                return [
                    {
                        name: 'mdayday06',
                        mail: 'mdayday06@email.com'
                    }, {
                        name: 'zhangjiangang',
                        mail: 'zhangjiangang@inspur.com'
                    }
                ];
            }
        };
    });

    app.useModule('my.mod.1');
});
