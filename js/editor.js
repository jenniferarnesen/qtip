function tipCtrl($scope) {
    $scope.tips = {
        1: {
        "qid": 1,
        "decrease" : 1,
        "limit" : 2,
        "tips" : [
                "The common denominator",
                "<a href=\"http://www.youtube.com/watch?v=RIhwfqULbAE\" target=\"_blank\">View Youtube</a>",
                "1/6 + 4/6"
            ]
        },
        3: {
        "qid": 3,
        "decrease" : 1,
        "limit" : 2,
        "tips" : [
                "The same common denominator",
                "<a href=\"http://www.youtube.com/watch?v=RIhwfqULbAE\" target=\"_blank\">View the same Youtube</a>",
                "1/6 + 4/6",
                "Write down 7/6 for Christ!!!",
                "OK, you failed the test! Don't bother"
            ]
        }
    };

    $scope.tipList = [];

    $scope.loadTip = function(id) {
        if ($scope.tips[id]) {
            $scope.tipList = $scope.tips[id].tips;
        }
    }

    $scope.addTip = function() {
        $scope.tipList.push($scope.tipText);
    };
}



