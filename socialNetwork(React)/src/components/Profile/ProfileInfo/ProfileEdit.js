import React from "react";
import {Field, reduxForm} from "redux-form";

const ProfileForm = (props) => {
    return(
        <form onSubmit={props.handleSubmit} className="form-small">
            <div className="item">
                <label htmlFor="fullName">FullName</label>
                <Field component="input" name="fullName" type="text"/>
            </div>
            <div className="item">
                <label htmlFor="status">Status</label>
                <Field component="input" name="status" type="text" />
            </div>
            <div className="item">
                <label htmlFor="dateOfBirth">Date of Birth</label>
                <Field component="input" name="dateOfBirth" type="text" />
            </div>
            <div className="item">
                <label htmlFor="country">Country</label>
                <Field component="input" name="location.country" type="text" />
            </div>
            <div className="item">
                <label htmlFor="city">City</label>
                <Field component="input" name="location.city" type="text" />
            </div>
            <div className="item">
                <label htmlFor="education">Education</label>
                <Field component="input" name="education" type="text" />
            </div>
            <div className="item">
                <label htmlFor="description">Description</label>
                <Field component="textarea" name="description" />
            </div>
            <button>Save</button>
        </form>
    )
};

const ProfileFormRedux = reduxForm({form: "profile"})(ProfileForm);

const ProfileEdit = (props) => {

    const onSubmit = (dataForm) => {
        props.saveMyProfileTC(dataForm);
        props.deactivationEditMode()
    };

    return (
        <ProfileFormRedux initialValues={props.userProfile} userProfile={props.userProfile} onSubmit={onSubmit} />
    )
};

export default ProfileEdit;