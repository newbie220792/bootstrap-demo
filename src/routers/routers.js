import AuthLayout from '../layouts/AuthLayout';
import EmptyLayout from '../layouts/EmptyLayout';
import DashboardComponent from '../pages/Dashboard/DashboardComponent';
import NotFound from '../pages/NotFound';
import ProfileComponent from '../pages/Profile/ProfileComponent';

export const routers = [
    {
        path: '/',
        component: DashboardComponent,
        layout: AuthLayout,
        role: ['all'],
    },
    {
        path: '/profile',
        component: ProfileComponent,
        layout: AuthLayout,
        role: ['all'],
    },
    {
        path: '/*',
        component: NotFound,
        layout: EmptyLayout,
        role: ['all'],
    },
];
