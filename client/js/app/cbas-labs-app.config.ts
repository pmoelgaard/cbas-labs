import IModule = angular.IModule;

module cbas.labs {

  import IGoogleMapApiProvider = angular.google.maps.IGoogleMapApiProvider;

  let module:IModule = angular.module('cbas-labs.app');


  export function ConfigureMapsFunction(uiGmapGoogleMapApiProvider:IGoogleMapApiProvider) : void {
    uiGmapGoogleMapApiProvider.configure({
      key: '***REMOVED***',
      libraries: [
        'geometry'
      ]
    });
  }
  ConfigureMapsFunction.$inject = ['uiGmapGoogleMapApiProvider'];

  module.config(ConfigureMapsFunction);
}
