/**
 * @file .postcssrc.js
 * @author *__ author __*{% if: *__ email __* %}(*__ email __*){% /if %}
 */

// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
    plugins: {
        // to edit target browsers: use "browserslist" field in package.json
        "postcss-px-to-viewport": {
            viewportWidth: 1024,
            viewportHeight: 768,
            unitPrecision: 3,
            viewportUnit: 'vw',
            selectorBlackList: ['.ignore', '.hairlines'],
            minPixelValue: 1,
            mediaQuery: false
        },
        "cssnano": {
            preset: "advanced",
            autoprefixer: false,
            "postcss-zindex": false
        }
    }
};
