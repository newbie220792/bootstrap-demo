import {Controller, useForm} from "react-hook-form";
import {useMemo, useState} from "react";
import Select from "react-select/base";
import {selectData} from "./select-data";

export const PhotosComponent = () => {
    const [isDisableSubmit, setIsDisableSubmit] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const {
        handleSubmit, getValues, control, watch, formState: {errors},
    } = useForm({
        reValidateMode: 'onChange',
    });
    const onSubmit = (data) => {
        console.log(data)
    };
    // console.log(errors)
    // const userName = watch('userName')
    const {balance, amount} = watch();
    const handleOnlyInputNum = (value) => {
        if (value.indexOf('.') === value.length - 1) {
            return value;
        }
        value = value.toString().replace(/[^0-9.]/g, "");
        if (value === '') {
            return value;
        }
        if (value.indexOf('.') !== value.length - 1 && value.endsWith('.')) {
            value = value.substring(0, value.length - 1)
        }
        return Number(value).toLocaleString();
    }

    const isDisable = useMemo(() => {
        if (balance || amount) {
            if (Object.keys(errors).length !== 0) {
                return true
            }
            return false
        }
        return true
    }, [{...watch()}])

    const handleChangeSelectValue = (e) => {
        console.log(e)
    }
    return (<div>
        <form onSubmit={handleSubmit(onSubmit)} className='m-5 d-flex flex-column align-items-center gap-3'>
            <div className='d-flex flex-column'>
                <div className='d-flex flex-row justify-content-center align-items-center'>
                    <label className='col-6'>Balance:</label>
                    <Controller
                        control={control}
                        name="balance"
                        rules={{
                            required: true, maxLength: 5
                        }}
                        defaultValue=''
                        render={({field, formState, fieldState}) => (<input
                            className='form-control input-group-sm'
                            {...field}
                            max={20}
                            inputMode="decimal"
                            onChange={(e) => {
                                field.onChange(handleOnlyInputNum(e.target.value))
                            }}
                        />)}
                    />
                </div>
                {/*<div className='text-danger col-6'><span className='fa fa-danger'></span>Error</div>*/}
            </div>
            <div className='d-flex flex-column'>
                <div className='d-flex flex-row justify-content-center align-items-center'>
                    <label className='col-6'>Amount:</label>
                    <Controller
                        control={control}
                        name="amount"
                        rules={{
                            required: true, maxLength: 3
                        }}
                        defaultValue=''
                        render={({field, formState, fieldState}) => (<input
                            className='form-control input-group-sm'
                            {...field}
                            max={20}
                            inputMode="decimal"
                            onChange={(e) => {
                                field.onChange(handleOnlyInputNum(e.target.value))
                            }}
                        />)}
                    />
                </div>
                {/*<div className='text-danger col-6'><span className='fa fa-danger'></span>Error</div>*/}
            </div>
            <div className='d-flex flex-column'>
                <div className='d-flex flex-row justify-content-center align-items-center'>
                    <label className='col-6'>Currency:</label>
                    <Controller
                        control={control}
                        name="currency"
                        rules={{
                            required: true,
                        }}
                        render={({field, formState, fieldState}) => (<Select
                            {...field}
                            // defaultValue={selectedOption}
                            // onChange={setSelectedOption}
                            // onInputChange={setSelectedOption}
                            options={selectData}
                            onChange={(e) => {
                                field.onChange(e)
                                handleChangeSelectValue(e)
                            }}
                            onMenuOpen={() => setIsOpen(true)}
                            onMenuClose={() => setIsOpen(false)}/>)}
                    />
                </div>
                {/*<div className='text-danger col-6'><span className='fa fa-danger'></span>Error</div>*/}
            </div>
            <div className='col-1'>
                <button type='submit' disabled={isDisable} className='btn btn-success'>Submit</button>
            </div>
        </form>
    </div>);
};
