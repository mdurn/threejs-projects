Examples.example4 = (function(){
  "use strict";

  var scene = new THREE.Scene(),
      renderer = new THREE.WebGLRenderer() ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),
      ambientLight = new THREE.AmbientLight(0x222222),
      directionalLight = new THREE.DirectionalLight(0xffff00, 0.4),
      sceneObjects = {},
      controls,
      camera;

  function initScene() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    var webglContainer = document.getElementById('webgl-container');
    webglContainer.appendChild(renderer.domElement);

    scene.add(ambientLight);

    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.z = 20;

    scene.add(camera);

    var loader = new THREE.JSONLoader();
    loader.load('models/example3.js', function(geometry, materials){
      var material = new THREE.MeshPhongMaterial({
        color: 0x779ECB
      });

      sceneObjects.face3d = new THREE.Mesh(geometry, material);

      scene.add(sceneObjects.face3d);
    });

    controls = new THREE.OrbitControls(camera);
    //controls.addEventListener('change', render);

    render();
  }

  function render(){
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  window.onload = initScene;

  return {
    scene: scene
  };
})();
