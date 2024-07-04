import * as React from 'react';
import {forwardRef} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {menus} from '../common/menus';
import {Dropdown, Image} from 'react-bootstrap';
import guest from '../assets/guest.jpeg';
import {VocabulariesService} from '../services/vocabulariesService';
import {LOGIN_PATH, PROFILE_PATH} from '../common/roles';

export const Header = () => {
    const navigate = useNavigate();
    const userString = localStorage.getItem('user');
    // const userInfo = useMemo(() => {
    //     if (!userString) {
    //         return JSON.parse(userString);
    //     } else {
    //         return {avatar: guest, username: ''};
    //     }
    // }, [userString]);

    const userInfo = {avatar: guest, username: ''};

    const logout = () => {
        const token = localStorage.getItem('access_token');
        const logoutRequest = {
            username: userInfo.username,
            token: token
        };
        VocabulariesService.logout(logoutRequest).then();
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        navigate(LOGIN_PATH);
    };

    const AvatarComponent = forwardRef(({children, ...rest}, ref) => {
        return (
            <button {...rest} type="button" className={`btn`}
                    ref={ref}><Image src={userInfo.avatar || guest || ''} alt={'avatar'}
                                     title={userInfo.username || 'Guest'}
                                     style={{width: 40, height: 40, borderRadius: '50%', cursor: 'pointer'}}/>
            </button>
        );
    });

    return (
        <header className="site-header">
            <div className="site-identity">
                <h1>
                    <Link to={process.env.PUBLIC_URL + '/'}>Vocabularies Page</Link>
                </h1>
            </div>
            <nav className="site-navigation">
                <ul className="nav">
                    {menus.map((menu) => {
                        return (
                            <li key={menu.id}>
                                <Link to={process.env.PUBLIC_URL + menu.path}>
                                    {menu.name}
                                </Link>
                            </li>
                        );
                    })}
                    <div className={'d-flex align-items-center'}>
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-split-basic" as={AvatarComponent}/>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#" disabled>{userInfo.username}</Dropdown.Item>
                                <Dropdown.Item href="#" onClick={() => {
                                    navigate(PROFILE_PATH);
                                }}>Profile</Dropdown.Item>
                                <Dropdown.Item href="#" onClick={logout}>Logout</Dropdown.Item>
                                {/*<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>*/}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </ul>
            </nav>
        </header>
    );
};
