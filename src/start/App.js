import {Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import {routers} from '../routers/routers';
import {useEffect} from "react";
import {LOGIN_PATH} from "../common/roles";

const App = () => {
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            navigate(LOGIN_PATH);
        }
    }, [location]);
    return (
        <div className='app-container'>
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
