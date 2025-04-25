export const themeConfig = {
  light: {
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc', 
      accent: '#f0f9ff'
    },
    text: {
      primary: '#0f172a',
      secondary: '#334155',
      accent: '#0284c7'
    },
    border: {
      primary: '#e2e8f0',
      secondary: '#cbd5e1'
    }
  },
  dark: {
    background: {
      primary: '#0f172a',
      secondary: '#1e293b',
      accent: '#0c4a6e'
    },
    text: {
      primary: '#f8fafc',
      secondary: '#cbd5e1', 
      accent: '#38bdf8'
    },
    border: {
      primary: '#334155',
      secondary: '#475569'
    }
  }
} as const;