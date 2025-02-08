/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      zIndex: Object.fromEntries(Array.from({ length: 1000 }, (_, i) => [i, i])),
    },
    aspectRatio: {
      '3/5': '3 / 5',
      '16/9': '16 / 9',
    },
    colors: {
      'light-blue': '#52D3D8',
      'dark-blue': '#200E3A',
      'dark-base': '#1A1A1A',
      'dark-lighter': '#242424',
      'light-green': '#42B883',
      'accent-gray': '#9FADBC',
      'surface-suken': '#161A1D',
      gray: '#6E6F71',
      yellow: '#fafc52',
      red: '#EC0000',
      green: '#1baf84',
      white: '#fff',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
  },
  plugins: [],
};
