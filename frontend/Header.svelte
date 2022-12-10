<script lang="ts">
    import api from "./api";
    export let user: string;

    async function logout() {
        await api.authentication.logout.mutate();
        location.assign("/");
    }
</script>

<h1>Witaj {user}!</h1>
<button type="button" on:click={logout}>Wyloguj</button>
