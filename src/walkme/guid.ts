/**
 * Copied from wm-editor-page-script-shared-services
 */
function getGuid() {
  return buildRandString(32, 16);
}

function buildRandString(length: number, base: number): string {
  var res = '';

  while (8 < length) {
    res = res + generate8Chars(base);
    length -= 8;
  }

  if (0 < length) {
    res = res + generate8Chars(base).substring(0, length);
  }

  return res;
}

function generate8Chars(base: number): string {
  var length = 8; //considering javascript's Number limits.

  var multiplier = Math.pow(base, length);

  return Math.floor((1 + Math.random()) * multiplier)
    .toString(base)
    .substring(1, 9); //to have a constant number of digits:
  //adding and removing a prefix '1'.
}

export { getGuid };
