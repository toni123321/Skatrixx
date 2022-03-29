import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';

$(document).ready(function () {
    // THREE.js objects
    let scene
    let camera
    let renderer
    let mixer
    let clock
    let action

    // 3D Skateboard object
    let skateBoardMesh
    let skateBoardMeshModel
    let quatInit = {
        "qx": 0,
        "qy": -1,
        "qz": 0,
        "qw": 0,
    }

    //TrickPage Object
    let trickObject

    console.log(window.location.href)

    $.urlParam = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
        if (results == null) {
            return null;
        }
        return decodeURI(results[1]) || 0;
    }

    const trickId = $.urlParam("key")

    let tricksCardsArray = JSON.parse(localStorage.getItem('tricks'))

    trickObject = tricksCardsArray[trickId]

    $('#boardNameText').append(trickObject.name)
    console.log("trick object", trickObject)

    initTHREEjs()

    function initTHREEjs() {

        scene = new THREE.Scene()
        clock = new THREE.Clock()

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

        light = new THREE.AmbientLight(0x101010);
        scene.add(light);

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
        +

        // Create a loader object to load in the Skateboard model
        loadSkateboard()

        mixer = new THREE.AnimationMixer(skateBoardMeshModel)
        render()
    }

    function loadSkateboard(){
        const loader = new GLTFLoader()
        loader.load('../Resources/scene.gltf', (loadedModel) => {

            scene.add(loadedModel.scene);
            console.log("loadedModel", loadedModel)
            console.log("loadedModel.scene", loadedModel.scene)
            console.log('Skateboard model is loaded')
            skateBoardMesh = loadedModel.scene
            skateBoardMeshModel = loadedModel
            skateBoardMesh.position.set(0, 0.7, 0)
        })
    }

    function render() {
        requestAnimationFrame(() => {
            renderer.render(scene, camera);
            mixer.update(clock.getDelta());
            render()
        });
    }

    function playAnimationRecording(timeInt) {

        createAnimationClip(timeInt)
        action.setLoop(THREE.LoopRepeat);
        action.play();
    }

    $('#playButton').click(() => {

        $('#playButton').hide()
        $('#pauseButton').show()
        action.paused = false
    })

    $('#pauseButton').click(() => {
        $('#playButton').show()
        $('#pauseButton').hide()
        console.log(action.paused)
        if(action.paused === false){
            action.paused = true
        }
    })

    $('#05Button').click(()=>{
        playAnimationRecording(0.2)
        $('#playButton').hide()
        $('#pauseButton').show()
    })
    $('#1Button').click(()=>{
        playAnimationRecording(0.1)
        $('#playButton').hide()
        $('#pauseButton').show()
    })
    $('#2Button').click(()=>{
        playAnimationRecording(0.05)
        $('#playButton').hide()
        $('#pauseButton').show()
    })

    // ============ Functions for converting movement data into animations usable by THREE.js ============

    function createAnimationClip(timeInt) {
        const quatKeyFrameTrack = createKeyFrameTrack(timeInt)
        let actionClip = new THREE.AnimationClip('x', -1, [quatKeyFrameTrack])

        skateBoardMeshModel.animations = []
        skateBoardMeshModel.animations.push(actionClip)
        mixer = new THREE.AnimationMixer(skateBoardMeshModel.scene)
        action = mixer.clipAction(actionClip);
        console.log(action)
    }

    function createKeyFrameTrack(timeInt) {
        const keyFrameValues = []
        const timeValues = []
        for (let i = 0; i < trickObject.trickAnimation.length; i++) {

            keyFrameValues.push(trickObject.trickAnimation[i].q1)
            keyFrameValues.push(trickObject.trickAnimation[i].q2)
            keyFrameValues.push(trickObject.trickAnimation[i].q3)
            keyFrameValues.push(trickObject.trickAnimation[i].q0)

            const time = timeInt * i
            timeValues.push(time)
        }

        return new THREE.QuaternionKeyframeTrack('.quaternion', timeValues, keyFrameValues)
    }
})
