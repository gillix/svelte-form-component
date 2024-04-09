<script>
    import Builder from "../Custom.svelte";

    export let data = {};
    let { content, class: cl } = data;
</script>

<div class="container {cl}">
    <Builder data={content} />
</div>
