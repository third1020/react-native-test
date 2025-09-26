/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Custom quiz app colors
        primary: '#0A0A0A',
        secondary: '#1A1A1A',
        tertiary: '#2A2A2A',
        
        // Quiz-specific colors
        correct: '#10B981',
        incorrect: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
        accent: '#8B5CF6',
        
        // Timer states
        'timer-safe': '#10B981',
        'timer-warning': '#F59E0B',
        'timer-critical': '#EF4444',
        'timer-expired': '#6B7280',
      },
      fontFamily: {
        'inter': ['Inter', 'System'],
      },
    },
  },
  plugins: [],
}
