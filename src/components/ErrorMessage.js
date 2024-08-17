import React from 'react';
import {Form} from 'react-bootstrap';

const ErrorMessage = ({message}) => {
    return <Form.Label
        className={'text-danger icon-is-invalid ps-4 text-break text-start mw-400'}>{message}</Form.Label>;
};

export default ErrorMessage;