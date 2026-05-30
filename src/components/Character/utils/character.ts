import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";
import { decryptFile } from "./decrypt";

const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        const encryptedBlob = await decryptFile(
          "/models/character.enc",
          "Character3D#@"
        );
        const blobUrl = URL.createObjectURL(new Blob([encryptedBlob]));

        let character: THREE.Object3D;
        loader.load(
          blobUrl,
          async (gltf: GLTF) => {
            character = gltf.scene;
            await renderer.compileAsync(character, camera, scene);
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                child.castShadow = true;
                child.receiveShadow = true;
                mesh.frustumCulled = true;

                const lowerName = mesh.name.toLowerCase();
                if (lowerName.includes("shirt") || lowerName.includes("body")) {
                  mesh.material = (mesh.material as THREE.Material).clone();
                  (mesh.material as THREE.MeshStandardMaterial).color.set("#1d4ed8"); // Darker Blue
                }
                if (lowerName.includes("pant")) {
                  mesh.material = (mesh.material as THREE.Material).clone();
                  (mesh.material as THREE.MeshStandardMaterial).color.set("#e5c298"); // Light Skin Color
                }
                if (lowerName.includes("shoe")) {
                  mesh.material = (mesh.material as THREE.Material).clone();
                  (mesh.material as THREE.MeshStandardMaterial).color.set("#111111"); // Black
                }
                if (lowerName.includes("sole")) {
                  mesh.material = (mesh.material as THREE.Material).clone();
                  (mesh.material as THREE.MeshStandardMaterial).color.set("#dc2626"); // Red
                }
                
                // Skin Tone
                if (lowerName.includes("hand") || lowerName.includes("neck") || lowerName.includes("ear")) {
                  mesh.material = (mesh.material as THREE.Material).clone();
                  // A slightly darker, warmer skin tone (base was pure white default)
                  (mesh.material as THREE.MeshStandardMaterial).color.set("#f5d0b5");
                }
              }
            });
            resolve(gltf);
            setCharTimeline(character, camera);
            setAllTimeline();
            character!.getObjectByName("footR")!.position.y = 3.36;
            character!.getObjectByName("footL")!.position.y = 3.36;
            dracoLoader.dispose();
          },
          undefined,
          (error: unknown) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
