<script>
    import Icon from "material-components/src/components/Icon/Icon.svelte";

    export let data = {};
    let { class: klass = '', size = '24px', disabled = false, path, rotate = 0, spin = false, label = null, style = null } = data;

</script>
    <Icon
        {size}
        {disabled}
        {rotate}
        {path}
        {spin}
        {label}
        {style}
        class={klass}
    />
