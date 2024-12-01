import React, {useEffect, useMemo, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Image} from 'react-bootstrap';
import {VocabulariesService} from '../../services/vocabulariesService';
import _ from 'lodash';
import {HttpStatus} from '../../common/HttpStatus';
import {useDispatch, useSelector} from 'react-redux';
import {VocabularySlice} from '../../stores/slices/VocabularySlice';
import {USER_KEY} from '../../common/constants';
import guest from '../../assets/guest.jpeg';

const VocabulariesCheckComponent = () => {
    const [vocabularies, setVocabularies] = useState([]);
    const [vocabularyIndex, setVocabularyIndex] = useState(0);
    const dispatch = useDispatch();
    const {actions: vocabularyActions} = VocabularySlice;
    const numberOfRevise = useSelector(state => state.VocabularySlice.numberOfRevise);

    const userString = localStorage.getItem(USER_KEY);
    const userInfo = useMemo(() => {
        if (!!userString) {
            return JSON.parse(userString);
        } else {
            return {avatar: guest, username: ''};
        }
    }, [userString]);

    const {
        handleSubmit,
        control,
        getValues,
        reset,
        setError,
        formState: {errors, submitCount},
    } = useForm({
        reValidateMode: 'onChange',
        defaultValues: {
            vocabulary: ''
        }
    });
    const handleUpdateVocabulary = (id, numberOfSubmit) => {
        const req = {
            id: id,
            times: numberOfSubmit,
            userId: userInfo.id || 1
        };
        VocabulariesService.updateVocabularies(req).then();
    };

    const handleSpeak = (vocabulary) => {
        if (!_.isEmpty(vocabulary) && typeof vocabulary === 'object') {
            window.responsiveVoice.speak(vocabulary.vocabulary);
            setTimeout(() => window.responsiveVoice.speak(vocabulary.vietnameseTranslation, 'Vietnamese Female'), 1500);
        } else if (typeof vocabulary === 'string') {
            window.responsiveVoice.speak(vocabulary);
        } else {
            window.responsiveVoice.speak('Vocabulary has not found');
        }
    };
    const onSubmit = () => {
        const {vocabulary} = getValues();
        if (!vocabularies || !vocabularies[vocabularyIndex] || !vocabularies[vocabularyIndex].vocabulary) {
            handleSpeak(vocabulary);
            setError('vocabulary', {message: 'Wrong vocabulary. Input again!'});
            return;
        }
        if (vocabulary.toLowerCase() === vocabularies[vocabularyIndex].vocabulary.toLowerCase()) {
            const vocabularyPassed = vocabularies[vocabularyIndex];
            if (vocabularyPassed && vocabularyPassed.id) {
                dispatch(vocabularyActions.updateNumberOfWord(numberOfRevise + 1));
                handleUpdateVocabulary(vocabularyPassed.id, submitCount - 1);
            }
            setVocabularyIndex(prevState => ++prevState);
            reset(null, {keepSubmitCount: false, keepDefaultValues: true});
        } else {
            handleSpeak(vocabularies[vocabularyIndex]);
            setError('vocabulary', {message: 'Wrong vocabulary. Input again!'});
        }
    };
    const handleListenAgain = () => {
        handleSpeak(vocabularies[vocabularyIndex]);
    };

    useEffect(() => {
        if (vocabularies[vocabularyIndex]) {
            handleSpeak(vocabularies[vocabularyIndex]);
        }
        if (vocabularyIndex === vocabularies.length && vocabularyIndex > 0) {
            // alert('You have been finish your course today');
            handleSpeak('You have been finish your course today');
        }
    }, [vocabularyIndex, vocabularies]);

    const getVocabularies = () => {
        VocabulariesService.getList().then(data => {
            if (data && data.status === HttpStatus.SUCCESS) {
                setVocabularies(data.data);
            } else {
                // alert('You have been finish your course today');
                handleSpeak('You have been finish your course today');
            }
        });
    };
    useEffect(() => {
        getVocabularies();
    }, []);

    const formatPhonetic = (phonetic) => {
        return phonetic.replaceAll('"', '');
    };

    const handleSpeakDescription = () => {
        handleSpeak(vocabularies[vocabularyIndex].description);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={'d-flex justify-content-center gap-1 mt-md-5 pt-5'}>
                <Controller
                    control={control}
                    name={'vocabulary'}
                    rules={{
                        required: {value: true, message: 'Please input vocabulary'},
                    }}
                    render={({field, formState, fieldState}) => (
                        <input
                            className={`form-control input-group-sm w-75 ${errors.vocabulary ? 'is-invalid' : ''}`}
                            {...field}
                        />)}
                />
                <button type={'submit'} className={'btn btn-success'}>❯</button>
            </div>
            {errors.vocabulary &&
                <label className={'text-center w-100 text-danger mt-2'}>{errors.vocabulary.message}</label>}
            {submitCount > 3 && <div className={'row mt-2'}>
                <label className={'col-1 text-end'}>&#x2022;</label>
                <label
                    className={'col-10 text-start fw-bold'}>Vocabulary: {vocabularies[vocabularyIndex] && vocabularies[vocabularyIndex].vocabulary &&
                    vocabularies[vocabularyIndex].vocabulary}</label>

            </div>}
            {vocabularies && vocabularies.length > 0 && vocabularies[vocabularyIndex] && <>
                <div className={'row mt-2'}>
                    <label className={'col-1 text-end'}>&#x2022;</label>
                    <label
                        className={'col-10 text-start fw-bold'}>Part Of
                        Speech: {vocabularies[vocabularyIndex] && vocabularies[vocabularyIndex].partOfSpeech &&
                            <span
                                className={'fw-bold'}>{formatPhonetic(vocabularies[vocabularyIndex].partOfSpeech)}</span>}
                    </label>

                </div>
                <div className={'row mt-2'}>
                    <label className={'col-1 text-end'}>&#x2022;</label>
                    <label
                        className={'col-10 text-start fw-bold'}>Phonetic: {vocabularies[vocabularyIndex] && vocabularies[vocabularyIndex].phonetic &&
                        <span className={'fw-bold'}>{formatPhonetic(vocabularies[vocabularyIndex].phonetic)}</span>}
                        <span className={'ms-1 phonetic'} onClick={handleListenAgain}>🔈</span>
                    </label>

                </div>
                <div className={'row mt-2'}>
                    <label className={'col-1 text-end'}>&#x2022;</label>
                    <label
                        className={'col-10 text-start fw-bold'}>Vietnamese
                        Translation: {vocabularies[vocabularyIndex] && vocabularies[vocabularyIndex].vietnameseTranslation &&
                            vocabularies[vocabularyIndex].vietnameseTranslation}</label>

                </div>
                <div className={'row mt-2'}>
                    <label className={'col-1 text-end'}>&#x2022;</label>
                    <label
                        className={'col-10 text-start fw-bold'}>Description: {vocabularies[vocabularyIndex] && vocabularies[vocabularyIndex].description &&
                        vocabularies[vocabularyIndex].description}<span className={'ms-1 phonetic'}
                                                                        onClick={handleSpeakDescription}>🔈</span></label>
                </div>
            </>}
            <div className={'row mt-2'}>
                {vocabularies[vocabularyIndex] && vocabularies[vocabularyIndex].imageDescription &&
                    <div className={'text-center mt-4'}>
                        <Image src={vocabularies[vocabularyIndex].imageDescription}/>
                    </div>}
            </div>
        </form>
    );
};

export default VocabulariesCheckComponent;