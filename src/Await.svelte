<script>
    import ProgressCircular from "material-components/src/components/ProgressCircular/ProgressCircular.svelte";
    import ProgressLinear from "material-components/src/components/ProgressLinear/ProgressLinear.svelte";
    import {fade} from 'svelte/transition';
    import Error from "./Error.svelte";

    export let linear = false;
    export let promise;
    let progress = false;
    $:  {
        let timer = setTimeout(() => {
            progress = true;
        }, 150);
        promise.then(() => {
            clearTimeout(timer);
            progress = false;
        })
    }
</script>
{#await promise}
    {#if progress}
        <div class="progress" transition:fade={{duration: 200}}>
            {#if linear}
                <ProgressLinear indeterminate color="green" />
            {:else}
                <ProgressCircular size={70} width={3} indeterminate color="green" />
            {/if}
        </div>
    {/if}
{:then data}
    <slot {data} />
{:catch error}
    <Error>{error}</Error>
{/await}

<style>
    .progress {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        text-align: center;
    }
</style>
