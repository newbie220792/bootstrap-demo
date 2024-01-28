import * as React from 'react';
import {forwardRef, useState} from 'react';
import {autoCompleteData} from "./select-data";

export const AutoComplete = forwardRef(({suggestOptions, props}, ref) => {
    const [isShow, setIsShow] = useState(true)
    const onFocus = (e) => {
        console.log('focus')
        setIsShow(true)
        props.onFocus(e);
    }

    const onBlur = (e) => {
        console.log('blur')
        setIsShow(false)
        props.onBlur(e);
    }

    const onChange = (e) => {
        console.log('onChange')
        // setIsShow(false)
        props.onChange(e);
    }
    return (
        <div>
            <input ref={ref} className='form-control input-group-sm'
                   {...props}/>
            {isShow && <ul>
                {autoCompleteData.map((s, i) => {
                    return <li key={i}>{s}</li>
                })}
            </ul>}
        </div>
    );
});