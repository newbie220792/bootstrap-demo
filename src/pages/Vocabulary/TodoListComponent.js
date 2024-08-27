import React, {useEffect, useState} from 'react';
import {Form} from 'react-bootstrap';
import {VocabulariesService} from '../../services/vocabulariesService';
import ProgressBar from '../../components/ProgressBar';
import {HttpStatus} from '../../common/HttpStatus';
import {useDispatch, useSelector} from 'react-redux';
import {VocabularySlice} from '../../stores/slices/VocabularySlice';

const TodoListComponent = () => {
    const [lessonStatus, setLessonStatus] = useState({});
    const dispatch = useDispatch();
    const {actions: vocabularyActions} = VocabularySlice;
    const numberOfRevise = useSelector(state => state.VocabularySlice.numberOfRevise);
    const numberOfNewWord = useSelector(state => state.VocabularySlice.numberOfNewWord);
    const updateLesson = (lesson) => {
        return VocabulariesService.updateReportToday(lesson);
    };

    const handleDoneLesson = (code) => {
        switch (code) {
            case 'duolingo':
                updateLesson('duolingo').then(res => {
                    if (res.status === HttpStatus.SUCCESS) {
                        setLessonStatus(prevState => ({...prevState, duolingo: true}));
                    }
                });
                break;
            case 'grammar':
                updateLesson('grammar').then(res => {
                    if (res.status === HttpStatus.SUCCESS) {
                        setLessonStatus(prevState => ({...prevState, grammar: true}));
                    }
                });
                break;
            case 'speaking':
                updateLesson('speaking').then(res => {
                    if (res.status === HttpStatus.SUCCESS) {
                        setLessonStatus(prevState => ({...prevState, speaking: true}));
                    }
                });
                break;
        }
    };
    const getReportToday = () => {
        VocabulariesService.getReportToday().then(data => {
            if (data.status === HttpStatus.SUCCESS) {
                dispatch(vocabularyActions.updateNumberOfWord(data.data.totalVocabulary));
                dispatch(vocabularyActions.updateNumberOfNewWord(data.data.numberOfNewWord));
                setLessonStatus({
                    duolingo: data.data.isLearningDuolingo === 1,
                    grammar: data.data.isLearningGrammar === 1,
                    speaking: data.data.isPracticeSpeaking === 1,
                    vocabulary: data.data.isLearningVocabulary === 1,
                    totalVocabulary: numberOfRevise === 0 ? data.data.totalVocabulary : numberOfRevise,
                    newWords: data.data.numberOfNewWord || 0
                });
            }
        });
    };

    useEffect(() => {
        getReportToday();
    }, []);

    return (
        <div className={'border-top mt-4 w-100'}>
            <label><span className={'me-1'}>&#x2022;</span>To do list:</label>
            <div className={'w-100 row ms-1 mt-2'}>
                <Form.Label column={true} className={'col-4 text-start'}><span className={'me-1'}>&#x2022;</span>Learning
                    vocabulary:</Form.Label>
                <div
                    className={`col-6 mt-2`}>
                    <ProgressBar
                        currentPercent={numberOfRevise}
                        label={`${numberOfRevise}/100`}/>
                </div>
            </div>
            <div className={'w-100 row ms-1 mt-2'}>
                <Form.Label column={true} className={'col-4 text-start'}><span className={'me-1'}>&#x2022;</span>Learning
                    duolingo:</Form.Label>
                <div
                    className={`col-6 mt-2`}>
                    {lessonStatus.duolingo && <ProgressBar currentPercent={lessonStatus.duolingo ? 100 : 0}
                                                           label={lessonStatus.duolingo ? '1/1' : '0/1'}/>}
                </div>
                <div className={'col-1'}>
                    {!lessonStatus.duolingo && <button className={'btn btn-success text-start btn-sm'} type={'button'}
                                                       onClick={() => handleDoneLesson('duolingo')}> Ok
                    </button>}
                </div>
            </div>
            <div className={'w-100 row ms-1 mt-2'}>
                <Form.Label column={true} className={'col-4 text-start'}><span className={'me-1'}>&#x2022;</span>Learning
                    grammar:</Form.Label>
                <div className={`col-6 mt-2`}>
                    {lessonStatus.grammar && <ProgressBar currentPercent={lessonStatus.grammar ? 100 : 0}
                                                          label={lessonStatus.grammar ? '1/1' : '0/1'}/>}
                </div>
                <div className={'col-1'}>
                    {!lessonStatus.grammar && <button className={'btn btn-success text-start btn-sm'}
                                                      onClick={() => handleDoneLesson('grammar')}> Ok
                    </button>}
                </div>
            </div>
            <div className={'w-100 row ms-1 mt-2'}>
                <Form.Label column={true} className={'col-4 text-start'}><span className={'me-1'}>&#x2022;</span>Learning
                    speaking:</Form.Label>
                <div className={`col-6 mt-2`}>
                    {lessonStatus.speaking && <ProgressBar currentPercent={lessonStatus.speaking ? 100 : 0}
                                                           label={lessonStatus.speaking ? '1/1' : '0/1'}/>}
                </div>
                <div className={'col-1'}>
                    {!lessonStatus.speaking && <button className={'btn btn-success text-start btn-sm'}
                                                       onClick={() => handleDoneLesson('speaking')}> Ok
                    </button>}
                </div>
            </div>
            <div className={'w-100 row ms-1 mt-2'}>
                <Form.Label column={true} className={'col-4 text-start'}><span className={'me-1'}>&#x2022;</span>New
                    words:</Form.Label>
                <div className={`col-6 mt-2`}>
                    <ProgressBar currentPercent={numberOfNewWord}
                                 label={numberOfNewWord}/>
                </div>
            </div>
        </div>
    );
};

export default TodoListComponent;