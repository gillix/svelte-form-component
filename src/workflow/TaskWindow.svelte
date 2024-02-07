<script>

    export let actions = [];
    export let header = {};

    export let back = false;
    export let disabled = false;
    export let layout;
</script>

<div class="window">
    <svelte:component this={layout} {header} {disabled} {back} actions={actions} on:back on:action>
        <slot/>
    </svelte:component>
</div>

<style>
 .window {
     height: 100%;
 }
</style>
