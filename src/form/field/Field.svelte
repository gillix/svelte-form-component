<svelte:options accessors={true}/>
<script>
	import types from "./types";
	import {createEventDispatcher} from "svelte";

	export let options = {};
	export let id = options.id;
	export let type = options.type;
	export let active = options.active ?? true;
    export let filled = false;
    export let outlined = false;
    export let dense = false;
    export let disabled = options.disabled ?? false;
    export let solo = false;
    export let color = 'secondary';

 	export let ready = false;
 	export let value;

	export let field;

	let controlReady = false;
	let dispatch = createEventDispatcher();

	export function validate() {
    	if (field && active && typeof field.validate === "function") {
    		field.validate();
		}
	}

	$: if (!active) { dispatch('change') }
	$: ready = controlReady || !active;

</script>
<div class="field"
	 class:hidden={!active}
	 class:required={options.required}
>
	<svelte:component

		{filled}
		{outlined}
		{solo}
		{color}
		{dense}
		{disabled}
		bind:value
		bind:ready={controlReady}

		this={types[type].component}
		bind:options
		bind:this={field}

		{...types[type].defaults}

		on:change
	/>
</div>

<style>
  .field {
      margin-bottom: 15px;
	  min-height: 77px;
  }
  .hidden {
	  display: none;
  }
</style>
