module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        "color-bg": "var(--color-bg)",
        "color-footer": "var(--color-footer)",
        "color-button": "var(--color-button)",
        "color-text": "var(--color-text)",
        "color-subtext": "var(--color-subtext)",
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}