<svelte:options accessors={true} />
<script>
    import Window from "./TaskWindow.svelte";
    import {request} from './request';
    import Await from "../Await.svelte";
    import {getContext, setContext, tick} from "svelte";

    export let tasks = {};
    export let layouts = [];
    export let workflow = {start: {task: 'Empty'}};
    export let state = 'start';
    let fade = false;
    let task;
    let disabled = false;
    let wait = new Promise((resolve) => resolve(state));

    function next(target) {
        close((onResolve) => {
            if (target instanceof Promise) {
                target.then((result) => {
                    state = result;
                    onResolve();
                });
                wait = target;
            } else {
                wait = new Promise((resolve, reject) => {
                    if (typeof target === "string")
                        state = target;
                    else if (typeof target === "function")
                        state = target();
                    else
                        reject('Wrong'); // TODO: перевод
                    onResolve();
                    resolve(state);
                });
            }
        });
    }

    function close(callback) {
        fade = true;
        disabled = true;
        setTimeout(() => {
            fade = false;
            callback(() => { disabled = false });
        }, 200);
    }

    function completed(event) {
        let data = event.detail;
        let target = workflow[state].target;
        if (typeof target === "string") {
            let wd = getContext('workflow-data') ?? {};
            wd[state] = data;
            setContext('workflow-data', wd);
            next(target);
        } else if (typeof target === "object") {
            if (target.api)
                next(request(
                    target.api,
                    data,
                    (response) => {
                        if (typeof target.callback === 'string') {
                            const callback = new Function('response', target.callback);
                            try {
                                callback(response);
                            } catch (e) {}
                        }
                        let nextState = response.next;
                        if (typeof nextState === "string")
                            return nextState;
                        else if (typeof nextState === "object") {
                            workflow[nextState.name] = nextState.data;
                            return nextState.name;
                        } else if (target.default) {
                            return target.default;
                        }
                    }));
        }
    }

    let ready = false;
    let actionHandler;
    let layout = 'default';
    let header = {};
    let actions = [];
    $: {
        if (layout !== workflow[state]?.layout && workflow[state]?.layout !== undefined) {
            layout = workflow[state].layout;
        }
    }
    $: header = workflow[state].data || {};
    $: actions = workflow[state].actions || [];
    $: {
        actions.forEach((item) => {
            if (item.event === 'complete')
                item.disabled = !ready;
        });
        actions = workflow[state].actions || [];
    }
    let back = false;
    $: {
        back = workflow[state].back;
        if (typeof back === 'undefined' || back === true) {
            let keys = Object.keys(workflow)
            let index = keys.findIndex((item) => workflow[item].target === state);
            back = index !== -1 ? keys[index] : false;
        }
    }
    $: task = task;
</script>
<Window
    layout={layouts[layout]}
    {header}
    {disabled}
    {back}
    {actions}
    on:back={(event) => next(event.detail)}
    on:action={(event) => actionHandler(event.detail)}
>
    <Await promise={wait} let:data={current}>
        <div class="state" class:fade>
            <svelte:component
                    this={tasks[workflow[current].task]}
                    on:completed={completed}
                    data={workflow[current].data}
                    bind:handle={actionHandler}
                    bind:ready={ready} />
        </div>
    </Await>
</Window>
<style>
    .state {
        transition: opacity 200ms;
        width: 100%;
        height: 100%;
        display: contents;
    }
    .fade {
        opacity: 0;
    }
</style>
