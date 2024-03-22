import {useEffect, useState} from "react";
import moment from "moment";

const Clock = () => {
    const SYSTEM_TZ_UTC_OFFSET_AS_TEXT = '+0700';
    const [timeAsText, setTimeAsText] = useState('');
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeAsText(moment().utcOffset(SYSTEM_TZ_UTC_OFFSET_AS_TEXT).format('DD-MM-YYYY HH:mm:ss'))
        }, 500);
        return () => clearInterval(timer);
    }, []);

    return (
        <span className="timeValue"><i className="fal fa-clock" style={{fontWeight: 400}}></i> {timeAsText}</span>
    )
}
export default Clock;