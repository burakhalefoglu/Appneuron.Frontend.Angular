// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    getUrl: 'localhost',
    getAuthApiUrl: 'http://localhost:5000/api',
    getProjectApiUrl: 'http://localhost:5001/api',
    getClientApiUrl: 'http://localhost:5002/api',
    getRemoteApiUrl: 'http://localhost:5003/api',
    websocketConn: 'ws://localhost:8080',
    getDropDownSetting: {
        singleSelection: false,
        idField: 'id',
        textField: 'label',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true,
    },
    getDatatableSettings: {
        pagingType: 'full_numbers',
        pageLength: 2,
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
