<script>
    import Builder from "../Custom.svelte";

    export let data = {};

</script>
{#if (data.title)}
    <div class="text-h5 title">{data.title}</div>
{/if}
{#if (data.subtitle)}
    <div class="text-subtitle-1 subtitle">{data.subtitle}</div>
{/if}
<slot>
    <div class="text-body-1 text">
        {#if (typeof data.text === 'string')}
            {@html data.text}
        {:else if (typeof data.text === 'object')}
            <Builder data={data.text} />
        {/if}
    </div>
</slot>

<style>

    .title {
        padding: 16px;
    }

    .subtitle {
        padding: 16px;
    }

    .text {
        padding: 16px;
    }

    .title + .text,
    .title + .subtitle,
    .subtitle + .text {
        padding-top: 0;
    }

    .title + .subtitle {
        margin-top: -16px;
    }

</style>
