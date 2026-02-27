import Footer from '../components/Footer';
import {Header} from '../components/Header';
import {Spinner} from 'react-bootstrap';
import React from 'react';
import {useSelector} from 'react-redux';

const AuthLayout = ({children, ...props}) => {
    const isLoading = useSelector(state => state.LoadingSlice.isLoading);

    return (
        <>
            <Header/>
            {children}
            {isLoading && (
                <div
                    className={'position-absolute d-flex justify-content-center align-items-center h-100 w-100 opacity-50 bg-white top-0'}>
                    <Spinner
                        animation="border"
                        variant="dark"
                    />
                </div>
            )}
            <Footer/>
        </>
    );
};

export default AuthLayout;