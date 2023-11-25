import { NewsPage } from 'pages/news/NewsPage';
import { ShedulePage } from 'pages/ShedulePage';
import { TeacherPage } from 'pages/TeacherPage';
import { Routes } from 'routing/route';
import { RouteTypeMassive } from 'types/routesTypes';
import { StudentsPage } from 'pages/StudentsPage';
import { CreateNewsPage } from 'pages/news/CreateNewsPage';
import { EditNewsPage } from 'pages/news/EditNewsPage';

export const dashboardsRoutesDataApps: RouteTypeMassive[] = [
    {
        path: 'schedule',
        tablePage: ShedulePage
    },
    {
        path: 'teachers',
        tablePage: TeacherPage
    },
    {
        path: 'students',
        tablePage: StudentsPage
    },
    {
        path: 'posts',
        tablePage: NewsPage
    },
    {
        path: 'posts/create',
        tablePage: CreateNewsPage
    },
    {
        path: 'posts/edit/:id',
        tablePage: EditNewsPage
    }
];

export const dashboardsRoutes = new Routes('/dashboards', dashboardsRoutesDataApps);
