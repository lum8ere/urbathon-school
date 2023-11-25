import { FC, MemoExoticComponent, ReactNode } from 'react';

import { RouteConfigType, RouteType, TableAndDetailPageType } from 'types/routesTypes';
// Определение типа маршрута

export class Route implements RouteType {
    path: string;

    view: FC<any> | MemoExoticComponent<any>;

    exact?: boolean;

    nav?: boolean;

    subRoutes?: RouteType[];

    parentRoute?: RouteType;

    icon?: ReactNode;

    constructor(
        path: string,
        view: FC<any> | MemoExoticComponent<any>,
        exact?: boolean,
        nav?: boolean,
        config?: RouteConfigType
    ) {
        this.path = path;
        this.view = view;
        this.exact = exact;
        this.nav = nav;
        this.icon = config?.icon;
        this.subRoutes = [];
        this.parentRoute = config?.parentRoute;
    }

    addSubRoute(route: Route) {
        this.subRoutes?.push(route);
    }

    getRoute() {
        return {
            path: this.path,
            component: this.view,
            exact: this.exact,
            icon: this.icon,
            nav: this.nav
        };
    }
}
// Класс TableAndDetailPageAppRoute представляет маршрут, состоящий из таблицы и страницы с подробной информацией
export class TableAndDetailPageAppRoute {
    path: string;

    tablePage: FC<any> | MemoExoticComponent<any>;

    exact?: boolean;

    nav?: boolean;

    config?: RouteConfigType;

    pathPrefix: string;

    constructor(
        path: string,
        tablePage: FC<any> | MemoExoticComponent<any>,
        exact?: boolean,
        nav?: boolean,
        config?: RouteConfigType,
        pathPrefix?: string
    ) {
        this.path = path;
        this.exact = exact;
        this.nav = nav || true;
        this.tablePage = tablePage;
        this.config = config;
        this.pathPrefix = pathPrefix || ''; // Префикс пути к маршруту, если есть
    }

    // Префикс пути к маршруту, если есть
    createRoute = (
        path: string,
        element: FC | MemoExoticComponent<any>,
        exact?: boolean,
        nav?: boolean,
        config?: RouteConfigType
    ): Route =>
        new Route(
            path === '' ? this.pathPrefix : `${this.pathPrefix}/${path}`,
            element,
            exact,
            nav,
            config
        );

    // Метод для получения массива маршрутов
    getRoutes = (): Route[] => {
        const routes = [];
        // Создаем основной маршрут
        const mainRoute = this.createRoute(
            this.path,
            this.tablePage,
            this.exact,
            this.nav,
            this.config
        );

        routes.push(mainRoute);

        return routes;
    };
}
// Класс Routes содержит массив маршрутов и методы для работы с ними
export class Routes {
    routes: Route[];

    // Конструктор класса
    constructor(pathPrefix: string, routeData: TableAndDetailPageType[]) {
        // Создаем массив маршрутов из объектов TableAndDetailPageAppRoute
        this.routes = routeData.reduce((accRoutes: Route[], route) => {
            const newRoutes = [
                ...accRoutes,
                ...new TableAndDetailPageAppRoute(
                    route.path,
                    route.tablePage,
                    route.exact,
                    route.nav,
                    route.config,
                    pathPrefix
                ).getRoutes()
            ];
            return newRoutes;
        }, []);
    }

    // Метод возвращает массив объектов маршрутов
    getRoutesObject = (): Route[] => this.routes;

    // Метод возвращает массив маршрутов в нужном формате
    getRoutes = () => this.routes.map((route) => route.getRoute());
}
