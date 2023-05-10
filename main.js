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

//light is needed when we use 3D objects (δεν χρειάζεται το φως)
    //const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    //scene.add(light);

     // load and create the first video plane
  const video1 = await loadVideo("./assets/videos/Video1.mp4");
  const texture1 = new THREE.VideoTexture(video1);
  const geometry1 = new THREE.PlaneGeometry(1, 1280/720);
  const material1 = new THREE.MeshBasicMaterial({map: texture1});
  const plane1 = new THREE.Mesh(geometry1, material1);

  // load and create the second video plane
  const video2 = await loadVideo("./assets/videos/Video2.mp4");
  const texture2 = new THREE.VideoTexture(video2);
  const geometry2 = new THREE.PlaneGeometry(1, 1280/720);
  const material2 = new THREE.MeshBasicMaterial({map: texture2});
  const plane2 = new THREE.Mesh(geometry2, material2);

  // load and create the third video plane
  const video3 = await loadVideo("./assets/videos/Video3.mp4");
  const texture3 = new THREE.VideoTexture(video3);
  const geometry3 = new THREE.PlaneGeometry(1, 1280/720);
  const material3 = new THREE.MeshBasicMaterial({map: texture3});
  const plane3 = new THREE.Mesh(geometry3, material3);

  // add the first video plane to an anchor
  const anchor1 = mindarThree.addAnchor(0);
  anchor1.group.add(plane1);

  anchor1.onTargetFound = () => {
    video1.play();
  }
  anchor1.onTargetLost = () => {
    video1.pause();
  }
  video1.addEventListener( 'play', () => {
    video1.currentTime = 30;
  });

  // add the second video plane to an anchor
  const anchor2 = mindarThree.addAnchor(1);
  anchor2.group.add(plane2);

  anchor2.onTargetFound = () => {
    video2.play();
  }
  anchor2.onTargetLost = () => {
    video2.pause();
  }
  video2.addEventListener( 'play', () => {
    video2.currentTime = 5;
  });

  // add the third video plane to an anchor
  const anchor3 = mindarThree.addAnchor(2);
  anchor3.group.add(plane3);

  anchor3.onTargetFound = () => {
    video3.play();
  }
  anchor3.onTargetLost = () => {
    video3.pause();
  }
  video3.addEventListener( 'play', () => {
    video3.currentTime = 9;
  });
    
     //image 1
  const anchor4 = mindarThree.addAnchor(3);
  const texture4 = new THREE.TextureLoader().load("./assets/img1.jpg");
  const geometry4 = new THREE.PlaneGeometry(1, 0.55);
  const material4 = new THREE.MeshBasicMaterial({map: texture4});
  const plane4 = new THREE.Mesh( geometry4, material4);
    
  anchor4.group.add(plane4);

    
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
