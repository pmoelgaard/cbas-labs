/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../../../typings/index.d.ts" />

import IModule = angular.IModule;
import IRootScopeService = angular.IRootScopeService;
import {IFlightPlan, IFlightPlanService, IPolylineDecoder} from "../../../typings/index";

module cbas.labs {

  let module: IModule = angular.module('cbas-labs.app');

  export class AppController {

    public $error: Error;
    public $process$flightPlans: number = 0;
    public $process$selectedFlightPlan: number = 0;

    public fromICAO: string = 'VTBS';
    public toICAO: string = 'VTCC';

    public flightPlans: Array<IFlightPlan>;
    public selectedFlightPlan: IFlightPlan;
    public selectedFlightPath: string = '';

    public map: {
      center: {
        latitude: number,
        longitude: number},
      zoom: number
    };

    constructor(protected $rootScope: IRootScopeService, protected $flightplan: IFlightPlanService, protected PolylineDecoder: IPolylineDecoder) {
    }

    public $onInit(): void {
      this.map = {
        center: {
          latitude: 13.7563, longitude: 100.5018
        },
        zoom: 8
      }
    }

    public searchFlightPlans(fromICAO: string, toICAO: string): void {
      let $this: AppController = this;

      $this.$process$flightPlans++;

      $this.flightPlans = null;

      $this.$flightplan.search(
        {
          fromICAO: fromICAO,
          toICAO: toICAO
        })
        .$promise
        .then(function (result: Array<IFlightPlan>): void {
          $this.flightPlans = result;
        })
        .catch(function (err: Error): void {
          $this.$error = err;
        })
        .finally(function (): void {
          $this.$process$flightPlans--;
        });
    }

    public onFlightPlanSelect(flightPlan: IFlightPlan): void {
      let $this: AppController = this;

      $this.$process$selectedFlightPlan++;

      $this.selectedFlightPlan = null;

      $this.$flightplan.findOne(
        {
          id: flightPlan.id
        })
        .$promise
        .then(function (result: IFlightPlan): void {
          $this.selectedFlightPlan = result;
          $this.selectedFlightPath = $this.PolylineDecoder.decode(result.encodedPolyline);
        })
        .catch(function (err: Error): void {
          $this.$error = err;
        })
        .finally(function (): void {
          $this.$process$selectedFlightPlan--;
        })
    }
  }
  AppController.$inject = ['$rootScope', 'Flightplan', 'PolylineDecoder'];

  module.controller('AppController', AppController);
}
