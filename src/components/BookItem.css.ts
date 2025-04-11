import { style } from '@vanilla-extract/css';

export const opener = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 16px 16px 0'
});

export const thumbnail = style({
  selectors: {
    [`${opener} &`]: {
      flexShrink: 0,
      paddingInline: '5%'
    }
  }
});

export const title = style({
  selectors: {
    [`${opener} &`]: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }
});

export const price = style({
  selectors: {
    [`${opener} &`]: {
      paddingInline: '22px 56px'
    }
  }
});

export const buttons = style({
  selectors: {
    [`${opener} &`]: {
      display: 'flex',
      gap: 8
    }
  }
});
