// Auth token interceptor (appends the Authorization header to every request)

angular.module('base-auth.services')

.factory('AuthTokenInterceptor', function ($q, Storage) {
    return {
        request: function (config) {

            var authToken = Storage.get("authToken");
            config.headers = config.headers || {};

            if (authToken) {
                config.headers.Authorization = 'Bearer ' + authToken;
            }

            return config || $q.when(config);

        }
    };
})