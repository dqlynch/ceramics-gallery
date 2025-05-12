import type { Theme } from '@emotion/react';

export const theme: Theme = {
  colors: {
    primary: '#2C3E50',
    secondary: '#95A5A6',
    background: '#FFFFFF',
    text: '#2C3E50',
    accent: '#E74C3C',
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    body: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '2rem',
    xl: '4rem',
  },
  breakpoints: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
}; 