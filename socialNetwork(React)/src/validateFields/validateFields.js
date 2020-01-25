export const required = (value) => {  // обязательное поле
    return !value ? "This field is required" : undefined
};