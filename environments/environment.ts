// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  // urlPrefix: 'http://' + location.hostname + ':8080/',
  // urlPrefix: 'http://' + '192.168.35.29' + ':30621/',
  urlPrefix: 'https://' + 'ecoplaning-production.up.railway.app',
  wsUrlPrefix: 'ws://' + location.hostname + ':23403/websocket',

  production: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
