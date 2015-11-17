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
  var geometry = new THREE.BufferGeometry();
  var length = parsedData.length;
  var positions = new Float32Array(length * 3);
  var colors = new Float32Array(length * 3);

  var color = new THREE.Color();

  var i = 0;
  for (i; i < length * 3; i += 3) {
    var index = Math.floor(i / 3);
    positions[i] = parsedData[index].vector.x;
    positions[i + 1] = parsedData[index].vector.y;
    positions[i + 2] = parsedData[index].vector.z;

    color.setHex(parsedData[index].color);
    colors[i] = color.r;
    colors[i + 1] = color.g;
    colors[i + 2] = color.b;
  }

  geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));

  var material = new THREE.PointsMaterial({vertexColors: THREE.VertexColors});
  var particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);
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
