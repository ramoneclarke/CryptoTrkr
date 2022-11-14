export const largeNumberFormatter = new Intl.NumberFormat("en-US", {
  // Numbers >= 1
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const smallNumberFormatter = new Intl.NumberFormat("en-US", {
  // Numbers < 1 && > 0.01
  minimumFractionDigits: 5,
  maximumFractionDigits: 5,
  roundingIncrement: 5,
});

export const extraSmallNumberFormatter = new Intl.NumberFormat("en-US", {
  // Numbers < 0.01
  minimumFractionDigits: 8,
  maximumFractionDigits: 8,
  roundingIncrement: 5,
});

export const largeCurrencyFormatter = (number) => {
  return new Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 18,
  }).format(number);
};

export const percentageFormatter = (number) => {
  if (number >= 10) {
    return new Intl.NumberFormat("en-US", {
      minimumSignificantDigits: 4,
      maximumSignificantDigits: 4,
    }).format(number);
  } else if (number > 1 && number < 10) {
    return new Intl.NumberFormat("en-US", {
      minimumSignificantDigits: 3,
      maximumSignificantDigits: 3,
      style: "decimal",
      signDisplay: "never",
    }).format(number);
  } else {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  }
};

export const numberFormatter = (number) => {
  if (number === 0) {
    return largeNumberFormatter.format(number);
  }
  if (number >= 1) {
    return largeNumberFormatter.format(number);
  } else if (number < 1 && number > 0.01) {
    return smallNumberFormatter.format(number);
  } else {
    return extraSmallNumberFormatter.format(number);
  }
};

export const currencyFormatter = (number) => {
  return largeNumberFormatter.format(number);
};
