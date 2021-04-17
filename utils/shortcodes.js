module.exports = {
  symbol: function (name, width, height) {
    return `<svg class="symbol symbol--${name}" role="img" aria-hidden="true" width="${width}" height="${height}">
              <use xlink:href="#symbol-${name}"></use>
            </svg>`
  },
  year: function () {
    return `${new Date().getFullYear()}`
  }
}
