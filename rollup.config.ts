import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import css from "rollup-plugin-css-only";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";

const isDev = process.argv.includes("-cw");

export default {
    input: "frontend/index.ts",
    output: {
        file: "frontend/public/bundle.js",
        format: "iife",
        sourcemap: isDev,
    },
    plugins: [
        svelte({
            preprocess: sveltePreprocess(),
        }),
        resolve({ browser: true }),
        typescript({
            sourceMap: isDev,
        }),
        css({
            output: "bundle.css",
        }),
        commonjs({
            transformMixedEsModules: true,
        }),
    ],
};
