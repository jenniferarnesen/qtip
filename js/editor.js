
//use 'strict';
angular.module('tipApp', ['elasticjs.service'])
    .controller('tipCtrl', function ($scope, ejsResource) {
        $scope.sampleTip = {
            2: {
            "decrease" : 1,
            "limit" : 2,
            "tips" : [
                    "The dummy common denominator",
                    "<a href=\"http://www.youtube.com/watch?v=RIhwfqULbAE\" target=\"_blank\">View Youtube</a>",
                    "1/6 + 4/6"
                ]
            }
        };
        $scope.data = {
            'qid' : 0,
            'decrease' : 0,
            'limit' : 0,
            'tipList' : [],
        };

        var ejs = ejsResource('http://localhost:9200');

        $scope.loadTip = function(id) {
             var results = ejs.Document("tips", "tip", id).doGet();
             console.log(results);
            if ($scope.sampleTip[id]) {
                $scope.data = $scope.sampleTip[id];
            }
        }

        $scope.addTip = function() {
            $scope.data.tipList.push($scope.tipText);
        };
    }
);



