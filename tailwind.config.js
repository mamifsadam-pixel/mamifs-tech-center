/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1F3A',
          deep: '#071527',
          light: '#12294D',
        },
        amber: {
          DEFAULT: '#F5A623',
          soft: '#FFC66D',
        },
        teal: {
          DEFAULT: '#2EC4B6',
          deep: '#1B9A8E',
        },
        paper: '#F4F6F8',
        slate: {
          ink: '#1C2B3A',
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        circuit: "url('/circuit-bg.svg')",
      },
    },
  },
  plugins: [],
};
