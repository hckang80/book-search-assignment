import { style } from '@vanilla-extract/css';

export const wrapper = style({
  paddingInline: 24
});

export const main = style({
  margin: '0 auto',
  maxWidth: 'var(--max-width)'
});

export const header = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  height: 80
});

export const heading = style({
  position: 'absolute',
  left: 0,
  textTransform: 'uppercase'
});

export const nav = style([main]);

export const list = style({
  display: 'flex',
  gap: 56
});

export const item = style({});

export const linkActive = style({
  textDecoration: 'underline',
  textDecorationColor: 'var(--palette-primary)',
  textUnderlineOffset: 8
});
