define(function (require) {
    var app = require('../app');

    app.controller('homeCtrl', ['$scope', '$translate', '$translatePartialLoader',
        function($scope, $translate, $translatePartialLoader) {
            $scope.name = 'Home';

            $translatePartialLoader.addPart('home');
            $translate.refresh();


            $scope.obj = {"name": "mdayday06"};

            var raidName = "RAID5";

            $scope.myRaid = $translate.instant(raidName);

            $scope.raidObj = {"name": raidName};

    }]);
});
