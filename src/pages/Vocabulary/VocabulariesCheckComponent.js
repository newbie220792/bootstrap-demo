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
    // const [des, setDes] = useState([]);
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
        getVocabularies();
    }, []);
    const des = [
        {
            "partOfSpeech": "noun",
            "definitions":
                [
                    {
                        "definition": "A colorful, conspicuous structure associated with angiosperms, frequently scented and attracting various insects, and which may or may not be used for sexual reproduction.",
                        "synonyms": [],
                        "antonyms": []
                    },
                    {
                        "definition": "A reproductive structure in angiosperms (flowering plants), often conspicuously colourful and typically including sepals, petals, and either or both stamens and/or a pistil.",
                        "synonyms": [],
                        "antonyms": []
                    }, {
                    "definition": "A plant that bears flowers, especially a plant that is small and lacks wood.",
                    "synonyms": [],
                    "antonyms": [],
                    "example": "We transplanted the flowers to a larger pot."
                }, {
                    "definition": "(usually with in) Of plants, a state of bearing blooms.",
                    "synonyms": [],
                    "antonyms": [],
                    "example": "The dogwoods are in flower this week."
                }, {
                    "definition": "(hypocoristic) The vulva, especially the labia majora.",
                    "synonyms": [],
                    "antonyms": []
                }, {
                    "definition": "The best examples or representatives of a group.",
                    "synonyms": [],
                    "antonyms": [],
                    "example": "We selected the flower of the applicants."
                }, {
                    "definition": "The best state of things; the prime.",
                    "synonyms": [],
                    "antonyms": [],
                    "example": "She was in the flower of her life."
                }, {
                    "definition": "Flour.",
                    "synonyms": [],
                    "antonyms": []
                }, {
                    "definition": "(in the plural) A substance in the form of a powder, especially when condensed from sublimation.",
                    "synonyms": [],
                    "antonyms": [],
                    "example": "the flowers of sulphur"
                }, {
                    "definition": "A figure of speech; an ornament of style.",
                    "synonyms": [],
                    "antonyms": []
                }, {
                    "definition": "Ornamental type used chiefly for borders around pages, cards, etc.",
                    "synonyms": [],
                    "antonyms": []
                }, {"definition": "(in the plural) Menstrual discharges.", "synonyms": [], "antonyms": []}],
            // "synonyms": ["cream", "prime", "head", "pseudanthium"],
            // "antonyms": []
        },
        {
            "partOfSpeech": "verb",
            "definitions": [{
                "definition": "To put forth blooms.",
                "synonyms": [],
                "antonyms": [],
                "example": "This plant flowers in June."
            }, {
                "definition": "To decorate with pictures of flowers.",
                "synonyms": [],
                "antonyms": []
            }, {
                "definition": "To reach a state of full development or achievement.",
                "synonyms": [],
                "antonyms": []
            }, {"definition": "To froth; to ferment gently, as new beer.", "synonyms": [], "antonyms": []},
                {"definition": "To come off as flowers by sublimation.", "synonyms": [], "antonyms": []}],
            "synonyms": ["flourish", "bloom", "blossom"],
            "antonyms": []
        }
    ]

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
            <div className={'row'}>
                <label className={'col-1 text-end'}>&#x2022;</label>
                <label className={'col-10 text-start fw-bold'}>Description:</label>
            </div>
            {des.map((d, index) => <div key={index}
                                        className={'row ms-3'}>
                <label className={'col-1 text-end'}>&#x2022;</label>
                <label className={'col-9 text-start'}>Part Of Speech: {d.partOfSpeech}</label>
                {d.definitions.map((de, index) => index < 6 && <div key={index} className={'row ms-4'}>
                    <label className={'col-1 text-end'}>&#x2022;</label>
                    <div className={'col-11'}>
                        <label className={'text-start'}>Definition {++index}: {de.definition}
                            <button onClick={() => handleSpeak(de.definition)}>🔈</button>
                        </label>
                    </div>

                </div>)
                }
            </div>)}
            {
                vocabularies[vocabularyIndex] && vocabularies[vocabularyIndex].vietnameseTranslation && <label
                    className={'text-center w-100 mt-2'}>{vocabularies[vocabularyIndex].vietnameseTranslation}</label>}
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