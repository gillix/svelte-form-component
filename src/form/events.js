import handlers from './handlers'

export class EventManager {
    listeners = {};

    constructor(instances) {
        for (let id in instances) {
            let field = instances[id];
            let events = field.options.on;
            if (typeof events === 'object' ) {
                for (let name in events) {
                    let handler = handlers[name];
                    if (!handler) {
                        throw `Event "$(name}" is not supported`;
                    }

                    handler.fetch(field, events[name], {
                        getField: id => instances[id],
                        addListener: (name, event) => {
                            this.listeners[name] = this.listeners[name] ?? [];
                            this.listeners[name].push(event);
                        }
                    });
                }
            }
        }
    }

    handle (name, field) {
        let events = this.listeners[field.id];
        if (!events) {
            return;
        }
        try {
            events.forEach(event => handlers[event.handler].handle(event, field));
        } catch (e) {
            console.log(`ERROR: ${e}`);
        }
    }
}
