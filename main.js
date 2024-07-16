<<<<<<< HEAD
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create ground plane that faces the camera
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -Math.PI / 2; // Ensure the plane is flat on the XY plane

// Add grid lines to the plane using LineSegments
const gridSize = 100;
const gridStep = 10;
const gridColor = 0x888888;

// Create grid lines
const createGrid = (size, step) => {
    const material = new THREE.LineBasicMaterial({ color: gridColor });

    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = -size; i <= size; i += step) {
        // Vertical lines
        vertices.push(i, 0, -size);
        vertices.push(i, 0, size);
        
        // Horizontal lines
        vertices.push(-size, 0, i);
        vertices.push(size, 0, i);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const gridLines = new THREE.LineSegments(geometry, material);
    return gridLines;
};

const grid = createGrid(gridSize, gridStep);
scene.add(grid);

// Position the camera
camera.position.set(0, 50, 50);
camera.lookAt(0, 0, 0);

// For creating and storing vertices of the polygon
let vertices = [];
let polygons = [];
let polygonEdges = [];
let polygonMeshes = [];

function onMouseClick(event) {
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(plane);

    if (intersects.length > 0) {
        const point = intersects[0].point;
        vertices.push(new THREE.Vector3(point.x, 0, point.z));

        if (vertices.length > 1) {
            const material = new THREE.LineBasicMaterial({ color: 0x00ff00 }); // Green color for initial lines
            const geometry = new THREE.BufferGeometry().setFromPoints([vertices[vertices.length - 2], vertices[vertices.length - 1]]);
            const line = new THREE.Line(geometry, material);
            scene.add(line);
            polygonEdges.push(line);
        }
    }
}

function completePolygon() {
    if (vertices.length > 2) {
        // Close the polygon by connecting the last vertex to the first
        const material = new THREE.LineBasicMaterial({ color: 0x000000 }); // Black color for completed polygon
        vertices.push(vertices[0]);
        const geometry = new THREE.BufferGeometry().setFromPoints(vertices);
        const polygon = new THREE.LineLoop(geometry, material);
        scene.add(polygon);
        polygons.push(polygon);

        // Create filled polygon
        const shape = new THREE.Shape(vertices.map(v => new THREE.Vector2(v.x, v.z)));
        const shapeGeometry = new THREE.ShapeGeometry(shape);
        const shapeMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500, side: THREE.DoubleSide }); // Orange color
        const polygonMesh = new THREE.Mesh(shapeGeometry, shapeMaterial);
        scene.add(polygonMesh);
        polygonMeshes.push(polygonMesh);

        // Remove the temporary edges
        polygonEdges.forEach(edge => scene.remove(edge));
        polygonEdges = [];
        vertices = [];
    }
}

function copyPolygon() {
    if (polygonMeshes.length === 0) return;

    const clone = polygonMeshes[polygonMeshes.length - 1].clone();
    clone.position.y += 0.1; // Slightly elevate the clone to avoid z-fighting
    scene.add(clone);
    polygonMeshes.push(clone);

    function onMouseMove(event) {
        const mouse = new THREE.Vector2(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
        );

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(plane);

        if (intersects.length > 0) {
            const point = intersects[0].point;
            clone.position.set(point.x, 0.1, point.z);
        }
    }

    function onClonePlace() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('click', onClonePlace);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('click', onClonePlace);
}

function resetScene() {
    vertices = [];
    polygonEdges.forEach(edge => scene.remove(edge));
    polygonEdges = [];
    polygons.forEach(polygon => scene.remove(polygon));
    polygons = [];
    polygonMeshes.forEach(mesh => scene.remove(mesh));
    polygonMeshes = [];
}

// Event Listeners
document.addEventListener('click', onMouseClick);
document.getElementById('completeButton').addEventListener('click', completePolygon);
document.getElementById('copyButton').addEventListener('click', copyPolygon);
document.getElementById('resetButton').addEventListener('click', resetScene);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
=======
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create ground plane that faces the camera
const planeGeometry = new THREE.PlaneGeometry(100, 100);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -Math.PI / 2; // Ensure the plane is flat on the XY plane

