

require("svelte/register");

module.export = (name, options) => {
    const App = require(`../../client/src/routes/${name.trim()}.svelte`).default;
    return App.render(options);
}