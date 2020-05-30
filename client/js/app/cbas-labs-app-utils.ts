/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../../../typings/index.d.ts" />

import {IPolylineDecoder} from "../../../typings/index";

module cbas.app.utils {

  import IModule = angular.IModule;

  let module: IModule = angular.module('cbas-labs.app');

  export class PolylineDecoder implements IPolylineDecoder {
    public decode(encodedPath:string) : string {
      let decodedPath = google.maps.geometry.encoding.decodePath(encodedPath);
      return decodedPath;
    }
  }

  export class PolylineDecoderFactory implements IPolylineDecoderFactory {
    public $get: any = [
      function (): IPolylineDecoder {
        return new PolylineDecoder();
      }
    ];
  }

  module.provider('PolylineDecoder', PolylineDecoderFactory);
}
