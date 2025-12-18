<script>
    // import Select from './Select.svelte';
    import {Select} from 'material-components';
    import Expanded from './Expanded.svelte'
    import axios from "axios";
    import Error from "../../../Error.svelte";
    import alert from "../../../alert";

    export let options = {};
    export let filled = false;
    export let outlined = false;
    export let dense = false;
    export let disabled = null;
    export let solo = false;
    export let color = 'secondary';
    export let title = options.title || '';
    export let hint = options.hint || '';
    export let placeholder = options.placeholder || '';
    export let value;
    export let ready = false;

    export let items = options.items || {};

    export let multiple = options.multiple ?? false;
    export let dropdown = options.dropdown ?? true;
    let fail = false;
    let required = options.required ?? false;

    async function fetchItems() {
        if (typeof items === 'string') {
            try {
                items = (await axios.get(items)).data;
                if (options.items) {
                    options.items = items;
                }
            } catch (e) {
                alert.error('Error while fetching select items' + e);
            }
        }
        return options;
    }

    $: {
        ready = !fail && (!required || (Array.isArray(value) ? value?.length : !!value));
    }
</script>
<div class="select-field">
{#await fetchItems()}
{:then options}

    <svelte:component

            {filled}
            {outlined}
            {solo}
            {color}
            {dense}
            {disabled}
            {multiple}

            bind:fail
            bind:value
            {options}
            {items}
            {hint}
            {placeholder}

            on:change

            this={dropdown ? Select : Expanded}
    >
        {title}
    </svelte:component>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
</div>

<style>
    :global(.field.required) .select-field :global(.s-input label::after) {
        content: '*';
        padding-left: 1px;
    }
</style>
