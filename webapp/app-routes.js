define(function (require) {
    var app = require('./app');

    app.run(['$state', '$stateParams', '$rootScope', function ($state, $stateParams, $rootScope) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }]);

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('home');

        $stateProvider
            .state('content', {
                url: '/',
                abstract: true,
                views:{
                    '': {
                        templateUrl: 'home/content.html'
                    },
                    'header@content': {
                        templateUrl: 'home/header.html'
                    }
                }
            })
            .state('content.home', {
                url: 'home',
                views: {
                    'body@content': {
                        templateUrl: 'home/home.html',
                        controllerUrl: 'home/homeCtrl',
                        controller: 'homeCtrl'
                    }
                }
            })
            .state('content.users', {
                url: 'users',
                views: {
                    'body@content': {
                        templateUrl: 'users/users.html',
                        // new attribute for ajax load controller
                        controllerUrl: 'users/usersCtrl',
                        controller: 'usersCtrl',
                        // load more controllers, services, filters, ...
                        dependencies: ['services/usersService']
                    }
                }
            })
            .state('content.components', {
                url: 'components',
                views: {
                    'body@content':{
                        templateUrl: 'components/components.html'
                    }
                }
            })
            .state('content.photos', {
                url: 'photos',
                abstract: true,
                views: {
                    'body@content': {
                        templateUrl: 'photos/photos.html',
                        controllerUrl: 'photos/ctrPhoto',
                        controller: 'PhotoController',
                        controllerAs: 'ctrPhoto'
                    }
                }
            })
            .state('content.photos.list', {
                url: '/list',
                templateUrl: 'photos/photos-list.html'/*,
                controller: "PhotoListController",
                controllerAs: 'ctrPhotoList'*/
            })
            .state('content.photos.detail', {
                url: '/detail',
                templateUrl: 'photos/photo-detail.html'/*,
                controller: 'PhotoDetailController',
                controllerAs: 'ctrPhotoDetail'*/
            })
            .state('content.photos.detail.comment', {
                'url': '/comment',
                templateUrl: 'photos/photos-detail-comment.html'
            });
        /*$stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'home/home.html',
                 // new attribute for ajax load controller
                controllerUrl: 'home/homeCtrl',
                controller: 'homeCtrl'
            })
            .state('users', {
                url: '/users',
                templateUrl: 'users/users.html',
                 // new attribute for ajax load controller
                controllerUrl: 'users/usersCtrl',
                controller: 'usersCtrl',
                // load more controllers, services, filters, ...
                dependencies: ['services/usersService']
            })
            .state('components', {
                url: '/components',
                templateUrl: 'components/components.html',
                 // new attribute for ajax load controller
                controllerUrl: 'components/componentsCtrl',
                controller: 'componentsCtrl'
            });*/
    }]);
});
