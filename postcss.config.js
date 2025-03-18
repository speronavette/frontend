module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    '@fullhuman/postcss-purgecss': {
      content: ['./src/**/*.jsx', './src/**/*.js', './index.html'],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
      safelist: ['html', 'body', /^bg-/, /^text-/, /^border-/, /^hover:/, /^focus:/, /^spero/]
    }
  }
 }