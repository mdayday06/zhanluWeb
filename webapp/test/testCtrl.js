define(function (require) {
    var app = require('../app');

    app.controller('testCtrl', ['$scope', function($scope) {
        $scope.name = 'Test';
    }]);
});
