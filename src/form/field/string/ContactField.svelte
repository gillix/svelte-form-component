<svelte:options accessors={true} />
<script>
    import TextField from 'material-components/src/components/TextField/TextField.svelte';
    import Textarea from 'material-components/src/components/Textarea/Textarea.svelte';
    import Icon from 'material-components/src/components/Icon/Icon.svelte';
    import Button from 'material-components/src/components/Button/Button.svelte';
    import EditorField from 'material-components/src/components/EditorField';
    import { createValidator } from '../validation';
    import {createEventDispatcher, onMount} from 'svelte';
    import {mdiCheck, mdiCheckCircle, mdiCheckCircleOutline, mdiEye, mdiEyeOff} from "@mdi/js";
    import StringField from "./StringField.svelte";
    import {get} from "svelte/store";
    import axios from "axios";

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
    export let inputElement;
    export let limit = options.limit ?? false;
    export let fillTimeOut = 500;
    export let validateOn = 'fill';

    export let confirmation = options.confirmation || null;
    export let codeTitle = options.codeTitle || 'Enter code';
    export let codeSendTitle = options.codeSendTitle || 'Send code';
    export let codeLength = options.codeLenght || 6;



    if (required) {
        _class += ' required';
    }

    if (right) {
        _class += ' text-right';
    }

    let code = null;
    let sent = false;
    let confirmed = false;
    let request = false;

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
        confirmation && resetConfirmation();
    }
    function apply(event) {
        dispatch('change');
        dispatch('blur', event);
        if (['blur', 'change'].includes(validateOn)) {
            revalidate();
            showError();
        }
    }

    function resetConfirmation(event) {
        sent = false;
        confirmed = false;
        request = false;
        code = null;
        errors = [];
        error = false;
    }
    async function send() {
        request = true;
        let response = (await axios.post(confirmation, { contact: value })).data;
        request = false;
        if (response.success) {
            sent = true;
        } else {
            errors = [ response.message ];
            error = true;
        }
    }
    async function codeInput() {
        if (code.length >= codeLength) {
            request = true;
            let response = (await axios.get(confirmation, { params: { contact: value, code: code }})).data;
            request = false;
            if (response.success) {
                confirmed = true;
                // sent = false;
            } else {
                errors = [ response.error ];
                error = true;
            }
        }
    }

    /**
     * TODO:
     * - стартовать таймер на отправке кода
     * - по таймеру сбрасывать код
     * - при успешном подтверждении сбрасывать таймер
     */

    onMount(() => {
        validate();
        inputElement = inputComponent.inputElement;
    });

    $: ready = !fail && (!required || !!value) && (!confirmation || confirmed);
</script>
<div class="contact-field">
    <div class="contact-input">
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
        </TextField>
    </div>
    {#if confirmation}
        {#if sent && !confirmed}
            <div class="code-input">
                <StringField
                    {filled}
                    {outlined}
                    {dense}
                    {ghost}
                    {solo}
                    title={codeTitle}
                    disabled={disabled || request}
                    on:input={codeInput}

                    bind:value={code}
                />
            </div>
        {:else if !sent}
            <div class="code-button">
                <Button
                    disabled={fail || !value || request}
                    depressed
                    on:click={send}
                    class="primary-color"
                    block
                >
                    {codeSendTitle}
                </Button>
            </div>
        {:else}
            <div class="code-confirmed">
                <Icon path={mdiCheckCircleOutline} class="green-text" size="42" />
            </div>
        {/if}

    {/if}

</div>

<style>
    :global(.field.required) .contact-field :global(.s-input label::after) {
        content: '*';
        padding-left: 1px;
    }
    :global(.field) .contact-field :global(.s-input.text-right input) {
        text-align: right;
    }
    .contact-field {
        display: flex;
        gap: 10px;
        position: relative;
    }
    .contact-field > div {
        flex: 1;
    }
    .contact-field .contact-input {
        flex: 3;
    }
    .code-button {
        position: absolute;
        top: 11px;
        right: 12px;
    }
    .code-confirmed {
        position: absolute;
        top: 7px;
        right: 12px;
    }
</style>
