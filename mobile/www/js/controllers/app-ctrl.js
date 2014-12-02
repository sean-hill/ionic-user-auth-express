// Main App Ctrl

angular.module('base-auth.controllers')

.controller('AppCtrl', function($scope){

	console.log('AppCtrl');

	$scope.$on('user:set', function(event, user){
		$scope.user = user;
	});

});
