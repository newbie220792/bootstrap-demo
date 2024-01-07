import AuthLayout from '../layouts/AuthLayout';
import EmptyLayout from '../layouts/EmptyLayout';
import DashboardComponent from '../pages/Dashboard/DashboardComponent';
import NotFound from '../pages/Notfound/NotFound';
import { PhotosComponent } from '../pages/Photos/PhotosComponent';
import ProfileComponent from '../pages/Profile/ProfileComponent';
import ReportComponent from '../pages/Report/ReportComponent';
import { VideoComponent } from '../pages/Videos/VideoComponent';

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
        path: '/videos',
        component: VideoComponent,
        layout: AuthLayout,
        role: ['all'],
    },
    {
        path: '/photos',
        component: PhotosComponent,
        layout: AuthLayout,
        role: ['all'],
    },
    {
        path: '/report',
        component: ReportComponent,
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
