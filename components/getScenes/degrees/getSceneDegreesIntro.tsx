import React, { useEffect } from 'react';
import InteractivePoint from '../../HomePage/MyCanvas/CanvasObjects/InteractivePoint';
import EventHandlerConfig from '../../HomePage/MyCanvas/EventHandler/EventHandlerConfig';
import { Scene, SceneGetter } from '../../HomePage/MyCanvas/Scene/Scene';
import cl from '../../../colors';
import NonInteractivePoint from '../../HomePage/MyCanvas/CanvasObjects/NonInteractivePoint';
import AngleCircle from '../../HomePage/MyCanvas/CanvasObjects/AngleCircle';
import { TargetValueObj } from '../../../pages/%C2%B0';
import { Tau } from '../../HomePage/MyCanvas/CanvasObjects/UsefulConstants';

const getSceneDegreesIntro: SceneGetter = (
  context: CanvasRenderingContext2D,
  eventHandlerConfig: EventHandlerConfig
) => {
  let scene = new Scene(context, eventHandlerConfig);

  // @ts-ignore
  // ingoring missing ev for onclick;
  const passedObject = context?.objectPassedToScene;
  const {
    introCircleDegree,
    setIntroCircleDegree,
  }: {
    introCircleDegree: number;
    setIntroCircleDegree: any;
  } = passedObject;

  // setTargetValueObjs([{ value: 9, completed: true }]);

  const width = context.canvas.parentElement?.clientWidth || 0;

  context.canvas.width = width;

  // context.canvas.style.background = `linear-gradient(0deg, ${cl.getHSL(
  //   cl.purple_light
  // )}, ${cl.getHSL(cl.blue_light)} )`;
  // context.canvas.style.border = `1px solid ${cl.getHSL(cl.gray_dark)}`;

  scene.assets.listenFor = [];

  const checkDragValue = () => {
    let userSelectedValueInDegrees = (testUnitCirc.angle * 1.1) / Math.PI;
  };

  const testUnitCirc = new AngleCircle(
    context,
    eventHandlerConfig,
    width / 2,
    context.canvas.height / 2
  );

  testUnitCirc.checkDragValueToCorrect = checkDragValue;

  testUnitCirc.color = cl.getHSL(cl.purple);
  testUnitCirc.radialPoint.color = 'transparent';
  testUnitCirc.labelColor = cl.getHSLA(cl.purple, 0);
  testUnitCirc.vertex.color = cl.getHSL(cl.purple);

  const updateAnglePosition = (angle: number) => {
    let x = testUnitCirc.x + testUnitCirc.radius * 1.65 * Math.cos(angle);

    let y = testUnitCirc.y - testUnitCirc.radius * 1.65 * Math.sin(angle);
    testUnitCirc.radialPoint.x = x;

    testUnitCirc.radialPoint.y = y;
  };

  let t0 = new Date().getTime();

  let tLast = t0;
  console.log('happening');

  const getDt = () => {
    let tNow = new Date().getTime();
    let dt = tNow - tLast;
    tLast = tNow;
    return dt;
  };

  let angle = introCircleDegree;
  let velocity = 0.000015;
  testUnitCirc.vertex.color = 'transparent';

  const updateAngle = () => {
    let dt = getDt();
    angle += velocity * dt;
    setIntroCircleDegree(Math.floor((angle * 180) / Math.PI));
    console.log('new angle', Math.floor((angle * 180) / Math.PI));
  };

  // testUnitCirc.customUnitDivisions = 360;

  scene.draw = () => {
    setIntroCircleDegree((prev: any) => {
      angle = (prev * Math.PI) / 180;
      return prev;
    });
    testUnitCirc.draw();

    testUnitCirc.drawDivisionTicks(180);
    // updateAngle();
    updateAnglePosition(angle);

    // updateT();
  };

  return scene;
};

export default getSceneDegreesIntro;

// import { ListItem } from '@mui/material';
// import cl from '../../../../colors';
// import InteractivePoint from '../CanvasObjects/InteractivePoint';
// import EventHandlerConfig from '../EventHandler/EventHandlerConfig';
// import { Scene, SceneGetter } from '../Scene/Scene';

// const getHomepageScene: SceneGetter = (
//   context: CanvasRenderingContext2D,
//   eventHandlerConfig: EventHandlerConfig
// ) => {
//   const scene = new Scene(context, eventHandlerConfig);
//   const ctx = scene.context;
//   let assets = scene.assets;
//   scene.assets.listenFor = [];

//   const blueColors = [
//     cl.getHSL(cl.red),
//     cl.getHSL(cl.blue),
//     cl.getHSL(cl.purple),
//   ];

//   const velocity = 0.1;

//   const getBluePoints = () => {
//     for (let i = 0; i < 3; i++) {
//       let interactivePoint = new InteractivePoint(
//         ctx,
//         eventHandlerConfig,
//         innerWidth / 2,
//         ctx.canvas.height / 2,
//         scene.assets.listenFor,
//         30,
//         blueColors[i]
//       );
//     }
//   };

//   getBluePoints();

//   const pointVelocity = {
//     x: 0.7,
//     y: -0.7,
//   };

//   let round = 0;
//   let currentPoint;

//   const timerShuffleCurrentPoint = () => {
//     currentPoint = scene.assets.listenFor[round % 3];
//     round += 1;
//     pointVelocity.x = -1 + 2 * Math.random();
//     pointVelocity.y = -1 + 2 * Math.random();
//     setTimeout(timerShuffleCurrentPoint, 3000);
//   };

