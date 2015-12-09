/*
 * Main three.js entry point, doesn't need to be in our
 * API hence single leading star
 */
Template.threejsMain.onRendered(function () {

    // Initial Dimensions
    dim = computeSize();
    camera = new THREE.PerspectiveCamera(60, dim[0]/dim[1], 1, 1000);
    camera.position.z = 200;

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
