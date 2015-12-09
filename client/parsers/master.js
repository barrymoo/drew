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
  // Shaders and ShaderMaterial
  var vertex_shader = "\
    attribute float size;\
    attribute vec3 color;\
    varying vec3 vColor;\
    \
    void main() {\
      vColor = color;\
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);\
      gl_PointSize = size * (450.0 / length(mvPosition.xyz));\
      gl_Position = projectionMatrix * mvPosition;\
    }\
  ";

  var fragment_shader = "\
    varying vec3 vColor;\
    \
    void main() {\
      if (length(gl_PointCoord * 2.0 - 1.0) > 1.0)\
        discard;\
        gl_FragColor = vec4(vColor, 1.0);\
    }\
  ";

  var material = new THREE.ShaderMaterial({
    vertexShader: vertex_shader,
    fragmentShader: fragment_shader,
    transparent: false
  })

  // Get the BufferGeometry attributes
  var length = parsedData.length;
  var positions = new Float32Array(length * 3);
  var sizes = new Float32Array(length);
  var colors = new Float32Array(length * 3);
  var color =  new THREE.Color();
  for (var i = 0, i3 = 0; i < length; i++, i3 += 3) {
    // set positions
    positions[i3] = parsedData[i].vector.x;
    positions[i3 + 1] = parsedData[i].vector.y;
    positions[i3 + 2] = parsedData[i].vector.z;

    // set sizes
    sizes[i] = parsedData[i].atomicRadius;

    // set colors
    color.setHex(parsedData[i].color);
    colors[i3] = color.r
    colors[i3 + 1] = color.g
    colors[i3 + 2] = color.b
  }

  // Set BufferAttributes
  var geometry = new THREE.BufferGeometry();
  geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.addAttribute('size', new THREE.BufferAttribute(sizes, 1));
  geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));

  var particles = new THREE.Points(geometry, material);
  scene.add(particles);
  render();

  // Generate Bond Pairs for use of Buffer Geometry
  var bondsGeometry = new THREE.Geometry();
  var distanceTo = 0, bondDistance = 0, pairs = [];
  for (var i = 0; i < length; i++) {
    for (var j = i + 1; j < length; j++) {
      distanceTo = parsedData[i].vector.distanceTo(parsedData[j].vector);
      bondDistance = parsedData[i].atomicRadius + parsedData[j].atomicRadius;
      // distanceTo <= bondDistance + buffer
      if (distanceTo <= (bondDistance + 0.5)) {
        pairs.push([i,j]);
      }
    }
  }

  // We'll reuse length, positions, colors, and sizes
  // --> *4 because we want to use midpoints to separate bonds
  length = pairs.length
  positions = new Float32Array(length * 3 * 4);
  colors = new Float32Array(length * 3 * 4);

  for (var i=0, i4 = 0; i < length; i++, i4 += 12) {
    // Compute Midpoint
    var midPoint = new THREE.Vector3();
    midPoint.subVectors(parsedData[pairs[i][1]].vector, parsedData[pairs[i][0]].vector);
    midPoint.addVectors(parsedData[pairs[i][0]].vector, midPoint.multiplyScalar(0.5));

    // Set positions
    positions[i4 + 0] = parsedData[pairs[i][0]].vector.x;
    positions[i4 + 1] = parsedData[pairs[i][0]].vector.y;
    positions[i4 + 2] = parsedData[pairs[i][0]].vector.z;
    positions[i4 + 3] = midPoint.x;
    positions[i4 + 4] = midPoint.y;
    positions[i4 + 5] = midPoint.z;
    positions[i4 + 6] = midPoint.x;
    positions[i4 + 7] = midPoint.y;
    positions[i4 + 8] = midPoint.z;
    positions[i4 + 9] = parsedData[pairs[i][1]].vector.x;
    positions[i4 + 10] = parsedData[pairs[i][1]].vector.y;
    positions[i4 + 11] = parsedData[pairs[i][1]].vector.z;

    // Set Colors
    color.setHex(parsedData[pairs[i][0]].color);
    colors[i4 + 0] = color.r;
    colors[i4 + 1] = color.g;
    colors[i4 + 2] = color.b;
    colors[i4 + 3] = color.r;
    colors[i4 + 4] = color.g;
    colors[i4 + 5] = color.b;

    color.setHex(parsedData[pairs[i][1]].color);
    colors[i4 + 6] = color.r;
    colors[i4 + 7] = color.g;
    colors[i4 + 8] = color.b;
    colors[i4 + 9] = color.r;
    colors[i4 + 10] = color.g;
    colors[i4 + 11] = color.b;
  }

  // Reuse Geometry
  geometry = new THREE.BufferGeometry();
  geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));

  var bondMaterial = new THREE.LineBasicMaterial({linewidth: 5, vertexColors: THREE.VertexColors});
  var bondLineSegments = new THREE.LineSegments(geometry, bondMaterial);
  scene.add(bondLineSegments);
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
