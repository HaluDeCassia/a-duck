const yellow = '#ED0';
const blue = '#1f8cb4';
const orange = '#df6d33';

const TAU = Zdog.TAU;

let leaveDuck = false;
let speed = 0.02;

var sceneStartPosition = undefined;
var sceneStartRotation = { y: TAU/6.7 };

let illo = new Zdog.Illustration({
  element: '.zdog-duck',
  zoom: 10,
  dragRotate: true,
  rotate: { y: TAU/6.7 },
  translate: undefined,
  // onDragStart: function() {
  //   leaveDuck = false;
  // }
});

let head = new Zdog.Shape({
  addTo: illo,
  stroke: 12,
  color: yellow,
});

let eye = new Zdog.Ellipse({
  addTo: head,
  diameter: 2,
  quarters: 2, // semi-circle
  translate: { x: -2, z: 4.5 },
  rotate: { z: -TAU/4 },
  color: blue,
  stroke: 0.5,
  backface: false,
});

eye.copy({
  translate: { x: 2, z: 4.5 },
});

let beak = new Zdog.Ellipse({
  addTo: head,
  diameter: 8,
  quarters: 2,
  translate: { y: 2.5, z: 4.5 },
  rotate: { z: TAU/4, x: TAU/5 },
  closed: true,
  color: orange,
  stroke: 2,
  fill: true,
  backface: false,
});

let hair = new Zdog.Cone({
  addTo: head,
  diameter: 1,
  length: 2,
  rotate: { x: TAU/5},
  translate: { y: -5 },
  stroke: 2,
  color: yellow,
  backface: false,
});

let body = new Zdog.Shape({
  addTo: illo,
  path: [ { x: 5 }, { x: 12 } ],
  translate: { y: 10 },
  rotate: { z: TAU/-4, x: TAU/4.3 },
  stroke: 14,
  color: yellow,
});

let feet = new Zdog.Shape({
  addTo: body,
  path: [ { x: 1 }, { x: 4 } ],
  translate: { z: -5, y: 0, x: 3 },
  rotate: { z: 1.5 },
  stroke: 3,
  color: orange
});

feet.copy({
  translate: { z: -5, y: -6, x: 3 }
});

let tail = new Zdog.Cone({
  addTo: body,
  diameter: 4,
  length: 3,
  rotate: { y: 5.5},
  translate: { x: 16, z: 4 },
  stroke: 2,
  color: yellow,
  backface: yellow,
});

function animate() {
  if(leaveDuck) {
    if(illo.rotate.x <= 0  && illo.rotate.y > 0) {
      illo.translate.x -= leaveDuck ? speed : 0;
      illo.translate.y += leaveDuck ? speed : 0;
    } else if(illo.rotate.x < 0  && illo.rotate.y < 0) {
      illo.translate.x += leaveDuck ? speed : 0;
      illo.translate.y += leaveDuck ? speed : 0;
    } else if(illo.rotate.x > 0  && illo.rotate.y >= 0) {
      illo.translate.x -= leaveDuck ? speed : 0;
      illo.translate.y -= leaveDuck ? speed : 0;
    } else if(illo.rotate.x > 0  && illo.rotate.y <= 0) {
      illo.translate.x += leaveDuck ? speed : 0;
      illo.translate.y -= leaveDuck ? speed : 0;
    } else if(illo.rotate.x == 0  && illo.rotate.y == 0) {
        illo.translate.x += 0;
    }
  } else {
    illo.translate.x +=  0;
    illo.translate.y -=  0;
  }

  illo.updateRenderGraph();
  requestAnimationFrame( animate );
}

animate();


document.querySelector('.leave-duck').onclick = function() {
  leaveDuck = true;
};

document.querySelector('.stop-duck').onclick = function() {
  leaveDuck = false;
};

document.querySelector('.reset-button').onclick = function() {
  illo.rotate.set( sceneStartRotation );
  illo.translate.set( sceneStartPosition );
};

document.querySelector('.more-button').onclick = function() {
  console.log("FAFAFAFASTER!!!");
  speed += 0.01;
};

document.querySelector('.less-button').onclick = function() {
  console.log("SLOOOOOOWER...");
  speed -+ 0.01
};
