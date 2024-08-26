function error(message) {
    throw new Error(message);
}
export default {
    mltext: config => ({
        fetch: (text, language = 'en') => {
            if (text !== null && typeof text === 'object') {
                return text[config?.language ?? language ?? error('mltext().fetch() requires language')]
                    ?? Object.values(text).filter(t=>!!t)[0];
            } else {
                return text ?? '';
            }
        },
        empty: (languages = null) => {
            let text = {};
            (config?.languages ?? languages ?? error('mltext().empty() requires languages set'))
                .map((lang) => {
                    text[lang] = ''
                });
            return text;
        },
        isEmpty: (text) => {
            if (text === null || !text) {
                return true;
            }
            if (typeof text === 'object') {
                return Object.values(text).filter(t=>!!t).length === 0;
            }
            return false;
        }
    }),
    clone: function (source) {
        if (source === null) {
            return null;
        }
        if (Array.isArray(source)) {
            return source.filter(() => true);
        } else if (typeof source === 'object') {
            return this.extend(Object.create(source), source);
        } else {
            return source;
        }
    },
    extend: function (target, ...sources) {
        return sources.reduce((prev, source) => Object.assign(prev, Object.fromEntries(Object.entries(source)
            .map(([key, value]) => {
                    return [key, this.clone(value)];
            }))), target);
    },
    replace: function (target, ...sources) {
        return sources.reduce((prev, source) => {
            if (typeof prev !== 'object' || Array.isArray(prev)) {
                return source;
            }
            if (typeof source !== 'object' || Array.isArray(source)) {
                return prev;
            }
            return Object.fromEntries(Object.entries(prev)
                .map(([key, value]) => {
                    return [key, source[key] ? this.replace(value, source[key]) : value];
                }))
        }, target);
    },
    generateUID: () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
};
