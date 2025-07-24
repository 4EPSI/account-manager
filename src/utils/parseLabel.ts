export const parseLabel = (label: string): { text: string }[] => {
  return label
    .split(';')
    .map(item => item.trim())
    .filter(Boolean)
    .map(text => ({ text }));
};