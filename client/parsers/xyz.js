/**
 * @description
 * # Writing the XYZ Parser, see code for better understanding
 * 1. Create parsedData object
 * 2. Loop over atoms: get AtomicData._id of atom and Vector3 for coordinates
 * 3. Test to make sure parser worked, else throw error to trigger {@link parserFail}
 * 4. Add the item to parsedData
 * 5. Pass parsedData to {@link parserSuccess}
 * ## To do:
 * * Add tests to ensure the data is okay.
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

        floatVector = coord.slice(1).map(Number);
        vector = new THREE.Vector3(floatVector[0], floatVector[1], floatVector[2]);

        parsedData[i] = {id: i, dataId: object._id, vector: vector};
    }
    parserSuccess(parsedData);
  } catch (e) {
    parserFail(e);
  }
};
