"use client"

import { useRef, useState, Suspense, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, Html, Line, Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"
import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

// Programming languages with their global locations
const skillLocations = [
  {
    lat: 37.7749,
    lng: -122.4194,
    skill: "JavaScript",
    city: "San Francisco, USA",
    color: "#F7DF1E",
    logo: "JS",
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    skill: "React",
    city: "London, UK",
    color: "#61DAFB",
    logo: "⚛️",
  },
  {
    lat: 48.8566,
    lng: 2.3522,
    skill: "Vue.js",
    city: "Paris, France",
    color: "#4FC08D",
    logo: "V",
  },
  {
    lat: 40.7128,
    lng: -74.006,
    skill: "Node.js",
    city: "New York, USA",
    color: "#339933",
    logo: "N",
  },
  {
    lat: 35.6762,
    lng: 139.6503,
    skill: "TypeScript",
    city: "Tokyo, Japan",
    color: "#3178C6",
    logo: "TS",
  },
  {
    lat: -33.8688,
    lng: 151.2093,
    skill: "Python",
    city: "Sydney, Australia",
    color: "#3776AB",
    logo: "🐍",
  },
  {
    lat: 55.7558,
    lng: 37.6176,
    skill: "PostgreSQL",
    city: "Moscow, Russia",
    color: "#336791",
    logo: "🐘",
  },
  {
    lat: 19.076,
    lng: 72.8777,
    skill: "MongoDB",
    city: "Mumbai, India",
    color: "#47A248",
    logo: "🍃",
  },
]

// Convert lat/lng to 3D coordinates
function latLngToVector3(lat: number, lng: number, radius = 2.5) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)

  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)

  return [x, y, z] as [number, number, number]
}

function StarField() {
  const points = useMemo(() => {
    const positions = new Float32Array(150 * 3)
    for (let i = 0; i < 150; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15
    }
    return positions
  }, [])

  return (
    <Points positions={points}>
      <PointMaterial size={0.015} color="#00ffff" transparent opacity={0.4} />
    </Points>
  )
}

function SkillMarker({
  position,
  skill,
  city,
  color,
  logo,
  globeRotation,
}: {
  position: [number, number, number]
  skill: string
  city: string
  color: string
  logo: string
  globeRotation: number
}) {
  const markerRef = useRef<THREE.Group>(null!)
  const [isHovered, setIsHovered] = useState(false)

  useFrame((state) => {
    if (markerRef.current) {
      // Rotate with the globe
      markerRef.current.rotation.y = globeRotation

      // Calculate visibility based on position relative to camera
      const worldPosition = new THREE.Vector3()
      markerRef.current.getWorldPosition(worldPosition)

      // Smooth fade based on position
      const opacity = Math.max(0.2, Math.min(1, (worldPosition.z + 3) / 6))
      const scale = 0.7 + opacity * 0.5

      markerRef.current.scale.setScalar(scale)

      // Make markers always face the camera
      const cameraPosition = state.camera.position.clone()
      markerRef.current.lookAt(cameraPosition)
    }
  })

  return (
    <group ref={markerRef} position={position}>
      <Html
        distanceFactor={8}
        position={[0, 0, 0.1]}
        transform
        occlude
        style={{
          transition: "all 0.3s ease",
          pointerEvents: "auto",
        }}
      >
        <motion.div
          className="flex flex-col items-center cursor-pointer"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Skill marker */}
          <motion.div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs border-2 border-white/30 backdrop-blur-sm shadow-lg"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 15px ${color}60`,
            }}
            animate={{
              boxShadow: isHovered ? `0 0 25px ${color}80, 0 0 35px ${color}40` : `0 0 15px ${color}60`,
            }}
          >
            {logo}
          </motion.div>

          {/* Tooltip */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: -5, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.8 }}
              className="absolute top-full mt-2 bg-black/90 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-2 text-center pointer-events-none min-w-max"
            >
              <div className="text-cyan-400 font-bold text-xs">{skill}</div>
              <div className="text-zinc-400 text-xs">{city}</div>
            </motion.div>
          )}

          {/* Pulsing ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-2"
            style={{ borderColor: color }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        </motion.div>
      </Html>
    </group>
  )
}

function Globe() {
  const globeRef = useRef<THREE.Group>(null!)
  const [rotation, setRotation] = useState(0)

  useFrame((state) => {
    if (globeRef.current) {
      // Smooth rotation
      globeRef.current.rotation.y += 0.008
      setRotation(globeRef.current.rotation.y)
    }
  })

  // Create connection lines between some locations
  const connectionLines = useMemo(() => {
    const lines = []
    for (let i = 0; i < skillLocations.length; i++) {
      for (let j = i + 1; j < skillLocations.length; j++) {
        if (Math.random() > 0.6) {
          const pos1 = latLngToVector3(skillLocations[i].lat, skillLocations[i].lng)
          const pos2 = latLngToVector3(skillLocations[j].lat, skillLocations[j].lng)
          lines.push({ start: pos1, end: pos2 })
        }
      }
    }
    return lines
  }, [])

  return (
    <group ref={globeRef}>
      {/* Main Globe wireframe */}
      <Sphere args={[2.5, 64, 64]}>
        <meshBasicMaterial color="#00ffff" wireframe transparent opacity={0.15} />
      </Sphere>

      {/* Inner globe layer */}
      <Sphere args={[2.3, 32, 32]}>
        <meshBasicMaterial color="#00cccc" wireframe transparent opacity={0.1} />
      </Sphere>

      {/* Outer atmosphere */}
      <Sphere args={[2.7, 48, 48]}>
        <meshBasicMaterial color="#008888" wireframe transparent opacity={0.08} />
      </Sphere>

      {/* Connection lines */}
      {connectionLines.map((line, index) => (
        <Line key={index} points={[line.start, line.end]} color="#00ffff" lineWidth={1.5} transparent opacity={0.3} />
      ))}

      {/* Skill markers */}
      {skillLocations.map((location, index) => {
        const position = latLngToVector3(location.lat, location.lng)
        return (
          <SkillMarker
            key={index}
            position={position}
            skill={location.skill}
            city={location.city}
            color={location.color}
            logo={location.logo}
            globeRotation={rotation}
          />
        )
      })}

      {/* Central core */}
      <Sphere args={[0.2, 32, 32]}>
        <meshBasicMaterial color="#00ffff" transparent opacity={0.8} />
      </Sphere>
    </group>
  )
}

