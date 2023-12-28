import { AuthLayout, EmptyLayout } from '../layout';
import Dashboard from '../pages/Dashboard';

export const router = [
    {
        path: '/*',
        component: 'NotFound',
        layout: EmptyLayout,
        role: ['all'],
    },
    {
        path: '',
        component: Dashboard,
        layout: AuthLayout,
        role: ['all'],
    },
];
