/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../typings/index.d.ts" />
"use strict";
var fs = require('fs');
var path = require('path');
var async = require('async');
var _ = require('lodash');
module.exports = function (Flightplan) {
    Flightplan.getSource = function () {
        var source = this.app.dataSources['flightplandatabase'];
        source.settings.options.headers.Authorization = 'Basic' + new Buffer(process.env.FLIGHTPLANDATABASE_APIKEY, 'utf8').toString('base64');
        return source;
    };
    Flightplan.findOne = function (id, callback) {
        var self = this;
        async.waterfall([
            function (next) {
                var cachePath = path.join(path.resolve(), 'data/flightplans', id + '.json');
                try {
                    var cacheFile = require(cachePath);
                    var cache = cacheFile;
                    next(null, cache);
                }
                catch (err) {
                    next(null, null);
                }
            },
            function (cachedContent, next) {
                // We return early if we have a cached version
                if (cachedContent) {
                    return next(null, cachedContent);
                }
                var source = self.getSource();
                source.fetchPlan(id, function (err, result) {
                    next(err, result);
                });
            }
        ], function (err, result) {
            callback(err, result);
        });
    };
    Flightplan.remoteMethod('findOne', {
        description: 'Fetches a flight plan and its associated route',
        http: {
            path: '/:id',
            verb: 'get'
        },
        accepts: {
            arg: 'id',
            description: 'Unique plan identifier number',
            type: 'string',
            required: true
        },
        returns: {
            type: 'Flightplan',
            root: true
        }
    });
    Flightplan.search = function (fromICAO, toICAO, callback) {
        async.waterfall([
            function (next) {
                var cachePath = path.join(path.resolve(), 'data/flightplans', fromICAO.toLowerCase() + '-' + toICAO.toLowerCase() + '.json');
                try {
                    var cacheFile = require(cachePath);
                    var cache = cacheFile.data;
                    next(null, cache);
                }
                catch (err) {
                    next(null, null);
                }
            },
            function (cache, next) {
                // We return early if we have a cached version
                if (cache) {
                    return next(null, cache);
                }
                var source = Flightplan.getSource();
                source.searchPlans(fromICAO, toICAO, function (err, result) {
                    next(err, result);
                });
            }
        ], function (err, result) {
            callback(err, result);
        });
    };
    Flightplan.remoteMethod('search', {
        description: 'Searches for for flight plans. A number of search parameters are available and will be combined to form a search request.',
        http: {
            path: '/',
            verb: 'get'
        },
        accepts: [
            {
                arg: 'fromICAO',
                description: 'Matches departure airport ICAO',
                type: 'string',
                required: true
            },
            {
                arg: 'toICAO',
                description: 'Matches destination airport ICAO',
                type: 'string',
                required: true
            }
        ],
        returns: {
            type: ['Flightplan'],
            root: true
        }
    });
};
//# sourceMappingURL=flightplan.js.map