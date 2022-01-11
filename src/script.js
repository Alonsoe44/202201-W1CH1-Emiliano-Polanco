import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const gltfLoader = new GLTFLoader();
const raycaster = new THREE.Raycaster();
const boats = [];
let loadComplete = false;
const cursor = {
    x: 0,
    y: 0,
};

gltfLoader.load("/3dModels/GameBoard.glb", (gltf) => {
    scene.add(gltf.scene);
});
window.addEventListener("mousemove", (event) => {
    cursor.x = (event.clientX / size.width - 0.5) * 2;
    cursor.y = ((-1 * event.clientY) / size.height + 0.5) * 2;
});

gltfLoader.load("/3dModels/5CellBoat.glb", (gltf) => {
    scene.add(gltf.scene.children[0]);
    boats[0] = scene.children[5];
    loadComplete = true;
    console.log(boats[0]);
});

const scene = new THREE.Scene();

const material = new THREE.MeshBasicMaterial();
const cubeGeometry = new THREE.BoxGeometry(5, 5, 5);

const mesh = new THREE.Mesh(cubeGeometry, material);
/* mesh.position.z = -5;
mesh.position.y = 8; */

mesh.material.wireframe = true;
scene.add(mesh);

//Lights rigg and camera
const ambientLigth = new THREE.AmbientLight();
const directionalLight = new THREE.DirectionalLight();
const size = {
    height: window.innerHeight,
    width: window.innerWidth,
};
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.y = 8;
camera.position.z = 0;
scene.add(camera, ambientLigth, directionalLight);

//Renderer part
const canvas = document.querySelector(".myCanvas");
const renderer = new THREE.WebGLRenderer({
    canvas,
});

renderer.setSize(size.width, size.height);

renderer.render(scene, camera);
const controls = new OrbitControls(camera, canvas);

window.addEventListener("resize", () => {
    size.height = window.innerHeight;
    size.width = window.innerWidth;

    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();

    renderer.setSize(size.width, size.height);
    renderer.setPixelRatio(
        window.devicePixelRatio > 2 ? 2 : window.devicePixelRatio
    );
});

let currentIntersect = false;
let inside = false;
export function tick() {
    //Camera position update
    /* camera.position.y = 5+ cursor.y *6;
    camera.position.z = 7+ cursor.y * -15;
    mesh.position.x = cursor.x*2;
    mesh.position.y = cursor.y *24;
    mesh.position.z = cursor.y * -18; */

    //RayCaster
    if (loadComplete) {
        raycaster.setFromCamera(cursor, camera);
        const intersect = raycaster.intersectObject(boats[0]);

        if (intersect.length) {
            if (!currentIntersect) {
                console.log("mouse enter");
                inside = true;
                console.log(inside);
            }
            currentIntersect = true;
        } else {
            if (currentIntersect) {
                console.log("mouse leave");
                inside = false;
                console.log(inside);
            }

            currentIntersect = false;
        }
    }
    console.log("hi");

    camera.lookAt(mesh.position);
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
}
tick();
