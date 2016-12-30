"use strict";function init(){scene=new THREE.Scene,camera=new THREE.PerspectiveCamera(45,windowWidth/windowHeight,.1,1e3),camera.position.set(100,100,100),scene.add(camera),renderer=new THREE.WebGLRenderer({antialias:!0}),renderer.setSize(windowWidth,windowHeight),container=document.getElementById("lamab"),container.appendChild(renderer.domElement);var e=new THREE.PointLight(16777215);e.position.set(0,500,0),scene.add(e);var n="/images/bg/",t=".png",o=[n+"dawnmountain-xpos"+t,n+"dawnmountain-xneg"+t,n+"dawnmountain-ypos"+t,n+"dawnmountain-yneg"+t,n+"dawnmountain-zpos"+t,n+"dawnmountain-zneg"+t],a=(new THREE.CubeTextureLoader).load(o);a.format=THREE.RGBFormat,a.mapping=THREE.CubeRefractionMapping;var i=new THREE.BoxGeometry(1e3,1e3,1e3),r=THREE.ShaderLib.cube,s=new THREE.ShaderMaterial({fragmentShader:r.fragmentShader,vertexShader:r.vertexShader,uniforms:r.uniforms,depthWrite:!1,side:THREE.BackSide});s.uniforms.tCube.value=a;var c=new THREE.Mesh(i,s);scene.add(c);var u=30,d=500,m=500,w=document.createElement("canvas"),g=document.createElement("canvas"),E=document.createElement("canvas"),l=document.createElement("canvas"),h=document.createElement("canvas"),v=document.createElement("canvas");w.width=d,w.height=m,g.width=d,g.height=m,E.width=d,E.height=m,l.width=d,l.height=m,h.width=d,h.height=m,v.width=d,v.height=m;var p=w.getContext("2d"),R=g.getContext("2d"),M=E.getContext("2d"),H=l.getContext("2d"),f=h.getContext("2d"),b=v.getContext("2d"),T=new Image;T.onload=function(){p.drawImage(T,0,0)},T.src="/images/svg-100.svg";var D=new Image;D.onload=function(){R.drawImage(D,0,0)},D.src="/images/cubeFace2.svg";var x=new Image;x.onload=function(){M.drawImage(x,0,0)},x.src="/images/cubeFace3.svg";var Y=new Image;Y.onload=function(){H.drawImage(Y,0,0)},Y.src="/images/cubeFace4.png";var L=new Image;L.onload=function(){f.drawImage(L,0,0)},L.src="/images/cubeFace5.png";var O=new Image;O.onload=function(){b.drawImage(L,0,0)},O.src="/images/svg-100.svg";var X=new THREE.MeshBasicMaterial({map:new THREE.Texture(w),transparent:!0});X.map.needsUpdate=!0;var k=new THREE.MeshBasicMaterial({map:new THREE.Texture(g),transparent:!0});k.map.needsUpdate=!0;var y=new THREE.MeshBasicMaterial({map:new THREE.Texture(E),transparent:!0});y.map.needsUpdate=!0;var I=new THREE.MeshBasicMaterial({map:new THREE.Texture(l),transparent:!0});I.map.needsUpdate=!0;var W=new THREE.MeshBasicMaterial({map:new THREE.Texture(h),transparent:!0});W.map.needsUpdate=!0;var S=new THREE.MeshBasicMaterial({map:new THREE.Texture(v),transparent:!0});S.map.needsUpdate=!0;var B=new THREE.CubeGeometry(u,u,u),C=[X,k,y,I,W,S],z=new THREE.MultiMaterial(C);cubeLink=new THREE.Mesh(B,z),scene.add(cubeLink),cubeLink.position.set(0,0,0),cubeLink.doubleSided=!0;var U=new THREE.BoxGeometry(u,u,u),F=new THREE.MeshBasicMaterial({color:16777215,wireframe:!1,envMap:a,refractionRatio:.85});cube=new THREE.Mesh(U,F),cube.position.set(0,0,0),scene.add(cube),window.addEventListener("resize",onWindowResize,!1),document.addEventListener("mousemove",onDocumentMouseMove,!1),document.addEventListener("mousedown",onDocumentMouseDown,!1),document.addEventListener("touchstart",onDocumentTouchStart,!1),document.addEventListener("touchmove",onDocumentTouchMove,!1)}function onWindowResize(){windowHalfX=window.innerWidth/2,windowHalfY=window.innerHeight/2,camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight)}function onDocumentMouseDown(e){var n=new THREE.Vector3(e.clientX/window.innerWidth*2-1,2*-(e.clientY/window.innerHeight)+1,.5);n.unproject(camera);var t=new THREE.Raycaster;t.set(camera.position,n.sub(camera.position).normalize());var o=t.intersectObject(cubeLink),a=16777215*Math.random();if(o.length>0){var i=Math.floor(o[0].faceIndex/2);switch(i){case 0:console.log("face 1"),o[0].face.color.setHex(a);break;case 1:console.log("face 2");break;case 2:console.log("face 3");break;case 3:console.log("face 4");break;case 4:console.log("face 5"),o[0].face.color.setHex(a);break;case 5:console.log("face 6")}}document.addEventListener("mouseup",onDocumentMouseUp,!1),document.addEventListener("mouseout",onDocumentMouseOut,!1),mouseXOnMouseDown=e.clientX-windowHalfX,mouseYOnMouseDown=e.clientY-windowHalfY,targetRotationOnMouseDown=targetRotation,targetRotationYOnMouseDown=targetRotationY}function onDocumentMouseMove(e){mouseX=.05*(e.clientX-windowHalfX),mouseY=.05*(e.clientY-windowHalfY),targetRotation=targetRotationOnMouseDown+.02*(mouseX-mouseXOnMouseDown),targetRotationY=targetRotationYOnMouseDown+.02*(mouseY-mouseYOnMouseDown)}function onDocumentMouseUp(e){document.removeEventListener("mouseup",onDocumentMouseUp,!1),document.removeEventListener("mouseout",onDocumentMouseOut,!1)}function onDocumentMouseOut(e){document.removeEventListener("mouseup",onDocumentMouseUp,!1),document.removeEventListener("mouseout",onDocumentMouseOut,!1)}function onDocumentTouchStart(e){e.preventDefault(),e.clientX=e.touches[0].clientX,e.clientY=e.touches[0].clientY,onDocumentMouseDown(e)}function onDocumentTouchMove(e){1===e.touches.length&&(e.preventDefault(),mouseX=.5*(e.touches[0].pageX-windowHalfX),mouseY=.5*(e.touches[0].pageY-windowHalfY),targetRotation=targetRotationOnMouseDown+.2*(mouseX-mouseXOnMouseDown),targetRotationY=targetRotationYOnMouseDown+.2*(mouseY-mouseYOnMouseDown))}function animate(){requestAnimationFrame(animate),render(),camera.position.x+=.05*(mouseX/2-camera.position.x),camera.position.y+=.05*(-mouseY/2-camera.position.y)}function render(){renderer.render(scene,camera),cube.rotation.x+=.05,cube.rotation.y+=.05,cubeLink.rotation.x+=.05,cubeLink.rotation.y+=.05,cube.rotation.y+=.005*(targetRotationY-cube.rotation.y),cube.rotation.x+=.005*(targetRotation-cube.rotation.x),cubeLink.rotation.y+=.005*(targetRotationY-cubeLink.rotation.y),cubeLink.rotation.x+=.005*(targetRotation-cubeLink.rotation.x)}var container,scene,camera,renderer,controls,stats,cube,cubeLink,targetRotation=0,targetRotationOnMouseDown=0,targetRotationY=0,targetRotationYOnMouseDown=0,mouseX=0,mouseY=0,mouseXOnMouseDown=0,mouseYOnMouseDown=0,windowWidth=window.innerWidth,windowHeight=window.innerHeight,windowHalfX=window.innerWidth/2,windowHalfY=window.innerHeight/2;init(),animate(),window.addEventListener("resize",onWindowResize,!1);