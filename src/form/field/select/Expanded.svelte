<script>
    import {Checkbox} from 'material-components';
    import {Radio} from 'material-components';
    import {createEventDispatcher, onMount} from "svelte";
    import {createValidator} from "../validation";
    export let options = {};
    export let filled = false;
    export let outlined = false;
    export let dense = false;
    export let disabled = null;
    export let solo = false;
    export let color = 'secondary';

    export let multiple = options.multiple ?? false;
    export let horizontal = options.horizontal ?? true;

    export let min = options.min ?? 1;
    export let max = options.max;

    export let fail = false;
    let error = false;
    let errors = [];
    let scheduled = null;
    export let value = options.value ?? (multiple ? [] : null);

    export let title = options.title || '';
    export let hint = options.hint || '';
//    export let required = options.required;
    export let items = options.items || [];
    let values = {};
    let dispatch = createEventDispatcher();

    let validator = Object.keys(options.validate ?? {}).length ? createValidator('array', options.validate) : null;

    export function validate() {
        scheduled && clearTimeout(scheduled);
//        if (multiple && min && value instanceof Array && value.length && value.length < min ) {
        if (multiple && validator && value instanceof Array && value.length) {
            validator.validate(value)
                .then(() => {
                    fail = false;
                    errors = [];
                })
                .catch((err) => {
                    fail = true;
                    errors = err.errors;
                    scheduled = setTimeout(() => { apply() }, 2000)
            });
        }
    }
    function attempt() {
        error = false;
        fail = false;
        errors = [];
        validate();
        dispatch('change');
    }
    function apply() {
        error = fail;
    }
    onMount(() => { validate() });

</script>

<div
        class="select-expanded"
        class:outlined
        class:filled
>
    <div
            class="header"
            class:extended={!!hint || !!error}
            class:error-text={error}
            class:error
    >
        <div class="label">
            {title}
        </div>
        <div class="messages">
            {#if error && errors.length}
                {#each errors as message}
                    <div class="message">{errors}</div>
                {/each}
            {:else}
                <div class="message">{hint}</div>
            {/if}
        </div>
    </div>
    <div class="items" class:horizontal>
        {#each items as item}
            <div class="item">
                <svelte:component
                        {color}
                        disabled={disabled || max && value instanceof Array && value.length >= max && !value.includes(item.value)}
                        bind:group={value}
                        value={item.value}
                        this={multiple ? Checkbox : Radio}
                        bind:this={values[item.name]}
                        on:change={attempt}
                >
                    {item.name}
                </svelte:component>
            </div>
        {/each}
    </div>
</div>

<style>
    .select-expanded.outlined, .select-expanded.filled {
        margin-left: 16px;
    }
    .items {
        display: flex;
        flex-direction: column;
        margin-top: 5px;
        font-size: .85rem;
    }
    .items.horizontal {
        flex-direction: row;
        flex-wrap: wrap;
    }
    .item {
        padding: 6px 10px 6px 0;
        min-width: 50%;
    }
    .header {
        height: 40px;
        position: relative;
        color: var(--theme-text-secondary);
    }
    .header .label {
        font-size: 1rem;
        position: absolute;
        top: 16px;
        font-weight: 500;
        transform-origin: top left;
        color: var(--theme-text-primary);
        transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    }
    .header.extended .label {
        transform: translateY(-16px) scale(.85);
    }
    .header.error .label {
        color: currentColor;
        animation: .4s ease shake;
    }

    @keyframes shake {
      40% {
        margin-left: 2px
      }
      60%, 80% {
        margin-left: -2px
      }
      70%, 90%{
        margin-left: 2px
      }
    }

    .header.extended .messages {
        display: flex;
        opacity: 1;
    }
    .required .header .label::after {
        content: '*';
        padding-left: 1px;
    }
    .messages {
        position: absolute;
        top: 20px;
        width: 100%;
        justify-content: space-between;
        box-sizing: border-box;
        font-size: .75rem;
        border-top: 1px solid var(--theme-dividers);
        opacity: 0;
        transition: 0.5s cubic-bezier(0.25, 0.8, 0.5, 1);
    }
    .messages .message::before {
        display: inline-block;
        width: 0;
        height: 14px;
        content: "";
        vertical-align: 0;
    }

    .messages .message {
        animation: .3s changed-message;
    }
    @keyframes changed-message {
      0% { opacity: 0 }
      100% { opacity: 1 }
    }



</style>
