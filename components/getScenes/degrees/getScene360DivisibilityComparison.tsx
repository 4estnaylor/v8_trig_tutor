import cl from '../../../colors';
import { Pi, Tau } from '../../HomePage/MyCanvas/CanvasObjects/UsefulConstants';
import EventHandlerConfig from '../../HomePage/MyCanvas/EventHandler/EventHandlerConfig';
import { Scene, SceneGetter } from '../../HomePage/MyCanvas/Scene/Scene';

const getScene360Divisibility: SceneGetter = (
  context: CanvasRenderingContext2D,
  eventHandlerConfig: EventHandlerConfig
) => {
  const scene = new Scene(context, eventHandlerConfig);

  const draw360Circle = () => {
    console.log('drawing');
    let context = scene.context;
    context.beginPath();
    context.lineWidth = 7;
    context.strokeStyle = cl.getHSL(cl.purple);
    context.ellipse(
      context.canvas.width / 4,
      context.canvas.width / 4 + 60,
      context.canvas.width / 5,
      context.canvas.width / 5,
      0,
      0,
      Tau
    );
    context.stroke();
  };

  const drawOtherCircle = () => {
    console.log('drawing');
    let context = scene.context;
    context.beginPath();
    context.lineWidth = 7;
    context.strokeStyle = cl.getHSL(cl.black);
    context.ellipse(
      (context.canvas.width * 3) / 4,
      context.canvas.width / 4 + 60,
      context.canvas.width / 5,
      context.canvas.width / 5,
      0,
      0,
      Tau
    );
    context.stroke();
  };

  scene.draw = () => {
    draw360Circle();
    drawOtherCircle();
  };

  return scene;
};

export default getScene360Divisibility;
