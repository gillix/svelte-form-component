import * as yup from 'yup';

yup.addMethod(yup.string, "website", function (errorMessage) {
    return this.test(`website`, errorMessage, function (value) {
        const { path, createError } = this;

        return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(value)
         || createError({ path, message: errorMessage });
    });
});

export function createValidator(type, validations = []) {
    if (typeof yup[type] !== "function")
        throw 'Type not supported';
    let schema = yup[type]();
    for (let name in validations) {
        if (typeof schema[name] === "function")
            schema = schema[name](...validations[name]);
    }
    return schema;
}
