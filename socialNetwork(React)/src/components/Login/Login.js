import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../Common/FieldType";
import {required} from "../../validateFields/validateFields";

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className="form-small">
            <Field component={Input} validate={[required]} type="text" name="login" placeholder="login" />
            <Field component={Input} validate={[required]} type="text" name="password" placeholder="password" />
            {props.error && <div className="common-error">{props.error}</div>}
            <button>Login</button>
        </form>
    )
};

const LoginFormRedux = reduxForm({form: "login"})(LoginForm);

const Login = (props) => {
    const onSubmit = (dataForm) => {
        props.login(dataForm)
    };

    return (
        <div>
            <div className="title">Login</div>
            <LoginFormRedux onSubmit={onSubmit} />
        </div>
    )
};

export default Login;
