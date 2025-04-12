import { style } from '@vanilla-extract/css';

export const form = style({
  position: 'relative',
  zIndex: 2
});

export const wrapper = style({
  gap: 11,
  height: 50,
  paddingInline: '10px 20px',
  border: 0,
  boxShadow: 'none',
  borderRadius: 100
});

export const icon = style({
  scale: 0.8
});
