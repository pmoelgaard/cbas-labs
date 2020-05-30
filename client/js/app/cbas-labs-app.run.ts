/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../../../typings/index.d.ts" />


module cbas.labs {

  import IModule = angular.IModule;
  import IGoogleMapApiManualLoader = angular.google.maps.IGoogleMapApiManualLoader;

  let module: IModule = angular.module('cbas-labs.app');


/*  export function RunMapsFunction(uiGmapGoogleMapApiManualLoader: IGoogleMapApiManualLoader): void {
    uiGmapGoogleMapApiManualLoader.load();
  }
  RunMapsFunction.$inject = ['uiGmapGoogleMapApiManualLoader'];

  module.run(RunMapsFunction);*/
}
