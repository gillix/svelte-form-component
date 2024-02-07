<script>
    import JS from './actions/JS.svelte';
    import Post from './actions/Post.svelte';
    import Error from "../../Error.svelte";
    import {getContext, onMount} from 'svelte';

    let actions = {
        js: JS,
        post: Post
    };
    let localization = getContext('localization') ?? {};

    export let data;
    export let ready = true;

    let action;
    onMount(() => {
        if (typeof data === "object") {
            try {
                Object.keys(data).forEach((i) => {
                    if (typeof data[i] === "object")
                        throw i;
                });
            } catch (key) {
                action = key;
            }
        }
    });
</script>
{#if !action}
    <Error>{$localization.error?.server}</Error>
{:else}
    <svelte:component this={actions[action]} data={data[action]} />
{/if}
