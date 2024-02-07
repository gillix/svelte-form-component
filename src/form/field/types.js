import SelectField from "./select/SelectField.svelte";
import StringField from "./string/StringField.svelte";

export default {
    select: {
        component: SelectField,
        defaults: {
            dropdown: false
        }
    },
    multiselect: {
        component: SelectField,
        defaults: {
            multiple: true,
            dropdown: false
        }
    },
    dropdown: {
        component: SelectField,
        defaults: {}
    },
    string: {
        component: StringField,
        defaults: {}
    },
    text: {
        component: StringField,
        defaults: {
            expandable: true
        }
    },
    email: {
        component: StringField,
        defaults: {}
    }
}
