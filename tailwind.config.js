/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // === Bali Organic Palette ===
        jungle:   '#1B4332',
        'jungle-light': '#40916C',
        'jungle-muted': '#74C69D',
        parchment: '#F8F0E3',
        'parchment-dark': '#EDE0CA',
        ochre:    '#C9851C',
        'ochre-light': '#F4D03F',
        sunset:   '#D4622A',
        'sunset-light': '#F0956A',
        coral:    '#B94B2B',
        'post-it': '#FFF9C4',
        'post-it-border': '#D4B04A',
        ink:      '#2C1810',
        cream:    '#FFFDF7',
        // legacy
        sand:     '#FBF7F0',
        'sand-dark': '#F0E8D5',
      },
      fontFamily: {
        sans:        ['Nunito', 'system-ui', 'sans-serif'],
        handwritten: ['Caveat', 'cursive'],
      },
      boxShadow: {
        soft:   '0 4px 24px rgba(0,0,0,0.06)',
        card:   '0 2px 12px rgba(0,0,0,0.08)',
        lift:   '0 8px 32px rgba(0,0,0,0.12)',
        jungle: '0 4px 16px rgba(27,67,50,0.35)',
        sunset: '0 4px 16px rgba(212,98,42,0.35)',
        coral:  '0 4px 16px rgba(185,75,43,0.3)',
        ochre:  '0 4px 16px rgba(201,133,28,0.3)',
        'post-it': '4px 4px 12px rgba(0,0,0,0.12)',
      },
      animation: {
        'float':        'float 3s ease-in-out infinite',
        'float-slow':   'float 5s ease-in-out infinite',
        'wiggle':       'wiggle 0.5s ease-in-out',
        'confetti-fall': 'confettiFall 3s ease-in forwards',
        'pop':          'pop 0.2s ease-out',
        'slide-up':     'slideUp 0.3s ease-out',
        'bounce-in':    'bounceIn 0.5s cubic-bezier(0.36,0.07,0.19,0.97)',
        'shake':        'shake 0.4s ease-in-out',
        'flip':         'flip 0.6s ease-in-out',
        'fade-in':      'fadeIn 0.4s ease-out',
        'combo-pop':    'comboPop 0.6s cubic-bezier(0.36,0.07,0.19,0.97)',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%,100%': { transform: 'rotate(-2deg)' },
          '50%':     { transform: 'rotate(2deg)' },
        },
        confettiFall: {
          '0%':   { transform: 'translateY(-100vh) rotate(0deg)', opacity: 1 },
          '100%': { transform: 'translateY(100vh) rotate(720deg)', opacity: 0 },
        },
        pop: {
          '0%':   { transform: 'scale(0.8)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        slideUp: {
          '0%':   { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        bounceIn: {
          '0%':   { transform: 'scale(0.3)', opacity: 0 },
          '50%':  { transform: 'scale(1.05)', opacity: 0.8 },
          '70%':  { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        shake: {
          '0%,100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-8px)' },
          '40%': { transform: 'translateX(8px)' },
          '60%': { transform: 'translateX(-5px)' },
          '80%': { transform: 'translateX(5px)' },
        },
        flip: {
          '0%':   { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        fadeIn: {
          '0%':   { opacity: 0 },
          '100%': { opacity: 1 },
        },
        comboPop: {
          '0%':   { transform: 'scale(0) rotate(-10deg)', opacity: 0 },
          '60%':  { transform: 'scale(1.3) rotate(3deg)', opacity: 1 },
          '80%':  { transform: 'scale(0.9) rotate(-1deg)' },
          '100%': { transform: 'scale(1) rotate(0deg)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
