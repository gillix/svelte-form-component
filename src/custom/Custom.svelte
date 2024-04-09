<script>

 import Build from "./Custom.svelte";
 import controls from "./controls/components";


 export let components = controls;
 export let data = [];
 let items = [];
 if (Array.isArray(data)) {
     items = data;
 } else if (typeof data === 'object' || typeof data === 'string') {
     items.push(data);
 }

</script>

{#each items as block}
    {#if (typeof block === 'string')}
        <div>{@html block}</div>
    {:else if (Array.isArray(block))}
        <Build data={block} />
    {:else if (typeof block === 'object')}
        <svelte:component this={components[block.component]} data={block.data} />
    {/if}
{/each}
