<script>
    import Button from "material-components/src/components/Button/Button.svelte";
    import Builder from "../Custom.svelte";

    export let data = {};
    let {
        class: klass = '',
        size = 'default',
        disabled = false,
        fab = false,
        block = false,
        text = false,
        depressed = true,
        icon = false,
        style = null,
        outlined = false,
        rounded = false,
        content = '',
        onclick = null,
        url = false,
    } = data;

    function onClick() {
        if (onclick) {
            if (typeof onclick === "function") {
                onclick();
            } else {
                new Function(onclick)();
            }
        }
        if (url) {
            window.location = url;
        }
    }

</script>
<Button
    {size}
    {disabled}
    {fab}
    {block}
    {text}
    {depressed}
    {icon}
    {style}
    {outlined}
    {rounded}
    class={klass}
    on:click={onClick}
>
    <Builder data={content} />
</Button>
