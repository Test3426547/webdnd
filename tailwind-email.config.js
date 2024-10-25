module.exports = {
  content: ['./emails/**/*.{html,js}'],
  theme: {
    extend: {},
  },
  corePlugins: {
    // Disable preflight to avoid conflicts in email clients
    preflight: false,
  },
}
