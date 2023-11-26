import { baseRoutes, dashboards, other } from 'routing/allRoutes';
import { RouteController } from '../types/routesTypes';

// Для компонентов, таких как Aside
export const routes: RouteController = {
    baseRoutes,
    dashboards
};

// Для App.tsx
export const allRoutes = [...baseRoutes, ...dashboards, ...other];
