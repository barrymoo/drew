/**
 * @param {string} fileContents The contents of the file to parse
 * @returns {Object} The parsed data, object lookups are faster than array
*/
xyzParser = function (fileContents) {
  var sp, numParticles, coord, object, floatVector, vector;
  var parsedData = {};

  try {
    sp = fileContents.split('\n');
    numParticles = parseInt(sp[0]);

    for (let i = 0; i < numParticles; i++) {
        coord = sp[i+2].split(/[ ]+/);
        object = AtomicData.findOne({symbol: coord[0].toLowerCase()});
        console.log(object.color);

        floatVector = coord.slice(1).map(Number);
        vector = new THREE.Vector3(floatVector[0], floatVector[1], floatVector[2]);

        parsedData[i] = {id: i, dataId: object._id, vector: vector};
    }
    parserSuccess(parsedData);
  } catch (e) {
    parserFail(e);
  }
};
