/**
 * @param count
 * @param forms
 * - forms[0] singular
 * - forms[1] pluralGenitive
 * - forms[2] pluralNominative
 */
export const getPluralForm = (count: number, forms: string[]) => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return forms[0];
  } else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
    return forms[1];
  } else {
    return forms[2];
  }
};
