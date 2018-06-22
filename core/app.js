/**
 * @file entry
 * @author &#39;chengou&#39;(chengou@myaidoctor.net)
 */

import Vue from 'vue';
import Vant from 'vant';
import Meta from 'vue-meta';

import {createRouter} from '@/.lavas/router';
import {createStore} from '@/.lavas/store';
import AppComponent from './App.vue';
import 'vant/lib/vant-css/index.css';

Vue.use(Vant);
Vue.use(Meta);
console.log(Vant)
Vue.config.productionTip = false;

export function createApp() {
    let router = createRouter();
    let store = createStore();
    let App = Vue.extend({
        router,
        store,
        ...AppComponent
    });
    return {App, router, store};
}

if (module.hot) {
    module.hot.accept();
}
