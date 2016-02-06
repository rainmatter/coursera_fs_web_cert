'use strict';

angular.module('confusionApp')

    .constant("baseURL", "http://localhost:3000/")

    .service('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {


            this.getDishes = function () {
                return $resource(baseURL + "dishes/:id", null, {'update': {method: 'PUT'}});
            };

            // implement a function named getPromotion
            // that returns a selected promotion.
            this.getPromotion = function () {
                return $resource(baseURL + "promotions/:id", null, {'update': {method: 'PUT'}});
            };


        }])

    .factory('corporateFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        var corpfac = {};

        // Implement two functions, one named getLeaders,
        // the other named getLeader(index)
        // Remember this is a factory not a service
        corpfac.getLeaders = function () {
            return $resource(baseURL + "leadership/:id", null, {'update': {method: 'PUT'}});
        };
        corpfac.getLeader = function (index) {
            //console.log($resource(baseURL + "leadership?designation=Executive+Chef", null, {'update': {method: 'PUT', isArray:false}}));
            return $resource(baseURL + "leadership/:id", {designation:"Executive Chef"}, {'update': {method: 'PUT'}});
            //return leadership[index];
        };

        return corpfac;

    }])

    ;
