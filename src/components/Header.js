import * as React from 'react';
import { Link } from 'react-router-dom';
import { menus } from '../common/menus';
export const Header = () => {
    return (
        <header className='site-header'>
            <div className='site-identity'>
                <h1>
                    <Link to={process.env.PUBLIC_URL}>Wedding Page</Link>
                </h1>
            </div>
            <nav className='site-navigation'>
                <ul className='nav'>
                    {menus.map((menu) => {
                        return (
                            <li key={menu.id}>
                                <Link to={process.env.PUBLIC_URL + menu.path}>
                                    {menu.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </header>
    );
};
