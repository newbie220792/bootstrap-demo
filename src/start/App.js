import { Route, Routes } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { routers } from '../routers/routers';
const App = () => {
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
                                    <Page />
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
