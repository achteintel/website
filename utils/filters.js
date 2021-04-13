const currentVersion = 0.1;

module.exports = {
  addVersion: function (string) {
    return `${string + currentVersion}`;
  },
  versionedURL: function (url) {
    return `${url}?v=${currentVersion}`;
  },
  cssmin: function () {
    const normalize = './src/assets/style/vendor/normalize.css';
    const variables = './src/assets/style/variables.css';
    const fonts = './src/assets/style/fonts.css';
    const base = './src/assets/style/base.css';
    const typography = './src/assets/style/typography.css';
    const layout = './src/assets/style/layout.css';
    return new CleanCSS({ inline: ['local'] }).minify([normalize, variables, fonts, base, typography, layout]).styles;
  }
}