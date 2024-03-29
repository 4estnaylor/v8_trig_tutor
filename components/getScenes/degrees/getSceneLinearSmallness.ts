import cl from '../../../colors';
import AngleCircle from '../../HomePage/MyCanvas/CanvasObjects/AngleCircle';
import Revamped2NonInteractiveAngleCircle from '../../HomePage/MyCanvas/CanvasObjects/Revamped2NonInteractiveAngleCircle';
// import RevampedAngleCircle from '../../HomePage/MyCanvas/CanvasObjects/RevampedAngleCircle';
import { Tau } from '../../HomePage/MyCanvas/CanvasObjects/UsefulConstants';
import EventHandlerConfig from '../../HomePage/MyCanvas/EventHandler/EventHandlerConfig';
import { Scene, SceneGetter } from '../../HomePage/MyCanvas/Scene/Scene';

const getSceneLinearSmallness: SceneGetter = (
  context: CanvasRenderingContext2D,
  eventHandlerConfig: EventHandlerConfig
) => {
  let scene = new Scene(context, eventHandlerConfig);

  //@ts-ignore
  const passedObject = context?.objectPassedToScene;

  const { numberOfDivisionsRef, angleInfoRef } = passedObject;

  let visibleCirc = new Revamped2NonInteractiveAngleCircle(
    context,
    angleInfoRef
  );
  visibleCirc.radius *= 1;
  visibleCirc.color = cl.purple;

  const pointsMax = 100;
  const pointsMin = 0;

  let pointDotRadius = 16;

  let maxValue = 10000;

  let points;

  const getSmallnessPoints = (number: number) => {
    let pointsRaw = 100 - (100 * (number - 1)) / 10000;
    let pointsRounded = Math.round(pointsRaw * 10) / 10;
    return pointsRounded;
  };

  let canvasHeight = 390;
  let maxHeight = canvasHeight / 3;
  const getCurrentPointDisplayCoords = (number: number) => {
    let canvasHeight = context.canvas.height;
    let canvasWidth = context.canvas.width;
    let yCoord = canvasHeight - canvasHeight / 2;
    let xCoord = (number / maxValue) * context.canvas.width;
    let coords = { x: xCoord, y: yCoord };
    return coords;
  };

  // visibleCirc.radius = 20;
  // let visibleCirc = new Revamped2AngleCircle(,)

  scene.draw = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    visibleCirc.center.x = context.canvas.width / 2;
    visibleCirc.center.y = context.canvas.height / 2;

    visibleCirc.drawFullDivisions();
    // context.fillRect(coords.x, coords.y, 10, 10);

    // context.stroke();
  };

  return scene;
};

export default getSceneLinearSmallness;
