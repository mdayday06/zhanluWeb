/**
 * Created by zhangjiangang on 2017/12/11.
 */
/*
define([
    //'../app',
    'require'
], function( require){

    var app = require('../app');

    app.config(['$translateProvider', function($translateProvider){
        $translateProvider.preferredLanguage("zh-cn");
        $translateProvider.useStaticFilesLoader({
            prefix: 'nls/',
            suffix: '.json'
        });

        //$translateProvider.useCookieStorage();


    }]);

});*/

define(function(require){
    var app = require('../app');

    /*app.config(['$translateProvider', function($translateProvider){
        $translateProvider.preferredLanguage("zh-cn");
        $translateProvider.useStaticFilesLoader({
            prefix: 'nls/',
            suffix: '.json'
        });

        //$translateProvider.useCookieStorage();

    }]);*/

    app.run(function($rootScope, $translate){
        $rootScope.$on('$translatePartialLoaderStructureChanged', function(){
            $translate.refresh();
        })
    })
        .config(function($translateProvider, $translatePartialLoaderProvider){
            $translatePartialLoaderProvider.addPart('global');
            $translateProvider.useLoader('$translatePartialLoader', {
                urlTemplate: 'nls/{part}/{lang}.json'
            });

            $translateProvider.preferredLanguage('zh-cn');


        });


});
