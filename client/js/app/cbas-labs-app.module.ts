/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../../../typings/index.d.ts" />

import IModule = angular.IModule;

module cbas.labs {
  let module:IModule = angular.module('cbas-labs.app', [
    'ngMaterial',
    'uiGmapgoogle-maps',
    'cbas.api'
  ]);
}
