"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Environment, Text3D } from "@react-three/drei"
import { useRef, useMemo } from "react"
import type * as THREE from "three"

function AnimatedGrid() {
  const ref = useRef<THREE.Points>(null)

  const gridPositions = useMemo(() => {
    const positions = new Float32Array(400 * 3)
    let index = 0

    for (let x = -10; x <= 10; x += 1) {
      for (let z = -10; z <= 10; z += 1) {
        positions[index * 3] = x
        positions[index * 3 + 1] = 0
        positions[index * 3 + 2] = z
        index++
      }
    }

    return positions
  }, [])

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime
      const positions = ref.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const z = positions[i + 2]
        positions[i + 1] = Math.sin(time + x * 0.3) * Math.cos(time + z * 0.3) * 0.5
      }

      ref.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={gridPositions.length / 3}
          array={gridPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#00C2A8" size={0.05} transparent opacity={0.6} />
    </points>
  )
}

function TechSphere({ position, color, label }: { position: [number, number, number]; color: string; label: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const textRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
    if (textRef.current) {
      textRef.current.lookAt(state.camera.position)
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <group position={position}>
        <Sphere ref={meshRef} args={[1, 64, 64]}>
          <MeshDistortMaterial
            color={color}
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.8}
          />
        </Sphere>

        <Text3D ref={textRef} font="/fonts/Geist_Bold.json" size={0.3} height={0.05} position={[0, -2, 0]}>
          {label}
          <meshStandardMaterial color="#ffffff" />
        </Text3D>
      </group>
    </Float>
  )
}

function DataFlow() {
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={ref}>
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2
        const radius = 6
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius

        return (
          <mesh key={i} position={[x, 0, z]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color="#00C2A8"
              emissive="#00C2A8"
              emissiveIntensity={0.5}
              transparent
              opacity={0.8}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export function EnhancedThreeScene() {
  return (
    <div className="w-full h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1C1F2A] to-[#2A2F3A]">
      <Canvas camera={{ position: [0, 5, 15], fov: 50 }}>
        <Environment preset="night" />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00C2A8" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#1C1F2A" />

        <AnimatedGrid />

        <TechSphere position={[-4, 2, 0]} color="#3B82F6" label="PASS" />
        <TechSphere position={[4, 2, 0]} color="#10B981" label="DID" />
        <TechSphere position={[0, -2, 2]} color="#8B5CF6" label="Web3" />

        <TechSphere position={[0, 2, 0]} color="#00C2A8" label="TrustPort" />

        <DataFlow />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  )
}
