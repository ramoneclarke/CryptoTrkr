export const largeNumberFormatter = new Intl.NumberFormat("en-IN", {
  // Numbers >= 1
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const smallNumberFormatter = new Intl.NumberFormat("en-IN", {
  // Numbers < 1 && > 0.01
  minimumFractionDigits: 4,
  maximumFractionDigits: 5,
  roundingIncrement: 5,
});

export const extraSmallNumberFormatter = new Intl.NumberFormat("en-IN", {
  // Numbers < 0.01
  minimumFractionDigits: 2,
  maximumSignificantDigits: 12,
  roundingIncrement: 5,
});

export const numberFormatter = (number) => {
  if (number >= 1) {
    return largeNumberFormatter.format(number);
  } else if (number < 1 && number > 0.01) {
    return smallNumberFormatter.format(number);
  } else {
    return extraSmallNumberFormatter.format(number);
  }
};
