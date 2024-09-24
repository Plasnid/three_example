import './style.css';
import * as THREE from 'three';
import gsap from "gsap";
import Barnacle from './barnacle.jpg';

//* groups, children, and gsap demo

//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//const controls = new OrbitControls( camera, renderer.domElement );
//const loader = new GLTFLoader();

//info about primatives to be found here!
//https://threejs.org/manual/#en/primitives

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000);
camera.position.z = 60;

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth/2, window.innerHeight/2 );
document.body.appendChild(renderer.domElement);
renderer.domElement.classList.add("smallArea");
//* rendering a cube
const geometry = new THREE.BoxGeometry(1,1,1);
//*a basic mesh material will not be affected by lighting
//const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
//a phong material will!
const material = new THREE.MeshPhongMaterial({color:0x44aa88});

const loader = new THREE.TextureLoader();
const texture = loader.load( Barnacle );
texture.colorSpace = THREE.SRGBColorSpace;

const materialTexture = new THREE.MeshBasicMaterial({
    map: texture,
});

//* lets try some primatives
//* a cone
const coneGeom = new THREE.ConeGeometry(6,8,16);
const coneEx = new THREE.Mesh(coneGeom, material);
coneEx.position.z = -30;
coneEx.position.x = -10;

const coneGeom2 = new THREE.ConeGeometry(6,16,16);
const coneEx2 = new THREE.Mesh(coneGeom2, materialTexture);
coneEx2.position.z = -30;
coneEx2.position.x = 10;


//* how lets position the cones as a group
const coneGroup = new THREE.Group();
coneGroup.add(coneEx);
coneGroup.add(coneEx2);
scene.add(coneGroup);

//* rendering some lighting
const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1,2,4);
scene.add(light);

function animate(time){
    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

//* now that the renderer is running, lets try some gsap
// Animate the x, y and z positions of the object
//gsap.to(coneEx.position, { duration: 2, x: 1 });
//gsap.to(coneEx.position, { duration: 2, y: 1 });
//gsap.to(coneEx.position, { duration: 2, z: 1 });
// Animate the x, y and z scale/size of the object
//gsap.to(coneEx.scale, { duration: 2, x: 2 });
//gsap.to(coneEx.scale, { duration: 2, y: 2 });
//gsap.to(coneEx.scale, { duration: 2, z: 2 });
// Animate the x, y and z rotation of the object
gsap.to(coneGroup.rotation, { duration: 2, x: 3});
gsap.to(coneGroup.rotation, { duration: 2, y: 3, delay: 3});
gsap.to(coneGroup.rotation, { duration: 2, z: 3, delay: 6, repeat: -1});

//* lets animate the children of the group?
gsap.to(coneGroup.children[0].rotation, { duration: 2, x: 3});
gsap.to(coneGroup.children[0].rotation, { duration: 2, y: 3, delay: 3});
gsap.to(coneGroup.children[0].rotation, { duration: 2, z: 3, delay: 6, repeat:2});

gsap.to(coneGroup.children[1].rotation, { duration: 2, x: -6});
gsap.to(coneGroup.children[1].rotation, { duration: 2, y: -6, delay: 3});
gsap.to(coneGroup.children[1].rotation, { duration: 2, z: -6, delay: 6, repeat: -1});