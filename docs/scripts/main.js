"use strict";function init(){scene=new THREE.Scene,camera=new THREE.PerspectiveCamera(45,windowWidth/windowHeight,.1,1e3),camera.position.set(100,100,100),scene.add(camera),renderer=new THREE.WebGLRenderer({antialias:!0}),renderer.setSize(windowWidth,windowHeight),container=document.getElementById("lamab"),container.appendChild(renderer.domElement);var e=new THREE.PointLight(16777215);e.position.set(0,500,0),scene.add(e);var n="images/bg/",o=".png",t=[n+"dawnmountain-xpos"+o,n+"dawnmountain-xneg"+o,n+"dawnmountain-ypos"+o,n+"dawnmountain-yneg"+o,n+"dawnmountain-zpos"+o,n+"dawnmountain-zneg"+o],a=(new THREE.CubeTextureLoader).load(t);a.format=THREE.RGBFormat,a.mapping=THREE.CubeRefractionMapping;var i=new THREE.BoxGeometry(1e3,1e3,1e3),r=THREE.ShaderLib.cube,c=new THREE.ShaderMaterial({fragmentShader:r.fragmentShader,vertexShader:r.vertexShader,uniforms:r.uniforms,depthWrite:!1,side:THREE.BackSide});c.uniforms.tCube.value=a;var s=new THREE.Mesh(i,c);scene.add(s);var u=30,d=512,m=512,w=document.createElement("canvas"),g=document.createElement("canvas"),E=document.createElement("canvas"),l=document.createElement("canvas"),h=document.createElement("canvas"),p=document.createElement("canvas");w.width=d,w.height=m,g.width=d,g.height=m,E.width=d,E.height=m,l.width=d,l.height=m,h.width=d,h.height=m,p.width=d,p.height=m;var v=w.getContext("2d"),R=g.getContext("2d"),M=E.getContext("2d"),b=l.getContext("2d"),H=h.getContext("2d"),f=p.getContext("2d"),T=new Image;T.onload=function(){v.drawImage(T,0,0)},T.src="images/cubeFace1.svg";var D=new Image;D.onload=function(){R.drawImage(D,0,0)},D.src="images/cubeFace2.svg";var Y=new Image;Y.onload=function(){M.drawImage(Y,0,0)},Y.src="images/cubeFace3.svg";var x=new Image;x.onload=function(){b.drawImage(x,0,0)},x.src="images/cubeFace4.svg";var L=new Image;L.onload=function(){H.drawImage(L,0,0)},L.src="images/cubeFace5.png";var k=new Image;k.onload=function(){f.drawImage(k,0,0)},k.src="images/cubeFace6.svg";var O=new THREE.MeshBasicMaterial({map:new THREE.Texture(w),transparent:!0});O.map.needsUpdate=!0;var X=new THREE.MeshBasicMaterial({map:new THREE.Texture(g),transparent:!0});X.map.needsUpdate=!0;var y=new THREE.MeshBasicMaterial({map:new THREE.Texture(E),transparent:!0});y.map.needsUpdate=!0;var I=new THREE.MeshBasicMaterial({map:new THREE.Texture(l),transparent:!0});I.map.needsUpdate=!0;var W=new THREE.MeshBasicMaterial({map:new THREE.Texture(h),transparent:!0});W.map.needsUpdate=!0;var S=new THREE.MeshBasicMaterial({map:new THREE.Texture(p),transparent:!0});S.map.needsUpdate=!0;var B=new THREE.CubeGeometry(u+10,u+10,u+10),C=[O,X,y,I,W,S],z=new THREE.MultiMaterial(C);cubeLink=new THREE.Mesh(B,z),scene.add(cubeLink),cubeLink.position.set(0,0,0),cubeLink.doubleSided=!0;var U=new THREE.BoxGeometry(u,u,u),F=new THREE.MeshBasicMaterial({color:16777215,wireframe:!1,envMap:a,refractionRatio:.85});cube=new THREE.Mesh(U,F),cube.position.set(0,0,0),scene.add(cube),window.addEventListener("resize",onWindowResize,!1),document.addEventListener("mousemove",onDocumentMouseMove,!1),document.addEventListener("mousedown",onDocumentMouseDown,!1),document.addEventListener("touchstart",onDocumentTouchStart,!1),document.addEventListener("touchmove",onDocumentTouchMove,!1)}function onWindowResize(){windowHalfX=window.innerWidth/2,windowHalfY=window.innerHeight/2,camera.aspect=window.innerWidth/window.innerHeight,camera.updateProjectionMatrix(),renderer.setSize(window.innerWidth,window.innerHeight)}function onDocumentMouseDown(e){var n=new THREE.Vector3(e.clientX/window.innerWidth*2-1,2*-(e.clientY/window.innerHeight)+1,.5);n.unproject(camera);var o=new THREE.Raycaster;o.set(camera.position,n.sub(camera.position).normalize());var t=o.intersectObject(cubeLink);16777215*Math.random();if(t.length>0){var a=Math.floor(t[0].faceIndex/2);switch(a){case 0:console.log("face 1"),window.open("http://google.com","_blank","","");break;case 1:console.log("face 2"),window.open("http://google.com","_blank","","");break;case 2:console.log("face 3"),window.open("http://google.com","_blank","","");break;case 3:console.log("face 4"),window.open("http://google.com","_blank","","");break;case 4:console.log("face 5"),window.open("http://google.com","_blank","","");break;case 5:console.log("face 6"),window.open("http://google.com","_blank","","")}}document.addEventListener("mouseup",onDocumentMouseUp,!1),document.addEventListener("mouseout",onDocumentMouseOut,!1),mouseXOnMouseDown=e.clientX-windowHalfX,mouseYOnMouseDown=e.clientY-windowHalfY,targetRotationOnMouseDown=targetRotation,targetRotationYOnMouseDown=targetRotationY}function onDocumentMouseMove(e){mouseX=.05*(e.clientX-windowHalfX),mouseY=.05*(e.clientY-windowHalfY),targetRotation=targetRotationOnMouseDown+.02*(mouseX-mouseXOnMouseDown),targetRotationY=targetRotationYOnMouseDown+.02*(mouseY-mouseYOnMouseDown)}function onDocumentMouseUp(e){document.removeEventListener("mouseup",onDocumentMouseUp,!1),document.removeEventListener("mouseout",onDocumentMouseOut,!1)}function onDocumentMouseOut(e){document.removeEventListener("mouseup",onDocumentMouseUp,!1),document.removeEventListener("mouseout",onDocumentMouseOut,!1)}function onDocumentTouchStart(e){e.preventDefault(),e.clientX=e.touches[0].clientX,e.clientY=e.touches[0].clientY,onDocumentMouseDown(e)}function onDocumentTouchMove(e){1===e.touches.length&&(e.preventDefault(),mouseX=.5*(e.touches[0].pageX-windowHalfX),mouseY=.5*(e.touches[0].pageY-windowHalfY),targetRotation=targetRotationOnMouseDown+.2*(mouseX-mouseXOnMouseDown),targetRotationY=targetRotationYOnMouseDown+.2*(mouseY-mouseYOnMouseDown))}function animate(){requestAnimationFrame(animate),render(),camera.position.x+=.02*(mouseX/2-camera.position.x),camera.position.y+=.02*(-mouseY/2-camera.position.y)}function render(){renderer.render(scene,camera),cube.rotation.x+=.05,cube.rotation.y+=.05,cubeLink.rotation.x+=.05,cubeLink.rotation.y+=.05,cube.rotation.y+=.005*(targetRotationY-cube.rotation.y),cube.rotation.x+=.005*(targetRotation-cube.rotation.x),cubeLink.rotation.y+=.005*(targetRotationY-cubeLink.rotation.y),cubeLink.rotation.x+=.005*(targetRotation-cubeLink.rotation.x)}var container,scene,camera,renderer,controls,stats,cube,cubeLink,targetRotation=0,targetRotationOnMouseDown=0,targetRotationY=0,targetRotationYOnMouseDown=0,mouseX=0,mouseY=0,mouseXOnMouseDown=0,mouseYOnMouseDown=0,windowWidth=window.innerWidth,windowHeight=window.innerHeight,windowHalfX=window.innerWidth/2,windowHalfY=window.innerHeight/2;init(),animate(),window.addEventListener("resize",onWindowResize,!1);