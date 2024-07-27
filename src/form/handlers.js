import operators from './operators';

function createAction(action) {
    switch (action) {
        case 'show': action = "satisfied && self.active = true;"; break;
        case 'hide': action = "satisfied && self.active = false;"; break;
        case 'visible': action = "self.active = satisfied;"; break;
        case 'disable': action = "satisfied && self.disabled = true;"; break;
        case 'enable': action = "satisfied && self.disabled = false;"; break;
        case 'disabled': action = "self.disabled = satisfied;"; break;
        case 'enabled': action = "self.disabled = !satisfied;"; break;
    }
    return new Function('self', 'target', 'satisfied', action);
}

let handlers = {
    match: {
        fetch: (field, options, api) => {
            if (Array.isArray(options)) {
                for (let i in options) {
                    handlers.match.fetch(field, options[i], api);
                }
            } else if (typeof options === 'object') {
                let condition = options.condition;
                if (!condition) {
                    for(let value in options) {
                        let action = options[value];
                        let operator = 'equal';
                        if (typeof action === 'object' && action.action) {
                            if (action.operator) {
                                operator = action.operator;
                            }
                            action = action.action;
                        }
                        if (typeof action !== 'string') {
                            console.log('ERROR: Event action must be string');
                            continue;
                        }
                        api.addListener(field.id, {
                            event: "change",
                            handler: "match",
                            self: field,
                            condition: [{
                                field: field,
                                operator: operator,
                                value: value,
                            }],
                            action:  createAction(action)
                        });
                    }
                } else {
                    if (typeof condition !== 'object') {
                        throw "Condition configuration provided in wrong format";
                    }
                    let event = {
                        event: "change",
                        handler: "match",
                        self: field
                    };
                    event.condition = [];
                    let deps = [];
                    for (let id in condition) {
                        let dep = api.getField(id);
                        if (!dep) {
                            console.log(`WARNING: Field '${id}' is not exist in form`);
                            continue;
                        }
                        let value = condition[id];
                        let operator = 'equal';
                        if (Array.isArray(value)) {
                            operator = 'in';
                        } else if (typeof value === 'object') {
                            if (value.operator) {
                                operator = value.operator;
                            } else if (Array.isArray(value.value)) {
                                operator = 'in';
                            }
                            value = value.value;
                        }

                        event.condition.push({
                            field: dep,
                            operator: operator,
                            value: value
                        });
                    }
                    event.action = createAction(options.action);
                    for (let i in event.condition) {
                        api.addListener(event.condition[i].field.id, event);
                    }
                }
            }
        },
        handle: (event, target) => {
            let conditions = event.condition;
            if (conditions) {
                let satisfied = true;
                conditions.forEach(condition => satisfied &&= operators[condition.operator](condition.value, condition.field.value));
                return event.action(event.self, target, satisfied);
            }
        }
    },
    change: {
        fetch: (field, options, api) => {
            if (typeof options === 'string') {
                api.addListener(field.id, {
                    event: "change",
                    handler: "change",
                    self: field,
                    action: createAction(options)
                });
            } else if (typeof options === 'object') {
                for (let id in options) {
                    let dep = api.getField(id);
                    if (!dep) {
                        console.log(`WARNING: Field '${id}' is not exist in this form`);
                        continue;
                    }
                    api.addListener(dep.id, {
                        event: "change",
                        handler: "change",
                        self: field,
                        action: createAction(options[id])
                    });
                }
            }
        },
        handle: (event, target) => {
            return event.action(event.self, target, true);
        }
    }
}

export default handlers;
