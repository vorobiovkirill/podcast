const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    mode: 'jit',
    content: ['app/**/*.{js,ts,tsx,md,mdx}'],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Noto Sans', ...defaultTheme.fontFamily.sans]
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    daisyui: {
        themes: [
            {
                za30cast: {
                    primary: '#193962',
                    secondary: '#177ebc',
                    accent: '#40ffff',
                    neutral: '#40ffff',
                    'base-100': '#192d4a',
                    info: '#53C0F3',
                    success: '#71EAD2',
                    warning: '#F3CC30',
                    error: '#E24056'
                }
            },
            'retro'
        ],
        prefix: 'sp-'
    }
};
