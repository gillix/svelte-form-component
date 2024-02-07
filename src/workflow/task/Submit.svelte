<script>
    import {createEventDispatcher, getContext} from 'svelte';
    import { onMount } from 'svelte';

    let dispatch = createEventDispatcher();
    onMount(() => {
            dispatch('completed', getContext('workflow-data') ?? {});
    });
</script>
