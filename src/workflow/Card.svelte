<script>
    import {Button} from 'material-components';
    import { createEventDispatcher } from 'svelte';
    import {Icon} from "material-components";
    import {mdiArrowLeft} from "@mdi/js";

    export let actions = [];
    export let header = {};

    let dispatch = createEventDispatcher();
    let actionHandler = (event) => {
        dispatch('action', event)
    };

    export let back = false;
    export let disabled = false;

    let hasHeader = !!header.title;
    let hasFooter = (back || actions && actions.length);
</script>

<div class="card" style="{hasHeader ? '--card-header-height: 62px;' : ''}{hasFooter ? '--card-footer-height: 68px' : ''}">
    <slot name="header">
        {#if header.title}
        <div class="header" style="--card-header-height: 62px">
            <div class="title">{header.title}</div>
            {#if header.subtitle}<div class="subtitle">{header.subtitle}</div>{/if}
        </div>
        {/if}
    </slot>
    <slot name="content">
        <div class="content">
            <slot />
        </div>
    </slot>
    <slot name="actions">
        {#if hasFooter}
        <div class="footer upper-layer" style="--card-footer-height: 68px">
            <div class="back">
                {#if back}
                    <Button {disabled} icon on:click={dispatch('back', back)} >
                        <Icon size="24" path={mdiArrowLeft} />
                    </Button>
                {/if}
            </div>
            <div class="actions">
                {#each actions as action}
                    <div class="action">
                        <Button
                                disabled={disabled || action.disabled}
                                depressed
                                on:click={() => actionHandler(action.event)}
                                class="{action.important ? 'red white-text' : '' }"
                        >
                            {action.caption}
                        </Button>
                    </div>
                {/each}
            </div>
        </div>
        {/if}
    </slot>
</div>

<style>
    .card {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        --card-footer-height: 0px;
        --card-header-height: 0px;
    }

    .content {
        width: 100%;
        height: calc(100% - var(--card-header-height, 0px) - var(--card-footer-height, 0px));
        display: flex;
        overflow: auto;
        scrollbar-gutter: stable;
        flex-grow: 1;
    }

    .header {
        padding: 10px 30px 10px;
        border-bottom: 1px solid var(--theme-dividers);
        text-align: center;
        flex: none;
        height: var(--card-header-height);
    }

    .header .title {
        font-size: 1rem;
        font-weight: 400;
        color: rgba(0,0,0,.95);
    }

    .header .subtitle {
        font-size: .75rem;
        color: rgba(0,0,0,.5);
    }

    .footer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex: none;
        border-top: 1px solid var(--theme-dividers);
        padding: 0 25px;
        height: var(--card-footer-height);
        align-items: center;
        width: 100%;
        background-color: var(--theme-surface);
        z-index: 3;
    }

    .footer .back {
        flex: none;
        color: var(--theme-text-secondary);
    }

    .footer .actions {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        width: 100%;
    }

    .actions .action {
        padding: 5px;
    }

    .footer :global(.s-btn.disabled:not(.flat):not(.text):not(.outlined)) {
        background-color: rgba(0,0,0, 0.05) !important;
    }

    .upper-layer {
        box-shadow: 0 -18px 50px 0 rgba(255, 255, 255,.8);
        z-index: 3;
    }

</style>
