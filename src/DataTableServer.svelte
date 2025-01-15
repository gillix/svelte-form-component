<script>
    import DataTable from 'material-components/src/components/DataTable/DataTable.svelte';
    import axios from "axios";
    import qs from "qs";

    export let clickable = false;
    export let hover = false;
    export let apiURL;
    export let actions = false;
    export let texts = {
        loading: 'Loading...',
        noData: 'No data'
    };

    let tableData = {
        columns: [],
        rows: [],
        sorted: {},
        pagination: false
    };
    let loading = true;
    export let requestData = {};

    function request() {
        loading = true;
        axios.get(apiURL, {
            params: requestData,
            paramsSerializer: params => qs.stringify(params)
        }).then(({data}) => {
            loading = false;
            tableData = data;
        }).catch(e => {
            loading = false;
            console.error(e);
        });
    }

    $: requestData && request();

    export function refresh() {
        requestData = requestData;
    }

    function sort(e) {
        requestData.sort = e.detail;
        requestData = requestData;
    }

    function paginate(e) {
        requestData.pagination = e.detail;
        requestData = requestData;
    }

</script>

<DataTable
    on:sort={sort}
    on:pagination={paginate}
    columns={tableData.columns}
    rows={tableData.rows}
    sorted={tableData.sorted}
    pagination={tableData.pagination || false}
    on:rowClick
    on:action
    {clickable}
    {hover}
    {texts}
    {actions}

    {loading}
    {...$$restProps}
>
    <slot name="footer-left" slot="footer-left"/>
</DataTable>
