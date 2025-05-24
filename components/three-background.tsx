"use client"

import { useRef, useMemo, Suspense } from "react"
import { Canvas, useFrame, extend } from "@react-three/fiber"
import * as THREE from "three"
import { useMobile } from "@/hooks/use-mobile"

// Extend Three.js objects
extend({ Mesh: THREE.Mesh, BoxGeometry: THREE.BoxGeometry, MeshBasicMaterial: THREE.MeshBasicMaterial })

// 3D Web Development Objects
function FloatingCube({
  position,
  scale,
  rotationSpeed,
}: { position: [number, number, number]; scale: number; rotationSpeed: number }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed
      meshRef.current.rotation.y += rotationSpeed * 0.7
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#00ffff" transparent opacity={0.15} wireframe />
    </mesh>
  )
}

function FloatingBrackets({ position, scale }: { position: [number, number, number]; scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.01
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.5) * 2
    }
  })

  // Create bracket-like shape using geometry
  const bracketGeometry = useMemo(() => {
    const geometry = new THREE.BoxGeometry(0.2, 2, 0.2)
    return geometry
  }, [])

  return (
    <group ref={meshRef} position={position} scale={scale}>
      <mesh geometry={bracketGeometry}>
        <meshBasicMaterial color="#00cccc" transparent opacity={0.2} wireframe />
      </mesh>
      <mesh position={[0.5, 0.8, 0]} geometry={new THREE.BoxGeometry(0.5, 0.2, 0.2)}>
        <meshBasicMaterial color="#00cccc" transparent opacity={0.2} wireframe />
      </mesh>
      <mesh position={[0.5, -0.8, 0]} geometry={new THREE.BoxGeometry(0.5, 0.2, 0.2)}>
        <meshBasicMaterial color="#00cccc" transparent opacity={0.2} wireframe />
      </mesh>
    </group>
  )
}

function FloatingTorus({ position, scale }: { position: [number, number, number]; scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.02
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.z = position[2] + Math.cos(state.clock.elapsedTime * 0.3) * 1
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.3, 8, 16]} />
      <meshBasicMaterial color="#00aaaa" transparent opacity={0.18} wireframe />
    </mesh>
  )
}

function FloatingCode({ position, scale }: { position: [number, number, number]; scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.015
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8 + position[0]) * 0.8
    }
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <cylinderGeometry args={[0.5, 0.5, 2, 6]} />
      <meshBasicMaterial color="#00dddd" transparent opacity={0.12} wireframe />
    </mesh>
  )
}

function FloatingHTML({ position, scale }: { position: [number, number, number]; scale: number }) {
  const meshRef = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.6 + position[0]) * 0.3
    }
  })

  return (
    <group ref={meshRef} position={position} scale={scale}>
      {/* HTML tag representation */}
      <mesh position={[-0.5, 0, 0]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshBasicMaterial color="#44ffff" transparent opacity={0.2} />
      </mesh>
      <mesh position={[0.5, 0, 0]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshBasicMaterial color="#44ffff" transparent opacity={0.2} />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1, 0.1, 0.1]} />
        <meshBasicMaterial color="#44ffff" transparent opacity={0.2} />
      </mesh>
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[1, 0.1, 0.1]} />
        <meshBasicMaterial color="#44ffff" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

function Scene() {
  const isMobile = useMobile()

  // Reduce number of objects on mobile
  const objectCount = isMobile ? 6 : 12

  return (
    <>
      {/* Generate floating objects */}
      {Array.from({ length: objectCount }, (_, i) => {
        const x = (Math.random() - 0.5) * 30
        const y = (Math.random() - 0.5) * 15
        const z = (Math.random() - 0.5) * 15
        const scale = Math.random() * 0.4 + 0.2
        const rotationSpeed = Math.random() * 0.02 + 0.005

        const objectType = i % 5

        switch (objectType) {
          case 0:
            return <FloatingCube key={i} position={[x, y, z]} scale={scale} rotationSpeed={rotationSpeed} />
          case 1:
            return <FloatingBrackets key={i} position={[x, y, z]} scale={scale} />
          case 2:
            return <FloatingTorus key={i} position={[x, y, z]} scale={scale} />
          case 3:
            return <FloatingCode key={i} position={[x, y, z]} scale={scale} />
          case 4:
            return <FloatingHTML key={i} position={[x, y, z]} scale={scale} />
          default:
            return null
        }
      })}
    </>
  )
}

function Fallback() {
  return (
    <div className="fixed inset-0 -z-30 opacity-20">
      {/* Fallback CSS animation */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-cyan-500/20 animate-pulse rounded"></div>
      <div className="absolute top-1/2 right-1/4 w-6 h-6 bg-cyan-600/15 animate-bounce rounded-full"></div>
      <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-cyan-400/25 animate-ping rounded"></div>
    </div>
  )
}

export function ThreeBackground() {
  const isMobile = useMobile()

  return (
    <div className="fixed inset-0 -z-30 opacity-50">
      <Suspense fallback={<Fallback />}>
        <Canvas
          camera={{ position: [0, 0, 10], fov: isMobile ? 60 : 75 }}
          gl={{ antialias: false, alpha: true }}
          dpr={isMobile ? 1 : 1.5}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  )
}
