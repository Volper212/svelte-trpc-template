<script lang="ts">
    import { Router, link, Route } from "svelte-routing";
    import Test from "./routes/Test.svelte";
</script>

<Router>
    <Route path="/">
        <a href="/test" use:link>Test</a>
    </Route>
    <Route path="/test">
        <Test />
    </Route>
</Router>
