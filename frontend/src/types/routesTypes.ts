import { FC, MemoExoticComponent, ReactNode } from 'react';

export type RouteType = {
    path: string;
    view: FC<any> | MemoExoticComponent<any>;
    exact?: boolean;
    nav?: boolean;
    subRoutes?: RouteType[];
    parentRoute?: RouteType;
    icon?: ReactNode;
};
// Определение типа конфигурации маршрута
export type RouteConfigType = {
    i18Title?: string;
    i18Description?: string;
    icon?: ReactNode;
    parentRoute?: RouteType;
};

export type TableAndDetailPageType = {
    path: string;
    tablePage: FC<any> | MemoExoticComponent<any>;
    exact?: boolean;
    nav?: boolean;
    config?: RouteConfigType;
};

export type RouteTypeMassive = {
    path: string;
    tablePage: FC | MemoExoticComponent<any>;
    exact?: boolean;
    nav?: boolean;
    config?: RouteConfigType;
};

export interface RoutesType {
    path: string;
    component: FC<any> | MemoExoticComponent<any>;
    exact?: boolean;
    nav?: boolean;
    icon?: ReactNode;
}

export type RouteController = {
    [key: string]: RoutesType[];
};
