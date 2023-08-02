export function isOnList(list, value) {
  const arr = list.map(item => item.name);
  return arr.some(element => {
    return element === value;
  });
}
