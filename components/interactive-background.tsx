"use client"

import type React from "react"

import { useRef, useEffect, useMemo, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Points, PointMaterial, Sphere, MeshDistortMaterial, Float } from "@react-three/drei"
import * as THREE from "three"

function ParticleField({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const ref = useRef<THREE.Points>(null)
  const { size, viewport } = useThree()

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3)

    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }

    return positions
  }, [])

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.elapsedTime

      // 마우스 인터랙션
      const mouseX = (mouse.current[0] / size.width) * 2 - 1
      const mouseY = -(mouse.current[1] / size.height) * 2 + 1

      ref.current.rotation.x = time * 0.05 + mouseY * 0.1
      ref.current.rotation.y = time * 0.075 + mouseX * 0.1

      // 파티클 개별 애니메이션
      const positions = ref.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < positions.length; i += 3) {
        const x = positions[i]
        const y = positions[i + 1]
        const z = positions[i + 2]

        positions[i + 1] = y + Math.sin(time + x * 0.01) * 0.01
        positions[i + 2] = z + Math.cos(time + y * 0.01) * 0.01
      }

      ref.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#00C2A8" size={0.05} sizeAttenuation={true} depthWrite={false} opacity={0.6} />
    </Points>
  )
}

function FloatingNodes({ scrollProgress }: { scrollProgress: number }) {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (group.current) {
      const time = state.clock.elapsedTime
      group.current.rotation.y = time * 0.1 + scrollProgress * Math.PI * 2
      group.current.position.y = Math.sin(scrollProgress * Math.PI * 4) * 2
    }
  })

  return (
    <group ref={group}>
      {/* PASS 노드 */}
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[0.8, 32, 32]} position={[-4, 2, 0]}>
          <MeshDistortMaterial
            color="#3B82F6"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.8}
          />
        </Sphere>
      </Float>

      {/* DID 노드 */}
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <Sphere args={[0.8, 32, 32]} position={[4, 2, 0]}>
          <MeshDistortMaterial
            color="#10B981"
            attach="material"
            distort={0.3}
            speed={1.5}
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.8}
          />
        </Sphere>
      </Float>

      {/* Web3 노드 */}
      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={3}>
        <Sphere args={[0.8, 32, 32]} position={[0, -3, 2]}>
          <MeshDistortMaterial
            color="#8B5CF6"
            attach="material"
            distort={0.3}
            speed={2.5}
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.8}
          />
        </Sphere>
      </Float>

      {/* 중앙 TrustPort 코어 */}
      <Float speed={1} rotationIntensity={2} floatIntensity={1}>
        <Sphere args={[1.2, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#00C2A8"
            attach="material"
            distort={0.5}
            speed={1}
            roughness={0}
            metalness={1}
            transparent
            opacity={0.9}
          />
        </Sphere>
      </Float>
    </group>
  )
}

function ConnectionLines({ scrollProgress }: { scrollProgress: number }) {
  const ref = useRef<THREE.Group>(null)

  useFrame(() => {
    if (ref.current) {
      ref.current.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh) {
          const material = child.material as THREE.MeshBasicMaterial
          material.opacity = 0.3 + Math.sin(Date.now() * 0.001 + index) * 0.2
        }
      })
    }
  })

  return (
    <group ref={ref}>
      {/* PASS to Core */}
      <mesh>
        <tubeGeometry
          args={[
            new THREE.CatmullRomCurve3([
              new THREE.Vector3(-4, 2, 0),
              new THREE.Vector3(-2, 1, 0),
              new THREE.Vector3(0, 0, 0),
            ]),
            20,
            0.02,
            8,
            false,
          ]}
        />
        <meshBasicMaterial color="#00C2A8" transparent opacity={0.4} />
      </mesh>

      {/* DID to Core */}
      <mesh>
        <tubeGeometry
          args={[
            new THREE.CatmullRomCurve3([
              new THREE.Vector3(4, 2, 0),
              new THREE.Vector3(2, 1, 0),
              new THREE.Vector3(0, 0, 0),
            ]),
            20,
            0.02,
            8,
            false,
          ]}
        />
        <meshBasicMaterial color="#00C2A8" transparent opacity={0.4} />
      </mesh>

      {/* Web3 to Core */}
      <mesh>
        <tubeGeometry
          args={[
            new THREE.CatmullRomCurve3([
              new THREE.Vector3(0, -3, 2),
              new THREE.Vector3(0, -1.5, 1),
              new THREE.Vector3(0, 0, 0),
            ]),
            20,
            0.02,
            8,
            false,
          ]}
        />
        <meshBasicMaterial color="#00C2A8" transparent opacity={0.4} />
      </mesh>
    </group>
  )
}

export function InteractiveBackground({ scrollProgress }: { scrollProgress: number }) {
  const mouse = useRef<[number, number]>([0, 0])
  const [isClient, setIsClient] = useState(false)
  const [webglSupported, setWebglSupported] = useState(true)

  useEffect(() => {
    setIsClient(true)

    // WebGL 지원 확인
    try {
      const canvas = document.createElement("canvas")
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
      if (!gl) {
        setWebglSupported(false)
      }
    } catch (e) {
      setWebglSupported(false)
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouse.current = [event.clientX, event.clientY]
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        mouse.current = [event.touches[0].clientX, event.touches[0].clientY]
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  // 클라이언트 사이드가 아니거나 WebGL을 지원하지 않는 경우 폴백
  if (!isClient || !webglSupported) {
    return (
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-black via-[#1C1F2A] to-black">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width%3D%2260%22 height%3D%2260%22 viewBox%3D%220 0 60 60%22 xmlns%3D%22http://www.w3.org/2000/svg%22%3E%3Cg fill%3D%22none%22 fillRule%3D%22evenodd%22%3E%3Cg fill%3D%22%2300C2A8%22 fillOpacity%3D%220.1%22%3E%3Ccircle cx%3D%2230%22 cy%3D%2230%22 r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]}
        onCreated={({ gl }) => {
          gl.setClearColor("#000000", 1)
        }}
        onError={(error) => {
          console.warn("WebGL Error:", error)
          setWebglSupported(false)
        }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.6} color="#00C2A8" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#1C1F2A" />
        <pointLight position={[0, 0, 5]} intensity={0.2} color="#ffffff" />

        <ParticleField mouse={mouse} />
        <FloatingNodes scrollProgress={scrollProgress} />
        <ConnectionLines scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  )
}
