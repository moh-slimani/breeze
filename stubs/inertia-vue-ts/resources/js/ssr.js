import { createSSRApp, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { createInertiaApp } from '@inertiajs/vue3'
import createServer from '@inertiajs/vue3/server'
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers'
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m'
import route from 'ziggy-js'

const appName = 'Laravel'

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
        setup ({ App, props, plugin }) {
            let Ziggy = {
                ...page.props.ziggy,
                location: new URL(page.props.ziggy.location)
            }
            const ssrApp = createSSRApp({ render: () => h(App, props) })
                .use(plugin)
                .use(ZiggyVue, Ziggy)

            ssrApp.config.globalProperties.$route = (
                name, params, absolute
            ) => route(name, params, absolute, Ziggy)

            return ssrApp
        }
    })
)
