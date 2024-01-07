import Footer from '../components/Footer';
import { Header } from '../components/Header';

const AuthLayout = ({ children, ...props }) => {
    return (
        <div className='main-layout'>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default AuthLayout;
