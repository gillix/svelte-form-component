<script>

    import Checkbox from "material-components/src/components/Checkbox/Checkbox.svelte";
    import Switch from "material-components/src/components/Switch/Switch.svelte";

    export let options = {};
    export let dense = false;
    export let disabled = null;
    export let color = 'secondary';
    export let switchStyle = false;

    export let outlined = false;
    export let filled = false;

    export let required = options.required ?? false;

    export let title = options.title || '';
    export let label = options.label || false;
    export let hideTitle = options.hideTitle || !label;

    export let hint = options.hint || '';

    export let value = options.value;
    export let checked = false;
    if (value === undefined || value === null) {
        value = checked;
    } else {
        checked = value = !!value;
    }
    $: value = checked;

    export let ready = false;
    let error = false;
    let errors = [];

    $: ready = !required || !!value;

</script>

<div class="check-field"
     class:outlined
     class:filled
     class:no-title={hideTitle || !label}
>
    <div
        class="header"
        class:extended={!!hint || !!error}
        class:error-text={error}
        class:error
    >
        {#if !hideTitle}
            <div class="title">
                {title}
            </div>
        {/if}
        <div class="messages-wrapper">
            <div class="messages">
                {#if error && errors.length}
                    {#each errors as message}
                        <div class="message">{message}</div>
                    {/each}
                {:else}
                    <div class="message">{hint}</div>
                {/if}
            </div>
        </div>
    </div>

    <svelte:component

        {color}
        {dense}
        {disabled}

        bind:checked
        {options}

        on:change

        this={switchStyle ? Switch : Checkbox}
    >
        {@html label || title}
    </svelte:component>
</div>

<style>

    :global(.field.required) .check-field.no-title :global( label::after) {
        content: '*';
        padding-left: 1px;
    }

    .check-field :global(.s-checkbox) {
        align-items: start;
    }

    .check-field :global(label > p) {
        display: inline;
        margin: 0;
    }

    .check-field :global(.s-checkbox .s-checkbox__wrapper) {
        margin-top: 4px;
    }

    .header {
        color: var(--theme-text-secondary);
    }
    .header .title {
        font-size: 1em;
        font-weight: 500;
        transform-origin: top left;
        color: var(--theme-text-primary);
        transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    }
    .header.extended .title {
        transform: scale(.85);
    }
    .header.error .title {
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
    .required .header .title::after {
        content: '*';
        padding-left: 1px;
    }

    .messages-wrapper {
        /*position: relative;*/
        height: 0;
    }

    .header.extended .messages-wrapper {
        /*transform: translateY(-20px);*/
        height: auto;
        margin-top: -4px;
    }

    .messages {
        width: 100%;
        justify-content: space-between;
        box-sizing: border-box;
        font-size: .75em;
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

    :global(.fields-list) .check-field.outlined,
    :global(.fields-list) .check-field.filled {
        margin-left: 16px;
    }
    :global(.fields-list) .check-field :global(.s-checkbox) {
        padding: 6px 0 6px;
    }
</style>
