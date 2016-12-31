// standard global vars
var container, scene, camera, renderer, controls, stats;


// cubes
var cube;
var cubeLink;

var raycaster;

var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var targetRotationY = 0;
var targetRotationYOnMouseDown = 0;

var mouse;
var mouseX = 0;
var mouseY = 0;
var mouseXOnMouseDown = 0;
var mouseYOnMouseDown = 0;


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
  var skyboxImgPath = 'http://ericmotil.com/la-mab/images/bg/';
  var skyboxImgFormat = '.jpg';
  var skyboxUrls = [
    skyboxImgPath + 'xpos' + skyboxImgFormat,
    skyboxImgPath + 'xneg' + skyboxImgFormat,
    skyboxImgPath + 'ypos' + skyboxImgFormat,
    skyboxImgPath + 'yneg' + skyboxImgFormat,
    skyboxImgPath + 'zpos' + skyboxImgFormat,
    skyboxImgPath + 'zneg' + skyboxImgFormat
  ];

  var img1 = new Image;
  img1.crossOrigin = 'anonymous';
  img1.src = 'images/cubeFace1.png';

  // skybox with refraction mapping
  //
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





  // skybox by mapping sides of cube
  // doesnt allow for refraction mapping
  
  // var imagePrefix = 'images/bg/';
  // var directions  = ['xpos', 'xneg', 'ypos', 'yneg', 'zpos', 'zneg'];
  // var imageSuffix = '.png';

  // var skyGeometry = new THREE.CubeGeometry( 500, 500, 500 );

  // var materialArray = [];
  // for (var i = 0; i < 6; i++)
  //   materialArray.push( new THREE.MeshBasicMaterial({
  //     map: THREE.ImageUtils.loadTexture( imagePrefix + directions[i] + imageSuffix ),
  //     side: THREE.BackSide
  //   }));

  // var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
  // var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
  // scene.add( skyBox );
  



  // cubes
  //
  // ensures both cubes are same size
  var cubeSize = 30;
  var canvasHeight = 512,
      canvasWidth = 512;

  
  // make canvases
  //
  var canvas1 = document.createElement('canvas'),
      canvas2 = document.createElement('canvas'),
      canvas3 = document.createElement('canvas'),
      canvas4 = document.createElement('canvas'),
      canvas5 = document.createElement('canvas'),
      canvas6 = document.createElement('canvas');
  
  // set canvas sizes
  //
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
  //
  var ctx1 = canvas1.getContext('2d'),
      ctx2 = canvas2.getContext('2d'),
      ctx3 = canvas3.getContext('2d'),
      ctx4 = canvas4.getContext('2d'),
      ctx5 = canvas5.getContext('2d'),
      ctx6 = canvas6.getContext('2d');


  // choose images for different canvases
  //
  var img1 = new Image;
  img1.crossOrigin = 'anonymous';
  img1.src = 'http://ericmotil.com/la-mab/images/cubeFace1.png';
  img1.onload = function(){ ctx1.drawImage(img1, 0, 0); };


  var img2 = new Image;
  img2.crossOrigin = 'anonymous';
  img2.src = 'http://ericmotil.com/la-mab/images/cubeFace1.png';
  img2.onload = function(){ ctx2.drawImage(img2, 0, 0); };
  

  var img3 = new Image;
  img3.crossOrigin = 'anonymous';
  img3.src = 'http://ericmotil.com/la-mab/images/cubeFace1.png';
  img3.onload = function(){ ctx3.drawImage(img3, 0, 0); };
  

  var img4 = new Image;
  img4.crossOrigin = 'anonymous';
  img4.src = 'http://ericmotil.com/la-mab/images/cubeFace1.png';
  img4.onload = function(){ ctx4.drawImage(img4, 0, 0); };

  var img5 = new Image;
  img5.crossOrigin = 'anonymous';
  img5.src = 'http://ericmotil.com/la-mab/images/cubeFace1.png';
  img5.onload = function(){ ctx5.drawImage(img5, 0, 0); };
  

  var img6 = new Image;
  img6.crossOrigin = 'anonymous';
  img6.src = 'http://ericmotil.com/la-mab/images/cubeFace1.png';
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
  var cubeLinkGeometry = new THREE.CubeGeometry(cubeSize + 10, cubeSize + 10, cubeSize + 10);

  // compile cube faces
  var cubeLinkMaterials = [ 
      cubeFace1,
      cubeFace2,
      cubeFace3,
      cubeFace4,
      cubeFace5,
      cubeFace6
  ]; 

  // make cube
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
  // center
  cube.position.set(0, 0, 0);
  // add cube to scene
  scene.add( cube );

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();


  // event listeners
  window.addEventListener( 'resize', onWindowResize, false );
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'mousedown', onDocumentMouseDown, false );
  document.addEventListener( 'touchstart', onDocumentTouchStart, false );
  document.addEventListener( 'touchmove', onDocumentTouchMove, false );

}


