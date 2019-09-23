import React from 'react';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProductListPage from './pages/ProductListPage';
import ProductAction from './pages/ProductAction';

const routes = [
    {
        path : '/',
        exact : true,
        main: () => <Home />
    },
    {
        path : '/products',
        exact : false,
        main: () => <ProductListPage />
    },
    {
        path : '/product/add',
        exact : false,
        main: ({history}) => <ProductAction history={history} />
    },
    {
        path : '/product/:id/edit',
        exact : false,
        main: ({match, history}) => <ProductAction match={ match } history={history} />
    },
    {
        path : '',
        exact : false,
        main: () => <NotFound />
    }
];

export default routes;