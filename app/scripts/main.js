// standard global vars
var container, scene, camera, renderer, controls, stats;

var cube;


var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var targetRotationY = 0;
var targetRotationYOnMouseDown = 0;


var mouseX = 0;
var mouseY = 0;
var mouseXOnMouseDown = 0;
var mouseYOnMouseDown = 0;


var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;


var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


// raycasting experiment
var raycaster;
var mouse;


// second scene

var scene2;
var renderer2;
var div;
var element;


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
  // camera.lookAt( scene.position );
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
  var axes = new THREE.AxisHelper(100);
  scene.add( axes );


  





  // skybox with environment shader
  //
  var skyboxImgPath = 'images/bg/';
  var skyboxImgFormat = '.jpg';
  var skyboxUrls = [
    skyboxImgPath + 'xpos' + skyboxImgFormat,
    skyboxImgPath + 'xneg' + skyboxImgFormat,
    skyboxImgPath + 'ypos' + skyboxImgFormat,
    skyboxImgPath + 'yneg' + skyboxImgFormat,
    skyboxImgPath + 'zpos' + skyboxImgFormat,
    skyboxImgPath + 'zneg' + skyboxImgFormat
  ];




  // skybox with refraction mapping
  //
  var skyboxTexture = new THREE.CubeTextureLoader().load( skyboxUrls );
  skyboxTexture.format = THREE.RGBFormat;
  skyboxTexture.mapping = THREE.CubeRefractionMapping;

  // skybox geo
  var skyboxGeometry = new THREE.BoxGeometry( 500, 500, 500 );

  var skyboxShader = THREE.ShaderLib[ 'cube' ];
  var skyboxMaterial = new THREE.ShaderMaterial( {
    fragmentShader: skyboxShader.fragmentShader,
    vertexShader: skyboxShader.vertexShader,
    uniforms: skyboxShader.uniforms,
    depthWrite: false,
    side: THREE.BackSide
  });
  skyboxMaterial.uniforms[ 'tCube' ].value = skyboxTexture;


  var skybox = new THREE.Mesh( skyboxGeometry, skyboxMaterial );
  scene.add( skybox );





  // skybox by mapping sides of cube
  //
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




  var cubeSize = 30;
  var cubeGeometry = new THREE.BoxGeometry( cubeSize, cubeSize, cubeSize);
  var cubeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    wireframe: false,
    envMap: skyboxTexture,
    refractionRatio: 0.62
  });

  cube = new THREE.Mesh( cubeGeometry, cubeMaterial );
  cube.position.set(0, 0, 0);
  scene.add( cube );



    //CSS3D Scene
    scene2 = new THREE.Scene();

    //HTML
    element = document.createElement('a');
    element.href = 'http://google.com';
    element.innerHTML = 'this is a link';
    element.className = 'three-div';

    //CSS Object
    div = new THREE.CSS3DObject(element);
    div.position.x = 0;
    div.position.y = 0;
    div.position.z = -100;
    // div.rotation.y = Math.PI;
    scene2.add(div);

    //CSS3D Renderer
    renderer2 = new THREE.CSS3DRenderer();
    renderer2.setSize(window.innerWidth, window.innerHeight);
    renderer2.domElement.style.position = 'absolute';
    renderer2.domElement.style.top = 0;
    document.body.appendChild(renderer2.domElement);


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
  event.preventDefault();

  // document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'mouseup', onDocumentMouseUp, false );
  document.addEventListener( 'mouseout', onDocumentMouseOut, false );

  mouseXOnMouseDown = event.clientX - windowHalfX;
  mouseYOnMouseDown = event.clientY - windowHalfY;

  targetRotationOnMouseDown = targetRotation;
  targetRotationYOnMouseDown = targetRotationY;
}
function onDocumentMouseMove( event ) {

  mouseX = ( event.clientX - windowHalfX ) * 0.05;
  mouseY = ( event.clientY - windowHalfY ) * 0.05;

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
    mouseX = ( event.touches[ 0 ].pageX - windowHalfX) * 0.2;
    mouseY = ( event.touches[ 0 ].pageY - windowHalfY) * 0.2;

    // move object
    targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.2;
    targetRotationY = targetRotationYOnMouseDown + ( mouseY - mouseYOnMouseDown ) * 0.2;

  }
}

function animate() {

  requestAnimationFrame( animate );
  render();

  camera.position.x += ( mouseX / 2  - camera.position.x) * 0.05;
  camera.position.y += ( - mouseY / 2   - camera.position.y) * 0.05;
}
function render() {

  renderer.render( scene, camera );
  renderer2.render(scene2, camera);

  cube.rotation.x += 0.05;
  cube.rotation.y += 0.05;

  cube.rotation.y += ( targetRotationY - cube.rotation.y ) * 0.005;
  cube.rotation.x += ( targetRotation - cube.rotation.x ) * 0.005;

  div.rotation.x += 0.05;
  div.rotation.y += 0.05;

  div.rotation.y += ( targetRotationY - cube.rotation.y ) * 0.005;
  div.rotation.x += ( targetRotation - cube.rotation.x ) * 0.005;
}
