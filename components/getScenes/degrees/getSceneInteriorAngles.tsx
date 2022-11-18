import cl from '../../../colors';
import InteractivePoint from '../../HomePage/MyCanvas/CanvasObjects/InteractivePoint';
import InteractiveTriangle from '../../HomePage/MyCanvas/CanvasObjects/InteractiveTriangle';
import EventHandlerConfig from '../../HomePage/MyCanvas/EventHandler/EventHandlerConfig';
import { Scene, SceneGetter } from '../../HomePage/MyCanvas/Scene/Scene';

const getSceneInteriorAngles: SceneGetter = (
  context: CanvasRenderingContext2D,
  eventHandlerConfig: EventHandlerConfig
) => {
  const scene = new Scene(context, eventHandlerConfig);
  const width = context.canvas.parentElement?.clientWidth || 0;

  context.canvas.width = width;

  let pointA = new InteractivePoint(
    context,
    eventHandlerConfig,
    100,
    100,
    [],
    25,
    cl.getHSL(cl.red)
  );
  let pointB = new InteractivePoint(
    context,
    eventHandlerConfig,
    50,
    150,
    [],
    25,
    cl.getHSL(cl.blue)
  );
  let pointC = new InteractivePoint(
    context,
    eventHandlerConfig,
    150,
    150,
    [],
    25,
    cl.getHSL(cl.purple)
  );

  const triangle = new InteractiveTriangle(
    pointA,
    pointB,
    pointC,
    cl.getHSL(cl.gray_dark)
  );

  scene.draw = () => {
    triangle.draw();
  };

  return scene;
};

export default getSceneInteriorAngles;
