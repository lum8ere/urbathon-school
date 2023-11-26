import DefaultLayout from 'components/base/DefaultLayout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { allRoutes as routes } from 'routing/routes';

export const App = () => {
    console.log(routes);
    return (
        <BrowserRouter>
            <DefaultLayout>
                <Routes>
                    {routes.map((route) => (
                        <Route key={route.path} path={route.path} element={<route.component />} />
                    ))}
                </Routes>
            </DefaultLayout>
        </BrowserRouter>
    );
};
