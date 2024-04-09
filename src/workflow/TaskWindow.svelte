<script>

    export let footer = [];
    export let header = {};

    export let back = false;
    export let disabled = false;
    export let layout;
</script>

<div class="window">
    <svelte:component this={layout} {header} {disabled} {back} {footer} on:back on:action>
        <slot/>
    </svelte:component>
</div>

<style>
 .window {
     height: 100%;
 }
</style>
