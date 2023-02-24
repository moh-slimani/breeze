import './bootstrap.js';
import '../css/app.css';

import {createSSRApp, DefineComponent, h} from 'vue';
import {createInertiaApp} from '@inertiajs/vue3';
import {resolvePageComponent} from 'laravel-vite-plugin/inertia-helpers';
import {ZiggyVue} from '../../vendor/tightenco/ziggy/dist/vue.m';
import route from "ziggy-js";
import {Ziggy} from './ziggy';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

createInertiaApp({
    title: (title: string) => `${title} - ${appName}`,
    progress: {
        color: '#4B5563',
    },
    resolve: (name) => resolvePageComponent<DefineComponent>(`./Pages/${name}.vue`, import.meta.glob<DefineComponent>('./Pages/**/*.vue')),
    setup({el, App, props, plugin}) {

        const vueApp = createSSRApp({render: () => h(App, props)})
            .use(plugin).use(ZiggyVue, Ziggy);

        vueApp.config.globalProperties.$route = route;

        vueApp.mount(el);
    },
}).then(() => {
})
