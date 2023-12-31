/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: assetfactory (https://sketchfab.com/assetfactory)
license: SKETCHFAB Standard (https://sketchfab.com/licenses)
source: https://sketchfab.com/3d-models/skateboard-59552a6040fe4f8d8510d3b17ac5abbd
title: Skateboard
*/

import React, { useEffect, useRef,useState } from 'react'
import { useGLTF } from '@react-three/drei/core/useGLTF'
import { useFrame } from '@react-three/fiber'

export default function Model({...props}) {
  const group = useRef()

  //  useFrame (() => hovered ? (group.current.rotation.x += 0.03) : (group.current.rotation.x = 0.00))
  // useFrame (() =>  (group.current.rotation.y += 0.08))
  // useFrame (() => (group.current.rotation.z += 0.08))

  const [hovered, setHover] = useState(false)
  const [yRotation, setYRotation]= useState(false)
  const [zRotation, setZRotation]= useState(false)

  const [active, setActive]= useState(true)


  

  const { nodes, materials } = useGLTF('/skate.gltf')
  return (

    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2.35, 0, 11]}>
        <mesh 
        onPointerOver={(event)=> setHover(true)}
        onPointerOut={(event)=> setHover(false) }
        onClick = {(event) => setActive(!active)}
        scale = {active ? 0.85 : 0.5}
        geometry={nodes.Object_2.geometry} material={materials.skateboard} >
           
          </mesh>
      </group>
     
    </group>
             

 
  )
}

useGLTF.preload('/skate.gltf')
