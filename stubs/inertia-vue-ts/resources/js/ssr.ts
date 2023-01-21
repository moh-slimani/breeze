import { createSSRApp, DefineComponent, h } from 'vue';
import { renderToString } from '@vue/server-renderer';
import { createInertiaApp } from '@inertiajs/vue3';
// @ts-ignore
import createServer from '@inertiajs/vue3/server'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';
import route, {Config, RouteParam, RouteParamsWithQueryOverload} from "ziggy-js";

const appName = 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        title: (title: string) => `${title} - ${appName}`,
        resolve: (name: string) => resolvePageComponent<DefineComponent>(`./Pages/${name}.vue`, import.meta.glob<DefineComponent>('./Pages/**/*.vue')),
        setup({ App, props, plugin }) {
            let Ziggy: Config = {
                ...page.props.ziggy,
                location: new URL(page.props.ziggy.location),
            };
            const ssrApp = createSSRApp({render: () => h(App, props)})
                .use(plugin)
                .use(ZiggyVue, Ziggy);

            ssrApp.config.globalProperties.$route = (
                name: string,
                params?: RouteParamsWithQueryOverload | RouteParam,
                absolute?: boolean,
            ) => route(name, params, absolute, Ziggy)

            return ssrApp
        },
    })
);
