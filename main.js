// const THREE = window.MINDAR.IMAGE.THREE;

// document.addEventListener('DOMContentLoaded', () => {
//   const start = async() => {
//     const mindarThree = new window.MINDAR.IMAGE.MindARThree({
//       container: document.querySelector("#my-ar-container"),
//       imageTargetSrc: './assets/targets/course-banner.mind',
//     });
//     const {renderer, scene, camera} = mindarThree;

//     const geometry = new THREE.PlaneGeometry(1, 1);
//     const material = new THREE.MeshBasicMaterial({color: 0x00ffff, transparent: true, opacity: 0.5});
//     const plane = new THREE.Mesh(geometry, material);

//     const anchor = mindarThree.addAnchor(0);
//     anchor.group.add(plane);

//     await mindarThree.start();
//     renderer.setAnimationLoop(() => {
//       renderer.render(scene, camera);
//     });
//   }
//   start();
// });



import {loadGLTF} from "./libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
        container: document.querySelector("#my-ar-container"),
        imageTargetSrc: './assets/targets/musicband.mind',
    });
    const {renderer, scene, camera} = mindarThree;

    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    scene.add(light);

    const raccoon = await loadGLTF('./assets/models/musicband-raccoon/scene.gltf');
    raccoon.scene.scale.set(0.1, 0.1, 0.1);
    raccoon.scene.position.set(0, -0.4, 0);

    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(raccoon.scene);

    anchor.onTargetFound = () => {
      console.log("on target found");
    }
    anchor.onTargetLost = () => {
      console.log("on target lost");
    }

    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  start();
});
