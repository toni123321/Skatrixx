import React,{useRef, useState} from 'react';
// import skateImg from "../../images/skateStats/skate.png"
// import {
//     MeshBasicMaterial,
//     Mesh,
//     DoubleSide,
//     Vector3,
//     TextureLoader,
//     AdditiveBlending,
//     PlaneGeometry,
//     Matrix4,
//     ObjectLoader,
//   } from 'three';
import {Canvas, useFrame} from '@react-three/fiber'
import Skate from './Skate';
import {OrbitControls} from '@react-three/drei/core/OrbitControls'
// import {Sky} from '@react-three/drei/core/Sky'

function SkateBoardPreview(props) {

    const [yRotationSkate, setYRotationSkate]= useState(false)
    const [zRotationSkate, setZRotationSkate]= useState(false)

    return (
        <div className='skate-preview'>
            {/* <img className='skate-img' src={skateImg} alt="Skate"/> */}      
              <Canvas className='canvas'>
                  <OrbitControls enableZoom={true}/>
                
                  <ambientLight intensity={0.5}/>
                  <pointLight position={[10,10,10]}/>
                  <spotLight 
                  position={[10,15,10]} angle={0.3}/>
                  <directionalLight position={[-2,5,2]} intensity={1}/>
                  <Skate skate={props}/>
       

              </Canvas>
        </div>
  
       
    );
}

export default SkateBoardPreview;