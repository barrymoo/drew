/**
 * @description
 * # vectorCheck
 * Throws error when Vector3 isFinite evaluates to false on one of the elements
 * @param {THREE.Vector3} vector
 */
vectorCheck = function (vector) {
  var vector = vector;
  var nan = [];
  nan[0] = isFinite(vector.x);
  nan[1] = isFinite(vector.y);
  nan[2] = isFinite(vector.z);
  if (nan.indexOf(false) === 0) {
    throw new Error('Cannot parse vector!')
  }
};
