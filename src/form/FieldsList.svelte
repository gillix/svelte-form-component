<svelte:options accessors={true}/>
<script>
	import Field from './field/Field.svelte';
	import { EventManager } from  './events'
	import {createEventDispatcher, onMount} from "svelte";

	export let fields = [];
    export let filled = false;
    export let outlined = false;
    export let dense = false;
    export let disabled = null;
    export let solo = false;
    export let color = 'secondary';

    let errors = {}, good = {}, instances = {}, events = null;
    export let visible = {};
    export let values = {};
    export let ready = false;

    $: ready = Object.keys(good).reduce((a, name) => a && !!good[name], true);

	let dispatch = createEventDispatcher();
	let change = (field) => {
		events.handle('change', instances[field.id]);
		dispatch('change', field);
	};

	onMount(() => {
		events = new EventManager(instances);
	});
</script>

<div class="fields-list">
{#each fields as field}
		<Field
            {filled}
            {outlined}
            {dense}
            disabled={disabled ?? field.disabled ?? null}
            {solo}
            {color}

			bind:ready={good[field.id]}
			bind:value={values[field.id]}
			bind:active={visible[field.id]}
			bind:this={instances[field.id]}

            bind:options={field}
			on:change={() => change(field)}
		/>
{/each}
</div>

<style>
	.fields-list {
		display: flex;
		flex-direction: column;
	}


</style>
