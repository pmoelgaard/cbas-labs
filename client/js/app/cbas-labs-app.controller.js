/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../../../typings/index.d.ts" />
"use strict";
var cbas;
(function (cbas) {
    var labs;
    (function (labs) {
        var module = angular.module('cbas-labs.app');
        var AppController = (function () {
            function AppController($rootScope, $flightplan, PolylineDecoder) {
                this.$rootScope = $rootScope;
                this.$flightplan = $flightplan;
                this.PolylineDecoder = PolylineDecoder;
                this.$process$flightPlans = 0;
                this.$process$selectedFlightPlan = 0;
                this.fromICAO = 'VTBS';
                this.toICAO = 'VTCC';
                this.selectedFlightPath = '';
            }
            AppController.prototype.$onInit = function () {
                this.map = {
                    center: {
                        latitude: 13.7563, longitude: 100.5018
                    },
                    zoom: 8
                };
            };
            AppController.prototype.searchFlightPlans = function (fromICAO, toICAO) {
                var $this = this;
                $this.$process$flightPlans++;
                $this.flightPlans = null;
                $this.$flightplan.search({
                    fromICAO: fromICAO,
                    toICAO: toICAO
                })
                    .$promise
                    .then(function (result) {
                    $this.flightPlans = result;
                })
                    .catch(function (err) {
                    $this.$error = err;
                })
                    .finally(function () {
                    $this.$process$flightPlans--;
                });
            };
            AppController.prototype.onFlightPlanSelect = function (flightPlan) {
                var $this = this;
                $this.$process$selectedFlightPlan++;
                $this.selectedFlightPlan = null;
                $this.$flightplan.findOne({
                    id: flightPlan.id
                })
                    .$promise
                    .then(function (result) {
                    $this.selectedFlightPlan = result;
                    $this.selectedFlightPath = $this.PolylineDecoder.decode(result.encodedPolyline);
                })
                    .catch(function (err) {
                    $this.$error = err;
                })
                    .finally(function () {
                    $this.$process$selectedFlightPlan--;
                });
            };
            return AppController;
        }());
        labs.AppController = AppController;
        AppController.$inject = ['$rootScope', 'Flightplan', 'PolylineDecoder'];
        module.controller('AppController', AppController);
    })(labs = cbas.labs || (cbas.labs = {}));
})(cbas || (cbas = {}));
//# sourceMappingURL=cbas-labs-app.controller.js.map