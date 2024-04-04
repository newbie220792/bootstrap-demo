import Footer from '../components/Footer';
import {Header} from '../components/Header';

const AuthLayout = ({children, ...props}) => {
    return (
        <>
            <Header/>
            {children}
            <Footer/>
        </>
    );
};

export default AuthLayout;
