import { style } from '@vanilla-extract/css';

export const opener = style({
  alignSelf: 'flex-start',
  marginTop: 9
});

export const inputGroup = style({
  display: 'flex',
  gap: 4,
  marginBottom: 16
});

export const targetSelect = style({
  width: 100,
  border: 0,
  borderBottom: '1px solid #d2d6da',
  boxShadow: 'none',
  borderRadius: 0
});

export const targetOption = style({
  fontWeight: 500,
  lineHeight: '22px',
  color: 'var(--text-subtitle)',
  borderRadius: 0,
  boxShadow: 'none',
  filter: 'drop-shadow(0 0 4px #00000040)'
});

export const queryInput = style({
  paddingInline: 9.5,
  fontSize: 14,
  border: 0,
  borderBottom: '1px solid var(--palette-primary)'
});

export const searchButton = style({
  width: '100%'
});
