<svelte:options accessors={true} />
<script>
    import TextField from 'material-components/src/components/TextField/TextField.svelte';
    import Textarea from 'material-components/src/components/Textarea/Textarea.svelte';
    import Icon from 'material-components/src/components/Icon/Icon.svelte';
    import Button from 'material-components/src/components/Button/Button.svelte';
    import EditorField from 'material-components/src/components/EditorField';
    import { createValidator } from '../validation';
    import {createEventDispatcher, onMount} from 'svelte';
    import {mdiEye, mdiEyeOff} from "@mdi/js";

    export let _class = '';
    export let options = {};
    export let filled = false;
    export let ghost = false;
    export let color = 'secondary';
    export let style = options.style ?? '';
    export let outlined = false;
    export let dense = false;
    export let right = options.right ?? false;
    export let disabled = null;
    export let prefix = options.prefix || null;
    export let suffix = options.suffix || null;
    export let solo = false;
    export let mask = options.mask;
    export let required = options.required ?? false;
    export let placeholder = options.placeholder || '';
    export let title = options.title || '';
    export let hint = options.hint || '';
    export let validations = options.validate || [];
    export let expandable = options.expandable ?? false
    export let lines = options.lines ?? null;
    export let editor = false;
    export let inputElement;
    export let password = options.password ?? null;
    export let limit = options.limit ?? false;
    export let fillTimeOut = 500;
    export let validateOn = 'fill';
    export let noResize = false;
    export let noWrap = false;
    export let minHeight = null;
    export let maxHeight = null;


    if (required) {
        _class += ' required';
    }

    if (right) {
        _class += ' text-right';
    }

    let inputComponent;
    let error = false;
    let fail = false;
    let errors = [];
    export let ready = false;
    export let value = options.value;

    let messages = [];

    let validator = Object.keys(validations).length ? createValidator('string', validations) : null;
    let dispatch = createEventDispatcher();

    let fillTimeOutID = null;
    function onFill(event) {
        clearTimeout(fillTimeOutID);
        fillTimeOutID = null;
        dispatch('fill', event);
        if (validateOn === 'fill') {
            revalidate(showError);
        }
    }

    function revalidate (callback) {
        error = false;
        fail = false;
        errors = [];
        validate(callback);
    }

    function startFill(event) {
        if (fillTimeOutID) {
            clearTimeout(fillTimeOutID);
        }
        fillTimeOutID = setTimeout(onFill, fillTimeOut);
    }

    export function validate(callback) {
        if (validator && value) {
            validator.validate(value)
                .then(() => {
                    fail = false;
                    errors = [];
                })
                .catch((err) => {
                    fail = true;
                    errors = err.errors;
                    if (typeof callback === 'function') {
                        callback();
                    }
            });
        }
    }

    function showError() {
        error = fail;
        if (inputElement && inputElement !== document.activeElement) {
            inputElement.focus();
        }
    }

    function attempt(event) {
        startFill(event);
        if (validateOn === 'input') {
            revalidate(showError);
        }
        dispatch('input', event);
    }
    function apply(event) {
        dispatch('change');
        dispatch('blur', event);
        if (['blur', 'change'].includes(validateOn)) {
            revalidate();
            showError();
        }
    }
    onMount(() => {
        validate();
        inputElement = inputComponent.inputElement;
    });

    $: ready = !fail && (!required || !!value);
</script>
<div class="string-field">
{#if (editor) && !password && !mask}
    <EditorField
        {filled}
        {outlined}
        {dense}
        {ghost}
        {solo}
        {disabled}
        {color}
        {style}
        {error}
        {minHeight}
        {maxHeight}
        counter={limit}
        {limit}
        class={_class}
        bind:value
        {hint}
        {placeholder}
        {mask}
        on:blur={apply}
        on:input={attempt}
        messages={error ? errors : []}
        on:focus
        on:change
        on:keypress
        on:keydown
        on:keyup
        toolbar={editor}

        autogrow={expandable}
        bind:this={inputComponent}
        name={options.id}
    >
        {title}
    </EditorField>
{:else if (expandable || lines) && !password && !mask}
    <Textarea
        {filled}
        {outlined}
        {dense}
        {ghost}
        {solo}
        {disabled}
        {color}
        {style}
        {error}
        counter={limit}
        {limit}
        class={_class}
        bind:value
        {hint}
        {placeholder}
        {mask}
        {noResize}
        {noWrap}
        on:blur={apply}
        on:input={attempt}
        messages={error ? errors : []}
        on:focus
        on:change
        on:keypress
        on:keydown
        on:keyup

        autogrow={expandable}
        rows={lines ?? 1}
        bind:this={inputComponent}
        name={options.id}
    >
        {title}
    </Textarea>
{:else}
    <TextField
        {filled}
        {outlined}
        {prefix}
        {suffix}
        {dense}
        {ghost}
        {solo}
        {disabled}
        {color}
        {style}
        {error}
        counter={limit}
        {limit}
        {password}
        class={_class}
        bind:value
        {hint}
        {placeholder}
        {mask}
        on:blur={apply}
        on:input={attempt}
        messages={error ? errors : []}
        on:focus
        on:change
        on:keypress
        on:keydown
        on:keyup
        bind:this={inputComponent}
        name={options.id}
    >
        {title}
        <slot name="append" slot="append">
            {#if password !== null}
                <Button icon size="small" fab on:click={() => password = !password}>
                    <Icon path="{password ? mdiEye : mdiEyeOff}" />
                </Button>
            {/if}
        </slot>
    </TextField>
{/if}
</div>

<style>
    :global(.field.required) .string-field :global(.s-input label::after) {
        content: '*';
        padding-left: 1px;
    }
    :global(.field) .string-field :global(.s-input.text-right input) {
        text-align: right;
    }
</style>
