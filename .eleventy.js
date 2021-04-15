const Image = require("@11ty/eleventy-img");
const CleanCSS = require("clean-css");

const sprite = require('./utils/sprite.js');
const shortcodes = require('./utils/shortcodes.js');

module.exports = function(eleventyConfig) {
  // Filters
  // VERSION
  const currentVersion = 0.2;
  eleventyConfig.addFilter("addVersion", function (string) {
    return `${eleventyConfig.getFilter("slug")(string)}${currentVersion}`;
  });

  // Add version number to source URLs
  eleventyConfig.addFilter("versionedURL", function (url) {
    return `${eleventyConfig.getFilter("url")(url)}?v=${currentVersion}`;
  });

  // Concat and minify styles and inline to head.njk
  eleventyConfig.addFilter("cssmin", function () {
    const normalize = './src/assets/style/vendor/normalize.css';
    const variables = './src/assets/style/tokens.css';
    const fonts = './src/assets/style/fonts.css';
    const base = './src/assets/style/base.css';
    const typography = './src/assets/style/typography.css';
    const head = './src/assets/style/head.css';
    const cta = './src/assets/style/cta.css';
    const layout = './src/assets/style/layout.css';
    return new CleanCSS({ inline: ['local'] }).minify([normalize, variables, fonts, base, typography, head, cta, layout]).styles;
  });

  // Handle Images
  eleventyConfig.addNunjucksAsyncShortcode("responsiveImage", async function (src, alt, sizes) {

    if (sizes === undefined) {
      sizes = '(min-width: 30em) 50vw, 100vw';
    } else {
      sizes = sizes;
    }

    // returns Promise
    let metadata = await Image(src, {
      formats: ["webp", "jpeg"],
      // the directory in the image URLs <img src="/img/MY_IMAGE.png">
      urlPath: "/assets/img/",
      outputDir: "./dist/assets/img/",
      widths: [640, 960, 1280, 1800, null]
    });

    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };

    return Image.generateHTML(metadata, imageAttributes);
  });

  eleventyConfig.addNunjucksAsyncShortcode("handleOgImage", async function (src, alt) {
    if (alt === undefined) {
      // You bet we throw an error on missing alt (alt="" works okay)
      throw new Error(`Missing \`alt\` on myImage from: ${src}`);
    }

    // returns Promise
    let metadata = await Image(src, {
      formats: ["jpeg"],
      // the directory in the image URLs <img src="/img/MY_IMAGE.png">
      urlPath: "/assets/img/",
      outputDir: "./dist/assets/img/",
      widths: [1200]
    });
    let data = metadata.jpeg[metadata.jpeg.length - 1];
    return `<meta property="og:image" content="${data.url}" /><meta property="og:image:type" content="image/jpeg" /><meta property="og:image:width" content="${data.width}" /><meta property="og:image:height" content="${data.height}" /><meta property="og:image:alt" content="${alt}" />`;
  });

  // Shortcodes
  Object.keys(shortcodes).forEach((shortcodeName) => {
    eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName])
  })

  // Symbols Sprite
  eleventyConfig.addNunjucksAsyncShortcode('sprite', sprite)

  // Asset Watch Targets
  eleventyConfig.addWatchTarget('./src/assets')

  // Use BrowserSync Watch Option
  eleventyConfig.setBrowserSyncConfig({
    watch: true
  })

  // Layouts
  eleventyConfig.addLayoutAlias('base', 'base.njk')
  
  // Pass-through directories/files
  eleventyConfig.addPassthroughCopy('src/assets/fonts')
  eleventyConfig.addPassthroughCopy('src/assets/scripts')
  eleventyConfig.addPassthroughCopy('src/assets/app-icons')
  eleventyConfig.addPassthroughCopy('src/manifest.json')
  eleventyConfig.addPassthroughCopy('src/_redirects')

  // Base Config
  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: 'includes',
      layouts: 'includes/layouts'
    },
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    passthroughFileCopy: true
  }
}
