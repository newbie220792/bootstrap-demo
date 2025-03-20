import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import {routers} from '../routers/routers';
import {DASHBOARD_PATH, LOGIN_PATH, OAUTH2_REDIRECT_PATH} from '../common/roles';
import getWindow from '@popperjs/core/lib/dom-utils/getWindow';
import {useEffect} from 'react';
import {ACCESS_TOKEN, USER_KEY} from '../common/constants';

const App = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const ROOT_PATH = process.env.PUBLIC_URL;

    useEffect(() => {
        if (location.pathname === OAUTH2_REDIRECT_PATH) {
            const token = new URLSearchParams(location.search).get('token');
            const error = new URLSearchParams(location.search).get('error');
            const username = new URLSearchParams(location.search).get('username');
            const avatar = new URLSearchParams(location.search).get('avatar');
            const userId = new URLSearchParams(location.search).get('id');
            if (token) {
                getWindow('oauth2Modal').close();
                localStorage.setItem(ACCESS_TOKEN, token);
                localStorage.setItem(USER_KEY, JSON.stringify({username: username, avatar: avatar, id: userId}));
                navigate(ROOT_PATH + DASHBOARD_PATH);
                window.opener.location = DASHBOARD_PATH;
            } else if (error) {
                navigate(ROOT_PATH + LOGIN_PATH);
                alert(error);
            }
        } else {
            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
                navigate(ROOT_PATH + LOGIN_PATH);
            }
        }
    }, [location.pathname]);

    return (
        <div className="app-container">
            <Routes>
                {routers.map((r, index) => {
                    const Page = r.component;
                    const Layout = r.layout || AuthLayout;
                    return (
                        <Route
                            key={index}
                            path={ROOT_PATH + r.path}
                            element={
                                <Layout>
                                    <Page/>
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </div>
    );
};

export default App;
