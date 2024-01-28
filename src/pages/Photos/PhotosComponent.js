import {Controller, useForm} from "react-hook-form";
import {useEffect, useMemo, useState} from "react";
import {fields} from "./photoCommon";
import {fetchGet} from "../../common/fetchCommon";
import {CommonSelect} from "../../components/CommonSelect";

export const PhotosComponent = () => {
    const [isDisableSubmit, setIsDisableSubmit] = useState(true);
    const [selectedOption, setSelectedOption] = useState({});

    const POST_URL = 'https://jsonplaceholder.typicode.com/posts';
    const COMMENT_URL = 'https://jsonplaceholder.typicode.com/comments';
    const {
        handleSubmit,
        getValues,
        setValue,
        control,
        watch,
        reset,
        formState: {errors},
    } = useForm({
        reValidateMode: 'onChange',
        defaultValues: {
            post: 12,
            // comment: 12,
            balance: 11,
            amount: 1,
        }
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

    const handleResetForm = () => {
        reset({
            post: 12,
            // comment: 12,
            balance: 11,
            amount: 1,
        })
    }

    const getSelectOptions = async (fieldName) => {
        switch (fieldName) {
            case 'post':
            case 'comment':
                const posts = await fetchGet(POST_URL, null);
                const postSelects = posts.map(p => {
                    return {value: p.id, label: p.title}
                })
                const post = posts.filter(p => p.id === 12)

                const comments = await fetchGet(COMMENT_URL, {postId: post[0].id});
                const commentSelect = comments.map(c => {
                    return {value: c.id, label: c.name}
                })
                setSelectedOption(prevState => {
                    return {...prevState, comment: commentSelect, post: postSelects}
                })
                break;
        }
    }

    const handlePostSelect = async (value) => {
        console.log(value)
        setValue('post', value)
        const comments = await fetchGet(COMMENT_URL, {postId: value});
        const commentSelect = comments.map(c => {
            return {value: c.id, label: c.name}
        })
        setSelectedOption(prevState => {
            return {...prevState, comment: commentSelect}
        })
    }

    const handleChangeSelect = {
        post: handlePostSelect
    }

    useEffect(() => {
        fields.forEach(f => {
            getSelectOptions(f.fieldName)
        })
    }, [fields]);

    return (<div>
        <form onSubmit={handleSubmit(onSubmit)} className='m-5 d-flex flex-column align-items-center gap-5'>
            {fields.map((f, i) => {
                switch (f.type) {
                    case 'input':
                        return <div className='d-flex flex-column' key={i}>
                            <div className='d-flex flex-row justify-content-center align-items-center'>
                                <label className='col-6'>{f.label}:</label>
                                <Controller
                                    control={control}
                                    name={f.fieldName}
                                    rules={{
                                        // required: true,
                                        // maxLength: 5
                                    }}
                                    defaultValue=''
                                    render={({field, formState, fieldState}) => (
                                        <input
                                            className='form-control input-group-sm'
                                            {...field}
                                        />)}
                                />
                            </div>
                        </div>
                    case 'options':
                        return <div className='d-flex flex-row justify-content-center align-items-center' key={i}>
                            <label className='col-6'>{f.label}:</label>
                            <div className='col-12'>
                                <Controller
                                    control={control}
                                    name={f.fieldName}
                                    rules={{
                                        // required: true,
                                        // maxLength: 5
                                    }}
                                    defaultValue=''
                                    render={({field, formState, fieldState}) => (
                                        <CommonSelect {...field} selectOptions={selectedOption[f.fieldName]}
                                                      onChange={handleChangeSelect[f.fieldName] ? handleChangeSelect[f.fieldName] : field.onChange}/>)}
                                />
                            </div>
                        </div>
                }
            })}
            <div className='col-1 d-flex gap-3'>
                <button type='submit' className='btn btn-success pointer-event'>Submit</button>
                <button type='button' className='btn btn-secondary' onClick={handleResetForm}>Reset</button>
            </div>
        </form>
    </div>);
};
