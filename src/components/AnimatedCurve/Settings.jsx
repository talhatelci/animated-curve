import { Perf } from "r3f-perf";
import { OrbitControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";

const Settings = () => {
  return (
    <>
      <Perf position="top-left" />

      <OrbitControls enableZoom={false} enablePan={false} />

      <color args={[0x26023c]} attach="background" />

      <EffectComposer multisampling={4}>
        <Bloom intensity={8} luminanceThreshold={0} mipmapBlur />
      </EffectComposer>
    </>
  );
};

export default Settings;