//   let canPointsMove = true;

//   const makePointsMoveTrue = () => {
//     canPointsMove = true;
//   };

//   let delayedMakePointsMoveTrue: any = null;

//   const togglePointsCanMovme = () => {
//     if (scene.eventHandlerConfig.cursorStatus.mouseIsDown === true) {
//       if (delayedMakePointsMoveTrue) {
//         clearTimeout(delayedMakePointsMoveTrue);
//       }

//       delayedMakePointsMoveTrue = setTimeout(makePointsMoveTrue, 6000);

//       canPointsMove = false;
//     }
//   };

//   timerShuffleCurrentPoint();

//   const updateSelectedPoint = () => {
//     if (!canPointsMove) return;
//     // scene.assets.listenFor.forEach((point: any) => {
//     //   point.color = 'white';
//     // });
//     const currentPoint = scene.assets.listenFor[round % 3];
//     // currentPoint.color = blueColors[round % 3];
//     let buffer = 1;
//     if (currentPoint.x >= ctx.canvas.width - buffer) {
//       pointVelocity.x *= -1;
//     }
//     if (currentPoint.x <= buffer) {
//       pointVelocity.x *= -1;
//     }
//     if (currentPoint.y >= ctx.canvas.height - buffer) {
//       pointVelocity.y *= -1;
//     }
//     if (currentPoint.y <= buffer) {
//       pointVelocity.y *= -1;
//     }
//     currentPoint.x += pointVelocity.x;
//     currentPoint.y += pointVelocity.y;
//   };

//   const drawPoints = () => {
//     scene.assets.listenFor.forEach((listenedForItem: any) => {
//       listenedForItem.draw(); // blue
//       // listenedForItem.x = ctx.canvas.width - listenedForItem.x;
//       // listenedForItem.draw();
//       // listenedForItem.color = cl.getHSL(cl.red);
//       // listenedForItem.x = scene.context.canvas.width - listenedForItem.x;
//       // ctx.beginPath();
//       // listenedForItem.draw();
//     });
//   };

//   const makeGradientToTransparency = (
//     x0: number,
//     y0: number,
//     x1: number,
//     y1: number,
//     color: string
//   ) => {
//     const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
//     gradient.addColorStop(0, color);
//     gradient.addColorStop(0.9, `rgba(255, 255,255,0.1)`);

//     return gradient;
//   };

//   const drawTriangle = () => {
//     let interativePoints = scene.assets.listenFor;
//     let [pointA, pointB, pointC] = interativePoints;

//     ctx.strokeStyle = 'white';
//     ctx.lineWidth = 5;
//     ctx.lineCap = 'round';

//     // blue;

//     ctx.beginPath();
//     ctx.moveTo(pointA.x, pointA.y);
//     ctx.lineTo(pointB.x, pointB.y);
//     ctx.lineTo(pointC.x, pointC.y);
//     ctx.lineTo(pointA.x, pointA.y);
//     // ctx.stroke();

//     const gradientAB = makeGradientToTransparency(
//       pointA.x,
//       pointA.y,
//       pointB.x,
//       pointB.y,
//       pointA.color
//     );

//     const gradientBC = makeGradientToTransparency(
//       pointB.x,
//       pointB.y,
//       pointC.x,
//       pointC.y,
//       pointB.color
//     );

//     const gradientCA = makeGradientToTransparency(
//       pointC.x,
//       pointC.y,
//       pointA.x,
//       pointA.y,
//       pointC.color
//     );

//     // const gradientAB2 = makeGradientToTransparency(
//     //   pointA.x,
//     //   pointA.y,
//     //   pointB.x,
//     //   pointB.y,
//     //   cl.getHSL(cl.red)
//     // );

//     // const gradientBC2 = makeGradientToTransparency(
//     //   pointB.x,
//     //   pointB.y,
//     //   pointC.x,
//     //   pointC.y,
//     //   cl.getHSL(cl.red)
//     // );

//     // const gradientCA2 = makeGradientToTransparency(
//     //   pointC.x,
//     //   pointC.y,
//     //   pointA.x,
//     //   pointA.y,
//     //   cl.getHSL(cl.red)
//     // );

//     ctx.fillStyle = gradientAB;
//     ctx.fill();
//     ctx.fillStyle = gradientBC;
//     ctx.fill();
//     ctx.fillStyle = gradientCA;
//     ctx.fill();

//     // red
//     // let canvasWidth = ctx.canvas.width;
//     // let canvasHeight = ctx.canvas.height;
//     // ctx.beginPath();
//     // ctx.moveTo(canvasWidth - pointA.x, canvasHeight - pointA.y);
//     // ctx.lineTo(canvasWidth - pointB.x, canvasHeight - pointB.y);
//     // ctx.lineTo(canvasWidth - pointC.x, canvasHeight - pointC.y);
//     // ctx.lineTo(canvasWidth - pointA.x, canvasHeight - pointA.y);

//     // ctx.fillStyle = gradientAB2;
//     // ctx.fill();
//     // ctx.fillStyle = gradientBC2;
//     // ctx.fill();
//     // ctx.fillStyle = gradientCA2;
//     // ctx.fill();
//   };

//   scene.draw = () => {
//     ctx.fillStyle = 'white';
//     togglePointsCanMovme();
//     updateSelectedPoint();

//     drawPoints();

//     drawTriangle();
//   };

//   return scene;
// };

// export default getHomepageScene;
