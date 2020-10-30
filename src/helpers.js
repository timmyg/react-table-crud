function capitalizeFirstLetter(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

export function toTitleCase(string) {
  string = string.replace(/_/g, ' ');
  return string
    .split(' ')
    .map((x) => capitalizeFirstLetter(x))
    .join(' ');
}
