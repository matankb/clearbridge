export function changeItem(list, id, reducer) {
  return list.map(item => {
    if (item.id === id) {
      return reducer(item);
    } else {
      return item;
    }
  });
}
