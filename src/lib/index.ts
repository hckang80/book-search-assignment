export const toReadableNumber = (amount = 0) => {
  return amount.toLocaleString();
};

export const isSale = (amount: number) => {
  return amount > 0;
};
