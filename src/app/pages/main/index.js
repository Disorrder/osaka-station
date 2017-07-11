import 'app/extensions/three';
import 'app/extensions/aframe';
import './waterfall-controller.js';

export default angular.module('page.main', []).config(['$stateProvider', ($stateProvider) => {
    console.log('cfg');
    $stateProvider.state('main', {
        url: '',
        controller: require('./controller').default,
        controllerAs: 'page',
        template: require('./template.pug')(),
    });
}]);
