import React from "react";
import {Field, reduxForm} from "redux-form";
import {Input, Textarea} from "../../FieldType";
import {required} from "../../../../validateFields/validateFields";
import {connect} from "react-redux";
import {setDataPopupAC} from "../../../../redux/appReducer";

const ServiceSupportForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className="form-small">
            <Field component={Input} validate={[required]} type="text" name="name" placeholder="name" />
            <Field component={Input} validate={[required]} type="email" name="email" placeholder="email" />
            <Field component={Textarea} validate={[required]} name="problem" placeholder="Please, description your problem..." />
            <button>Send</button>
        </form>
    )
};

const ServiceSupportFormRedux = reduxForm({form: "serviceSupport"})(ServiceSupportForm);

const ServiceSupport = (props) => {
    const onSubmit = (dataForm) => {
        props.setDataPopupAC({
            isActive: true,
            title: "",
            body: "Thanks! Your data has been sent successfully. Soon you will receive a reply to your email.",
            isSuccessSend: true
        })
    };

    return (
        <ServiceSupportFormRedux onSubmit={onSubmit} />
    )
};

export default connect(null, {setDataPopupAC})(ServiceSupport);