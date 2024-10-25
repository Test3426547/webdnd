const fs = require('fs')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')

// Input CSS to process with Tailwind
const inputCss = '@tailwind utilities;'

postcss([
  tailwindcss('./tailwind-email.config.js'),
])
  .process(inputCss, { from: undefined })
  .then((result) => {
    // Ensure the build directory exists
    fs.mkdirSync('emails/build', { recursive: true })
    // Write the generated CSS to styles.css
    fs.writeFileSync('emails/build/styles.css', result.css)
    console.log('Email styles built successfully.')
  })
  .catch((error) => {
    console.error('Error building email styles:', error)
  })
