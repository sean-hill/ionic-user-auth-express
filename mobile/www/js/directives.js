// Directives

angular.module("base-auth.directives", [])

.directive('login', function(){

    return {
    	restrict: 'E'
    	, controller: 'LoginCtrl'
    };

})

;