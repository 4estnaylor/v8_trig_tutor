import { ListItem } from '@mui/material';
import cl from '../../../../colors';
import InteractivePoint from '../CanvasObjects/InteractivePoint';
import EventHandlerConfig from '../EventHandler/EventHandlerConfig';
import { Scene, SceneGetter } from '../Scene/Scene';

const getHomepageScene: SceneGetter = (
  context: CanvasRenderingContext2D,
  eventHandlerConfig: EventHandlerConfig
) => {
  const scene = new Scene(context, eventHandlerConfig);
  console.log(scene.eventHandlerConfig);
  const ctx = scene.context;
  let assets = scene.assets;
  scene.assets.listenFor = [];

  const pointColors = [
    cl.getHSL(cl.red),
    cl.getHSL(cl.blue),
    cl.getHSL(cl.purple),
  ];

  const velocity = 0.1;

  const getTestPoints = () => {
    for (let i = 0; i < 3; i++) {
      let interactivePoint = new InteractivePoint(
        ctx,
        eventHandlerConfig,
        ctx.canvas.width / 2,
        ctx.canvas.width / 2,
        scene.assets.listenFor,
        20,
        pointColors[i]
      );
    }
  };

  getTestPoints();

  const pointVelocities = [
    { dx: 0.1, dy: 0.1 },
    { dx: -0.1, dy: -0.1 },
    { dx: -0.1, dy: 0.1 },
  ];

  const drawPoints = () => {
    scene.assets.listenFor.forEach((listenedForItem: any) => {
      listenedForItem.draw();
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
    gradient.addColorStop(1, `rgba(255,255,255,0)`);

    return gradient;
  };

  const drawTriangle = () => {
    let interativePoints = scene.assets.listenFor;
    let [pointA, pointB, pointC] = interativePoints;

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(pointA.x, pointA.y);
    ctx.lineTo(pointB.x, pointB.y);
    ctx.lineTo(pointC.x, pointC.y);
    ctx.lineTo(pointA.x, pointA.y);
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

    ctx.fillStyle = gradientAB;
    ctx.fill();
    ctx.fillStyle = gradientBC;
    ctx.fill();
    ctx.fillStyle = gradientCA;
    ctx.fill();

    console.log(pointA);
  };

  scene.draw = () => {
    ctx.fillStyle = 'white';

    drawPoints();
    drawTriangle();
  };

  return scene;
};

export default getHomepageScene;
