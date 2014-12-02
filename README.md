# Ionic User Authentication with NodeJS

For your enjoyment this project provides a basic Ionic app and Express server with functionality for user authentication using bearer tokens, as specified by [RFC 6750](http://tools.ietf.org/html/rfc6750).

## Prerequisites

1. Install [npm](https://github.com/npm/npm)
2. Install [Ionic CLI](http://ionicframework.com/getting-started/)
3. Install [MongoDB](http://www.mongodb.com/)
4. Install [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started) 

## Installation

1. Download project.
2. Run `npm install` in both `mobile` and `server` directories.
3. Modify `conf.js` in `server` directory to connect to your MongoDB.
4. Run `mongod`.
5. Run `gulp` in `server` directory to start server.
6. Run `ionic serve` or `ionic build ios; ionic emulate ios;` in `mobile` directory.
7. Eat cookies

If using `ionic serve` I used this [solution](http://forum.ionicframework.com/t/solved-cors-with-ionic/7454/7?u=seanhill) to do HTTP requests right from the browser.

This project has not been tested in an production enviroment, so the API may not work without the `Access-Control-Allow-Origin` being set properly.


## Mobile App

The mobile app is very basic. It starts you off in a "Welcome" screen that has one button `Create Profile`. This transitions you into a `Create Profile` page. After creating a profile and storing the `authToken` in the device's local storage, it transitions you to a sample page where you can get a user from the protected `/api/user/get` route. You can also test the `401` server response on this page by clearing out the `authToken` and requesting a user from `/api/user/get`. This causes the mobile app to display a `Login Modal` that requires to first authenticate, and then proceeds to get the user.

Thanks to [KD Moore Consulting](http://www.kdmooreconsulting.com/blogs/authentication-with-ionic-and-angular-js-in-a-cordovaphonegap-mobile-web-application/) which provides a more detailed look at this process.

## The Point

I finally figured out how to link up my Ionic App with a backend using bearer tokens for authentication, so I wanted to provide a solution that will hopefully help you on your journey to creating mobile apps.



