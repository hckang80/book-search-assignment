import { style } from '@vanilla-extract/css';

export const list = style({
  display: 'grid',
  gap: 24,
  marginTop: -50,
  padding: '69px 25px 28px 51px',
  borderRadius: 24
});

export const item = style({
  display: 'flex',
  justifyContent: 'space-between'
});

const button = style({
  all: 'unset',
  selectors: {
    '&:not(:disabled)': {
      cursor: 'pointer'
    }
  }
});

export const label = style([button, {}]);

export const deleteButton = style([button, {}]);
