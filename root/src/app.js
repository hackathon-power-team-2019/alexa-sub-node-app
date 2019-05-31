var express = require('express');
var app = express();
require('isomorphic-fetch');
const gql = require('graphql-tag');
global.WebSocket = require('ws');
// var opn = require('opn');
require('es6-promise').polyfill();
var aws_config = require('./aws-exports').default;
var subscriptions = require('./graphql/subscriptions');
const AWSAppSyncClient = require('aws-appsync').default;
const AUTH_TYPE = require('aws-appsync/lib/link/auth-link').AUTH_TYPE;

global.window = global.window || {
    setTimeout: setTimeout,
    clearTimeout: clearTimeout,
    WebSocket: global.WebSocket,
    ArrayBuffer: global.ArrayBuffer,
    addEventListener: function () { },
    navigator: { onLine: true }
};

global.localStorage = {
    store: {},
    getItem: function (key) {
        return this.store[key]
    },
    setItem: function (key, value) {
        this.store[key] = value
    },
    removeItem: function (key) {
        delete this.store[key]
    }
};

// opens the url in the default browser 
// opn();

// Require AppSync module

// INIT
// Set up AppSync client
const client = new AWSAppSyncClient({
    url: aws_config.aws_appsync_graphqlEndpoint,
    region: aws_config.aws_appsync_region,
    auth: {
        type: AUTH_TYPE.API_KEY,
        apiKey: aws_config.aws_appsync_apiKey,
    }
});

const Subscription = gql(subscriptions.onUpdateTroweAlexaUserEvents);

client.hydrated().then(function (client) {
    // Now run a query
    // Now subscribe to results
    const observable = client.subscribe({query: Subscription});
    console.log('Obvervable: ' + observable);
    const realtimeResults = function realtimeResults(data) {
        console.log('(Realtime Subscription) Subscribing posts -----------> ', data);
    };

    observable.subscribe(() => {
        console.log("Hello world!")
        return {
            next: realtimeResults,
            complete: console.log,
            error: console.log,
        }
    }
    );
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});