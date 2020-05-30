/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../../../typings/index.d.ts" />
"use strict";
var cbas;
(function (cbas) {
    var app;
    (function (app) {
        var utils;
        (function (utils) {
            var module = angular.module('cbas-labs.app');
            var PolylineDecoder = (function () {
                function PolylineDecoder() {
                }
                PolylineDecoder.prototype.decode = function (encodedPath) {
                    var decodedPath = google.maps.geometry.encoding.decodePath(encodedPath);
                    return decodedPath;
                };
                return PolylineDecoder;
            }());
            utils.PolylineDecoder = PolylineDecoder;
            var PolylineDecoderFactory = (function () {
                function PolylineDecoderFactory() {
                    this.$get = [
                        function () {
                            return new PolylineDecoder();
                        }
                    ];
                }
                return PolylineDecoderFactory;
            }());
            utils.PolylineDecoderFactory = PolylineDecoderFactory;
            module.provider('PolylineDecoder', PolylineDecoderFactory);
        })(utils = app.utils || (app.utils = {}));
    })(app = cbas.app || (cbas.app = {}));
})(cbas || (cbas = {}));
//# sourceMappingURL=cbas-labs-app-utils.js.map