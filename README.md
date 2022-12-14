# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3, Typescript and Jest Unit Testing in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Scaffolding
That project was set up following in parts [Build a Vue 3 + TypeScript dev environment with Vite](https://lobotuerto.com/notes/build-a-vue3-typescript-dev-environment-with-vite)

## Shell Setup
### nvm
Please install `nvm`.

### direnv
Copy the file `.envrc.template` to `.envrc`.
Install `direnv` and run `direnv allow` on the repository root.

The provided `.envrc` configuration uses `nvm` to install a specific `node` version, it installs `pnpm` globally.

### pnpm
The project uses `pnpm` as package manager. Its commands are essentially similar to `yarn`. `pnpm` needs the `.npmrc` file which is already part of the repostory. To install the project dependencies run `pnpm install`.

### Open Browser Automatically
If you're on a Unix based shell you can have the `pnpm dev` command open in a specific browser in incognito / private browsing mode automatically.
`.envrc` is already prepared for that. Just adapt the contents of the file `.open-browser.js` to your needs.

If you do not want to use that feature, just provide your `.envrc` excluding the `BROWSER` export.

## Recommended IDE Setup
Choose *one setup for all* participants. Unfortunately, *CodeTogether* and *Code With Me* are not compatible with each other. 
- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) + [CodeMetrics](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-codemetrics) + [CodeTogether](https://marketplace.visualstudio.com/items?itemName=genuitecllc.codetogether) + [Vitest Explorer](https://marketplace.visualstudio.com/items?itemName=ZixuanChen.vitest-explorer)
- [IntelliJ](https://www.jetbrains.com/de-de/idea/) + [Vue.js](https://plugins.jetbrains.com/plugin/9442-vue-js) + [Prettier](https://plugins.jetbrains.com/plugin/10456-prettier) + [SonarLint](https://plugins.jetbrains.com/plugin/7973-sonarlint) + [Code With Me](https://www.jetbrains.com/de-de/code-with-me/)

