import AuthLayout from '../layouts/AuthLayout';
import EmptyLayout from '../layouts/EmptyLayout';
import DashboardComponent from '../pages/Dashboard/DashboardComponent';
import ProfileComponent from '../pages/Profile/ProfileComponent';
import ReportComponent from '../pages/Report/ReportComponent';
import {VocabularyComponent} from '../pages/Vocabulary/VocabularyComponent';
import LoginComponent from '../pages/Login/LoginComponent';
import {VideoComponent} from '../pages/Videos/VideoComponent';
import {PhotosComponent} from '../pages/Photos/PhotosComponent';
import RegisterComponent from "../pages/Register/RegisterComponent";
import {
    DASHBOARD_PATH,
    LOGIN_PATH,
    PHOTO_PATH,
    PROFILE_PATH,
    REGISTER_PATH,
    REPORT_PATH,
    VIDEO_PATH,
    VOCABULARY_PATH
} from "../common/roles";
import NotFound from "../pages/Notfound/NotFound";

export const routers = [
    {
        path: PROFILE_PATH,
        component: ProfileComponent,
        layout: AuthLayout,
        role: ['all'],
    },
    {
        path: DASHBOARD_PATH,
        component: DashboardComponent,
        layout: AuthLayout,
        role: ['all'],
    },
    {
        path: VIDEO_PATH,
        component: VideoComponent,
        layout: AuthLayout,
        role: ['all'],
    },
    {
        path: PHOTO_PATH,
        component: PhotosComponent,
        layout: AuthLayout,
        role: ['all'],
    },
    {
        path: REPORT_PATH,
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
        path: LOGIN_PATH,
        component: LoginComponent,
        layout: EmptyLayout,
        role: ['all'],
    },
    {
        path: VOCABULARY_PATH,
        component: VocabularyComponent,
        layout: AuthLayout,
        role: ['all'],
    },
    {
        path: REGISTER_PATH,
        component: RegisterComponent,
        layout: EmptyLayout,
        role: ['all'],
    }
];
