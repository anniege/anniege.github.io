({
    // appDir: "../../..",
    baseUrl: "..",
    paths: {
        jquery: "libs/jquery/jquery-1.7.1",
        "lodash": "libs/lodash/lodash",
        "requireLib": "require"
    },
    name: "app",
    include: [ 'requireLib' ],
    out: "../../../dist/js/app-built.js"
})