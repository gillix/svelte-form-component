import * as yup from 'yup';
import axios from "axios";

yup.addMethod(yup.string, "website", function (errorMessage) {
    return this.test(`website`, errorMessage, function (value) {
        const { path, createError } = this;

        return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(value)
         || createError({ path, message: errorMessage });
    });
});

yup.addMethod(yup.string, "external", function (url, errorMessage) {
    return this.test(`external`, errorMessage, async function (value) {
        const { path, createError } = this;

        let response = await axios.get(url, { params: { value: value } } );

        return !response.data || createError({ path, message: errorMessage });
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
