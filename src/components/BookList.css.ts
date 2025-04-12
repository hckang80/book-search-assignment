import { globalStyle } from '@vanilla-extract/css';
import { style } from '@vanilla-extract/css';

export const item = style({
  borderBottom: '1px solid #d2d6da'
});

export const loader = style({
  textAlign: 'center'
});

globalStyle(`${item}[data-state=open] > .opener`, {
  display: 'none'
});
