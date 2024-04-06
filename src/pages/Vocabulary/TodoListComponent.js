import React, {useState} from 'react';
import {Form} from 'react-bootstrap'
import {VocabulariesService} from "../../services/vocabulariesService";

const TodoListComponent = () => {
    const [lessonStatus, setlessonStatus] = useState({})

    const updateLesson = (lesson) => {
        VocabulariesService.updateReportToday(lesson).then();
    }
    const handleDoneLesson = (code) => {
        switch (code) {
            case 'vocabulary':
                setlessonStatus(prevState => ({...prevState, vocabulary: true}))
                break;
            case 'duolingo':
                setlessonStatus(prevState => ({...prevState, duolingo: true}))
                updateLesson('duolingo')
                break;
            case 'grammar':
                setlessonStatus(prevState => ({...prevState, grammar: true}))
                updateLesson('grammar')
                break;
            case 'speaking':
                setlessonStatus(prevState => ({...prevState, speaking: true}))
                updateLesson('speaking')
                break;
        }
    }

    return (
        <div className={'border-top mt-4 w-100'}>
            <label><span className={'me-1'}>&#x2022;</span>To do list:</label>
            <div className={'w-100 row ms-1 mt-2'}>
                <Form.Label column={true} className={'col-4 text-start'}><span className={'me-1'}>&#x2022;</span>Learning
                    vocabulary:</Form.Label>
                <div
                    className={`col-6 mt-2 ${lessonStatus.vocabulary ? 'progress-stacked progress-bar' : ''}`}>1/40
                </div>
                <div className={'col-1'}>
                    {/*<button className={'btn btn-success text-start btn-sm'} type={'button'}*/}
                    {/*        onClick={() => handleDonelesson('vocabulary')}> Ok*/}
                    {/*</button>*/}
                </div>
            </div>
            <div className={'w-100 row ms-1 mt-2'}>
                <Form.Label column={true} className={'col-4 text-start'}><span className={'me-1'}>&#x2022;</span>Learning
                    duolingo:</Form.Label>
                <div
                    className={`col-6 mt-2 ${lessonStatus.duolingo ? 'progress-stacked progress-bar' : ''}`}>1/40
                </div>
                <div className={'col-1'}>
                    <button className={'btn btn-success text-start btn-sm'} type={'button'}
                            onClick={() => handleDoneLesson('duolingo')}> Ok
                    </button>
                </div>
            </div>
            <div className={'w-100 row ms-1 mt-2'}>
                <Form.Label column={true} className={'col-4 text-start'}><span className={'me-1'}>&#x2022;</span>Learning
                    grammar:</Form.Label>
                <div className={`col-6 mt-2 ${lessonStatus.grammar ? 'progress-stacked progress-bar' : ''}`}>
                    1/40
                </div>
                <div className={'col-1'}>
                    <button className={'btn btn-success text-start btn-sm'}
                            onClick={() => handleDoneLesson('grammar')}> Ok
                    </button>
                </div>
            </div>
            <div className={'w-100 row ms-1 mt-3'}>
                <Form.Label column={true} className={'col-4 text-start'}><span className={'me-1'}>&#x2022;</span>Learning
                    speaking:</Form.Label>
                <div
                    className={`col-6 mt-2 ${lessonStatus.speaking ? 'progress-stacked progress-bar' : ''}`}>0/1
                    lesson
                </div>
                <div className={'col-1'}>
                    <button className={'btn btn-success text-start btn-sm'}
                            onClick={() => handleDoneLesson('speaking')}> Ok
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoListComponent;