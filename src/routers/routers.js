import AuthLayout from '../layouts/AuthLayout';
import EmptyLayout from '../layouts/EmptyLayout';
import DashboardComponent from '../pages/Dashboard/DashboardComponent';
import NotFound from '../pages/Notfound/NotFound';
import ProfileComponent from '../pages/Profile/ProfileComponent';
import ReportComponent from '../pages/Report/ReportComponent';
import {VocabularyComponent} from '../pages/Vocabulary/VocabularyComponent';
import LoginComponent from '../pages/Login/LoginComponent';
import {VideoComponent} from '../pages/Videos/VideoComponent';
import {PhotosComponent} from '../pages/Photos/PhotosComponent';

export const routers = [
    {
        path: '/profile',
        component: ProfileComponent,
        layout: AuthLayout,
        role: ['all'],
    },
    {
        path: '/',
        component: DashboardComponent,
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
    {
        path: '/login',
        component: LoginComponent,
        layout: EmptyLayout,
        role: ['all'],
    },
    {
        path: '/vocabulary',
        component: VocabularyComponent,
        layout: AuthLayout,
        role: ['all'],
    },
];
