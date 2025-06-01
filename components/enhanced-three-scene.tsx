"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Environment } from "@react-three/drei"
import { useRef, useMemo, useState, useEffect } from "react"
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

// Text3D 컴포넌트를 제거하고 HTML 텍스트로 대체
function TechSphere({ position, color, label }: { position: [number, number, number]; color: string; label: string }) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
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
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="w-full h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1C1F2A] to-[#2A2F3A]">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-white text-xl">Loading 3D Scene...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-[#1C1F2A] to-[#2A2F3A] relative">
      <Canvas camera={{ position: [0, 5, 15], fov: 50 }} dpr={[1, 2]}>
        <Environment preset="night" />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00C2A8" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#1C1F2A" />

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
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>

      {/* HTML 오버레이 라벨 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 text-white text-sm font-semibold bg-black/50 px-2 py-1 rounded">
          PASS
        </div>
        <div className="absolute top-1/4 right-1/4 text-white text-sm font-semibold bg-black/50 px-2 py-1 rounded">
          DID
        </div>
        <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 text-white text-sm font-semibold bg-black/50 px-2 py-1 rounded">
          Web3
        </div>
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-white text-lg font-bold bg-[#00C2A8]/20 px-3 py-2 rounded border border-[#00C2A8]/50">
          TrustPort
        </div>
      </div>
    </div>
  )
}
