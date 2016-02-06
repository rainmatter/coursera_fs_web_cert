'use strict';

angular.module('confusionApp')

    .controller('MenuController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;

            $scope.showMenu = false;
            $scope.message = "Loading ...";
            menuFactory.getDishes().query(
                function (response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });


            $scope.select = function (setTab) {
                $scope.tab = setTab;

                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };

            $scope.toggleDetails = function () {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

    .controller('ContactController', ['$scope', function ($scope) {

            $scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: ""};

            var channels = [{value: "tel", label: "Tel."}, {value: "Email", label: "Email"}];

            $scope.channels = channels;
            $scope.invalidChannelSelection = false;

        }])

    .controller('FeedbackController', ['$scope', function ($scope) {

            $scope.sendFeedback = function () {

                console.log($scope.feedback);

                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: ""};
                    $scope.feedback.mychannel = "";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

    .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function ($scope, $stateParams, menuFactory) {

            $scope.dish = {};
            $scope.showDish = false;
            $scope.message = "Loading ...";
            $scope.dish = menuFactory.getDishes().get({id: parseInt($stateParams.id, 10)})
                .$promise.then(
                    function (response) {
                        $scope.dish = response;
                        $scope.showDish = true;
                    },
                    function (response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    }
                );

        }])

    .controller('DishCommentController', ['$scope', 'menuFactory', function ($scope, menuFactory) {

            $scope.mycomment = {rating: 5, comment: "", author: "", date: ""};

            $scope.submitComment = function () {
                $scope.mycomment.date = new Date().toISOString();
                //console.log($scope.mycomment);
                $scope.dish.comments.push($scope.mycomment);

                menuFactory.getDishes().update({id: $scope.dish.id}, $scope.dish);
                $scope.commentForm.$setPristine();
                $scope.mycomment = {rating: 5, comment: "", author: "", date: ""};
            };
        }])

    // implement the IndexController and About Controller here
    .controller('IndexController', ['$scope', 'menuFactory', 'corporateFactory', function ($scope, menuFactory, corporateFactory) {

            //Get the promotion
            $scope.showPromo = false;
            $scope.message = "Loading ...";
            $scope.promotion = menuFactory.getPromotion().get({id: 0})
                .$promise.then(
                    function (response) {
                        $scope.promotion = response;
                        $scope.showPromo = true;
                    },
                    function (response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    }
                );

            //Get the dishes for the menu
            $scope.showDish = false;
            $scope.message = "Loading ...";
            $scope.dish = menuFactory.getDishes().get({id: 0})
                .$promise.then(
                    function (response) {
                        $scope.dish = response;
                        $scope.showDish = true;
                    },
                    function (response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    }
                );
            
            //Get the Executive chef for home
            /*
            $scope.showExec = false;
            $scope.message = "Loading ...";
            $scope.execChef = corporateFactory.getLeader(3).get({"designation": "Executive Chef"})
                .$promise.then(
                    function (response) {
                        $scope.execChef = response;
                        $scope.showExec = true;
                    },
                    function (response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    }
                );*/
            
            $scope.execChef = {};
            $scope.showExec = false;
            $scope.message = "Loading ...";
            $scope.execChef = corporateFactory.getLeader(3)
                .$promise.then(
                    function (response) {
                        $scope.execChef = response;
                        $scope.showExec = true;
                    },
                    function (response) {
                        $scope.message = "Error: " + response.status + " " + response.statusText;
                    }
                );
            
            
            
            
            
            /*$scope.showExec = false;
            $scope.message = "Loading ...";
            corporateFactory.getLeader(3).query(
                function (response) {
                    //console.log(response);
                    $scope.execChef = response;
                    console.log(execChef);
                    $scope.showExec = true;
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });*/


            //var execChef = corporateFactory.getLeader(3);
            //$scope.execChef = execChef;

        }])

    .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {

            //Get the list of leaders
            $scope.showLeaders = false;
            $scope.message = "Loading ...";
            corporateFactory.getLeaders().query(
                function (response) {
                    $scope.leaders = response;
                    $scope.showLeaders = true;
                },
                function (response) {
                    $scope.message = "Error: " + response.status + " " + response.statusText;
                });


        }])

    ;
