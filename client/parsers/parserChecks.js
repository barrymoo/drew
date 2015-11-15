// Contains Parsing Error Checks

vectorCheck = function (name) {
  var vector = name;
  nan = vector.map(isNaN);
  if (nan.indexOf(true) === 0) {
    throw new Error('Cannot parse vector!')
  }
};
