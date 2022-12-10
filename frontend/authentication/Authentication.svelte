<script lang="ts">
    import Login from "./Login.svelte";
    import Register from "./Register.svelte";

    let isLogin = true;
    $: Page = isLogin ? Login : Register;

    function switchPage() {
        isLogin = !isLogin;
    }
</script>

<svelte:component this={Page} {switchPage} />
