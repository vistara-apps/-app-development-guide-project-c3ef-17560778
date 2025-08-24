module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(210, 100%, 98%)',
        accent: 'hsl(200, 80%, 50%)',
        surface: 'hsl(210, 100%, 100%)',
        'neutral-1': 'hsl(200, 80%, 10%)',
        'neutral-2': 'hsl(200, 80%, 20%)',
        'neutral-3': 'hsl(200, 80%, 30%)',
      },
      spacing: {
        xs: '4px',
        sm: '8px', 
        md: '16px',
        lg: '24px',
      },
      borderRadius: {
        sm: '6px',
        md: '10px', 
        lg: '20px',
      },
      boxShadow: {
        card: '0 4px 16px hsla(0, 0%, 0%, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 200ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'fast': '100ms',
        'base': '200ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}
