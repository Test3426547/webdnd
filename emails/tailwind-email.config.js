module.exports = {
  content: ['./emails/templates/**/*.{html,js}'],
  safelist: [
    'bg-gray-100',
    'max-w-md',
    'mx-auto',
    'p-6',
    'bg-white',
    'shadow-md',
    // Add any other classes used in your templates
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    // Disable Preflight to avoid conflicts in email clients
    preflight: false,
  },
}
