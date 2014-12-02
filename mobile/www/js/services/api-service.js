// Constants for the API

angular.module('base-auth.services')

.factory('API', function(){

	// Url of Node API
	var apiUrl = 'http://localhost:5000/api';

	// Base Routes
	var baseUserRoute = apiUrl + '/user';

	return {

		// User Routes
		user: {
			get: baseUserRoute + '/get'
			, create: baseUserRoute + '/create'
			, login: baseUserRoute +'/login'
		}

	}

});