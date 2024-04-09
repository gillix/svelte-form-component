<script>
    import Card from "../Card.svelte";

    export let footer = [];
    export let header = {};

    export let back = false;
    export let disabled = false;
</script>

<div class="layout default-layout">
    <div class="main">
        <Card {header} {footer} {back} {disabled} on:back on:action>
            <slot />
        </Card>
    </div>
</div>

<style>
    .layout {
        height: 100%;
    }
    .main {
        width: 100%;
        height: 100%;
    }
</style>
