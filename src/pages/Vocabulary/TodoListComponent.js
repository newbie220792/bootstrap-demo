import React, {useState} from 'react';
import {Form} from 'react-bootstrap'

const TodoListComponent = () => {
    const [lessionStatus, setLessionStatus] = useState({})
    const handleDoneLession = (code) => {
        switch (code) {
            case 'vocabulary':
                setLessionStatus(prevState => ({...prevState, vocabulary: true}))
                break;
            case 'duolingo':
                setLessionStatus(prevState => ({...prevState, duolingo: true}))
                break;
            case 'grammar':
                setLessionStatus(prevState => ({...prevState, grammar: true}))
                break;
            case 'speaking':
                setLessionStatus(prevState => ({...prevState, speaking: true}))
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
                    className={`col-6 mt-2 ${lessionStatus.vocabulary ? 'progress-stacked progress-bar' : ''}`}>1/40
                </div>
                <div className={'col-1'}>
                    {/*<button className={'btn btn-success text-start btn-sm'} type={'button'}*/}
                    {/*        onClick={() => handleDoneLession('vocabulary')}> Ok*/}
                    {/*</button>*/}
                </div>
            </div>
            <div className={'w-100 row ms-1 mt-2'}>
                <Form.Label column={true} className={'col-4 text-start'}><span className={'me-1'}>&#x2022;</span>Learning
                    duolingo:</Form.Label>
                <div
                    className={`col-6 mt-2 ${lessionStatus.duolingo ? 'progress-stacked progress-bar' : ''}`}>1/40
                </div>
                <div className={'col-1'}>
                    <button className={'btn btn-success text-start btn-sm'} type={'button'}
                            onClick={() => handleDoneLession('duolingo')}> Ok
                    </button>
                </div>
            </div>
            <div className={'w-100 row ms-1 mt-2'}>
                <Form.Label column={true} className={'col-4 text-start'}><span className={'me-1'}>&#x2022;</span>Learning
                    grammar:</Form.Label>
                <div className={`col-6 mt-2 ${lessionStatus.grammar ? 'progress-stacked progress-bar' : ''}`}>
                    1/40
                </div>
                <div className={'col-1'}>
                    <button className={'btn btn-success text-start btn-sm'}
                            onClick={() => handleDoneLession('grammar')}> Ok
                    </button>
                </div>
            </div>
            <div className={'w-100 row ms-1 mt-3'}>
                <Form.Label column={true} className={'col-4 text-start'}><span className={'me-1'}>&#x2022;</span>Learning
                    speaking:</Form.Label>
                <div
                    className={`col-6 mt-2 ${lessionStatus.speaking ? 'progress-stacked progress-bar' : ''}`}>0/1
                    lession
                </div>
                <div className={'col-1'}>
                    <button className={'btn btn-success text-start btn-sm'}
                            onClick={() => handleDoneLession('speaking')}> Ok
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoListComponent;