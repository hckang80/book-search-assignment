import { style } from '@vanilla-extract/css';

export const opener = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBlock: 16
});

export const thumbnail = style({
  flexShrink: 0,
  paddingInline: 48
});

export const img = style({
  width: 48,
  height: 70
});

export const title = style({
  flexWrap: 'wrap',
  flexGrow: 1,
  display: 'flex',
  alignItems: 'center',
  gap: 16
});

export const price = style({
  flexShrink: 0,
  paddingInline: '22px 56px'
});

export const buttons = style({
  display: 'flex',
  gap: 8,
  paddingRight: 16
});
