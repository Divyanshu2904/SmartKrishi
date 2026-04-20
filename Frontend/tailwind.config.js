module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "hsl(142 59% 30%)",
        secondary: "hsl(123 43% 42%)",
        accent: "hsl(45 90% 48%)",
        background: "hsl(150 27% 95%)",
        foreground: "hsl(142 40% 12%)",
        muted: "hsl(150 20% 88%)",
        "muted-foreground": "hsl(142 20% 55%)",
      },
      colors: {
        'neo-green': '#4ADE80',
        'neo-bg': '#E2F0D9',
        'neo-dark': '#0E3A24',
        'neo-lime': '#ADFF2F',
        'glass': 'rgba(255, 255, 255, 0.7)',
      },
    },
  },
  plugins: [],
};
