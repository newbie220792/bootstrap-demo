import * as React from 'react';
import {forwardRef, useMemo} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {menus} from '../common/menus';
import {Dropdown, Image} from 'react-bootstrap';
import guest from '../assets/guest.jpeg';
import {VocabulariesService} from '../services/vocabulariesService';
import {LOGIN_PATH, PROFILE_PATH} from '../common/roles';
import {ACCESS_TOKEN, USER_KEY} from "../common/constants";
import fire from "../assets/fire.png";

export const Header = () => {
    const navigate = useNavigate();
    const userString = localStorage.getItem(USER_KEY);
    const userInfo = useMemo(() => {
        if (!!userString) {
            return JSON.parse(userString);
        } else {
            return {avatar: guest, username: ''};
        }
    }, [userString]);

    const logout = () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        const logoutRequest = {
            username: userInfo.username,
            token: token
        };
        VocabulariesService.logout(logoutRequest).then();
        localStorage.removeItem(USER_KEY);
        localStorage.removeItem(ACCESS_TOKEN);
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
            <div className="site-identity d-flex flex-row">
                <h1>
                    <Link to={process.env.PUBLIC_URL + '/'}>Vocabularies Page</Link>
                </h1>
                <div className={'d-flex align-items-center ps-2'}>
                    <Image src={fire} style={{width: 20, height: 20}}/>
                    <label className={'ps-1'}>{userInfo.stayLearningTimes || 0}</label>
                </div>
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
