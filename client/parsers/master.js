/**
 * @description
 * * Register file extensions here
 * * If the extension isn't recognized, the file is ignored
 * * Passes actual text from file to specified parser
 *
 * ## To do:
 * * Send user to documentation to create a parser for their file type
 * * Link param to the called from menu
 * @param {string} file The file passed from menu
 */
masterParser = function (file) {
  var fileExt = file.name.split('.').pop();
  var reader = new FileReader();

  reader.onload = function (e) {
    if (fileExt === 'xyz') {
      xyzParser(reader.result);
    } else {
      throw new Error('File ' + file + ' has an unrecognized extension! Consider writing a parser.')
    }
  };

  reader.readAsText(file);
};

/**
 * @description
 * # parserSuccess: call function from a parser to render atoms and bonds
 * ## Performance Consideration - Is it faster?
 * * pass objects in parsedData (more memory intensive)
 * * pass _id in parsedData and lookup object (less memory intensive)
 * ## To do:
 * * Check to see if previous molecule was rendered, it should be cleared first.
 * @param {Object} parsedData A special data type, see {@link xyzParser}
 */
parserSuccess = function (parsedData) {

  // Render Atoms!
  var id, spheres;
  for (let i = 0; i < _.size(parsedData); i++) {
    // Reset sphere
    sphere = null;

    // Render new sphere
    id = AtomicData.findOne({_id: parsedData[i].dataId});
    sphere = new THREE.Mesh(makeSphere(id.atomicRadius), makePointsMaterial(id.color));
    sphere.position.x = parsedData[i].vector.x;
    sphere.position.y = parsedData[i].vector.y;
    sphere.position.z = parsedData[i].vector.z;
    scene.add(sphere);
  }


  // Render Bonds!
  var idInner, idOuter, cylinder, distance, isBondDistance;
  var bondBuffer = 0.3;
  for (let i = 0; i < _.size(parsedData); i++) {
    idOuter = AtomicData.findOne({_id: parsedData[i].dataId});
    for (let j = i + 1; j < _.size(parsedData); j++) {
      idInner = AtomicData.findOne({_id: parsedData[j].dataId});
      distance = parsedData[i].vector.distanceTo(parsedData[j].vector);
      isBondDistance = (idOuter.atomicRadius + idInner.atomicRadius + bondBuffer);
      if (distance <= isBondDistance) {
        scene.add(makeBond(parsedData[i].vector, parsedData[j].vector));
      }
    }
  }

  render();
};

/**
 * @description
 * # Throw a parser error.
 * @param {Error} e throw new Error(e)
 */
parserFail = function (e) {
  throw new Error(e);
};
