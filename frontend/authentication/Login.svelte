<script lang="ts">
    import api from "frontend/api";

    export let switchPage: () => void;
    let username: string;
    let password: string;

    async function login() {
        const message = await api.authentication.login.mutate({ username, password });
        if (message) {
            alert(message);
            return;
        }
        location.reload();
    }
</script>

<form on:submit|preventDefault={login}>
    <input type="text" bind:value={username} />
    <input type="password" bind:value={password} />
    <button type="submit">Zaloguj</button>
</form>
<button type="button" on:click={switchPage}>Utwórz konto</button>
