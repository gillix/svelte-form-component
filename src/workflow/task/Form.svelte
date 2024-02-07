<svelte:options accessors={true} />
<script>

    import FieldsList from "../../form/FieldsList.svelte";

    import { createEventDispatcher } from 'svelte';

    let dispatch = createEventDispatcher();

    export let data = {};
    export let adjustable = data.adjustable || false;

    export const handle = (event) => {
        if (event === 'complete') {
            dispatch('completed', values);
        }
    }

    export let ready = false;
    let values = {};
    let filled = false;
    let error = false;
</script>
<div class="form" class:adjustable>
    {#if data.description}
    <div class="description">
        {@html data.description}
    </div>
    {/if}
    <div class="fields">
        <FieldsList
                outlined

                fields={data.fields}
                bind:ready
                bind:values
        />
    </div>
</div>

<style>
    .form {
        max-width: 90%;
        padding: 20px;
        margin: 0 auto;
    }
    .fields {
        padding: 20px 0;
    }
    .title {
        font-weight: 500;
    }
    @media (min-width: 660px) {
        .form {
            max-width: 400px;
        }
    }
    @media (min-width: 960px) {
        .form.adjustable {
            max-width: 810px;
        }
        .form.adjustable :global(.fields-list) {
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
            flex-wrap: wrap;
        }

        .form.adjustable :global(.fields-list) :global(.field){
            width: calc(50% - 10px);
        }
    }
</style>
