import React, {useEffect, useState} from 'react';
import {Controller, useForm} from "react-hook-form";
import {Image} from "react-bootstrap";
import {VocabulariesService} from "../../services/vocabulariesService";

const VocabulariesCheckComponent = () => {
    // const vocabularies = ['medicine', 'refrigerator', 'emergency', 'lifeguard']
    const [vocabularies, setVocabularies] = useState([])
    const [vocabularyIndex, setVocabularyIndex] = useState(0)
    const [isStarted, setIsStarted] = useState(true)
    const [answer, setAnswer] = useState('')
    const {
        handleSubmit,
        control,
        getValues,
        reset,
        setError,
        formState: {errors},
    } = useForm({
        reValidateMode: 'onChange',
        defaultValues: {
            vocabulary: ''
        }
    });
    const handleUpdateVocabulary = (id) => {
        VocabulariesService.updateVocabularies(id).then();
    }
    const handleSpeak = (vocabulary) => {
        if (vocabulary) {
            window.responsiveVoice.speak(vocabulary)
        } else {
            window.responsiveVoice.speak("Vocabulary has not found")
        }


    }
    const onSubmit = () => {
        const {vocabulary} = getValues()
        if (vocabulary === vocabularies[vocabularyIndex].vocabulary) {
            const vocabularyPassed = vocabularies[vocabularyIndex];
            if (vocabularyPassed && vocabularyPassed.id) {
                handleUpdateVocabulary(vocabularyPassed.id);
            }
            setAnswer('true')
            setVocabularyIndex(prevState => ++prevState);
            reset();
        } else {
            setAnswer('false')
            handleSpeak(vocabularies[vocabularyIndex].vocabulary)
            setError('vocabulary', {message: 'Wrong vocabulary. Input again!'})
        }
    };
    const handleListenAgain = () => {
        handleSpeak(vocabularies[vocabularyIndex].vocabulary)
    }

    useEffect(() => {
        if (isStarted && vocabularies[vocabularyIndex]) {
            handleSpeak(vocabularies[vocabularyIndex].vocabulary)
        }
        if (vocabularyIndex === vocabularies.length && vocabularyIndex > 0) {
            alert('You have been finish your course today')
            handleSpeak('You have been finish your course today')
        }
    }, [vocabularyIndex, isStarted, vocabularies]);

    const getVocabularies = () => {
        VocabulariesService.getList().then(data => {
            if (data && data.status === 0) {
                setVocabularies(data.data)
            } else {
                alert('You have been finish your course today')
                handleSpeak('You have been finish your course today')
            }
        })
    }
    useEffect(() => {
        // getVocabularies();
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={'d-flex justify-content-center gap-1 mt-4'}>
                <button type={"submit"} className={'btn btn-success'}>❮ Previous</button>
                <Controller
                    control={control}
                    name={'vocabulary'}
                    rules={{
                        required: {value: true, message: 'Nhap tu vao'},
                    }}
                    render={({field, formState, fieldState}) => (
                        <input
                            className={`form-control input-group-sm w-25 ${errors.vocabulary ? 'is-invalid' : ''}`}
                            {...field}
                        />)}
                />
                <button type={"submit"} className={'btn btn-success'}>Next ❯</button>
                <button type={"button"} className={'btn btn-success'} onClick={handleListenAgain}>Listen
                    again!
                </button>
            </div>
            {errors.vocabulary &&
                <label className={'text-center w-100 text-danger mt-2'}>{errors.vocabulary.message}</label>}
            {vocabularies[vocabularyIndex] && vocabularies[vocabularyIndex].imageDescription &&
                <div className={'text-center mt-4'}>
                    <Image src={vocabularies[vocabularyIndex].imageDescription}
                           style={{height: 100}}/>
                </div>}
            <div className={'d-flex justify-content-center mt-4'}>
                {answer === 'false' && <Image
                    src={'https://media.baamboozle.com/uploads/images/670774/6569f919-9802-473f-a7ff-282fae2d90f1.gif'}
                    style={{height: 100}}/>}
                {answer === 'true' &&
                    <Image
                        src={'https://i.pinimg.com/originals/fe/01/3f/fe013f692231e4e61376f11c49779440.gif'}
                        style={{height: 100}}/>}
            </div>
        </form>
    );
};

export default VocabulariesCheckComponent;