<script lang="ts">
    import Header from "./Header.svelte";
    import Navigation from "./Navigation.svelte";

    export let user: string;
</script>

<Header {user} />
<Navigation />
