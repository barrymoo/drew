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

  reader.onload = function () {
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
  // Shader and ShaderMaterial
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
  });

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
    if (parsedData[i].atomicRadius >= 1.0) {
        sizes[i] = 1.0;
    } else {
        sizes[i] = parsedData[i].atomicRadius;
    }

    // set colors
    color.setHex(parsedData[i].color);
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b
  }

  // Set BufferAttributes
  var geometry = new THREE.BufferGeometry();
  geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.addAttribute('size', new THREE.BufferAttribute(sizes, 1));
  geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));

  var particles = new THREE.Points(geometry, material);
  var translateToCenter = particles.geometry.center();
  scene.add(particles);
  render();

  // Centered Atoms and Bonds (below), now adjust camera
  camera.position.z = (particles.geometry.boundingSphere.radius) / (Math.tan (camera.fov / 2.5 * Math.PI / 180));

  // Generate Bond Pairs for use of Buffer Geometry
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

  // We'll reuse length, positions, and colors
  // --> LineSegments require begin and end point i.e. length * 3 * 2
  length = pairs.length;
  positions = new Float32Array(length * 3 * 2);
  colors = new Float32Array(length * 3 * 2);

  for (var i = 0, i6 = 0; i < length; i++, i6 += 6) {
    // Set positions
    positions[i6 + 0] = parsedData[pairs[i][0]].vector.x;
    positions[i6 + 1] = parsedData[pairs[i][0]].vector.y;
    positions[i6 + 2] = parsedData[pairs[i][0]].vector.z;
    positions[i6 + 3] = parsedData[pairs[i][1]].vector.x;
    positions[i6 + 4] = parsedData[pairs[i][1]].vector.y;
    positions[i6 + 5] = parsedData[pairs[i][1]].vector.z;

    // Set Colors
    color.setHex(parsedData[pairs[i][0]].color);
    colors[i6 + 0] = color.r;
    colors[i6 + 1] = color.g;
    colors[i6 + 2] = color.b;

    color.setHex(parsedData[pairs[i][1]].color);
    colors[i6 + 3] = color.r;
    colors[i6 + 4] = color.g;
    colors[i6 + 5] = color.b;
  }

  // Reuse Geometry
  geometry = new THREE.BufferGeometry();
  geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));

  var bondMaterial = new THREE.LineBasicMaterial({linewidth: 5, vertexColors: THREE.VertexColors});
  var bondLineSegments = new THREE.LineSegments(geometry, bondMaterial);
  bondLineSegments.geometry.translate(translateToCenter.x, translateToCenter.y, translateToCenter.z);
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
