/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const arrSort = [...arr];

  if (param === 'asc') {
    arrSort.sort((a, b) => a.localeCompare(b, [], {caseFirst: 'upper'}));
  } else if (param === 'desc') {
    arrSort.sort((a, b) => b.localeCompare(a, [], {caseFirst: 'upper'}));
  }

  return arrSort;
}
