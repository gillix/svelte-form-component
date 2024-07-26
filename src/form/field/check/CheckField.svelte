<script>

    import Checkbox from "material-components/src/components/Checkbox/Checkbox.svelte";
    import Switch from "material-components/src/components/Switch/Switch.svelte";

    export let options = {};
    export let dense = false;
    export let disabled = null;
    export let color = 'secondary';
    export let switchStyle = false;

    export let required = options.required ?? false;

    export let title = options.title || '';

    export let value = options.value;
    export let checked = false;
    if (value === undefined || value === null) {
        value = checked;
    } else {
        checked = value = !!value;
    }
    $: value = checked;

    export let ready = false;

    $: ready = !required || !!value;

</script>

<div class="check-field">
    <svelte:component

        {color}
        {dense}
        {disabled}

        bind:checked
        {options}

        on:change

        this={switchStyle ? Switch : Checkbox}
    >
        {title}
    </svelte:component>
</div>

<style>

    :global(.field.required) .check-field :global( label::after) {
        content: '*';
        padding-left: 1px;
    }

</style>
