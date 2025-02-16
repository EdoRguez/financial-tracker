export const validAmount = (input: string): boolean => {
  if (!input) return false;
  const regex = /^\d*(\.(\d{1,2})?)?$/;
  return regex.test(input);
};

export const validLettersAndNumbers = (
  input: string,
  allowSpaces: boolean = false
): boolean => {
  if (!input) return false;
  const regex = allowSpaces
    ? /^[a-zA-ZÀ-ÖØ-öø-ÿ0-9\s]*$/
    : /^[a-zA-ZÀ-ÖØ-öø-ÿ0-9]*$/;
  return regex.test(input);
};
