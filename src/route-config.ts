import App from './App'

export interface AppRoute {
    path: string;
    component: any;
    routes?: AppRoute[]
}

const routes: AppRoute[] = [
    { path: '/', component: App }
]

export default routes;