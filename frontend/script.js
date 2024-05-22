import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// Event listener for the "Upload Image" button
document.addEventListener("DOMContentLoaded", function() {
    const uploadButton = document.getElementById("uploadButton");
    const imageUploadInput = document.getElementById("imageUploadInput");
    const loadingSpinner = document.getElementById("loading");

    uploadButton.addEventListener("click", function() {
        imageUploadInput.click();
    });

    imageUploadInput.addEventListener("change", function() {
        var file = imageUploadInput.files[0];

        if (file) {
            loadingSpinner.style.display = "block";
            // Create a FormData object
            var formData = new FormData();
            formData.append("image", file);

            // Send a POST request to the server to upload the file
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "http://127.0.0.1:5000/upload_image", true); // Modify the URL here
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        //alert("Image uploaded successfully!");
                        //updateTextures(); // Call function to update textures after upload
                    } else {
                        alert("Error uploading image.");
                    }

                    // Hide the loading spinner after upload is finished
                    //loadingSpinner.style.display = "none";
                }
            };
            xhr.send(formData);
        } else {
            alert("Please select an image to upload.");
        }
    });
});

// Event listener for the "Execute Command" button, "executeButton" is not hidden, its function is combined with upload button
document.getElementById("uploadButton").addEventListener("click", function() {
    const loadingSpinner = document.getElementById("loading");
    // Make an AJAX request to the Python backend
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:5000/execute_command", true); // Modify the URL here
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Handle the response from the Python backend
            //alert(xhr.responseText);
            updateTextures();
            loadingSpinner.style.display = "none";
        }
    };
    xhr.send();
});


function updateTextures() {
    // Load the newly generated images as textures
    const textureLoader = new THREE.TextureLoader();
    const newColorTexture = textureLoader.load("1/colortextureinput.jpg");
    const newHeightmapTexture = textureLoader.load("1/colortextureinput-dpt_beit_large_512.png");

    // Update the material with the new textures
    material.map = newColorTexture;
    material.displacementMap = newHeightmapTexture;
   
    const plane2 = new THREE.Mesh(planeGeometry, material);
    plane2.position.set(0, 0, 0);
    scene.add(plane2);
    scene.remove(plane2)
    scene.add(plane2);
}

// Function to update plane2's ratio based on image dimensions
function updatePlaneRatio(imageWidth, imageHeight) {
    // Calculate aspect ratio of the image
    const aspectRatio = imageWidth / imageHeight;

    // Update plane2's scale based on the aspect ratio
    plane2.scale.set(aspectRatio, 1, 1);
}

//const gui = new dat.GUI()
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
scene.add(cube2,cube3,cube4,cube5);


//adding painting plane

const textureLoader = new THREE.TextureLoader(loadingManager);
const girlColorTexture = textureLoader.load('static/textures/taikong3/color.jpg');
const girlHeightTexture = textureLoader.load('static/textures/taikong3/height.png');
//const girlNormalTexture = textureLoader.load('static/textures/girl/normal.png');
const material = new THREE.MeshStandardMaterial({ map: girlColorTexture });
material.displacementMap = girlHeightTexture;
material.displacementScale = 0.4;
material.side = THREE.DoubleSide;
const planeGeometry = new THREE.PlaneGeometry(1, 1, 256,256);
const plane = new THREE.Mesh(planeGeometry, material);
plane.position.set(0, 0, 0);
scene.add(plane);

/*** Lights */
const ambientLight = new THREE.AmbientLight(0xffffff, 2)
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
camera.position.x = 0
camera.position.y = 0
camera.position.z = 0.55
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Limiting the rotation vertically
controls.minPolarAngle = -Math.PI / 13; // -45 degrees in radians
controls.maxPolarAngle = Math.PI / 1.5; // 45 degrees in radians

// Limiting the rotation horizontally
controls.minAzimuthAngle = - Math.PI / 4; // -45 degrees in radians
controls.maxAzimuthAngle = Math.PI / 4; // 45 degrees in radians
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