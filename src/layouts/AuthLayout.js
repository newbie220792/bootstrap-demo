const AuthLayout = ({ children, ...props }) => {
    return (
        <div>
            <h1>This is auth layout</h1>
            {children}
        </div>
    );
};

export default AuthLayout;
