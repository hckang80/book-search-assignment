import { globalStyle } from '@vanilla-extract/css';

globalStyle('.title1', {
  fontWeight: 700,
  fontSize: 24,
  lineHeight: 1
});

globalStyle('.title2', {
  fontWeight: 700,
  fontSize: 22,
  lineHeight: '24px'
});

globalStyle('.title3', {
  fontWeight: 700,
  fontSize: 18,
  lineHeight: 1
});

globalStyle('.body1', {
  fontWeight: 500,
  fontSize: 20,
  lineHeight: 1
});

globalStyle('.body2', {
  fontWeight: 500,
  fontSize: 14,
  lineHeight: 1
});

globalStyle('.caption', {
  fontWeight: 500,
  fontSize: 16,
  lineHeight: 1
});

globalStyle('.small', {
  fontWeight: 500,
  fontSize: 10,
  lineHeight: 1
});

globalStyle('.palette-primary', {
  color: 'var(--palette-primary)'
});

globalStyle('.palette-red', {
  color: 'var(--palette-red)'
});

globalStyle('.palette-gray', {
  color: 'var(--palette-gray)'
});

globalStyle('.palette-light-gray', {
  color: 'var(--palette-light-gray)'
});

globalStyle('.palette-white', {
  color: 'var(--palette-white)'
});

globalStyle('.palette-black', {
  color: 'var(--palette-black)'
});

globalStyle('.text-primary', {
  color: 'var(--text-primary)'
});

globalStyle('.text-secondary', {
  color: 'var(--text-secondary)'
});

globalStyle('.text-subtitle', {
  color: 'var(--text-subtitle)'
});
