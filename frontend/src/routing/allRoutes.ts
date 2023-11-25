import { HomePage } from 'pages/HomePage';
import { RoutesType } from '../types/routesTypes';
import { NotFoundPage } from 'components/ui/notFound/NotFoundPage';
import { dashboardsRoutes } from './dashboards/dashboardsRoutes';
import { NewsPage } from 'pages/news/NewsPage';

export const baseRoutes: RoutesType[] = [
    {
        path: '/',
        component: HomePage
    }
    // { path: '/no-access', component: NoAccessPage },
    // { path: '/500', component: ServerErrorPage },
    // { path: '/404', component: NotFoundPage },
];

export const dashboards: RoutesType[] = [...dashboardsRoutes.getRoutes()];

export const teacherRoutes: RoutesType[] = [
    {
        path: '/teacher',
        component: HomePage
    }
];

export const other: RoutesType[] = [{ path: '*', component: NotFoundPage }];
