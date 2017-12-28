require.config({
    baseUrl: './',
    paths: {
        'angular': 'assets/angular/angular.min',
        'angular-ui-router': 'assets/angular-ui-router/release/angular-ui-router.min',
        'angular-async-loader': 'assets/angular-async-loader/angular-async-loader.min',
        'angular-ui-mask': 'assets/angular-ui-mask/dist/mask.min',
        'ng-tags-input': 'assets/ng-tags-input/build/ng-tags-input.min',
        'ng-file-upload': 'assets/ng-file-upload/dist/ng-file-upload-all.min',

        'translate': 'assets/angular-translate/angular-translate.min',
        'translate_static_file': 'assets/angular-translate-loader-static-files/angular-translate-loader-static-files',
        'storage_cookie': 'assets/angular-translate-storage-cookie/angular-translate-storage-cookie.min',
        'translate_partial': 'assets/bower-angular-translate-loader-partial-master/angular-translate-loader-partial'

    },
    shim: {
        'angular': {exports: 'angular'},
        'angular-ui-router': {deps: ['angular']},
        'translate': {
            deps: ['angular'],
            exports: 'translate'
        },
        'translate_static_file': {
            deps: ['angular', 'translate']/*,
            exports: "translate_static_file"*/
        },
        'storage_cookie': {
            deps: ['angular', 'translate', 'translate_static_file']
        },
        'translate_partial': {
            deps: ['angular', 'translate']
        }
    }
});

require(['angular', './app-routes', './services/myTranlate'], function (angular) {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['app']);
        angular.element(document).find('html').addClass('ng-app');
    });
});

