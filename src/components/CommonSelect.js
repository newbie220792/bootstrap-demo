import Select from "react-select/base";
import {forwardRef, useEffect, useState} from "react";

export const CommonSelect = forwardRef(({selectOptions, onChange, value, ...props}, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [optionValue, setOptionValue] = useState();
    // const [reactSelectOptions, setReactSelectOptions] = useState(selectOptions);


    useEffect(() => {
        const selected = selectOptions && selectOptions.filter(o => o.value === value)
        if (selected && selected.length > 0 && optionValue.value && optionValue.value !== value) {
            setOptionValue(selected[0])
        }
        if (value === null || value === undefined || value === '') {
            setOptionValue(null)
        }
    }, [value]);

    useEffect(() => {
        const selected = selectOptions && selectOptions.filter(o => o.value === value)
        if (selected && selected.length > 0) {
            setOptionValue(selected[0])
        }
    }, [selectOptions]);

    const handleChangeInput = (newValue) => {
        // console.log('handleChangeInput', newValue)

    }

    const handleChangeSelect = (newValue) => {
        console.log('handleChangeSelect', newValue)
        setOptionValue(newValue)
        onChange(newValue.value)
    }
    const onBlur = (e) => {
        console.log('onBlur', e)
    }

    return (
        <Select
            ref={ref}
            {...props}
            classNamePrefix='react-select'
            className="basic-single"
            menuIsOpen={isOpen}
            onMenuClose={() => setIsOpen(false)}
            onMenuOpen={() => setIsOpen(true)}
            // inputValue={optionValue}
            value={optionValue}
            // isSearchable
            // controlShouldRenderValue={false}
            // value={optionValue && optionValue.value ? optionValue.value : ''}
            options={selectOptions}
            onChange={handleChangeSelect}
            // isClearable={true}
            // isOptionSelected
            // onBlur={onBlur}
            onInputChange={handleChangeInput}/>
    );
});