<script>
    import { onMount } from 'svelte';

    export let data;

    function include(src, callback) {
        let script = document.createElement('script');
        script.src = src;
        script.onload = callback;
        document.head.appendChild(script);
    }

    function exec(code) {
        code && (new Function(code))();
    }

    onMount(() => {
        if (data.import) {
            let imports;
            if (data.import instanceof Array) {
                imports = data.import.map((item) =>
                    new Promise((resolve) => {
                        include(item, resolve);
                    })
                );
            } else if (typeof data.import === "string") {
                imports = [
                    new Promise((resolve) => {
                        include(data.import, resolve);
                    })
                ];
            }
            Promise.all(imports).then(() => {
                exec(data.exec);
            });
        } else {
            exec(data.exec);
        }
    });
</script>
