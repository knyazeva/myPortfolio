import React from "react";

const FieldConstructor = ({meta, ...props}) => {  // оберётка с выводом ошибок для различных полей
    const hasError = meta.error && meta.touched;

    return(
        <div className={hasError ? "error-block" : ""}>
            {props.children}
            {hasError && <div className="error">{meta.error}</div>}
        </div>
    )
};

export const Input = ({input, ...props}) => {
    return <FieldConstructor {...props}><input {...input} {...props} /></FieldConstructor>
};

export const Textarea = ({input, ...props}) => {
    return <FieldConstructor {...props}><textarea {...input} {...props} /></FieldConstructor>
};
