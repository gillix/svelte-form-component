<script>
    import Builder from "../Custom.svelte";

    export let data = {};
    let {
        content,
        class: cl,
        style
    } = data;
</script>

<div class="container {cl}" style={style}>
    <Builder data={content} />
</div>
