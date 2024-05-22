import React from 'react';
import github from '../../assets/github.png';
import {Image} from 'react-bootstrap';

const ProfileComponent = () => {
    return <>
        <div className={'profile'}>
            <div className={'image-profile'}>
                <Image src={github} alt="Github Image" style={{width: '10%', height: '100%'}}/>
            </div>
        </div>
    </>;
};

export default ProfileComponent;
