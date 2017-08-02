const typeMap = {
  0: 'student',
  1: 'teacher',
  2: 'administrator',
};

exports.getTypeName = types => {
  return types.map(type => typeMap[type]).join(' or ');
};
