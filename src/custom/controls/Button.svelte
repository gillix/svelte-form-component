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
        content = ''
    } = data;

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
>
    <Builder data={content} />
</Button>
