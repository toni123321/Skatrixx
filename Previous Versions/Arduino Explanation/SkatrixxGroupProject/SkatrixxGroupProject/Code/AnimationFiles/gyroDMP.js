import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';

// THREE.js objects
let scene
let camera;
let renderer;
let mixer
let clock

// 3D Skateboard object
let skateBoardMesh
let skateBoardMeshModel
let quatInit = {
    "qx": 0,
    "qy": -1,
    "qz": 0,
    "qw": 0,
}

// Bluetooth objects
let primaryServiceString = 'd2eac697-febf-4d21-aa62-baa42c6ae422'
let sensorDataCharacteristicString = 'cba1d466-344c-4be3-ab3f-189f80dd7518'
let sensorDataCharacteristic;

// Movement recording objects
let record = false
let recal = false
let movementData = []

window.initTHREEjs = function initTHREEjs() {

    scene = new THREE.Scene()
    clock = new THREE.Clock()

    const canvas = document.getElementsByClassName("canvas")
    console.log(canvas[0])
    // Create rendered
    renderer = new THREE.WebGLRenderer({antialias: true})
    console.log(renderer)

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(1000, 600)

    // Find HTML element to add THREE.js renderer for displaying the scene through the provided camera

    canvas[0].appendChild(renderer.domElement)

    // Create camera and define starting position
    camera = new THREE.PerspectiveCamera(
        70,
        300 / 150,
        1.0,
        1000.0
    );
    camera.position.set(15, 4, 0)

    //Create light sources and add to scene
    let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(20, 100, 10);
    light.target.position.set(0, 0, 0);
    light.castShadow = true;
    light.shadow.bias = -0.001;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500.0;
    light.shadow.camera.left = 100;
    light.shadow.camera.right = -100;
    light.shadow.camera.top = 100;
    light.shadow.camera.bottom = -100;
    scene.add(light);

    light = new THREE.AmbientLight(0x101010);
    scene.add(light);

    const controls = new OrbitControls(
        camera, renderer.domElement);
    controls.target.set(0, 4, 0);
    controls.update();

    const skyLoader = new THREE.CubeTextureLoader();
    const texture = skyLoader.load([
        './Skybox/posx.jpg',
        './Skybox/negx.jpg',
        './Skybox/posy.jpg',
        './Skybox/negy.jpg',
        './Skybox/posz.jpg',
        './Skybox/negz.jpg',
    ]);
    scene.background = texture;

    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100, 10, 10),
        new THREE.MeshStandardMaterial({
            color: 0xF34FFF,
        }));
    plane.castShadow = false;
    plane.receiveShadow = true;
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    // Create a loader object to load in the Skateboard model
    const loader = new GLTFLoader()
    loader.load('scene.gltf', (loadedModel) => {

        scene.add(loadedModel.scene);
        console.log("loadedModel", loadedModel)
        console.log("loadedModel.scene", loadedModel.scene)
        console.log('Skateboard model is loaded')
        skateBoardMesh = loadedModel.scene
        skateBoardMeshModel = loadedModel
    })

    mixer = new THREE.AnimationMixer(skateBoardMeshModel)

    // Create the whole scene
    render()
}

function render() {
    console.log("test")
    requestAnimationFrame(() => {
        renderer.render(scene, camera);
        mixer.update(clock.getDelta());
        render()
    });
}

// ============ Functions for handling the sensor ============

// Connect to DMP Sensor
window.connectToBLE = function connectToBLE() {

    initTHREEjs()
    navigator.bluetooth.requestDevice({filters: [{services: [primaryServiceString]}]})
        .then((device) => {
            console.log('Bluetooth device connected')
            return device.gatt.connect()
        })
        .then((server) => {
            console.log('Service found')
            return server.getPrimaryService(primaryServiceString)
        })
        .then((service) => {
            console.log('Service found')
            return service.getCharacteristic(sensorDataCharacteristicString);

        }).then(characteristic => {

        sensorDataCharacteristic = characteristic;
        return sensorDataCharacteristic.startNotifications().then(_ => {
            console.log('Notifications started');
            sensorDataCharacteristic.addEventListener('characteristicvaluechanged',
                handleNotifications);
        });
    })
}

// Handles the received data from the sensor, converts the data into JSON objects that can then be used to create quaternions to apply them to the skateboard model
function handleNotifications(event) {

    let receivedData = new Uint8Array(event.target.value.byteLength);
    for (let i = 0; i < event.target.value.byteLength; i++) {
        receivedData[i] = event.target.value.getUint8(i);
    }
    let DMString = new TextDecoder().decode(receivedData)
    let DMPJson = JSON.parse(DMString)
    console.log(DMPJson)

    // If recording on the movement has started, the data is saved to a array for further use in the creation of animations
    if (record) {
        saveMovementData(DMPJson)
    }

    let q0 = DMPJson.q0;
    let q1 = DMPJson.q1;
    let q2 = DMPJson.q2;
    let q3 = DMPJson.q3;

    let quat1 = new THREE.Quaternion(q1, q2, q3, q0);
    let quat2 = new THREE.Quaternion(quatInit.qx, quatInit.qy, quatInit.qz, quatInit.qw);
    skateBoardMesh.quaternion.multiplyQuaternions(quat1, quat2);
    if (recal) {
        quatInit.qx = q1
        quatInit.qy = q2
        quatInit.qz = q3
        quatInit.qw = q0
        recal = false
    }
}

window.recalibrate = function recalibrate() {

    recal = true
}

window.startReadingNotifications = function startReadingNotifications() {

    sensorDataCharacteristic.startNotifications()
}

window.stopNotifications = function stopNotifications() {
    if (sensorDataCharacteristic) {
        sensorDataCharacteristic.stopNotifications()
    }
}

// ============ Functions for recording of movement of later conversion to animations usable by THREE.js ============

window.startAnimationRecording = function startAnimationRecording() {
    record = true
}

window.stopAnimationRecording = function stopAnimationRecording() {
    record = false
}

window.playAnimationRecording = function playAnimationRecording() {

    const clip = createAnimationClip()
    console.log(clip)
    console.log(skateBoardMesh)
    console.log(skateBoardMeshModel)

    skateBoardMeshModel.animations.push(clip)

    mixer = new THREE.AnimationMixer(skateBoardMeshModel.scene)

    const action = mixer.clipAction(clip);
    action.setLoop(THREE.LoopOnce);
    action.clampWhenFinished = true;
    action.play();
}

window.flushAnimationRecording = function flushAnimationRecording() {
    movementData = []
}

window.saveMovementData = function saveMovementData(jsonPoint) {
    movementData.push(jsonPoint)
}

// ============ Functions for converting movement data into animations usable by THREE.js ============

function createAnimationClip() {
    const quatKeyFrameTrack = createKeyFrameTrack()
    return new THREE.AnimationClip('x', -1, [quatKeyFrameTrack])
}

function createKeyFrameTrack() {
    const keyFrameValues = []
    const timeValues = []
    for (let i = 0; i < movementData.length; i++) {

        keyFrameValues.push(movementData[i].q1)
        keyFrameValues.push(movementData[i].q2)
        keyFrameValues.push(movementData[i].q3)
        keyFrameValues.push(movementData[i].q0)

        const time = 0.1 * i
        timeValues.push(time)
    }

    return new THREE.QuaternionKeyframeTrack('.quaternion', timeValues, keyFrameValues)
}




