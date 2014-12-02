// User Service

angular.module('base-auth.services')

.factory('User', function($q, $http, API) {

    return {

    	get: function() {

    		var deferred = $q.defer();

        	$http.get(API.user.get)
        		.success(function(user){
        			deferred.resolve(user);
        		})
        		.error(function(){
        			deferred.reject('You are not authenticated.');
        		})
        	;

        	return deferred.promise;

    	},

        login: function(loginForm) {

            var deferred = $q.defer();

            $http.post(API.user.login, loginForm)
                .success(function(user){
                    deferred.resolve(user);
                })
                .error(function(err){
                    deferred.reject(err);
                })
            ;

            return deferred.promise;

        },

        create: function(profileForm) {

        	var deferred = $q.defer();

        	$http.post(API.user.create, profileForm)
        		.success(function(createdUser){
        			deferred.resolve(createdUser);
        		})
        		.error(function(err){
        			deferred.reject(err);
        		})
        	;

        	return deferred.promise;

        }
        
    }

})

;
