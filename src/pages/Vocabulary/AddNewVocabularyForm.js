import React from 'react';
import {Form} from 'react-bootstrap';
import {Controller, useForm} from 'react-hook-form';
import $ from 'jquery';
import {VocabulariesService} from '../../services/vocabulariesService';
import {HttpStatus} from '../../common/HttpStatus';
import {useDispatch, useSelector} from "react-redux";
import {VocabularySlice} from "../../stores/slices/VocabularySlice";

const AddNewVocabularyForm = () => {
    const dispatch = useDispatch();
    const {actions: vocabularyActions} = VocabularySlice;
    const numberOfNewWord = useSelector(state => state.VocabularySlice.numberOfNewWord);
    const {
        handleSubmit,
        control,
        getValues,
        reset,
    } = useForm({
        reValidateMode: 'onChange',
        defaultValues: {
            vocabulary: '',
            vietnameseTranslation: '',
            imageDescription: '',
            description: ''
        }
    });

    const handleSpeak = (vocabulary) => {
        if (vocabulary) {
            window.responsiveVoice.speak(vocabulary);
        } else {
            window.responsiveVoice.speak('Vocabulary has not found');
        }
    };

    const onTranslate = async (sourceText) => {
        const sourceLang = 'en';
        const targetLang = 'vi';
        const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' + sourceLang + '&tl=' + targetLang + '&dt=t&q=' + encodeURI(sourceText);
        const data = await $.getJSON(url);
        return data[0][0][0];
    };
    const onSubmit = async () => {
        const {vocabulary, imageDescription, description} = getValues();
        handleSpeak(vocabulary);
        const vietnameseTranslation = await onTranslate(vocabulary);
        const req = {
            vocabulary: vocabulary,
            vietnameseTranslation: vietnameseTranslation,
            imageDescription: imageDescription,
            description: description
        };
        VocabulariesService.addVocabulary(req).then(data => {
            if (data && data.status === HttpStatus.SUCCESS) {
                handleSpeak('Success');
                dispatch(vocabularyActions.updateNumberOfNewWord(numberOfNewWord + 1));
            } else {
                handleSpeak(data.message);
            }
        }).catch(() => handleSpeak('Add vocabularies fail'));
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={'w-100'}>
            <div className={'mt-4 d-flex flex-column align-items-center gap-2'}>
                <label className={'text-center fw-bold'}>Add new vocabulary :</label>
                <Form.Label column={true}>Từ mới:</Form.Label>
                <Controller
                    control={control}
                    name="vocabulary"
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
                    name="imageDescription"
                    rules={{
                        required: true,
                    }}
                    render={({field, formState, fieldState}) => (
                        <input
                            className={`form-control input-group-sm ${fieldState.error ? 'is-invalid' : ''}`}
                            {...field}
                        />)}
                />
                <label>Ví dụ:</label>
                <Controller
                    control={control}
                    name="description"
                    // rules={{
                    //     required: true,
                    // }}
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