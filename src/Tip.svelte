<script>
    import {Tooltip} from "material-components"
    import {scale} from "svelte/transition";
    export let tooltip;

    export let color = 'default';
    export let active = false;
    export let location = 'bottom';
    export let offset = 10;
    export let origin = 'auto';
    export let delay = 0;

</script>
<Tooltip
        {color}
        {active}
        {location}
        {offset}
        {origin}
        {delay}
        message={tooltip}
>
    <slot/>
</Tooltip>
