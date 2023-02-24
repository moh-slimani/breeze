import {User} from "@/types/User";
import {Config, RouteParam, RouteParamsWithQueryOverload} from "ziggy-js";
import Pusher from 'pusher-js'
import Echo from 'laravel-echo'
import {Axios} from "axios";

declare module '@inertiajs/vue3' {
    export function usePage(): {
        props: {
            auth: {
                user: User
            },
        };
    }
}

declare module 'ziggy-js' {
    interface Routable {
        slug: number | string;
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $route(
            name: string,
            params?: RouteParamsWithQueryOverload | RouteParam,
            absolute?: boolean,
            config?: Config,
        ): string,
    }
}


declare global {
    interface Window {
        axios: Axios
        Pusher: typeof Pusher;
        Echo: Echo;
    }
}
