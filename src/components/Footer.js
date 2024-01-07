import React, { useState } from 'react';

const Footer = () => {
    const [currentDate, setCurrentDate] = useState();
    // useEffect(() => {
    //     const now = moment(new Date()).date;
    //     console.log(now);
    // }, []);

    return (
        <div className='footer'>
            <div className='d-flex'>
                <div>
                    <label>Wedding day:</label>
                    <label>Time: {currentDate} </label>
                </div>
            </div>
        </div>
    );
};

export default Footer;
