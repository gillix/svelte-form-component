<script>
    import { mdiAlertCircle } from '@mdi/js';
    import { Icon } from "material-components";
</script>
<div class="error">
    <div class="icon">
        <Icon size="64" class="error-text" path={mdiAlertCircle} />
    </div>
    <div class="text error-text"><slot /></div>
</div>
<style>
    .error {
        display: flex;
        flex-direction: row;
        width: auto;
        height: 100%;
        justify-content: center;
        align-items: center;
    }
    .error > div {
        padding: 10px;
    }
    .error .icon {
        flex: none;
    }
</style>
