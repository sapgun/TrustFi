"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Environment } from "@react-three/drei"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

function AnimatedSphere({
  position,
  color,
  scale = 1,
}: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1 * scale, 64, 64]} position={position}>
        <MeshDistortMaterial color={color} attach="material" distort={0.4} speed={2} roughness={0.1} metalness={0.8} />
      </Sphere>
    </Float>
  )
}

function TechNodes() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* 중앙 코어 */}
      <AnimatedSphere position={[0, 0, 0]} color="#00C2A8" scale={1.5} />

      {/* PASS 노드 */}
      <AnimatedSphere position={[-4, 2, 0]} color="#3B82F6" scale={0.8} />

      {/* DID 노드 */}
      <AnimatedSphere position={[4, 2, 0]} color="#10B981" scale={0.8} />

      {/* Web3 노드 */}
      <AnimatedSphere position={[0, -3, 2]} color="#8B5CF6" scale={0.8} />

      {/* 연결선들 */}
      <mesh>
        <tubeGeometry
          args={[
            new THREE.CatmullRomCurve3([
              new THREE.Vector3(-4, 2, 0),
              new THREE.Vector3(-2, 1, 0),
              new THREE.Vector3(0, 0, 0),
            ]),
            20,
            0.05,
            8,
            false,
          ]}
        />
        <meshBasicMaterial color="#00C2A8" transparent opacity={0.6} />
      </mesh>

      <mesh>
        <tubeGeometry
          args={[
            new THREE.CatmullRomCurve3([
              new THREE.Vector3(4, 2, 0),
              new THREE.Vector3(2, 1, 0),
              new THREE.Vector3(0, 0, 0),
            ]),
            20,
            0.05,
            8,
            false,
          ]}
        />
        <meshBasicMaterial color="#00C2A8" transparent opacity={0.6} />
      </mesh>

      <mesh>
        <tubeGeometry
          args={[
            new THREE.CatmullRomCurve3([
              new THREE.Vector3(0, -3, 2),
              new THREE.Vector3(0, -1.5, 1),
              new THREE.Vector3(0, 0, 0),
            ]),
            20,
            0.05,
            8,
            false,
          ]}
        />
        <meshBasicMaterial color="#00C2A8" transparent opacity={0.6} />
      </mesh>
    </group>
  )
}

export function ThreeScene() {
  return (
    <div className="w-full h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1C1F2A] to-[#2A2F3A]">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <Environment preset="night" />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00C2A8" />

        <TechNodes />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
