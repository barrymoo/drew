/**
 * @param {string} fileContents The contents of the file to parse
 * @returns {Object} The parsed data, object lookups are faster than array
*/
xyzParser = function (fileContents) {
  var sp, numParticles, coord, object, floatVector, vector, i;
  var parsedData = [];

  try {
    sp = fileContents.split('\n');
    numParticles = parseInt(tokenize(sp[0])[0]);

    for (i = 0; i < numParticles; i++) {
        coord = tokenize(sp[i+2]);
        object = AtomicData.findOne({symbol: coord[0].toLowerCase()});

        floatVector = coord.slice(1).map(Number);
        vector = new THREE.Vector3(floatVector[0], floatVector[1], floatVector[2]);

        parsedData[i] = {atomicRadius: object.atomicRadius, color: object.color, vector: vector};
    }
    parserSuccess(parsedData);
  } catch (e) {
    parserFail(e);
  }
};
