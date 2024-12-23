import { ListItem } from '@mui/material';
import cl from '../../../../colors';
import InteractivePoint from '../CanvasObjects/InteractivePoint';
import EventHandlerConfig from '../EventHandler/EventHandlerConfig';
import { Scene, SceneGetter } from '../Scene/Scene';
import useWindowSize from '../useWindowSize';

const getHomepageScene: SceneGetter = (
  context: CanvasRenderingContext2D,
  eventHandlerConfig: EventHandlerConfig
) => {
  const scene = new Scene(context, eventHandlerConfig);
  const ctx = scene.context;
  let assets = scene.assets;
  scene.assets.listenFor = [];

  const blueColors = [
    cl.getHSL(cl.red),
    cl.getHSL(cl.blue),
    cl.getHSL(cl.purple),
  ];

  const velocity = 0.1;

  const width = window.innerWidth;

  ctx.canvas.width = width;

  const getBluePoints = () => {
    for (let i = 0; i < 3; i++) {
      let yPosDiff = 0;
      let xPosDiff = 0;
      // let dX = 50;
      // let dY = 50;
      let dX = 0;
      let dY = 0;
      if (i > 0) {
        yPosDiff = 100;
      }
      if (i === 1) {
        xPosDiff = -57.7;
      }
      if (i === 2) {
        xPosDiff = 57.7;
      }
      let interactivePoint = new InteractivePoint(
        ctx,
        eventHandlerConfig,
        width / 2 + xPosDiff,
        ctx.canvas.height / 4 + yPosDiff,
        scene.assets.listenFor,
        30,
        blueColors[i]
      );
    }
  };

  getBluePoints();

  const pointVelocity = {
    x: 0,
    y: -0,
  };

  let round = 0;
  let currentPoint;

  const timerShuffleCurrentPoint = () => {
    currentPoint = scene.assets.listenFor[round % 3];
    round += 1;
    pointVelocity.x = -0.5 + Math.random();
    pointVelocity.x /= 3;
    pointVelocity.y = -0.5 + Math.random();
    pointVelocity.y /= 3;
    setTimeout(timerShuffleCurrentPoint, 8000);
  };

  let canPointsMove = true;

  const makePointsMoveTrue = () => {
    canPointsMove = true;
  };

  let delayedMakePointsMoveTrue: any = null;

  const togglePointsCanMovme = () => {
    if (scene.eventHandlerConfig.cursorStatus.mouseIsDown === true) {
      if (delayedMakePointsMoveTrue) {
        clearTimeout(delayedMakePointsMoveTrue);
      }

      delayedMakePointsMoveTrue = setTimeout(makePointsMoveTrue, 6000);

      canPointsMove = true;
    }
  };

  timerShuffleCurrentPoint();

  const updateSelectedPoint = () => {
    if (!canPointsMove) return;
    // scene.assets.listenFor.forEach((point: any) => {
    //   point.color = 'white';
    // });
    const currentPoint = scene.assets.listenFor[round % 3];
    // currentPoint.color = blueColors[round % 3];
    let buffer = 1;
    if (currentPoint.x >= ctx.canvas.width - buffer) {
      pointVelocity.x *= -1;
    }
    if (currentPoint.x <= buffer) {
      pointVelocity.x *= -1;
    }
    if (currentPoint.y >= ctx.canvas.height - buffer) {
      pointVelocity.y *= -1;
    }
    if (currentPoint.y <= buffer) {
      pointVelocity.y *= -1;
    }
    currentPoint.x += pointVelocity.x;
    currentPoint.y += pointVelocity.y;
  };

  const drawPoints = () => {
    scene.assets.listenFor.forEach((listenedForItem: any) => {
      listenedForItem.draw(); // blue
      // listenedForItem.x = ctx.canvas.width - listenedForItem.x;
      // listenedForItem.draw();
      // listenedForItem.color = cl.getHSL(cl.red);
      // listenedForItem.x = scene.context.canvas.width - listenedForItem.x;
      // ctx.beginPath();
      // listenedForItem.draw();
    });
  };

  const makeGradientToTransparency = (
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    color: string
  ) => {
    const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.9, `rgba(255, 255,255,0.1)`);

    return gradient;
  };

  const drawTriangle = () => {
    let interativePoints = scene.assets.listenFor;
    let [pointA, pointB, pointC] = interativePoints;
    interativePoints.forEach((interactivePoint: InteractivePoint) => {
      interactivePoint.radius = 30;
    });

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';

    // blue;

    ctx.beginPath();
    ctx.moveTo(pointA.x, pointA.y);
    ctx.lineTo(pointB.x, pointB.y);
    ctx.lineTo(pointC.x, pointC.y);
    ctx.lineTo(pointA.x, pointA.y);
    ctx.strokeStyle = cl.getHSL(cl.white);
    // ctx.stroke();

    const gradientAB = makeGradientToTransparency(
      pointA.x,
      pointA.y,
      pointB.x,
      pointB.y,
      pointA.color
    );

    const gradientBC = makeGradientToTransparency(
      pointB.x,
      pointB.y,
      pointC.x,
      pointC.y,
      pointB.color
    );

    const gradientCA = makeGradientToTransparency(
      pointC.x,
      pointC.y,
      pointA.x,
      pointA.y,
      pointC.color
    );

    // const gradientAB2 = makeGradientToTransparency(
    //   pointA.x,
    //   pointA.y,
    //   pointB.x,
    //   pointB.y,
    //   cl.getHSL(cl.red)
    // );

    // const gradientBC2 = makeGradientToTransparency(
    //   pointB.x,
    //   pointB.y,
    //   pointC.x,
    //   pointC.y,
    //   cl.getHSL(cl.red)
    // );

    // const gradientCA2 = makeGradientToTransparency(
    //   pointC.x,
    //   pointC.y,
    //   pointA.x,
    //   pointA.y,
    //   cl.getHSL(cl.red)
    // );

    ctx.fillStyle = gradientAB;
    ctx.fill();
    ctx.fillStyle = gradientBC;
    ctx.fill();
    ctx.fillStyle = gradientCA;
    ctx.fill();

    // red
    // let canvasWidth = ctx.canvas.width;
    // let canvasHeight = ctx.canvas.height;
    // ctx.beginPath();
    // ctx.moveTo(canvasWidth - pointA.x, canvasHeight - pointA.y);
    // ctx.lineTo(canvasWidth - pointB.x, canvasHeight - pointB.y);
    // ctx.lineTo(canvasWidth - pointC.x, canvasHeight - pointC.y);
    // ctx.lineTo(canvasWidth - pointA.x, canvasHeight - pointA.y);

    // ctx.fillStyle = gradientAB2;
    // ctx.fill();
    // ctx.fillStyle = gradientBC2;
    // ctx.fill();
    // ctx.fillStyle = gradientCA2;
    // ctx.fill();
  };

  const drawEye = (posX: number, posY: number) => {
    ctx.beginPath();
    ctx.fillStyle = cl.getHSL(cl.black);
    let eyeRadius = 7;
    ctx.ellipse(posX, posY, eyeRadius, eyeRadius, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.fillStyle = cl.getHSL(cl.white);
    let eye1offset = 2.5;
    let eye2offset = 3.5;
    ctx.ellipse(
      posX - eye1offset,
      posY - eye1offset,
      eyeRadius / 3,
      eyeRadius / 3,
      0,
      0,
      Math.PI * 2
    );
    ctx.ellipse(
      posX + 2,
      posY - eye2offset,
      eyeRadius / 5,
      eyeRadius / 5,
      0,
      0,
      Math.PI * 2
    );
    ctx.fill();
  };

  const drawSmile = () => {
    ctx.beginPath();
    ctx.strokeStyle = cl.getHSL(cl.black);
    ctx.lineWidth = 3;
    ctx.moveTo(ctx.canvas.width / 2 - 20, ctx.canvas.height / 3 + 25);
    ctx.bezierCurveTo(
      ctx.canvas.width / 2 - 10,
      ctx.canvas.height / 3 + 40,
      ctx.canvas.width / 2 + 10,
      ctx.canvas.height / 3 + 40,
      ctx.canvas.width / 2 + 20,
      ctx.canvas.height / 3 + 25
    );
    ctx.stroke();
  };

  let eyeOffset = 12;

  scene.draw = () => {
    ctx.fillStyle = 'white';
    togglePointsCanMovme();
    updateSelectedPoint();

    // drawPoints();

    drawTriangle();
    // drawEye(ctx.canvas.width / 2 - eyeOffset, ctx.canvas.height / 3);
    // drawEye(ctx.canvas.width / 2 + eyeOffset, ctx.canvas.height / 3);
    // drawSmile();
  };

  return scene;
};

export default getHomepageScene;
