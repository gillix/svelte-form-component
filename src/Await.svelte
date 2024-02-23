<script>
    import { ProgressCircular } from "material-components";
    import {fade} from 'svelte/transition';
    import Error from "./Error.svelte";

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
            <ProgressCircular size={70} width={3} indeterminate color="green" />
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
