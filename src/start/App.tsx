import { Route, Routes } from 'react-router-dom';
import { AuthLayout } from '../layout';
import { router } from '../routers';
import '../styles/index.css';

function App() {
    return (
        <div className="App">
            <Routes>
                {router
                    .filter((item1) => item1.role)
                    .map((item, index) => {
                        const Page = item.component;
                        const Layout = item.layout || AuthLayout;
                        return (
                            <Route
                                key={index}
                                path={item.path}
                                element={
                                    <Layout role={item.role}>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
            </Routes>
        </div>
    );
}

export default App;
