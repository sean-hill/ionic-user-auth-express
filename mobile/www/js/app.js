
// Main Application JS

angular.module("base-auth", ["ionic", "base-auth.controllers", "base-auth.services", "base-auth.directives"])

.run(function($ionicPlatform) {

	$ionicPlatform.ready(function() {

		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		// for form inputs)
		if(window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if(window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}

	});

})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
	
    $stateProvider

    .state("get-started", {
        abstract: true,
        url: "/get-started",
        controller: "GetStartedCtrl",
        templateUrl: "templates/get-started/get-started-view.html"
    })

    .state("get-started.welcome", {
        url: "/welcome",
        views: {
            "get-started": {
                templateUrl: "templates/get-started/welcome-view.html",
                controller: "WelcomeCtrl"
            }
        }
    })

    .state("get-started.create-profile", {
        url: "/create-profile",
        views: {
            "get-started": {
                templateUrl: "templates/get-started/create-profile-view.html",
                controller: "CreateProfileCtrl"
            }
        }
    })

    .state("get-started.user-created", {
        url: "/user-created",
        views: {
            "get-started": {
                templateUrl: "templates/get-started/user-created-view.html",
                controller: "UserCreatedCtrl"
            }
        }
    })

    ;

    // Use the auth token interceptor to append the auth_token to every request
    $httpProvider.interceptors.push('AuthTokenInterceptor');

    // Fallback to this route
    $urlRouterProvider.otherwise("/get-started/welcome");

});