import { style } from '@vanilla-extract/css';

export const item = style({
  borderBottom: '1px solid #d2d6da'
});

export const opener = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
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
