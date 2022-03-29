import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';

$(document).ready(function () {
// THREE.js objects
    let scene
    let camera;
    let renderer;

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
    let connected = false
    let trickNumber = 0

    window.initTHREEjs = function initTHREEjs() {

        // Create Scene
        scene = new THREE.Scene()

        // Find HTML element to place canvas in
        const canvas = document.getElementsByClassName("boardVisual")

        // Create rendered
        renderer = new THREE.WebGLRenderer({antialias: true})
        renderer.setPixelRatio(window.devicePixelRatio)
        renderer.setSize(513, 336)

        // Find HTML element to add THREE.js renderer for displaying the scene through the provided camera
        canvas[0].appendChild(renderer.domElement)

        // Create camera and define starting position
        camera = new THREE.PerspectiveCamera(
            70,
            513 / 336,
            1.0,
            1000.0
        );
        camera.position.set(10, 4, 0)

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

        //2nd light source
        light = new THREE.AmbientLight(0x101010);
        scene.add(light);

        // Adding camera controls
        const controls = new OrbitControls(
            camera, renderer.domElement);
        controls.target.set(0, 4, 0);
        controls.update();


        const skyLoader = new THREE.CubeTextureLoader();
        const texture = skyLoader.load([
            '../Resources/Skybox/posx.jpg',
            '../Resources/Skybox/negx.jpg',
            '../Resources/Skybox/posy.jpg',
            '../Resources/Skybox/negy.jpg',
            '../Resources/Skybox/posz.jpg',
            '../Resources/Skybox/negz.jpg',
        ]);
        scene.background = texture;

        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100, 10, 10),
            new THREE.MeshStandardMaterial({
                color: 0x6e7277,
            }));
        plane.castShadow = false;
        plane.receiveShadow = true;
        plane.rotation.x = -Math.PI / 2;
        scene.add(plane);

        // Create a loader object to load in the Skateboard model
        const loader = new GLTFLoader()
        loader.load('../Resources/scene.gltf', (loadedModel) => {

            scene.add(loadedModel.scene);
            console.log("loadedModel", loadedModel)
            console.log("loadedModel.scene", loadedModel.scene)
            console.log('Skateboard model is loaded')
            skateBoardMesh = loadedModel.scene
            skateBoardMeshModel = loadedModel
            skateBoardMesh.position.set(0, 0.2, 0)
        })

        // Create the whole scene
        render()
    }

    function render() {
        requestAnimationFrame(() => {
            renderer.render(scene, camera);
            render()
        });
    }


    if("serviceWorker" in navigator){
        navigator.serviceWorker.register("../service-worker.js").then(function(registering){
            // Registration was successful
            console.log("Browser: Service Worker registration is successful with the scope",registering.scope);
        }).catch(function(error){
            //The registration of the service worker failed
            console.log("Browser: Service Worker registration failed with the error",error);
        });
    } else {
        //The registration of the service worker failed
        console.log("Browser: I don't support Service Workers :(");
    }

// ============ Functions for handling the sensor ============

// Connect to DMP Sensor
    function connectToBLE() {

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
                connected = true
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
        console.log(receivedData)
        console.log("DMpString", DMString)
        let DMPJson = JSON.parse(DMString)

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
    }

    function startAnimationRecording() {
        record = true
    }

    function stopAnimationRecording() {
        record = false
    }

    function saveMovementData(jsonPoint) {
        movementData.push(jsonPoint)
    }

    let trickArray = []

    $('#connect').click(() => {
        connectToBLE()
        $('#connect').hide()
        $('#recordStart').show()
        $('#recordStop').show()

    })

    $('#recordStart').click(() => {
        startAnimationRecording()
    })

    $('#recordStop').click(() => {
            stopAnimationRecording()
            trickNumber++

            const dateObj = new Date()
            let hour = dateObj.getHours()
            let minutes = dateObj.getMinutes()
            if(minutes < 10){
                minutes = `0${minutes}`
            }
            let time = `${hour}:${minutes}`

            let date = dateObj.getDate()
            let month = dateObj.getMonth()
            month++
            let year = dateObj.getFullYear()

            let fullDate = `${date}/${month}/${year}`

            let trickObject = {
                "id": trickNumber,
                "name": `Trick #${trickNumber}`,
                "time": time,
                "date": fullDate,
                "trickAnimation": movementData
            }
            console.log(trickObject)
            trickArray.push(trickObject)

            localStorage.setItem('tricks', JSON.stringify(trickArray))
        }
    )
})