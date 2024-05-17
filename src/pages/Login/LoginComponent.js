import React from 'react';
import {Form, Image} from 'react-bootstrap';
import {Controller, useForm} from 'react-hook-form';
import fb from '../../assets/facebook.png';
import google from '../../assets/google.png';
import github from '../../assets/github.png';

const LoginComponent = () => {
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

    };


    const handleSignInGithub = () => {

    };

    const handleSignInGoogle = () => {

    };

    const handleSignInFb = () => {

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
                            required: true,
                        }}
                        render={({field, formState, fieldState}) => (
                            <input
                                className={`form-control input-group-sm ${fieldState.error ? 'is-invalid' : ''}`}
                                {...field}
                            />)}
                    />
                    {errors.username && <label className={'text-danger'}>{errors.username.message}</label>}
                    <Form.Label>Password</Form.Label>
                    <Controller
                        control={control}
                        name="password"
                        rules={{
                            required: true,
                        }}
                        render={({field, formState, fieldState}) => (
                            <input
                                type="password"
                                className={`form-control input-group-sm ${fieldState.error ? 'is-invalid' : ''}`}
                                {...field}
                            />)}
                    />
                    {errors.password && <label className={'text-danger'}>{errors.password.message}</label>}
                    <div className={'d-flex flex-column gap-3 w-100'}>
                        <button type={'submit'} className={'btn btn-success mt-2 text-uppercase'}>Login</button>
                    </div>
                </div>
            </form>
            <Form.Label className={'mt-5'}>Or Sign Up Using</Form.Label>
            <div className={'icon-link mt-2'}>
                <Image src={fb} className={'img'} onClick={handleSignInFb}/>
                <Image src={google} className={'img'} onClick={handleSignInGoogle}/>
                <Image src={github} className={'img'} onClick={handleSignInGithub}/>
            </div>
            <a className={'mt-5 sign-up text-uppercase'}>Sign up</a>
        </div>
    );
};

export default LoginComponent;