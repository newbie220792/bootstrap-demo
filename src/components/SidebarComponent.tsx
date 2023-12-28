const SidebarComponent = () => {
    const menus = [
        {
            icon: '',
            name: 'Home',
        },
        {
            icon: '',
            name: 'CV',
        },
    ];
    return (
        <ul>
            {menus.map((menu, index) => {
                return <li key={index}>{menu.name}</li>;
            })}
        </ul>
    );
};

export default SidebarComponent;
