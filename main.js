import {loadGLTF, loadAudio, loadVideo} from "./libs/loader.js";
const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener('DOMContentLoaded', () => {
  const start = async() => {
    //initiate the AR 3 object
    const mindarThree = new window.MINDAR.IMAGE.MindARThree({
      container: document.body,
      imageTargetSrc: './assets/targets/targets.mind'
    });
    const {renderer, scene, camera} = mindarThree;

//light is needed when we use 3D objects
    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    scene.add(light);

    const video0 = await loadVideo("./assets/videos/video1.mp4");
    const texture0 = new THREE.VideoTexture(video);
    const geometry0 = new THREE.PlaneGeometry(1, 1920/1080);
    const material0 = new THREE.MeshBasicMaterial({map: texture});
    const plane0 = new THREE.Mesh(geometry, material);
    
    const video1 = await loadVideo("./assets/videos/video2.mp4");
    const texture1 = new THREE.VideoTexture(video);
    const geometry1 = new THREE.PlaneGeometry(1, 1920/1080);
    const material1 = new THREE.MeshBasicMaterial({map: texture});
    const plane1 = new THREE.Mesh(geometry, material);
    
    const video2 = await loadVideo("./assets/videos/video3.mp4");
    const texture2 = new THREE.VideoTexture(video);
    const geometry2 = new THREE.PlaneGeometry(1, 1920/1080);
    const material2 = new THREE.MeshBasicMaterial({map: texture});
    const plane2 = new THREE.Mesh(geometry, material);

    // digital content (video)
    const anchor = mindarThree.addAnchor(0);
    anchor.group.add(plane);

    anchor.onTargetFound = () => {
      video.play();
    }
    anchor.onTargetLost = () => {
      video.pause();
    }
    video.addEventListener( 'play', () => {
      video.currentTime = 6;
    });
    
    const anchor = mindarThree.addAnchor(1);
    anchor.group.add(plane);

    anchor.onTargetFound = () => {
      video.play();
    }
    anchor.onTargetLost = () => {
      video.pause();
    }
    video.addEventListener( 'play', () => {
      video.currentTime = 6;
    });
    
    const anchor = mindarThree.addAnchor(2);
    anchor.group.add(plane);

    anchor.onTargetFound = () => {
      video.play();
    }
    anchor.onTargetLost = () => {
      video.pause();
    }
    video.addEventListener( 'play', () => {
      video.currentTime = 6;
    });
    
//start the experience
    await mindarThree.start();
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  }
  //to πλήκτρο start δουλεύει για μια φορά μόνο
  //const startButton = document.createElement("button");
  //startButton.textContent = "Start";
  //startButton.addEventListener("click", start);
  //document.body.appendChild(startButton);
  start();
});
