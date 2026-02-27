import {forwardRef} from "react";
import {Image} from "react-bootstrap";

export const AvatarComponent = forwardRef(({children, ...rest}, ref) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {}
    const guest = 'https://ui-avatars.com/api/?name=Guest'
    return (
        <button {...rest} type="button" className={`btn`}
                ref={ref}><Image src={userInfo.avatar || guest || ''} alt={'avatar'}
                                 title={userInfo.username || 'Guest'}
                                 style={{width: 40, height: 40, borderRadius: '50%', cursor: 'pointer'}}/>
        </button>
    );
});