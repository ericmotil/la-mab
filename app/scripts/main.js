// standard global vars
var container, scene, camera, renderer, controls, stats;

// cubes
var cube;
var cubeLink;

// utils
var raycaster;
var mouse;
var mouseCameraX = 0;
var mouseCameraY = 0;

// window
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


init();
animate();


function init() {


  // scene
  //
  scene = new THREE.Scene();


  // camera
  //
  // view angle, aspect ratio, near, far
  camera = new THREE.PerspectiveCamera( 45, windowWidth / windowHeight, 0.1, 1000 );
  camera.position.set( 100, 100, 100 );
  scene.add( camera );


  // renderer
  //
  renderer = new THREE.WebGLRenderer( { antialias:true } );
  renderer.setSize( windowWidth, windowHeight );

  // render in container
  container = document.getElementById( 'lamab' );
  container.appendChild( renderer.domElement );



  // info html
  //
  // var info = document.createElement( 'div' );
  // info.style.position = 'absolute';
  // info.style.bottom = '10px';
  // info.style.width = '100%';
  // info.style.textAlign = 'center';
  // info.style.color = 'white';
  // info.innerHTML = '<a style="color: white;"href="http://threejs.org" target="_blank">link to thing</a>';
  // container.appendChild( info );



  // lights
  //
  var light = new THREE.PointLight(0xffffff);
  light.position.set( 0, 500, 0 );
  scene.add(light);


  // axes
  //
  // var axes = new THREE.AxisHelper(100);
  // scene.add( axes );


  // skybox
  //
  var skyboxImgPath = 'images/bg/';
  var skyboxImgFormat = '.jpg';
  var skyboxUrls = [
    skyboxImgPath + 'another-xpos' + skyboxImgFormat,
    skyboxImgPath + 'another-xneg' + skyboxImgFormat,
    skyboxImgPath + 'another-ypos' + skyboxImgFormat,
    skyboxImgPath + 'another-yneg' + skyboxImgFormat,
    skyboxImgPath + 'another-zpos' + skyboxImgFormat,
    skyboxImgPath + 'another-zneg' + skyboxImgFormat
  ];

  // skybox with refraction mapping
  var skyboxTexture = new THREE.CubeTextureLoader().load( skyboxUrls );
  skyboxTexture.format = THREE.RGBFormat;
  skyboxTexture.mapping = THREE.CubeRefractionMapping;

  // skybox geo
  var skyboxGeometry = new THREE.BoxGeometry( 1000, 1000, 1000 );

  // skybox shader
  var skyboxShader = THREE.ShaderLib[ 'cube' ];
  var skyboxMaterial = new THREE.ShaderMaterial( {
    fragmentShader: skyboxShader.fragmentShader,
    vertexShader: skyboxShader.vertexShader,
    uniforms: skyboxShader.uniforms,
    depthWrite: false,
    side: THREE.BackSide
  });
  skyboxMaterial.uniforms[ 'tCube' ].value = skyboxTexture;


  // make skaybox and add to scene
  var skybox = new THREE.Mesh( skyboxGeometry, skyboxMaterial );
  scene.add( skybox );

  

  // cubes
  //
  // ensure both cubes are same size and power of 2
  var cubeSize = 30;
  var canvasHeight = 512,
      canvasWidth = 512;

  // make canvases
  var canvas1 = document.createElement('canvas'),
      canvas2 = document.createElement('canvas'),
      canvas3 = document.createElement('canvas'),
      canvas4 = document.createElement('canvas'),
      canvas5 = document.createElement('canvas'),
      canvas6 = document.createElement('canvas');
  
  // set canvas size
  canvas1.width = canvasHeight;
  canvas1.height = canvasWidth;

  canvas2.width = canvasHeight;
  canvas2.height = canvasWidth;

  canvas3.width = canvasHeight;
  canvas3.height = canvasWidth;

  canvas4.width = canvasHeight;
  canvas4.height = canvasWidth;

  canvas5.width = canvasHeight;
  canvas5.height = canvasWidth;

  canvas6.width = canvasHeight;
  canvas6.height = canvasWidth;


  // make canvas context
  var ctx1 = canvas1.getContext('2d'),
      ctx2 = canvas2.getContext('2d'),
      ctx3 = canvas3.getContext('2d'),
      ctx4 = canvas4.getContext('2d'),
      ctx5 = canvas5.getContext('2d'),
      ctx6 = canvas6.getContext('2d');


  // choose images for different canvases
  var img1 = new Image;
  // set cross origin becuase webGL doesnt like if you dont when using canvas
  img1.crossOrigin = 'anonymous';
  img1.src = 'http://ericmotil.com/la-mab/images/cubeFace1.svg';
  img1.onload = function(){ ctx1.drawImage(img1, 0, 0); };

  var img2 = new Image;
  img2.crossOrigin = 'anonymous';
  img2.src = 'http://ericmotil.com/la-mab/images/cubeFace2.svg';
  img2.onload = function(){ ctx2.drawImage(img2, 0, 0); };
  
  var img3 = new Image;
  img3.crossOrigin = 'anonymous';
  img3.src = 'http://ericmotil.com/la-mab/images/cubeFace3.svg';
  img3.onload = function(){ ctx3.drawImage(img3, 0, 0); };
  
  var img4 = new Image;
  img4.crossOrigin = 'anonymous';
  img4.src = 'http://ericmotil.com/la-mab/images/cubeFace4.svg';
  img4.onload = function(){ ctx4.drawImage(img4, 0, 0); };

  var img5 = new Image;
  img5.crossOrigin = 'anonymous';
  img5.src = 'http://ericmotil.com/la-mab/images/cubeFace5.svg';
  img5.onload = function(){ ctx5.drawImage(img5, 0, 0); };
  
  var img6 = new Image;
  img6.crossOrigin = 'anonymous';
  img6.src = 'http://ericmotil.com/la-mab/images/cubeFace6.svg';
  img6.onload = function(){ ctx6.drawImage(img6, 0, 0); };
  


  // make cube faces
  //
  var cubeFace1 = new THREE.MeshBasicMaterial({
    map: new THREE.Texture(canvas1),
    transparent: true,
  });
  cubeFace1.map.needsUpdate = true;

  var cubeFace2 = new THREE.MeshBasicMaterial({
    map: new THREE.Texture(canvas2),
    transparent: true,
  });
  cubeFace2.map.needsUpdate = true;

  var cubeFace3 = new THREE.MeshBasicMaterial({
    map: new THREE.Texture(canvas3),
    transparent: true,
  });
  cubeFace3.map.needsUpdate = true;

  var cubeFace4 = new THREE.MeshBasicMaterial({
    map: new THREE.Texture(canvas4),
    transparent: true,
  });
  cubeFace4.map.needsUpdate = true;

  var cubeFace5 = new THREE.MeshBasicMaterial({
    map: new THREE.Texture(canvas5),
    transparent: true,
  });
  cubeFace5.map.needsUpdate = true;

  var cubeFace6 = new THREE.MeshBasicMaterial({
    map: new THREE.Texture(canvas6),
    transparent: true,
  });
  cubeFace6.map.needsUpdate = true;


  // cube geometry
  var cubeLinkGeometry = new THREE.CubeGeometry(cubeSize + 1, cubeSize + 1, cubeSize + 1);

  // compile cube faces
  var cubeLinkMaterials = [ 
      cubeFace1,
      cubeFace2,
      cubeFace3,
      cubeFace4,
      cubeFace5,
      cubeFace6
  ]; 

  // build cube
  var cubeLinkMaterial = new THREE.MultiMaterial(cubeLinkMaterials); 
  cubeLink = new THREE.Mesh(cubeLinkGeometry, cubeLinkMaterial);

  // add cube to scene
  scene.add( cubeLink );

  // positon cube in center
  cubeLink.position.set(0, 0, 0);
  cubeLink.doubleSided = true;



  // main refracting cube
  //
  var cubeGeometry = new THREE.BoxGeometry( cubeSize, cubeSize, cubeSize);
  var cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: false,
    // map onto cube
    envMap: skyboxTexture,
    // controlls the amount of rrefraction of background
    // lower more distored, high clearer
    refractionRatio: 0.85
  });

  // create cube mesh
  cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
  // position in center
  cube.position.set(0, 0, 0);
  // add cube to scene
  scene.add( cube );



  // create raycaster for scene
  raycaster = new THREE.Raycaster();
  // create mouse for raycaster
  mouse = new THREE.Vector2();


  // event listeners
  window.addEventListener( 'resize', onWindowResize, false );
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );

  // events for moving
  document.addEventListener( 'mousedown', onDocumentMouseDown, false );
  document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  document.addEventListener( 'touchmove', onDocumentTouchMove, false );

}



