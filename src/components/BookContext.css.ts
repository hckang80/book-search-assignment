import { style, keyframes } from '@vanilla-extract/css';

const slideDown = keyframes({
  from: { height: '0' },
  to: { height: 'var(--radix-accordion-content-height)' }
});

const slideUp = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: '0' }
});

export const wrapper = style({
  overflow: 'hidden',
  selectors: {
    '&[data-state=closed]': {
      animation: `${slideUp} 300ms cubic-bezier(0.87, 0, 0.13, 1)`
    },
    '&[data-state=open]': {
      animation: `${slideDown} 300ms cubic-bezier(0.87, 0, 0.13, 1)`
    }
  }
});

export const context = style({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '24px 16px 40px'
});

export const thumbnail = style({
  flexShrink: 0,
  paddingInline: 32
});

export const image = style({
  display: 'block',
  position: 'relative'
});

export const linkedButton = style({
  position: 'absolute',
  right: 8,
  top: 8
});

export const detail = style({
  padding: '20px 48px 0 0',
  flexGrow: 1
});

export const title = style({
  display: 'flex',
  WebkitFlexWrap: 'wrap',
  alignItems: 'center',
  gap: 16,
  marginBottom: 16,
  minHeight: 26
});

export const summary = style({});

export const about = style({
  marginBottom: 12,
  fontWeight: 700,
  lineHeight: '26px'
});

export const contents = style({
  whiteSpace: 'pre-wrap',
  fontWeight: 500,
  fontSize: 10,
  lineHeight: '16px'
});

export const action = style({
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  gap: 28,
  flex: '0 0 240px'
});

export const prices = style({
  display: 'grid',
  gap: 8,
  marginTop: 'auto'
});

export const price = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: 8,
  lineHeight: '26px'
});

export const priceLabel = style({
  fontWeight: 500,
  fontSize: 10,
  color: 'var(--text-subtitle)'
});

export const priceValue = style({
  fontWeight: 700,
  fontSize: 18
});

export const priceSaleValue = style([
  priceValue,
  {
    fontWeight: 350,
    textDecoration: 'line-through'
  }
]);

export const cta = style({
  width: '100%'
});
