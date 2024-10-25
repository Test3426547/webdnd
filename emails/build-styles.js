const fs = require('fs')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')

const inputCss = '@tailwind utilities;'

postcss([
  tailwindcss('./tailwind-email.config.js'),
])
  .process(inputCss, { from: undefined })
  .then((result) => {
    fs.writeFileSync('emails/build/styles.css', result.css)
  })
