<svelte:options accessors/>
<script>
    import StringField from "./string/StringField.svelte";
    import tools from "../../tools.js";

    export let type = "string";

    export let _class = '';
    export let options = {};
    export let ghost = false;
    export let filled = false;
    export let color = 'secondary';
    export let outlined = false;
    export let dense = false;
    export let right = false;
    export let disabled = false;
    export let expandable = false;
    export let limit = false;
    export let lines = false;
    export let solo = false;
    export let mask = null;
    export let required = false;
    export let placeholder = '';
    export let title = '';
    export let hint = '';
    export let validations = [];
    export let languages = ['en'];
    export let inputComponents = {};
    export let fillTimeOut = 500;
    export let validateOn = 'fill';
    export let editor = false;
    export let noResize = false;
    export let noWrap = false;

    export let value = {};
    $: value = value || tools.mltext().empty(languages);

    let expose = Array.isArray(languages) && languages.length > 1;

    let types = {
        string: StringField
    };
    let component = types[type] || false;

</script>

{#if component}
    {#each languages as language}
        <svelte:component
            this={component}

            {filled}
            {outlined}
            {ghost}
            {dense}
            {solo}
            {disabled}
            {expandable}
            {limit}
            {lines}
            {color}
            {_class}
            {title}
            {hint}
            {required}
            {placeholder}
            {fillTimeOut}
            {mask}
            {validations}
            {options}
            {validateOn}
            {editor}
            {right}
            {noResize}
            {noWrap}

            bind:value={value[language]}
            bind:this={inputComponents[language]}

            on:focus
            on:fill
            on:blur
            on:input
            on:change
            on:keypress
            on:keydown
            on:keyup
        />
    {/each}
{/if}
