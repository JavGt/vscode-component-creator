import { capitalize } from './capitalize';

export const capitalizeArray = (str: string, notCapitalizeFirst?: boolean) =>
  str
    .split(' ')
    .map((word, idx) => {
      if (notCapitalizeFirst && idx === 0) return word.toLowerCase();

      return capitalize(word);
    })
    .join('');
