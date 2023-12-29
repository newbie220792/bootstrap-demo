const EmptyLayout = ({ children, ...props }) => {
    return (
        <div>
            <h1>This is empty layout</h1>
            {children}
        </div>
    );
};

export default EmptyLayout;
