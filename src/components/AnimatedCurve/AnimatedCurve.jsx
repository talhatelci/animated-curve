import { Canvas } from "@react-three/fiber";
import Settings from "./Settings.jsx";
import Scene from "./Scene.jsx";
import { LinearSRGBColorSpace, NoToneMapping } from "three";

const AnimatedCurve = () => {
  return (
    <div className="animated-curve">
      <Canvas
        camera={{
          position: [-15, -4, 6],
        }}
        gl={{
          outputColorSpace: LinearSRGBColorSpace,
          toneMapping: NoToneMapping,
          antialias: false,
        }}
      >
        <Settings />
        <Scene />
      </Canvas>
    </div>
  );
};

export default AnimatedCurve;
