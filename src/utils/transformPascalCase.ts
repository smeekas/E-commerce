export function transformPascalCase(str: string) {
  const strArr: string[] = [];
  for (const char of str) {
    if (char.charCodeAt(0) >= 65 && char.charCodeAt(0) <= 91) {
      strArr.push(' ');
      strArr.push(char);
    } else {
      strArr.push(char);
    }
  }
  if (strArr.length > 0) {
    strArr[0] = strArr[0].toUpperCase();
  }
  return strArr.join('').trim();
}
