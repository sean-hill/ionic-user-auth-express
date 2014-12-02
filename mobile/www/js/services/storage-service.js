// Service to use local storage

angular.module('base-auth.services')

.factory('Storage', function() {
    return {
        get: function(key, toJson) {
            var value = window.localStorage[key];
            return toJson ? angular.fromJson(value) : value;
        },
        set: function(key, value) {
            window.localStorage[key] = typeof value == "object" ? angular.toJson(value) : value;
        },
        has: function(key) {
            return window.localStorage[key] != undefined ? true : false;
        },
        clear: function(keys) {
            var keysToClear = keys.split(" ");
            angular.forEach(keysToClear, function(key){
                window.localStorage.removeItem(key);
            });
        }
    }
})