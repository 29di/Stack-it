/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      },
      colors: {
        // Custom StackIt Brand Colors
        brand: {
          primary: '#4F46E5',        // Light mode primary
          'primary-hover': '#4338CA', // Primary hover
          'primary-dark': '#6366F1',  // Dark mode primary
          'primary-dark-hover': '#818CF8', // Dark mode primary hover
          secondary: '#10B981',       // Light mode secondary
          'secondary-hover': '#059669', // Secondary hover
          'secondary-dark': '#34D399', // Dark mode secondary
          'secondary-dark-hover': '#6EE7B7', // Dark mode secondary hover
        },
        // Custom Background Colors
        surface: {
          light: '#F9FAFB',          // Light mode page background
          'light-card': '#FFFFFF',    // Light mode card background
          dark: '#1F2937',           // Dark mode page background
          'dark-card': '#111827',     // Dark mode card background
        },
        // Custom Text Colors  
        content: {
          'light-primary': '#111827',  // Light mode primary text
          'light-secondary': '#6B7280', // Light mode secondary text
          'dark-primary': '#F3F4F6',   // Dark mode primary text
          'dark-secondary': '#9CA3AF', // Dark mode secondary text
        },
        // Vote Colors
        vote: {
          up: '#10B981',     // Upvote green
          down: '#EF4444',   // Downvote red
          'up-dark': '#34D399', // Dark mode upvote
          'down-dark': '#F87171', // Dark mode downvote
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(90deg, #4F46E5, #6366F1)',
        'gradient-primary-dark': 'linear-gradient(90deg, #6366F1, #818CF8)',
        'gradient-secondary': 'linear-gradient(90deg, #10B981, #34D399)',
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-purple': '0 0 20px rgba(147, 51, 234, 0.5)',
        'glow-green': '0 0 20px rgba(34, 197, 94, 0.5)',
        'card-light': '0 2px 8px rgba(0,0,0,0.05)',
        'card-dark': '0 2px 8px rgba(0,0,0,0.3)',
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}


