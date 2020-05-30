/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../../../typings/index.d.ts" />

import IModule = angular.IModule;

module cbas.labs {

  import IGoogleMapApiProvider = angular.google.maps.IGoogleMapApiProvider;

  let module:IModule = angular.module('cbas-labs.app');


  export function ConfigureMapsFunction(uiGmapGoogleMapApiProvider:IGoogleMapApiProvider) : void {
    uiGmapGoogleMapApiProvider.configure({
      key: 'AIzaSyDI1x_Yk5jvHW8ItsLNBZGtCNAl_sY1Zmw',
      libraries: [
        'geometry'
      ]
    });
  }
  ConfigureMapsFunction.$inject = ['uiGmapGoogleMapApiProvider'];

  module.config(ConfigureMapsFunction);
}
