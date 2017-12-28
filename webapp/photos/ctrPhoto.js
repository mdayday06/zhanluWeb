/**
 * Created by zhangjiangang on 2017/12/7.
 */
define(function (require) {
    var app = require('../app');

    app.controller('PhotoController', ['$scope', '$state', function($scope, $state) {
        $scope.name = 'Home';

        this.photos = [];
    }]);
});

