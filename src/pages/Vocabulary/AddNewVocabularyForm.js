import React, {useEffect, useState} from 'react';
import {Form} from 'react-bootstrap'
import {Controller, useForm} from "react-hook-form";
import {VocabulariesService} from "../../services/vocabulariesService";

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
        reset()
    };

    const handleSaveVocabularies = () => {
        //todo save to db
        VocabulariesService.addNewVocabularies(vocabularires).then(data => {
            alert(data.message)
        })
    }

    useEffect(() => {
        if (vocabularires.length > 20) {
            handleSaveVocabularies()
        }
    }, [vocabularires.length]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'w-100'}>
            <div className={'border-start mt-4 d-flex flex-column align-items-center gap-2'}>
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
                <div className={'d-flex flex-row gap-3'}>
                    <button type={'submit'} className={'btn btn-success mt-2'}>Add</button>
                    <button type={'button'} className={'btn btn-secondary mt-2'} onClick={handleSaveVocabularies}>Save
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddNewVocabularyForm;