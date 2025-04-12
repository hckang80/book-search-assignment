import { style } from '@vanilla-extract/css';

export const heading = style({
  marginBottom: 16
});

export const wrapper = style({
  display: 'flex',
  gap: 16
});

export const searchGroup = style({
  flexBasis: 480,
  position: 'relative',
  zIndex: 4
});

export const searchResult = style({
  marginTop: 24
});

export const searchResultHeader = style({
  display: 'flex',
  gap: 16,
  marginBottom: 32,
  fontWeight: 500,
  fontSize: 16
});

export const subHeading = style({
  fontWeight: 'inherit',
  fontSize: 'inherit'
});

export const loader = style({
  margin: '120px auto'
});
