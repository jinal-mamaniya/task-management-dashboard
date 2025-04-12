const lightTheme = {
    colors: {
      primary: '#4361ee',
      secondary: '#3f37c9',
      accent: '#4895ef',
      background: '#f8f9fa',
      surface: '#ffffff',
      error: '#ef476f',
      success: '#06d6a0',
      warning: '#ffd166',
      text: {
        primary: '#212529',
        secondary: '#6c757d',
        disabled: '#adb5bd'
      }
    },
    // Keep other properties the same
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      xxl: '2rem'
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      xxl: '3rem'
    },
    breakpoints: {
      xs: '0px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px'
    },
    shadows: {
      sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
      md: '0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
      lg: '0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)',
      xl: '0 15px 25px rgba(0,0,0,0.15), 0 5px 10px rgba(0,0,0,0.05)'
    },
    borderRadius: {
      sm: '0.25rem',
      md: '0.5rem',
      lg: '1rem',
      full: '9999px'
    }
  };
  
  const darkTheme = {
    ...lightTheme,
    colors: {
      primary: '#4361ee',
      secondary: '#3f37c9',
      accent: '#4895ef',
      background: '#121212',
      surface: '#1e1e1e',
      error: '#ef476f',
      success: '#06d6a0',
      warning: '#ffd166',
      text: {
        primary: '#f8f9fa',
        secondary: '#adb5bd',
        disabled: '#6c757d'
      }
    },
    shadows: {
      sm: '0 1px 3px rgba(0,0,0,0.24), 0 1px 2px rgba(0,0,0,0.36)',
      md: '0 3px 6px rgba(0,0,0,0.30), 0 2px 4px rgba(0,0,0,0.24)',
      lg: '0 10px 20px rgba(0,0,0,0.30), 0 3px 6px rgba(0,0,0,0.20)',
      xl: '0 15px 25px rgba(0,0,0,0.30), 0 5px 10px rgba(0,0,0,0.20)'
    }
  };
  
  export { lightTheme, darkTheme };