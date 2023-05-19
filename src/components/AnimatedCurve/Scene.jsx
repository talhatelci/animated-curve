import { useState, useRef, useMemo } from "react";
import { BufferAttribute, BufferGeometry, CatmullRomCurve3, Vector3, Color } from "three";
import { useFrame } from "@react-three/fiber";
import vertexShader from "./shaders/vertexShader.glsl?raw";
import fragmentShader from "./shaders/fragmentShader.glsl?raw";

const Scene = () => {
  // Line
  const resolution = useRef(144);

  const line = useMemo(() => {
    let controlPoints = [
      new Vector3(-8, -2, 0),
      new Vector3(2, -4, 0),
      new Vector3(-2, 4, 0),
      new Vector3(8, 2, 0),
    ];

    let curve = new CatmullRomCurve3(controlPoints, false, "catmullrom", 0.8);

    let points = curve.getPoints(resolution.current);
    let positions = [];
    let indices = [];

    points.forEach((point, index) => {
      positions.push(...point.toArray());
      indices.push(index);
    });

    let geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(new Float32Array(positions), 3));
    geometry.setAttribute("index", new BufferAttribute(new Float32Array(indices), 1));

    let startPoint = curve.getPointAt(0);
    let endPoint = curve.getPointAt(1);

    let lineInfo = {
      geometry,
      startPoint,
      endPoint,
    };

    return lineInfo;
  }, []);

  // Shader uniforms
  const [uniforms, setUniforms] = useState({
    uTime: { value: 0 },
    uDelay: { value: 1 },
    uDuration: { value: 5 },
    uResolution: { value: resolution.current },
    uLength: { value: 0.2 },
    uColor: { value: new Color(0.7, 0.2, 0.4).multiplyScalar(2) },
  });

  useFrame((state, delta) => {
    setUniforms((current) => {
      let updated = { ...current };
      updated.uTime.value += delta;
      return updated;
    });
  });

  return (
    <group>
      {/* Line */}
      <line geometry={line.geometry}>
        <rawShaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
        />
      </line>

      {/* Caps */}
      <mesh position={line.startPoint}>
        <sphereGeometry args={[0.08, 24, 16]} />
        <meshBasicMaterial color={uniforms.uColor.value} />
      </mesh>

      <mesh position={line.endPoint}>
        <sphereGeometry args={[0.08, 24, 16]} />
        <meshBasicMaterial color={uniforms.uColor.value} />
      </mesh>
    </group>
  );
};

export default Scene;
