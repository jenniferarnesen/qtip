
//use 'strict';
angular.module('tipApp', ['elasticjs.service', 'ngSanitize'])
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
            "qid" : 0,
            "decrease" : 0,
            "limit" : 0,
            "tips" : []
        };

        var ejs = ejsResource('http://localhost:9200'),
            ejsIndex = "qtip",
            ejsTypes = "tip",
            request = ejs.Request()
                .indices(ejsIndex)
                .types(ejsTypes);

        $scope.loadTip = function(id) {
            $scope.data.qid = id;
            var termQuery = ejs.TermQuery("qid", id),
                results =request.query(termQuery)
                    .doSearch()
                    .then(
                        function (data) {
                            if (data.hits.hits[0]) {
                                $scope.data = data.hits.hits[0]._source;
                            }
                        },
                        function (error) {

                        }
            );
        }

        $scope.saveTip = function() {
            console.log($scope.data);
            ejs.Document(ejsIndex, ejsTypes, $scope.data.qid)
            .source($scope.data)
            .doIndex();
        }

        $scope.addTip = function() {
            $scope.data.tips.push($scope.tipText);
            $scope.tipText = '';
            $scope.saveTip();
        };

        $scope.removeTip = function(index) {
            $scope.data.tips.splice(index, 1);
            $scope.saveTip();
        };
    }
);



