/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../typings/index.d.ts" />

let fs: any = require('fs');
let path: any = require('path');
let async: any = require('async');
let _: any = require('lodash');

import {ICallbackFunction, IDataSource} from "../../../typings/nx-loopback";
import {IFlightPlanModel, IFlightPlanDatabaseDataSource, IFlightPlan} from "../../typings/index";

module.exports = function (Flightplan: IFlightPlanModel) {

  Flightplan.getSource = function() : IFlightPlanDatabaseDataSource {
    let source:IFlightPlanDatabaseDataSource = this.app.dataSources['flightplandatabase'];
    source.settings.options.headers.Authorization = 'Basic'+ new Buffer(process.env.FLIGHTPLANDATABASE_APIKEY, 'utf8').toString('base64');
    return source;
  };

  Flightplan.findOne = function (id: string, callback: ICallbackFunction) {
    let self:IFlightPlanModel = this;

    async.waterfall(
      [
        function (next: Function): void {
          let cachePath: string = path.join(path.resolve(), 'data/flightplans', id + '.json');

          try {
            let cacheFile: any = require(cachePath);
            let cache:IFlightPlan = <IFlightPlan>cacheFile;
            next(null, cache);
          }
          catch (err) {
            next(null, null);
          }
        }
        ,
        function (cachedContent: IFlightPlan, next: Function): void {

          // We return early if we have a cached version
          if (cachedContent) {
            return next(null, cachedContent);
          }

          let source: IFlightPlanDatabaseDataSource = self.getSource();
          source.fetchPlan(
            id,
            function (err: Error, result: any): void {
              next(err, result);
            }
          );
        }
      ],
      function (err: Error, result: IFlightPlan): void {
        callback(err, result);
      }
    );
  };
  Flightplan.remoteMethod(
    'findOne', {
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
    }
  );

  Flightplan.search = function (fromICAO: string, toICAO: string, callback: ICallbackFunction) {
    async.waterfall(
      [
        function (next: Function): void {

          let cachePath: string = path.join(path.resolve(), 'data/flightplans', fromICAO.toLowerCase() + '-' + toICAO.toLowerCase() + '.json');

          try {
            let cacheFile: any = require(cachePath);
            let cache:Array<IFlightPlan> = <Array<IFlightPlan>>cacheFile.data;
            next(null, cache);
          }
          catch (err) {
            next(null, null);
          }
        }
        ,
        function (cache: Array<IFlightPlan>, next: Function): void {

          // We return early if we have a cached version
          if (cache) {
            return next(null, cache);
          }

          let source: IFlightPlanDatabaseDataSource = Flightplan.getSource();
          source.searchPlans(fromICAO, toICAO,
            function (err: Error, result: any): void {
              next(err, result);
            }
          );
        }
      ],
      function (err: Error, result: Array<IFlightPlan>): void {
        callback(err, result);
      }
    );
  };
  Flightplan.remoteMethod(
    'search', {
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
    }
  );
};
