<script>
    import {Snackbar, Icon} from "material-components";
    import {mdiAlertCircle, mdiAlertCircleOutline, mdiCheckCircle} from "@mdi/js";

    export let message;
    export let level = 'notice';

    $: if (typeof message === 'object') {
        level = message.level;
        message = message.message;
    }

    let icons = {
        error: {
            icon: mdiAlertCircle,
            color: 'red'
        },
        success: {
            icon: mdiCheckCircle,
            color: 'green'
        },
        warning: {
            icon: mdiAlertCircleOutline,
            color: 'orange'
        },
        notice: {
            icon: mdiAlertCircle,
            color: 'gray'
        },
    };

</script>

<Snackbar bind:active={message} bottom center timeout={4000}>
    <Icon path={icons[level].icon} class="{icons[level].color}-text" />
    <span class="pl-4">{message}</span>
</Snackbar>
