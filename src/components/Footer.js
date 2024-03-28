import React, {useState} from 'react';
import Clock from "./Clock";
import moment from "moment";

const Footer = () => {
    const [currentDate, setCurrentDate] = useState();
    const [weddingDay, setWeddingDay] = useState('16-07-2023')
    const NumberDays = () => {
        const weddingTime = moment('16-07-2023', 'DD-MM-YYYY')
        const currentTime = moment()
        const days = currentTime.diff(weddingTime, "days")
        return <label>Days: {days}</label>
    }
    return (
        <div className='footer border-top'>
            <div className='d-flex justify-content-around'>
                <label>Wedding day: {weddingDay}</label>
                {NumberDays()}
                <label>Current Time:
                    <Clock/>
                </label>
            </div>
        </div>
    );
};

export default Footer;
