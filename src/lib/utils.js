export function titleCase(str) {
  if (!str) return '';
  return `${str.substr(0,1).toUpperCase()}${str.substr(1)}`;
}

export function plural(n, singular, plural) {
  if (n > 1) return plural;
  return singular;
}