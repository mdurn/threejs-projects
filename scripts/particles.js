Examples.particles = (function(){
  "use strict";

  var scene = new THREE.Scene(),
      renderer = new THREE.WebGLRenderer() ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),
      light = new THREE.AmbientLight(0xFFFFFF),
      camera;

  var particleCount = 1800,
      particles = new THREE.Geometry(),
      pMaterial = new THREE.PointCloudMaterial({
        color: 0xFFFFFF,
        size: 20,
        map: THREE.ImageUtils.loadTexture("textures/particle.png"),
        blending: THREE.AdditiveBlending,
        transparent: true
      }),
      pointCloud;

  var clock = new THREE.Clock();
  var elapsedTime = 0;

  function initScene() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    document.getElementById('webgl-container').appendChild(renderer.domElement);

    scene.add(light);

    camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 1, 1000);
    camera.position.z = 900;

    scene.add(camera);

    for (var p = 0; p < particleCount; p++) {
      var radius = 25,
          pX = (Math.random() * radius*2) - radius,
          yMax = Math.sqrt((radius * radius) - (pX*pX)),
          pY = (Math.random() * yMax*2) - yMax,
          zMax = Math.sqrt((yMax * yMax) - (pY*pY)),
          pZ = (Math.random() * zMax*2) - zMax,
          particle = new THREE.Vector3(pX, pY, pZ);

      particles.vertices.push(particle);
    }

    pointCloud = new THREE.PointCloud(particles, pMaterial);
    pointCloud.sortParticles = true;

    scene.add(pointCloud);

    render();
  }

  function render(){
    pointCloud.rotation.y += 0.01;
    elapsedTime += clock.getDelta();
    var dr = Math.sin(elapsedTime*3) * 1.8;
    var pCount = particleCount;
    while(pCount--){
      var particle = particles.vertices[pCount];
      var normalized = particle.clone().normalize();
      var deltaPos = new THREE.Vector3(
        normalized.x*dr,
        normalized.y*dr,
        normalized.z*dr
      );
      particle.add(deltaPos);
    }
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  window.onload = initScene;

  return {
    scene: scene
  };
})();