// Add grid lines to the plane using LineSegments
const gridSize = 100;
const gridStep = 10;
const gridColor = 0x888888;

// Create grid lines
const createGrid = (size, step) => {
    const material = new THREE.LineBasicMaterial({ color: gridColor });

    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    for (let i = -size; i <= size; i += step) {
        // Vertical lines
        vertices.push(i, 0, -size);
        vertices.push(i, 0, size);
        
        // Horizontal lines
        vertices.push(-size, 0, i);
        vertices.push(size, 0, i);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const gridLines = new THREE.LineSegments(geometry, material);
    return gridLines;
};

const grid = createGrid(gridSize, gridStep);
scene.add(grid);

// Position the camera
camera.position.set(0, 50, 50);
camera.lookAt(0, 0, 0);

// For creating and storing vertices of the polygon
let vertices = [];
let polygons = [];
let polygonEdges = [];
let polygonMeshes = [];

function onMouseClick(event) {
    const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(plane);

    if (intersects.length > 0) {
        const point = intersects[0].point;
        vertices.push(new THREE.Vector3(point.x, 0, point.z));

        if (vertices.length > 1) {
            const material = new THREE.LineBasicMaterial({ color: 0x00ff00 }); // Green color for initial lines
            const geometry = new THREE.BufferGeometry().setFromPoints([vertices[vertices.length - 2], vertices[vertices.length - 1]]);
            const line = new THREE.Line(geometry, material);
            scene.add(line);
            polygonEdges.push(line);
        }
    }
}

function completePolygon() {
    if (vertices.length > 2) {
        // Close the polygon by connecting the last vertex to the first
        const material = new THREE.LineBasicMaterial({ color: 0x000000 }); // Black color for completed polygon
        vertices.push(vertices[0]);
        const geometry = new THREE.BufferGeometry().setFromPoints(vertices);
        const polygon = new THREE.LineLoop(geometry, material);
        scene.add(polygon);
        polygons.push(polygon);

        // Create filled polygon
        const shape = new THREE.Shape(vertices.map(v => new THREE.Vector2(v.x, v.z)));
        const shapeGeometry = new THREE.ShapeGeometry(shape);
        const shapeMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500, side: THREE.DoubleSide }); // Orange color
        const polygonMesh = new THREE.Mesh(shapeGeometry, shapeMaterial);
        scene.add(polygonMesh);
        polygonMeshes.push(polygonMesh);

        // Remove the temporary edges
        polygonEdges.forEach(edge => scene.remove(edge));
        polygonEdges = [];
        vertices = [];
    }
}

function copyPolygon() {
    if (polygonMeshes.length === 0) return;

    const clone = polygonMeshes[polygonMeshes.length - 1].clone();
    clone.position.y += 0.1; // Slightly elevate the clone to avoid z-fighting
    scene.add(clone);
    polygonMeshes.push(clone);

    function onMouseMove(event) {
        const mouse = new THREE.Vector2(
            (event.clientX / window.innerWidth) * 2 - 1,
            -(event.clientY / window.innerHeight) * 2 + 1
        );

        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(plane);

        if (intersects.length > 0) {
            const point = intersects[0].point;
            clone.position.set(point.x, 0.1, point.z);
        }
    }

    function onClonePlace() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('click', onClonePlace);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('click', onClonePlace);
}

function resetScene() {
    vertices = [];
    polygonEdges.forEach(edge => scene.remove(edge));
    polygonEdges = [];
    polygons.forEach(polygon => scene.remove(polygon));
    polygons = [];
    polygonMeshes.forEach(mesh => scene.remove(mesh));
    polygonMeshes = [];
}

// Event Listeners
document.addEventListener('click', onMouseClick);
document.getElementById('completeButton').addEventListener('click', completePolygon);
document.getElementById('copyButton').addEventListener('click', copyPolygon);
document.getElementById('resetButton').addEventListener('click', resetScene);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
>>>>>>> 721ef683b190c4ff6e90d910c4532e7fbf3c0efe
});