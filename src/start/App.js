import { Route, Routes } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout';
import { routers } from '../routers/routers';

const App = () => {
    return (
        <div className='App'>
            <Routes>
                {routers.map((r, index) => {
                    const Page = r.component;
                    const Layout = r.layout || AuthLayout;
                    return (
                        <Route
                            key={index}
                            path={r.path}
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
