import { writable, get, readable } from 'svelte/store';

export let notice = writable({
    message: false
});

export default {
    error: (message) => notice.set({level: 'error', message: message}),
    success: (message) => notice.set({level: 'success', message: message}),
    warning: (message) => notice.set({level: 'warning', message: message}),
    notice: (message) => notice.set({level: 'notice', message: message}),
}
