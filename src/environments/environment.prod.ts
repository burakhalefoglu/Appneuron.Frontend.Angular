export const environment = {
    production: true,
    getUrl: 'localhost',
    getAuthApiUrl: 'https://webapi.appneuron.net/auth/api',
    getProjectApiUrl: 'https://webapi.appneuron.net/customer-project/api',
    getClientApiUrl: 'https://webapi.appneuron.net/client/api',
    getRemoteApiUrl: 'https://webapi.appneuron.net/remote/api',
    websocketConn: 'https://ws.appneuron.net/notification',
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
    },
};
