import React, {useState} from 'react';
import {Form} from 'react-bootstrap'
import {Controller, useForm} from "react-hook-form";
import {VocabulariesService} from "../../services/vocabulariesService";

const AddNewVocabularyForm = () => {
    const [vocabularies, setVocabularies] = useState([])
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
            vietnameseTranslation: '',
            imageDescription: '',
        }
    });
    const onSubmit = () => {
        const {vocabulary, vietnameseTranslation, imageDescription} = getValues();
        // let arr = vocabularies;
        // arr.push({
        //     vocabulary, vietnameseTranslation, imageDescription
        // })
        // setVocabularies(arr)

        VocabulariesService.addVocabulary(getValues()).then(data => {
            if (data && data.status === 0) {
                alert(data.message)
                // setVocabularies([])
            } else {
                alert('Add vocabularies fail')
            }
        }).catch(() => alert('Add vocabularies fail'))
        reset()
    };

    // const handleSaveVocabularies = () => {
    //     //todo save to db
    //     VocabulariesService.addVocabularies(vocabularies).then(data => {
    //         if (data && data.status === 0) {
    //             alert(data.message)
    //             setVocabularies([])
    //         } else {
    //             alert('Add vocabularies fail')
    //         }
    //     }).catch(() => alert('Add vocabularies fail'))
    // }

    // useEffect(() => {
    //     if (vocabularies.length > 20) {
    //         handleSaveVocabularies()
    //     }
    // }, [vocabularies.length]);

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
                    name={'vietnameseTranslation'}
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
                    name={'imageDescription'}
                    rules={{
                        required: true,
                    }}
                    render={({field, formState, fieldState}) => (
                        <input
                            className={`form-control input-group-sm ${fieldState.error ? 'is-invalid' : ''}`}
                            {...field}
                        />)}
                />
                <label>{`Number of Vocabularies: ${vocabularies.length}`}</label>
                <div className={'d-flex flex-row gap-3'}>
                    <button type={'submit'} className={'btn btn-success mt-2'}>Add</button>
                    {/*<button type={'button'} className={'btn btn-secondary mt-2'} onClick={handleSaveVocabularies}>Save*/}
                    {/*</button>*/}
                </div>
            </div>
        </form>
    );
};

export default AddNewVocabularyForm;