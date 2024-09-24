import * as THREE from 'three';

//* basic shape demo

//import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//const controls = new OrbitControls( camera, renderer.domElement );
//const loader = new GLTFLoader();

//info about primatives to be found here!
//https://threejs.org/manual/#en/primitives

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1,1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild(renderer.domElement);

//* rendering a cube
const geometry = new THREE.BoxGeometry(1,1,1);
//*a basic mesh material will not be affected by lighting
//const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
//a phong material will!
const material = new THREE.MeshPhongMaterial({color:0x44aa88});
const cube = new THREE.Mesh(geometry, material);
cube.position.y = 2;
scene.add(cube);
camera.position.z = 10;

//* function for rendering a cube element
function makeCubeInstance(geometry, color, x){
    const material =  new THREE.MeshPhongMaterial({color});
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    cube.position.x = x;
    return cube;
}

//* now an array of cubes!
const cubes = [
    makeCubeInstance(geometry, 0x44aa88,  0),
    makeCubeInstance(geometry, 0x8844aa, -2),
    makeCubeInstance(geometry, 0xaa8844,  2)
];

//* rendering some lighting
const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1,2,4);
scene.add(light);

function animate(time){
    time *= 0.001;  // convert time to seconds
    renderer.render(scene, camera);
    cube.rotation.x +=0.01;
    cube.rotation.y +=0.01;

    cubes.forEach((cube, ndx) => {
        const speed = 1 + ndx * .1;
        const rot = time * speed;
        cube.rotation.x = rot;
        cube.rotation.y = rot;
    });
}
renderer.setAnimationLoop(animate);