function GlobeFallback() {
  return (
    <div className="aspect-square rounded-full gradient-cyan-to-black p-1 glow-cyan flex items-center justify-center">
      <div className="h-full w-full rounded-full bg-zinc-900/50 glass-dark p-6 flex items-center justify-center relative overflow-hidden">
        {/* Animated wireframe globe */}
        <motion.div
          className="relative w-full h-full max-w-xs max-h-xs"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          {/* Globe wireframes */}
          <div className="absolute inset-0 border-2 border-cyan-400/40 rounded-full" />
          <div className="absolute inset-4 border border-cyan-300/30 rounded-full" />
          <div className="absolute inset-8 border border-cyan-200/20 rounded-full" />

          {/* Skill markers */}
          {skillLocations.slice(0, 6).map((skill, index) => {
            const angle = index * (360 / 6) * (Math.PI / 180)
            const radius = 45
            const x = Math.cos(angle) * radius
            const y = Math.sin(angle) * radius

            return (
              <motion.div
                key={skill.skill}
                className="absolute flex flex-col items-center"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: "translate(-50%, -50%)",
                }}
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs border border-white/30 shadow-lg"
                  style={{
                    backgroundColor: skill.color,
                    boxShadow: `0 0 10px ${skill.color}60`,
                  }}
                >
                  {skill.logo}
                </div>
              </motion.div>
            )
          })}

          {/* Center core */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-500 rounded-full animate-pulse" />
        </motion.div>

        {/* Loading text */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-cyan-400">
          Interactive Globe
        </div>
      </div>
    </div>
  )
}

export function HeroGlobe() {
  const isMobile = useMobile()

  return (
    <div className="aspect-square rounded-full gradient-cyan-to-black p-1 glow-cyan">
      <div className="h-full w-full rounded-full bg-zinc-900/50 glass-dark overflow-hidden">
        {isMobile ? (
          <GlobeFallback />
        ) : (
          <Suspense fallback={<GlobeFallback />}>
            <Canvas
              camera={{
                position: [0, 0, 7],
                fov: 45,
              }}
              gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance",
              }}
              dpr={window.devicePixelRatio}
            >
              <StarField />
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={0.6} color="#00ffff" />
              <pointLight position={[-10, -10, -10]} intensity={0.3} color="#0088ff" />
              <Globe />
            </Canvas>
          </Suspense>
        )}
      </div>
    </div>
  )
}
