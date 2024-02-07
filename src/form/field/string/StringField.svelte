<svelte:options accessors={true} />
<script>
    import {TextField, Textarea, Icon, Button} from 'material-components';
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
    export let inputElement;
    export let password = options.password ?? null;

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

    export function validate() {
        if (validator && value) {
            validator.validate(value)
                .then(() => {
                    fail = false;
                    errors = [];
                })
                .catch((err) => {
                    fail = true;
                    errors = err.errors;
            });
        }
    }
    function attempt(event) {
        error = false;
        fail = false;
        errors = [];
        validate();
        dispatch('input', event);
    }
    function apply(event) {
        error = fail;
        dispatch('change');
        dispatch('blur', event);
    }
    onMount(() => {
        validate();
        inputElement = inputComponent.inputElement;
    });
    // сбросить ошибки при изменении

    $: ready = !fail && (!required || !!value);
</script>
<div class="string-field">
{#if expandable && !password && !mask}
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

        autogrow
        rows={1}
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
