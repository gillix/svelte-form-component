<script>
    import Card from "../Card.svelte";

    export let actions = [];
    export let header = {};

    export let back = false;
    export let disabled = false;
</script>

<div class="layout default-layout">
    <Card {header} {actions} {back} {disabled} on:back on:action>
        <div class="content" slot="content">
            <slot />
        </div>
    </Card>
</div>

<style>
    .layout {
        height: 100%;
    }
    .content {
        height: calc(100% - var(--card-header-height, 0) - var(--card-footer-height, 0));
        flex-grow: 1;
        /*display: contents;*/
    }
</style>
