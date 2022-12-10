<script lang="ts">
    import api from "frontend/api";

    export let switchPage: () => void;
    let username: string;
    let password: string;
    let repeatedPassword: string;

    async function register() {
        if (password !== repeatedPassword) {
            alert("Hasła nie są takie same");
            return;
        }
        const message = await api.authentication.register.mutate({ username, password });
        if (message) {
            alert(message);
            return;
        }
        location.reload();
    }
</script>

<form on:submit|preventDefault={register}>
    <input type="text" bind:value={username} required />
    <input type="password" bind:value={password} required />
    <input type="password" bind:value={repeatedPassword} required />
    <button type="submit">Zarejestruj</button>
</form>
<button type="button" on:click={switchPage}>Zaloguj się</button>
