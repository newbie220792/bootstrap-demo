import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import {routers} from '../routers/routers';
import {useEffect} from 'react';
import {DASHBOARD_PATH, LOGIN_PATH, OAUTH2_REDIRECT_PATH} from '../common/roles';

const App = () => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (location.pathname === OAUTH2_REDIRECT_PATH) {
            const token = new URLSearchParams(location.search).get('token');
            const error = new URLSearchParams(location.search).get('error');
            if (token) {
                console.log(token);
                localStorage.setItem('access_token', token);
                navigate(DASHBOARD_PATH);
            } else if (error) {
                navigate(LOGIN_PATH);
                console.log(error);
            }
        } else {
            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
                navigate(LOGIN_PATH);
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
