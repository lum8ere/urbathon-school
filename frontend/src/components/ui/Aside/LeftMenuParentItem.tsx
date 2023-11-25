import type { MenuProps } from 'antd';
import { Menu, Typography } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Aside.scss';
import { ButtonWithTooltips } from '../button/Button';
import { RouteController, RoutesType } from 'types/routesTypes';

// Определение типа для пункта меню
type MenuItem = Required<MenuProps>['items'][number] & {
    path: string;
    id: string;
    label: React.ReactNode | string;
    children?: MenuItem[];
    type?: 'group' | string;
};

// Пропсы для компонента LeftMenuParentItem
interface RouteButtonProps {
    routes: RouteController;
    open: boolean;
}

const style = { color: 'white' };

const THEME = 'dark';

const EXCLUDE_ROUTINGS = ['/dashboards'];

export const LeftMenuParentItem: React.FC<RouteButtonProps> = ({ routes, open }) => {
    const navigate = useNavigate(); // Хук для навигации
    const location = useLocation();

    const [activeKeys, setActiveKeys] = useState<string[]>([]);

    // Отфильтрованный и отсортированный список маршрутов
    const sortedRoutes = Object.keys(routes).filter((route) => route !== 'baseRoutes');

    useEffect(() => {
        // Разбиваем URL-адрес на части
        const parts = location.pathname.split('/');

        // Определяем активные ключи пунктов и подпунктов
        const newActiveKeys = [];
        if (parts.length >= 2) {
            newActiveKeys.push(parts[1]); // Ключ пункта
            if (parts.length >= 3) {
                newActiveKeys.push(`sub${parts[2]}`); // Ключ подпункта
            }
        }

        // Устанавливаем активные ключи в состояние
        setActiveKeys(newActiveKeys);
    }, [location, location.pathname]);

    // Формирование header меню
    const createHeaderItem = useCallback(() => {
        const headerLabel = (
            <div id="logo-container" className="logo-container">
                <div className="logo-text">
                    <span id="logo-title" className="logo-title">
                        PROJECT
                    </span>
                    <span className="logo-description">{'siteDescription'}</span>
                </div>
            </div>
        );
        return {
            label: headerLabel,
            key: 'header-menu',
            id: 'header-menu',
            onClick: () => navigate('/'),
            theme: THEME
        };
    }, [navigate, open]);

    // Функция для создания пунктов на основе маршрутов
    const createRouteItems = useCallback(() => {
        const items: MenuItem[] = [];

        sortedRoutes.forEach((route) => {
            const itemsForRoute: RoutesType[] = routes[route].filter(
                (item: any) =>
                    !item.path.includes('/:id') &&
                    !item.path.includes('?') &&
                    !item.path.includes('create') &&
                    !item.path.includes('edit') &&
                    !EXCLUDE_ROUTINGS.includes(item.path)
            );

            const routeLabel = (
                <Typography.Text>
                    <Typography.Text style={style}>{`${route.replace(/_/g, '-')}`}</Typography.Text>
                    {open ? (
                        <Typography.Text
                            style={style}
                            onClick={() => navigate(routes[route][0].path)}
                            className="icon-span-menu-open_pazzle"
                        >
                            <ButtonWithTooltips
                                id={`${routes[route][0].path} -overview`}
                                className="overview"
                                type="text"
                                // icon={<AppsOutlined />}
                            />
                        </Typography.Text>
                    ) : null}
                </Typography.Text>
            );

            const [{ icon: itemIcon }] = routes[route];

            const getItemForCollapsedMenu = (
                label: React.ReactNode,
                id: string,
                key?: React.Key | null,
                icon?: React.ReactNode,
                children?: MenuItem[],
                type?: 'group',
                path?: string
            ): MenuItem => {
                return {
                    key,
                    id,
                    icon,
                    children,
                    label,
                    type,
                    path
                } as MenuItem;
            };

            const itemChildren: MenuItem[] = itemsForRoute.map(({ icon, path }) => ({
                label: (
                    <Typography.Text style={style}>
                        {`${path
                            .split('/')
                            .filter((i) => !i.includes('?'))
                            .pop()!}`}
                    </Typography.Text>
                ),
                key: `sub${path.split('/').pop()!}`,
                id: `sub${path.split('/').pop()!}`,
                icon,
                onClick: () => navigate(path),
                theme: THEME,
                path: '',
                children: undefined
            }));

            items.push({
                theme: THEME,
                label: routeLabel,
                key: route,
                id: route,
                icon: itemIcon,
                children: open
                    ? itemChildren
                    : [
                          getItemForCollapsedMenu(
                              routeLabel,
                              route,
                              null,
                              null,
                              itemChildren,
                              'group'
                          )
                      ],
                path: ''
            });
        });

        return items;
    }, [sortedRoutes, routes, navigate, open]);

    const items = useMemo(() => {
        // const headerItem = createHeaderItem();
        const menuItems = createRouteItems();

        return [...menuItems];
    }, [createRouteItems]);

    const loaderStatus = true;

    return (
        <Menu
            mode="inline"
            style={{ width: '100%', backgroundColor: '#07204A', color: 'white' }}
            inlineCollapsed={!open}
            items={!open ? [createHeaderItem(), ...items] : undefined}
            className="left-menu"
            selectedKeys={activeKeys}
        >
            <Menu.Item {...createHeaderItem()}>{createHeaderItem().label}</Menu.Item>
            <Menu.Divider />
            {items.map((item) => {
                if (item) {
                    if (item.children)
                        return (
                            <Menu.SubMenu
                                {...({ ...item, label: undefined } as object)}
                                title={item.label}
                            >
                                {item.children.map((child) => {
                                    return (
                                        <Menu.Item {...({ ...child, label: undefined } as object)}>
                                            {child?.label}
                                        </Menu.Item>
                                    );
                                })}
                            </Menu.SubMenu>
                        );

                    return (
                        <Menu.Item {...({ ...item, label: undefined } as object)}>
                            {(item as Record<string, any>).label}
                        </Menu.Item>
                    );
                }
                return item;
            })}
        </Menu>
    );
};
