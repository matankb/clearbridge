export function normalizeDatabaseObject(obj) {

  let object = { ...obj };

  object.id = obj._id;

  // internal db properties
  delete object.__v;
  delete object._id;

  return object;

}
