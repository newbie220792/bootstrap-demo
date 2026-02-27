import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import {routers} from '../routers/routers';
import {DASHBOARD_PATH, LOGIN_PATH, OAUTH2_REDIRECT_PATH} from "../common/roles";
import getWindow from "@popperjs/core/lib/dom-utils/getWindow";
import {useEffect} from "react";

const App = () => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (location.pathname === OAUTH2_REDIRECT_PATH) {
            const token = new URLSearchParams(location.search).get('token');
            const error = new URLSearchParams(location.search).get('error');
            const username = new URLSearchParams(location.search).get('username');
            const avatar = new URLSearchParams(location.search).get('avatar');
            if (token) {
                getWindow('oauth2Modal').close();
                localStorage.setItem('access_token', token);
                localStorage.setItem('user', JSON.stringify({username: username, avatar: avatar}));
                navigate(DASHBOARD_PATH);
                window.opener.location = DASHBOARD_PATH;
            } else if (error) {
                navigate(LOGIN_PATH);
                alert(error);
            }
        } else {
            const accessToken = localStorage.getItem('access_token');
            // if (!accessToken) {
            //     navigate(LOGIN_PATH);
            // }
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
                            key={'app-' + index}
                            path={process.env.PUBLIC_URL + r.path}
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
