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

  const getTestPoints = () => {
    for (let i = 0; i < 3; i++) {
      let interactivePoint = new InteractivePoint(
        ctx,
        eventHandlerConfig,
        100,
        100,
        scene.assets.listenFor,
        20,
        pointColors[i]
      );
    }
  };

  getTestPoints();

  const drawPoints = () => {
    scene.assets.listenFor.forEach((listenedForItem: any) => {
      listenedForItem.draw();
    });
  };

  const drawTriangle = () => {
    let interativePoints = scene.assets.listenFor;
    let [pointA, pointB, pointC] = interativePoints;

    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.moveTo(pointA.x, pointA.y);
    ctx.lineTo(pointB.x, pointB.y);
    ctx.lineTo(pointC.x, pointC.y);
    ctx.lineTo(pointA.x, pointA.y);
    ctx.stroke();

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
