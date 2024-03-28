import React, {useState} from 'react';
import {Form} from 'react-bootstrap'
import {Controller, useForm} from "react-hook-form";
import $ from "jquery";
import {VocabulariesService} from "../../services/vocabulariesService";
import {fetchPostImage} from "../../common/fetchCommon";

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

    const onTranslate = async (sourceText) => {
        const sourceLang = 'en';
        const targetLang = 'vi';
        const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(sourceText);
        const data = await $.getJSON(url);
        return data[0][0][0];
    }
    const onSubmit = async () => {
        const {vocabulary} = getValues();
        const vietnameseTranslation = await onTranslate(vocabulary)
        const imageDescription = await fetchPostImage(null, null);
        const req = {
            vocabulary: vocabulary,
            vietnameseTranslation: vietnameseTranslation,
            imageDescription: imageDescription
        }
        VocabulariesService.addVocabulary(req).then(data => {
            if (data && data.status === 0) {
                alert(data.message)
            } else {
                alert('Add vocabularies fail')
            }
        }).catch(() => alert('Add vocabularies fail'))
        reset()
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'w-100'}>
            <div className={'mt-4 d-flex flex-column align-items-center gap-2'}>
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
                <div className={'d-flex flex-row gap-3'}>
                    <button type={'submit'} className={'btn btn-success mt-2'}>Add</button>
                </div>
            </div>
        </form>
    );
};

export default AddNewVocabularyForm;