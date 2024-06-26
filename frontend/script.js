import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Event listener for the "Upload Image" button
document.addEventListener("DOMContentLoaded", function() {
document.getElementById("uploadButton").addEventListener("click", function() {
    var input = document.getElementById("imageUploadInput");
    var file = input.files[0];

    if (file) {
        // Create a FormData object
        var formData = new FormData();
        formData.append("image", file);

        // Send a POST request to the server to upload the file
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://127.0.0.1:5000/upload_image", true); // Modify the URL here
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                alert("Image uploaded successfully!");
            }
        };
        xhr.send(formData);
    } else {
        alert("Please select an image to upload.");
    }
});});

// Event listener for the "Execute Command" button
document.getElementById("executeButton").addEventListener("click", function() {
    // Make an AJAX request to the Python backend
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:5000/execute_command", true); // Modify the URL here
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Handle the response from the Python backend
            alert(xhr.responseText);
        }
    };
    xhr.send();
});


const gui = new dat.GUI()
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = ()=>{
    console.log('onStart')
}
loadingManager.onLoaded = ()=>{
    console.log('onloaded')
}
loadingManager.onProgress = ()=>{
    console.log('onProgress')
}
loadingManager.onError = ()=>{
    console.log('onError')
}
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
const canvas = document.querySelector('canvas.webgl')
// Scene
const scene = new THREE.Scene()

//debug cube
// Create a cube geometry
const cubeGeometry = new THREE.BoxGeometry(0.03, 0.03, 0.03);

// Create a basic material for the cube (no lighting)
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // Green color

// Create a mesh using the geometry and material
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
const cube2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
const cube3 = new THREE.Mesh(cubeGeometry, cubeMaterial);
const cube4 = new THREE.Mesh(cubeGeometry, cubeMaterial);
const cube5 = new THREE.Mesh(cubeGeometry, cubeMaterial);
// Position the cube
cube.position.set(0, 0, 0); // Adjust the position as needed
cube2.position.set(-0.5, 0.5, 0); // Adjust the position as needed
cube3.position.set(-0.5, -0.5, 0); // Adjust the position as needed
cube4.position.set(0.5, 0.5, 0); // Adjust the position as needed
cube5.position.set(0.5, -0.5, 0); // Adjust the position as needed
// Add the cube to the scene
scene.add(cube,cube2,cube3,cube4,cube5);


//adding painting plane

const textureLoader = new THREE.TextureLoader(loadingManager);
const girlColorTexture = textureLoader.load('static/textures/taikong/color.jpg');
const girlHeightTexture = textureLoader.load('static/textures/taikong/height.png');
//const girlNormalTexture = textureLoader.load('static/textures/girl/normal.png');
const material = new THREE.MeshStandardMaterial({ map: girlColorTexture });
material.displacementMap = girlHeightTexture;
material.displacementScale = 0.2;
material.side = THREE.DoubleSide;
const planeGeometry = new THREE.PlaneGeometry(1, 1, 256,256);
const plane = new THREE.Mesh(planeGeometry, material);
plane.position.set(0, 0, 0);
scene.add(plane);

/*** Lights */
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
const pointLight = new THREE.PointLight(0xffffff,1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = -4
scene.add(ambientLight, pointLight)

// Add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(1, 1, 1); // Adjust position as needed
scene.add(directionalLight);
console.log(girlColorTexture);


window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 0.5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/*** Animate*/
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //update objects
    // sphere.rotation.y = 0.1*elapsedTime
    // torus.rotation.y = 0.1*elapsedTime
    // plane.rotation.y = 0.1*elapsedTime
    // sphere.rotation.x = 0.1*elapsedTime
    // torus.rotation.x = 0.1*elapsedTime
    // plane.rotation.x = 0.1*elapsedTime
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()