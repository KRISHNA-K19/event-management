import baseConfig from '@repo/lib/tailwind.config'

const config = {
  ...baseConfig,
  theme: {
    ...baseConfig.theme,
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          900: '#1e3a8a',
        },
        glass: 'rgba(255, 255, 255, 0.1)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'ripple': 'ripple 0.6s linear',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(59, 130, 246, 0.5)',
        'neon-hover': '0 0 30px rgba(59, 130, 246, 0.8)',
      },
    },
  },
}

export default config

