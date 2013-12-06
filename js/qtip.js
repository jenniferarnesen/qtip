
//use 'strict';
angular.module('tipApp', ['elasticjs.service', 'ngSanitize'])
    .controller('tipCtrl', function ($scope, ejsResource) {
        var ejs = ejsResource('http://localhost:9200'),
            ejsIndex = "qtip",
            ejsTypes = "tip",
            request = ejs.Request()
                .indices(ejsIndex)
                .types(ejsTypes);

        $scope.data = {
            "qid" : 0,
            "decrement" : 1,
            "limit" : 0,
            "tips" : [],
            "viewed" : []
        };
        $scope.tipsToShow = false;
        $scope.maxScore = 5;
        $scope.minScore = 1;
        $scope.score = 1;

        $scope.loadTip = function(id) {
            var termQuery = ejs.TermQuery("qid", id);
            console.log("angular looking around " + id);
            $scope.data.qid = id;

            request.query(termQuery).doSearch()
                .then(
                    function (data) {
                        if (data.hits.hits[0]) {
                            $scope.data = data.hits.hits[0]._source;
                        }
                        $scope.data.viewed = [];
                        $scope.tipsToShow = $scope.data.tips.length > 0;
                        console.log($scope.data)

                        $scope.maxScore = $scope.data.tips.length * $scope.data.decrement;
                        $scope.score = $scope.maxScore;
                        $scope.minScore = $scope.data.limit;
                        console.log('max ' + $scope.maxScore);
                        console.log('min ' + $scope.minScore);
                        console.log('score ' + $scope.score);
                    }
            );
        }

        $scope.viewTip = function() {
            console.log($scope.data);
            if ($scope.data.tips.length) {
                var tmp = $scope.data.tips.shift();
                console.log(tmp);
                $scope.data.viewed.push(tmp);
            }
            $scope.tipsToShow = $scope.data.tips.length > 0;
            console.log($scope.tipsToShow);
            $scope.score = $scope.score - $scope.data.decrement;
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



