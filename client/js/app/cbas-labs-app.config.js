/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../../../typings/index.d.ts" />
var cbas;
(function (cbas) {
    var labs;
    (function (labs) {
        var module = angular.module('cbas-labs.app');
        function ConfigureMapsFunction(uiGmapGoogleMapApiProvider) {
            uiGmapGoogleMapApiProvider.configure({
                key: '***REMOVED***',
                libraries: [
                    'geometry'
                ]
            });
        }
        labs.ConfigureMapsFunction = ConfigureMapsFunction;
        ConfigureMapsFunction.$inject = ['uiGmapGoogleMapApiProvider'];
        module.config(ConfigureMapsFunction);
    })(labs = cbas.labs || (cbas.labs = {}));
})(cbas || (cbas = {}));
//# sourceMappingURL=cbas-labs-app.config.js.map