export const formatAmountStringToNumber = (price: string): number => {
  price = price.trim();

  if (price.startsWith(".")) {
    price = "0" + price;
  }

  if (price.endsWith(".")) {
    price += "0";
  }

  let parts = price.split(".");

  let integerPart = parts[0].length > 0 ? parts[0] : "0";
  let decimalPart = parts[1] ? parts[1] : "0";

  if (decimalPart.length === 1) {
    decimalPart += "0";
  } else if (decimalPart.length > 2) {
    decimalPart = decimalPart.substring(0, 2);
  }

  return parseFloat(integerPart + "." + decimalPart);
};

export const validDate = (input: string): boolean => {
  const date = new Date(input);
  return !isNaN(date.getTime());
};
