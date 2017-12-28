define(function (require, exports, module) {
    var angular = require('angular');
    var asyncLoader = require('angular-async-loader');

    require('angular-ui-router');

    require('translate');
    //require("translate_static_file");
    //require('storage_cookie');
    require('translate_partial');

    var app = angular.module('app', ['ui.router', 'pascalprecht.translate']);




    /*app.config(['$translateProvider', function($translateProvider){
        $translateProvider.useStaticFilesLoader({
            prefix: 'nls/',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage("zh-cn");

    }]);
*/

    asyncLoader.configure(app);


    module.exports = app;
});
