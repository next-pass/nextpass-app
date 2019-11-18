export default (len, options) => {
  let cLower = "abcdefghjkmnpqrstuvwxyz";
  let cUpper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  let cNumbers = "23456789";
  let cSymbols = '!#$%&*+-=?@^_';

  const {lower, upper, numbers, symbols, excludeSimilar, excludeAmbiguous} = options;

  if(!excludeSimilar){
    cLower = `${cLower}ilo`;
    cUpper = `${cUpper}IO`;
    cNumbers = `${cNumbers}01`;
    cSymbols = `${cSymbols}|`;
  }

  if(!excludeAmbiguous){
    cSymbols = `${cSymbols}{}[]()'"\`~,;:.<>\\`;
  }

  let chars = '';

  if (lower) {
    chars = `${chars}${cLower}`;
  }

  if (upper) {
    chars = `${chars}${cUpper}`;
  }

  if (numbers) {
    chars = `${chars}${cNumbers}`;
  }

  if (symbols) {
    chars = `${chars}${cSymbols}`;
  }

  let rv = '';

  for (let e = 0; e < len; e++) {
    const b = Math.floor(Math.random() * chars.length);
    rv += chars.substring(b, b + 1)
  }

  return rv;
}