function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}


function raycastFaces(){
  // set upraycaster mouse position
  //
  mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
  // place raycaster
  raycaster.setFromCamera( mouse, camera );
  var intersects = raycaster.intersectObject( cubeLink );

  // set url for each cubeface
  //
  if ( intersects.length > 0 ) {
    var index = intersects[0].face.materialIndex;
    switch (index) {
       case 0: 
          console.log('face 1');
          window.open('http://google.com', '_blank', '','');
          break;
       case 1:
          console.log('face 2');
          window.open('http://google.com', '_blank', '','');
          break;
       case 2:
          console.log('face 3');
          window.open('http://google.com', '_blank', '','');
          break;
       case 3: 
          console.log('face 4');
          window.open('http://google.com', '_blank', '','');
          break;
       case 4: 
          console.log('face 5');
          window.open('http://google.com', '_blank', '','');
          break;
       case 5: 
          console.log('face 6');
          window.open('http://google.com', '_blank', '','');
          break;
        default: 
          event.preventDefault();
    }
    // log index of cubeface that is clicked
    // console.log(intersects[0].face.materialIndex);
  }
}

function onDocumentMouseDown( event ) {  
  event.preventDefault();
  raycastFaces();
}





function onDocumentMouseMove( event ) {

  // set upraycaster mouse position
  //
  mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
  // raycast from camera with mouse poistion
  raycaster.setFromCamera( mouse, camera );
  // define object to watch
  var intersects = raycaster.intersectObject( cubeLink );
  if ( intersects.length > 0 ) {
    document.body.style.cursor = 'pointer';
    // console.log('intersected');
  } else {
    document.body.style.cursor = 'move';
    // console.log('not intersected');
  }


  // detect mouse position distance for camera movement
  //
  mouseCameraX = ( event.clientX - windowHalfX ) * 0.05;
  mouseCameraY = ( event.clientY - windowHalfY ) * 0.05;

}

function onDocumentTouchStart( event ) {
  raycastFaces();
}

function onDocumentTouchMove( event ) {
  if ( event.touches.length === 1 ) {
    event.preventDefault();
  }
}




function animate() {

  requestAnimationFrame( animate );
  render();

}





function render() {

  // render my beautiful scene
  renderer.render( scene, camera );


  // update camera position based off mouse movement
  //
  camera.position.x += ( mouseCameraX - camera.position.x ) * 0.015;
  camera.position.y += ( - mouseCameraY - camera.position.y ) * 0.015;
 
  

  // constantly rotate refracting cube
  //
  cube.rotation.x += 0.015;
  cube.rotation.y += 0.015;
  // rotate inner link cube at same speed
  cubeLink.rotation.x += 0.015;
  cubeLink.rotation.y += 0.015;

}







// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById('btn-overlay');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
    modal.style.display = 'block';
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = 'none';
}

modal.onclick = function() {
  modal.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

