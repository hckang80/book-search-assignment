export const toReadableNumber = (amount = 0) => {
  return amount.toLocaleString();
};

export const isSale = (amount = 0) => {
  return amount > 0;
};
