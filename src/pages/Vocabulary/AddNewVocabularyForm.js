import React, {useEffect, useState} from 'react';
import {Form} from 'react-bootstrap'
import {Controller, useForm} from "react-hook-form";

const AddNewVocabularyForm = () => {
    const [vocabularires, setVocabularires] = useState([])
    const {
        handleSubmit,
        control,
        getValues,
        reset,
        formState: {errors},
    } = useForm({
        reValidateMode: 'onChange',
        defaultValues: {
            vocabulary: '',
            translation: '',
            image: '',
        }
    });
    const onSubmit = () => {
        const {vocabulary, translation, image} = getValues();
        let arr = vocabularires;
        arr.push({
            vocabulary, translation, image
        })
        setVocabularires(arr)
    };

    const handleSaveVocabularies = () => {
        const {vocabulary, translation, image} = getValues();
        //todo save to db
    }

    useEffect(() => {
        if (vocabularires.length > 20) {
            handleSaveVocabularies()
        }
    }, [vocabularires.length]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={'border-top mt-4 d-flex flex-column align-items-center w-25 m-auto gap-2'}>
                <label className={'text-center fw-bold'}>Add new vocabulary :</label>
                <Form.Label column={true}>Từ mới:</Form.Label>
                <Controller
                    control={control}
                    name={'vocabulary'}
                    rules={{
                        required: true,
                    }}
                    render={({field, formState, fieldState}) => (
                        <input
                            className={`form-control input-group-sm ${fieldState.error ? 'is-invalid' : ''}`}
                            {...field}
                        />)}
                />
                <label>Nghĩa:</label>
                <Controller
                    control={control}
                    name={'translation'}
                    rules={{
                        required: true,
                    }}
                    render={({field, formState, fieldState}) => (
                        <input
                            className={`form-control input-group-sm ${fieldState.error ? 'is-invalid' : ''}`}
                            {...field}
                        />)}
                />
                <label>Ảnh minh họa:</label>
                <Controller
                    control={control}
                    name={'image'}
                    rules={{
                        required: true,
                    }}
                    render={({field, formState, fieldState}) => (
                        <input
                            className={`form-control input-group-sm ${fieldState.error ? 'is-invalid' : ''}`}
                            {...field}
                        />)}
                />
                <label>{`Number of Vocabularies: ${vocabularires.length}`}</label>
            </div>
        </form>
    );
};

export default AddNewVocabularyForm;