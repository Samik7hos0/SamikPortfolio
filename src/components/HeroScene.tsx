import { useRef, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ── Pipeline topology ──────────────────────────────────────────────
const NODES = [
  { id: 'api',       pos: [-5.2,  0.3,  0] as [number,number,number], color: '#00ffa3', r: 0.16 },
  { id: 'kafka',     pos: [-2.6, -0.5,  0] as [number,number,number], color: '#0af',    r: 0.22 },
  { id: 'spark',     pos: [ 0.0,  0.6,  0] as [number,number,number], color: '#ff8c42', r: 0.22 },
  { id: 'dbt',       pos: [ 2.6, -0.2,  0] as [number,number,number], color: '#ffaa44', r: 0.18 },
  { id: 'snowflake', pos: [ 5.2,  0.4,  0] as [number,number,number], color: '#29b5e8', r: 0.22 },
]
// Airflow sits above the main pipeline, connected to spark
const SAT_NODES = [
  { id: 'airflow', pos: [0.0, 2.2, 0] as [number,number,number], color: '#00d6a3', r: 0.14 },
  { id: 's3',      pos: [3.8, 1.5, 0] as [number,number,number], color: '#ff9900', r: 0.12 },
]

const EDGES: [number, number][] = [[0,1],[1,2],[2,3],[3,4]]
const SAT_EDGES: [[number,number,number],[number,number,number]][] = [
  [NODES[2].pos, SAT_NODES[0].pos],
  [NODES[3].pos, SAT_NODES[1].pos],
]

// ── Flowing particles along one edge ───────────────────────────────
function EdgeFlow({
  from, to, color, count = 10, speed = 0.28,
}: {
  from: [number,number,number]
  to: [number,number,number]
  color: string
  count?: number
  speed?: number
}) {
  const attrRef = useRef<THREE.BufferAttribute>(null!)
  const positions = useMemo(() => new Float32Array(count * 3), [count])
  const offsets = useMemo(() => Array.from({ length: count }, (_, i) => i / count), [count])
  const t = useRef(0)

  // Mid-point slightly bowed
  const mid = useMemo((): [number,number,number] => [
    (from[0] + to[0]) / 2,
    (from[1] + to[1]) / 2 + 0.25,
    (from[2] + to[2]) / 2,
  ], [from, to])

  useFrame((_, delta) => {
    t.current = (t.current + delta * speed) % 1
    for (let i = 0; i < count; i++) {
      const p = (offsets[i] + t.current) % 1
      const q = 1 - p
      positions[i * 3]     = q * q * from[0] + 2 * q * p * mid[0] + p * p * to[0]
      positions[i * 3 + 1] = q * q * from[1] + 2 * q * p * mid[1] + p * p * to[1]
      positions[i * 3 + 2] = q * q * from[2] + 2 * q * p * mid[2] + p * p * to[2]
    }
    if (attrRef.current) attrRef.current.needsUpdate = true
  })

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute ref={attrRef} attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color={color} transparent opacity={0.9} sizeAttenuation depthWrite={false} />
    </points>
  )
}

// ── Connection tube between two nodes ──────────────────────────────
function PipeEdge({ from, to, color }: { from: [number,number,number]; to: [number,number,number]; color: string }) {
  const points = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(...from),
      new THREE.Vector3((from[0]+to[0])/2, (from[1]+to[1])/2 + 0.25, (from[2]+to[2])/2),
      new THREE.Vector3(...to),
    )
    return curve.getPoints(40)
  }, [from, to])

  const positions = useMemo(() => {
    const arr = new Float32Array(points.length * 3)
    points.forEach((p, i) => { arr[i*3]=p.x; arr[i*3+1]=p.y; arr[i*3+2]=p.z })
    return arr
  }, [points])

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={points.length} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.18} />
    </line>
  )
}

