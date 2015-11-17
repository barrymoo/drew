/*
 * Main three.js entry point, doesn't need to be in our
 * API hence single leading star
 */
Template.threejsMain.onRendered(function () {

    // Initial Dimensions
    dim = computeSize();
    camera = new THREE.PerspectiveCamera(60, dim[0]/dim[1], 1, 1000);
    camera.position.z = 20;

    // The Controls
    controls = new THREE.TrackballControls(camera);

    controls.rotateSpeed = 10;
    controls.zoomSpeed = 5;
    controls.panSpeed = 5;
		controls.staticMoving = true;

		controls.keys = [65, 83, 68];

		controls.addEventListener('change', render);

    // Generate our renderer, replacing our canvas
    scene = new THREE.Scene();
    var canvas = document.getElementById("threejsCanvas");
    renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setSize(dim[0], dim[1]);

    render();
    animate();
});

/*
 * When window changes size, compute new three.js window size
 */
Template.threejsMain.rendered = function () {
    // Dynamic Resize
    $(window).resize(function () {
      dim = computeSize();
      camera.aspect = dim[0] / dim[1];
      camera.updateProjectionMatrix();
      renderer.setSize(dim[0], dim[1]);
      controls.handleResize();
    });
};

/**
 * @name Compute Window Size
 * @summary
 * # Computes window size for threeJs
 * ## To do:
 * * Is this the fastest way to do this?
 */
function computeSize () {
  // Do some math to compute threejsMain size
  var height = window.innerHeight - 2 * $(header).height() - $(footer).height();
  var width = $(columns).width() - $(sidebar).width() - $(sidebar).css("padding-right").replace("px","");
  return [width, height];
}

/**
 * @name Render
 * @summary
 * # Render the current scene
 */
render = function () {
  renderer.render(scene, camera);
};

animate = function () {
  requestAnimationFrame(animate);
  controls.update();
};

/**
 * @name makeBond
 * @summary
 * # Taking two Vector3 make a bond
 * # To do:
 * * Understand this function!
 * ** make 2 cylinders connected in middle which match atom color
 * @param {point1} {THREE.Vector3} - Vector3 atomic position
 * @param {point2} {THREE.Vector3} - Vector3 atomic position
 * @returns {edge} {THREE.Mesh} - The rendered bond.
 */
makeBond = function (point1, point2) {
  var material = new THREE.MeshBasicMaterial({color: 0xc8c8c8});
  var direction = new THREE.Vector3().subVectors(point2, point1);
  var orientation = new THREE.Matrix4();

  orientation.lookAt(point1, point2, new THREE.Object3D().up);

  orientation.multiply(new THREE.Matrix4().set(1, 0, 0, 0,
    0, 0, 1, 0,
    0, -1, 0, 0,
    0, 0, 0, 1));

  var edgeGeometry = new THREE.CylinderGeometry(0.15, 0.15, direction.length());
  var edge = new THREE.Mesh(edgeGeometry, material);
  edge.applyMatrix(orientation);
  edge.position.x = (point2.x + point1.x) / 2;
  edge.position.y = (point2.y + point1.y) / 2;
  edge.position.z = (point2.z + point1.z) / 2;
  return edge;
};
