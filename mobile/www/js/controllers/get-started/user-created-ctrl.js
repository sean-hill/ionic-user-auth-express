// User Created Ctrl

angular.module('base-auth.controllers')

.controller('UserCreatedCtrl', function($scope, $timeout, User, Storage) {
	console.log('UserCreatedCtrl');

	$scope.clickToGetUser = function() {

		User.get().then(
			function(user){
				$scope.$emit('user:set', user);
			}, function(err){
				console.log(err);
			})
		;

	};

	$scope.clearAuthAndGetUser = function() {

		Storage.clear('authToken');

		$scope.clickToGetUser();

	};

})