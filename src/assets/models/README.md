# 3D Models (optional upgrade)

The site ships with a hand-crafted SVG illustration of Radha & Krishna
(`src/components/DivineArt.jsx`) so it runs beautifully with zero assets.

To upgrade to full 3D characters, add your own GLB/GLTF files here:

- Krishna.glb
- Radha.glb
- Gopika.glb
- Vrindavan.glb

Then load them with `@react-three/drei`'s `useGLTF` inside a `<Canvas>`,
for example:

```jsx
import { useGLTF } from "@react-three/drei";

function KrishnaModel(props) {
  const { scene } = useGLTF("/src/assets/models/Krishna.glb");
  return <primitive object={scene} {...props} />;
}
useGLTF.preload("/src/assets/models/Krishna.glb");
```

Wrap it in `<Suspense fallback={<DivineArt />}>` so the SVG art shows while
the model loads (or if a model is ever removed later), and swap the
`<DivineArt />` usage in `Hero.jsx` for your new component.

Never commit third-party copyrighted models without a license that permits it.
