export function isEqual<T>(a: T, b: T): boolean {
  if (typeof a !== typeof b) {
    return false;
  }
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}

export function camelize(string: string): string {
  return string
    .replace(/[-_]+(.)?/g, (match, character): string => {
      return character ? ' ' + character.toUpperCase() : '';
    })
    .replace(/^\w/, (c) => c.toUpperCase());
}

export function capitalizeWords(str: string): string {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}