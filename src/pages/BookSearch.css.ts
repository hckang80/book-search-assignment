import { style } from '@vanilla-extract/css';

export const heading = style({
  marginBottom: 16
});

export const wrapper = style({
  display: 'flex',
  gap: 16,
  maxWidth: 568
});

export const searchGroup = style({
  flexGrow: 1
});

export const searchResult = style({
  marginTop: 24
});

export const searchResultHeader = style({
  display: 'flex',
  gap: 16,
  fontWeight: 500,
  fontSize: 16
});

export const noData = style({
  marginTop: 120,
  textAlign: 'center'
});

export const noDataIcon = style({
  marginBottom: 24
});

export const noDataText = style({});