// ── Single pipeline node sphere ─────────────────────────────────────
function PipeNode({ pos, color, r, idx }: { pos:[number,number,number]; color:string; r:number; idx:number }) {
  const mesh = useRef<THREE.Mesh>(null!)
  const ring = useRef<THREE.Mesh>(null!)
  const baseY = pos[1]

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    mesh.current.position.y = baseY + Math.sin(t * 0.7 + idx * 1.1) * 0.08
    ring.current.rotation.z = t * (0.4 + idx * 0.05)
    ring.current.rotation.x = Math.sin(t * 0.3 + idx) * 0.4
  })

  return (
    <group position={pos}>
      {/* Core sphere */}
      <mesh ref={mesh}>
        <sphereGeometry args={[r, 24, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.95} />
      </mesh>
      {/* Outer glow ring */}
      <mesh ref={ring}>
        <torusGeometry args={[r * 1.9, 0.008, 8, 48]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>
      {/* Halo */}
      <mesh>
        <sphereGeometry args={[r * 2.2, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
    </group>
  )
}

// ── Background data-packet particles ───────────────────────────────
function DataCloud() {
  const ref = useRef<THREE.Points>(null!)
  const count = 800

  const [pos, col] = useMemo(() => {
    const p = new Float32Array(count * 3)
    const c = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 5 + Math.random() * 10
      p[i*3]   = r * Math.sin(phi) * Math.cos(theta)
      p[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
      p[i*3+2] = r * Math.cos(phi) - 2
      const t = Math.random()
      c[i*3]=0; c[i*3+1]=0.5+t*0.5; c[i*3+2]=t*0.6
    }
    return [p, c]
  }, [count])

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.018
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.01) * 0.05
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={pos} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-color"    array={col} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} vertexColors transparent opacity={0.55} sizeAttenuation />
    </points>
  )
}

// ── Full pipeline group — mouse-reactive ───────────────────────────
function PipelineGroup() {
  const groupRef = useRef<THREE.Group>(null!)
  const mouse = useRef({ x: 0, y: 0 })
  const { size } = useThree()

  useEffect(() => {
    const h = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / size.width  - 0.5) * 2,
        y: -(e.clientY / size.height - 0.5) * 2,
      }
    }
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [size])

  useFrame(({ clock }) => {
    const g = groupRef.current
    g.rotation.y += (mouse.current.x * 0.12 - g.rotation.y) * 0.04
    g.rotation.x += (mouse.current.y * 0.08 - g.rotation.x) * 0.04
    g.position.y = Math.sin(clock.elapsedTime * 0.3) * 0.06
  })

  return (
    <group ref={groupRef}>
      {/* Main pipeline edges */}
      {EDGES.map(([a, b]) => (
        <PipeEdge key={`e${a}${b}`} from={NODES[a].pos} to={NODES[b].pos} color={NODES[b].color} />
      ))}
      {/* Satellite edges */}
      {SAT_EDGES.map(([a, b], i) => (
        <PipeEdge key={`s${i}`} from={a} to={b} color="#00ffa360" />
      ))}
      {/* Flowing data particles on main pipeline */}
      {EDGES.map(([a, b], i) => (
        <EdgeFlow
          key={`f${a}${b}`}
          from={NODES[a].pos}
          to={NODES[b].pos}
          color={NODES[b].color}
          count={10}
          speed={0.22 + i * 0.04}
        />
      ))}
      {/* Satellite flows */}
      {SAT_EDGES.map(([a, b], i) => (
        <EdgeFlow key={`sf${i}`} from={a} to={b} color="#00ffa3" count={6} speed={0.18} />
      ))}
      {/* Main nodes */}
      {NODES.map((n, i) => (
        <PipeNode key={n.id} pos={n.pos} color={n.color} r={n.r} idx={i} />
      ))}
      {/* Satellite nodes */}
      {SAT_NODES.map((n, i) => (
        <PipeNode key={n.id} pos={n.pos} color={n.color} r={n.r} idx={i + NODES.length} />
      ))}
    </group>
  )
}

// ── Canvas export ──────────────────────────────────────────────────
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <DataCloud />
        <PipelineGroup />
      </Suspense>
    </Canvas>
  )
}
