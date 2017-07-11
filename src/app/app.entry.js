import './vendor.js';

// --- app ---
export default angular.module('app',  [
    require('@uirouter/angularjs').default,
    require('./pages').default.name
]);
