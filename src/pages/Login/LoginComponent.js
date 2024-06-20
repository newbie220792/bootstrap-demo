import React, {useState} from 'react';
import {Form, Image, Spinner} from 'react-bootstrap';
import {Controller, useForm} from 'react-hook-form';
import fb from '../../assets/facebook.png';
import google from '../../assets/google.png';
import github from '../../assets/github.png';
import microsoft from '../../assets/microsoft.svg';
import {VocabulariesService} from '../../services/vocabulariesService';
import {HttpStatus} from '../../common/HttpStatus';
import {useNavigate} from 'react-router-dom';
import {DASHBOARD_PATH} from '../../common/roles';
import ErrorMessage from '../../components/ErrorMessage';

const LoginComponent = () => {
    const navigate = useNavigate();
    const [errorFromServer, setErrorFromServer] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const {
        handleSubmit,
        control,
        getValues,
        reset,
        formState: {errors},
    } = useForm({
        reValidateMode: 'onChange',
        defaultValues: {
            username: '',
            password: '',
        }
    });

    const onSubmit = () => {
        const {username, password} = getValues();
        setErrorFromServer('');
        setIsLoading(true);
        VocabulariesService.login({username, password}).then(res => {
            if (res.status === HttpStatus.SUCCESS) {
                localStorage.setItem('user', JSON.stringify(res.data));
                localStorage.setItem('access_token', res.data.accessToken);
                navigate(DASHBOARD_PATH);
            } else {
                reset(null, {keepValues: true});
                setErrorFromServer(res.message);
            }
        }).finally(() => setIsLoading(false));
    };

    const handleSingleSignOn = (registrationId) => {
        window.open(`${process.env.REACT_APP_WEB_SERVICE_URL}/auth/oauth2/authorize/${registrationId}?redirect_uri=${window.location.origin}/oauth2/redirect`, 'oauth2Modal', 'width=400,height=400');
    };

    return (
        <div className="d-flex justify-content-center align-items-center h-100 w-100 flex-column">
            <h1 className={'text-uppercase'}>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={'w-auto mt-4'}>
                <div className={'d-flex flex-column gap-2 w-auto'}>
                    <Form.Label>User name</Form.Label>
                    <Controller
                        control={control}
                        name="username"
                        rules={{
                            required: 'Username is required',
                        }}
                        render={({field, formState, fieldState}) => (
                            <input
                                className={`form-control input-group-sm ${fieldState.error ? 'is-invalid' : ''}`}
                                {...field}
                            />)}
                    />
                    {errors.username && <ErrorMessage message={errors.username.message}/>}
                    <Form.Label>Password</Form.Label>
                    <Controller
                        control={control}
                        name="password"
                        rules={{
                            required: 'Password is required',
                        }}
                        render={({field, formState, fieldState}) => (
                            <input
                                type="password"
                                className={`form-control input-group-sm ${fieldState.error ? 'is-invalid' : ''}`}
                                {...field}
                            />)}
                    />
                    {errors.password && <ErrorMessage message={errors.password.message}/>}
                    <div className={'d-flex flex-column gap-3 w-100'}>
                        {!isLoading ?
                            <button type={'submit'} className={'btn btn-success mt-2 text-uppercase'}>Login</button>
                            : <button className={'btn btn-success mt-2 text-uppercase'}><Spinner
                                size="sm"></Spinner></button>}
                    </div>
                    {errorFromServer &&
                        <ErrorMessage message={errorFromServer}/>}
                </div>
            </form>
            <Form.Label className={'mt-5'}>Or Sign Up Using</Form.Label>
            <div className={'d-flex mt-2 gap-4 justify-content-around'}>
                <Image src={fb} className={'img'} title={'Facebook'} onClick={() => handleSingleSignOn('facebook')}/>
                <Image src={google} className={'img'} title={'Google'} onClick={() => handleSingleSignOn('google')}/>
                <Image src={github} className={'img'} title={'Github'} onClick={() => handleSingleSignOn('github')}/>
                <Image src={microsoft} className={'img'} title={'Microsoft'}
                       onClick={() => handleSingleSignOn('microsoft')}/>
            </div>
            <a className={'mt-5 sign-up text-uppercase'}>Sign up</a>
        </div>
    );
};

export default LoginComponent;