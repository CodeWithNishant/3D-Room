import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// ------------------------------------------------Basic Setup-------------------------------------------------

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit to control the view using mouse genture
const orbit = new OrbitControls(camera, renderer.domElement);

//------------------------------------------------------------------------------------------------------

// -------------------------------------------------------Room--------------------------------------------------------
// Considering 1 unit in three.js as 1 feet
// Loading Textures Here
const loader = new THREE.TextureLoader();
const wallTexture = loader.load("Wall-Texture.jpeg");
const floorTexture = loader.load("Floor-Texture.jpeg");
const ceilingTexture = loader.load("Ceiling-Texture.avif");

// Materials
const wallMaterial = new THREE.MeshBasicMaterial({ map: wallTexture });
const floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture });
const ceilingMaterial = new THREE.MeshBasicMaterial({ map: ceilingTexture });

// Box Geometry
const length = 40;
const breadth = 25;
const height = 10;
// 25 * 40 = 1000 units(feet)
const roomGeometry = new THREE.BoxGeometry(length, height, breadth);

const roomMaterials = [
  wallMaterial, // right wall
  wallMaterial, // left wall
  ceilingMaterial, // top (ceiling)
  floorMaterial, // bottom (floor)
  wallMaterial, // front wall
  wallMaterial, // back wall
];

const room = new THREE.Mesh(roomGeometry, roomMaterials);
room.geometry.scale(1, 1, -1);
scene.add(room);

//__________________________________________________________________________________________________________________

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 10); // Directional light with full intensity
directionalLight.position.set(10, 10, 10); // Position the light
scene.add(directionalLight);

//----------------------------------------------- Loading Reference Here--------------------------------------------------
const itemLoader = new GLTFLoader();

// Area constraints
const maxNumX = 17;
const minNumX = -17;
const maxNumZ = 7;
const minNumZ = -7;

const diffX = 3;
const diffZ = 5.5;

const itemCoordinates = [
  { x: 0, y: -5, z: 0 },
  { x: 0, y: -5, z: 0 },
  { x: 0, y: -5, z: 0 },
  { x: 0, y: -5, z: 0 },
  { x: 0, y: -5, z: 0 },
  { x: 0, y: -5, z: 0 },
];

for (let i = 0; i < itemCoordinates.length; i++) {
  let flagX = 1;
  let flagZ = 1;
  itemCoordinates[i].x = Math.random() * (maxNumX - minNumX) + minNumX;
  for (let j = i - 1; j >= 0; j--) {
    if (itemCoordinates[i].x - itemCoordinates[j].x < diffX) {
      itemCoordinates[i].x = Math.random() * (maxNumX - minNumX) + minNumX;
    }
  }
  itemCoordinates[i].z = Math.random() * (maxNumZ - minNumZ) + minNumZ;
  for (let j = i - 1; j >= 0; j--) {
    if (itemCoordinates[i].z - itemCoordinates[j].z < diffZ) {
      itemCoordinates[i].z = Math.random() * (maxNumZ - minNumZ) + minNumZ;
    }
  }
}

// Chair
itemLoader.load(
  "Reference/dublin_chair/scene.gltf",
  function (gltf) {
    const model = gltf.scene;
    model.scale.set(0.03, 0.03, 0.03);
    model.position.set(itemCoordinates[0].x, -5, itemCoordinates[0].z);
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Pipe Lamp
itemLoader.load(
  "Reference/industrial_pipe_lamp/scene.gltf",
  function (gltf) {
    const model = gltf.scene;
    model.scale.set(0.003, 0.003, 0.003);
    model.position.set(itemCoordinates[1].x, -5, itemCoordinates[1].z);
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Desk Fan
itemLoader.load(
  "Reference/retro-style_desk_fan/scene.gltf",
  function (gltf) {
    const model = gltf.scene;
    model.scale.set(0.6, 0.6, 0.6);
    model.position.set(itemCoordinates[2].x, -5, itemCoordinates[2].z);
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Lamp
itemLoader.load(
  "Reference/simplelamp/scene.gltf",
  function (gltf) {
    const model = gltf.scene;
    model.scale.set(0.4, 0.4, 0.4);
    model.position.set(itemCoordinates[3].x, -5, itemCoordinates[3].z);
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Car
itemLoader.load(
  "Reference/triumph_tr6/scene.gltf",
  function (gltf) {
    const model = gltf.scene;
    model.scale.set(3, 3, 3);
    model.position.set(itemCoordinates[4].x, -5, itemCoordinates[4].z);
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// Table
itemLoader.load(
  "Reference/victorian_console_table/scene.gltf",
  function (gltf) {
    const model = gltf.scene;
    model.scale.set(50, 50, 50);
    model.position.set(itemCoordinates[5].x, -5, itemCoordinates[5].z);
    scene.add(model);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

//____________________________________________________________________________________________________________________

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});
