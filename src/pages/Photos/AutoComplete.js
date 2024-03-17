import * as React from 'react';
import {forwardRef, useState} from 'react';
import {autoCompleteData} from "./select-data";
import _ from 'lodash'

export const AutoComplete = forwardRef(({suggestOptions, onChange, onFocus, onBlur, value, ...props}, ref) => {
    const [isShow, setIsShow] = useState(false)
    const [inputValue, setInputValue] = useState(value)
    const handleInputFocus = (e) => {
        setIsShow(true)
    }

    const handleInputBlur = _.debounce(e => {
        setIsShow(false)
    }, 200)

    const handleInputChange = (e) => {
        console.log('onChange')
        setInputValue(e.target.value)
        onChange(e);
    }

    const handleClickSelect = (e) => {
        const value = e.currentTarget.innerText
        setInputValue(value)
        onChange(value)
    }
    return (
        <div className='auto-complete-main'>
            <input ref={ref}
                   onFocus={handleInputFocus}
                   onChange={handleInputChange}
                   onBlur={handleInputBlur}
                   value={inputValue}
                   {...props}/>
            {isShow && <ul className='auto-complete-menu'>
                {autoCompleteData.map((s, i) => {
                    return <li key={i} onClick={handleClickSelect}>
                        <div className='auto-complete-item'>{s}</div>
                    </li>
                })}
            </ul>}
        </div>
    );
});