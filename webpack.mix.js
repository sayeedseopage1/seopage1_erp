const mix = require("laravel-mix");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.js("resources/js/app.jsx", "public/js/react")
    .react()
    .extract()
    .js("resources/js/sp1-editor.js", "public/js/sp1-editor.js")
    .scripts(
        [
            "public/js/bootstrap.js",
            "public/vendor/bootstrap/js/bootstrap.bundle.min.js",
            "public/vendor/moment/moment-with-locales.min.js",
            "public/vendor/jquery/all.min.js",
            "public/vendor/jquery/datepicker.min.js",
            "public/vendor/jquery/select2.min.js",
            "public/vendor/jquery/plugins.bundle.min.js",
            "public/vendor/jquery/scripts.bundle.min.js",
            "public/vendor/froiden-helper/helper.js",
            "node_modules/dropify/src/js/dropify.js",
            "node_modules/sweetalert2/dist/sweetalert2.all.min.js",
            "node_modules/cropperjs/dist/cropper.js",
            "node_modules/bootstrap-select/js/bootstrap-select.js",
            "node_modules/quill/dist/quill.min.js",
            "node_modules/quill-emoji/dist/quill-emoji.js",
            "resources/js/main.js",
            "resources/js/custom.js",
            "resources/js/seopage1.js",
        ],
        "public/js/main.js"
    )
    .sass("resources/scss/main.scss", "public/css")
    .sass("resources/scss/sp1/ck-editor.scss", "public/css/ck-editor.css")
    .sass("resources/scss/sp1/seopage1.scss", "public/css/seopage1.css")
    .options({ processCssUrls: false })
    .sourceMaps(true, "source-map")
    .webpackConfig((webpack) => {
        return {
            plugins: [
                new BundleAnalyzerPlugin({
                    analyzerMode: "static",
                    openAnalyzer: false,
                }),
            ],
            resolve: {
                fallback: {
                    crypto: require.resolve("crypto-browserify"),
                    fs: false,
                    stream: false,
                },
            },
        };
    })
    .version();

// mix.browserSync({
//     proxy: "http://127.0.0.1:8000",
// });
