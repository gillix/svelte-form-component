<script>
    import Builder from "../Custom.svelte";

    export let data = [];
</script>

{#if data && data.length}
    <div class="columns">
        {#each data as column}
            <div class="column">
                <Builder data={column} />
            </div>
        {/each}
    </div>
{/if}
<style>
    .columns {
        display: flex;
        flex-direction: row;
        /*align-items: center;*/
        height: 100%;
    }
    .column {
        flex-basis: 100px;
        flex-grow: 1;
    }
</style>
