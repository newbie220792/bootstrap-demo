import React, {useEffect, useState} from 'react';
import {Form} from 'react-bootstrap';
import {VocabulariesService} from '../../services/vocabulariesService';
import ProgressBar from '../../components/ProgressBar';
import {HttpStatus} from '../../common/HttpStatus';

const TodoListComponent = () => {
    const [lessonStatus, setLessonStatus] = useState({});

    const updateLesson = (lesson) => {
        VocabulariesService.updateReportToday(lesson).then();
    };
    const handleDoneLesson = (code) => {
        switch (code) {
            case 'vocabulary':
                setLessonStatus(prevState => ({...prevState, vocabulary: true}));
                updateLesson('vocabulary');
                break;
            case 'duolingo':
                setLessonStatus(prevState => ({...prevState, duolingo: true}));
                updateLesson('duolingo');
                break;
            case 'grammar':
                setLessonStatus(prevState => ({...prevState, grammar: true}));
                updateLesson('grammar');
                break;
            case 'speaking':
                setLessonStatus(prevState => ({...prevState, speaking: true}));
                updateLesson('speaking');
                break;
        }
    };
    const getReportToday = () => {
        VocabulariesService.getReportToday().then(data => {
            if (data.status === HttpStatus.SUCCESS) {
                setLessonStatus({
                    duolingo: data.data.isLearningDuolingo === 1,
                    grammar: data.data.isLearningGrammar === 1,
                    speaking: data.data.isPracticeSpeaking === 1,
                    vocabulary: data.data.isLearningVocabulary === 1,
                    totalVocabulary: data.data.totalVocabulary
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
                    {lessonStatus.vocabulary &&
                        <ProgressBar currentPercent={lessonStatus.vocabulary ? lessonStatus.totalVocabulary || 50 : 0}
                                     label={lessonStatus.vocabulary ? `${lessonStatus.totalVocabulary || 0}/100` : '0/100'}/>}
                </div>
                <div className={'col-1'}>
                    {!lessonStatus.vocabulary && <button className={'btn btn-success text-start btn-sm'} type={'button'}
                                                         onClick={() => handleDoneLesson('vocabulary')}> Ok
                    </button>}
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
        </div>
    );
};

export default TodoListComponent;