window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}




function onDocumentMouseDown( event ) {  
  // var vector = new THREE.Vector3((event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 );
  // vector.unproject( camera );
  
  // var raycaster = new THREE.Raycaster();   
  // // raycaster.set(camera.position, vector.sub( camera.position ).normalize());
  // raycaster.setFromCamera( mouse, camera );

  // var intersects = raycaster.intersectObject( cubeLink );
  
  // var hex = Math.random() * 0xffffff;

  //    if ( intersects.length > 0 ) {
  //       var index = Math.floor( intersects[0].faceIndex / 2);
  //       switch (index) {
  //          case 0: 
  //             console.log('face 1');
  //             // window.open('http://google.com', '_blank', '','');
  //             break;
  //          case 1:
  //             console.log('face 2');
  //             // window.open('http://google.com', '_blank', '','');
  //             break;
  //          case 2:
  //             console.log('face 3');
  //             // window.open('http://google.com', '_blank', '','');
  //             break;
  //          case 3: 
  //             console.log('face 4');
  //             // window.open('http://google.com', '_blank', '','');
  //             break;
  //          case 4: 
  //             console.log('face 5');
  //             // window.open('http://google.com', '_blank', '','');
  //             break;
  //          case 5: 
  //             console.log('face 6');
  //             // window.open('http://google.com', '_blank', '','');
  //             break;
  //           default: 
  //             event.preventDefault();
  //       }

  //    }

  event.preventDefault();

  mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;

  raycaster.setFromCamera( mouse, camera );
  var intersects = raycaster.intersectObject( cubeLink );

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


  // document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  // document.addEventListener( 'mouseup', onDocumentMouseUp, false );
  // document.addEventListener( 'mouseout', onDocumentMouseOut, false );

  mouseXOnMouseDown = event.clientX - windowHalfX;
  mouseYOnMouseDown = event.clientY - windowHalfY;

  // targetRotationOnMouseDown = targetRotation;
  // targetRotationYOnMouseDown = targetRotationY;  
}


function onDocumentMouseMove( event ) {

  mouseX = ( event.clientX - windowHalfX ) * 0.02;
  mouseY = ( event.clientY - windowHalfY ) * 0.02;

  targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
  targetRotationY = targetRotationYOnMouseDown + ( mouseY - mouseYOnMouseDown ) * 0.02;
}
function onDocumentMouseUp( event ) {
  document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
  document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}
function onDocumentMouseOut( event ) {
  document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
  document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}
function onDocumentTouchStart( event ) {

  // if ( event.touches.length === 1 ) {
  //   event.preventDefault();
  //   mouseXOnMouseDown = ( event.touches[ 0 ].pageX - windowHalfX) * 0.05;
  //   mouseYOnMouseDown = ( event.touches[ 0 ].pageY - windowHalfY) * 0.05;
  //   targetRotationOnMouseDown = targetRotation;
  //   targetRotationYOnMouseDown = targetRotationY;
  // }

  event.preventDefault();
  event.clientX = event.touches[0].clientX;
  event.clientY = event.touches[0].clientY;
  onDocumentMouseDown( event );
}
function onDocumentTouchMove( event ) {

  if ( event.touches.length === 1 ) {

    event.preventDefault();


    // move camera
    mouseX = ( event.touches[ 0 ].pageX - windowHalfX) * 0.5;
    mouseY = ( event.touches[ 0 ].pageY - windowHalfY) * 0.5;

    // move object
    targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.2;
    targetRotationY = targetRotationYOnMouseDown + ( mouseY - mouseYOnMouseDown ) * 0.2;

  }
}

function animate() {

  requestAnimationFrame( animate );
  render();

  camera.position.x += ( mouseX / 2  - camera.position.x) * 0.02;
  camera.position.y += ( - mouseY / 2   - camera.position.y) * 0.02;
}


function render() {

  renderer.render( scene, camera );


  cube.rotation.x += 0.05;
  cube.rotation.y += 0.05;

  cubeLink.rotation.x += 0.05;
  cubeLink.rotation.y += 0.05;

  cube.rotation.y += ( targetRotationY - cube.rotation.y ) * 0.005;
  cube.rotation.x += ( targetRotation - cube.rotation.x ) * 0.005;

  cubeLink.rotation.y += ( targetRotationY - cubeLink.rotation.y ) * 0.005;
  cubeLink.rotation.x += ( targetRotation - cubeLink.rotation.x ) * 0.005;
}
