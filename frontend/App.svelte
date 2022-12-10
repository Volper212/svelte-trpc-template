<script lang="ts">
    import Authentication from "./authentication/Authentication.svelte";
    import Home from "./Home.svelte";
    import api from "./api";
</script>

{#await api.authentication.loggedInUser.query() then user}
    {#if user}
        <Home {user} />
    {:else}
        <Authentication />
    {/if}
{/await}
