module.exports = function (api) {
    api.cache(true);

    const presets = [
        [
            "@babel/preset-env"
        ],
    ];
    const plugins = ["@babel/syntax-dynamic-import", "@babel/transform-runtime"];

    return {
        presets,
        plugins
    };
}
