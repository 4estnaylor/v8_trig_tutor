import cl from '../../../colors';
import AngleCircle from '../../HomePage/MyCanvas/CanvasObjects/AngleCircle';
import Revamped2NonInteractiveAngleCircle from '../../HomePage/MyCanvas/CanvasObjects/Revamped2NonInteractiveAngleCircle';
// import RevampedAngleCircle from '../../HomePage/MyCanvas/CanvasObjects/RevampedAngleCircle';
import { Tau } from '../../HomePage/MyCanvas/CanvasObjects/UsefulConstants';
import EventHandlerConfig from '../../HomePage/MyCanvas/EventHandler/EventHandlerConfig';
import { Scene, SceneGetter } from '../../HomePage/MyCanvas/Scene/Scene';

const getSceneLinearLine: SceneGetter = (
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

  let canvasHeight = context.canvas.height;
  let yAxisWidth = 50;
  let xAxisHeight = 50;
  let maxHeight = canvasHeight;
  let radius = 15;
  let buffer = radius * 2;
  const getCurrentPointDisplayCoords = (number: number) => {
    let yCoord =
      canvasHeight -
      (getSmallnessPoints(number) / 100) *
        (maxHeight - xAxisHeight / 2 - radius) -
      xAxisHeight / 2 +
      radius / 2;
    let xCoord =
      yAxisWidth +
      (number / maxValue) * (context.canvas.width - yAxisWidth - radius) -
      radius / 2;
    let coords = { x: xCoord, y: yCoord };
    return coords;
  };

  const drawYAxis = () => {
    context.beginPath();
    context.moveTo(yAxisWidth / 2, canvasHeight - xAxisHeight / 2 + 10);
    context.lineTo(yAxisWidth / 2, 0 + xAxisHeight / 2);
    context.strokeStyle = cl.getHSL(cl.black);
    context.stroke();
  };

  const drawLine = () => {
    context.beginPath();
    context.moveTo(yAxisWidth, buffer);
    context.lineTo(
      context.canvas.width - radius - 7,
      context.canvas.height - radius - 1
    );
    context.strokeStyle = cl.getHSLA(cl.red, 0.5);
    context.lineWidth = 3;
    context.stroke();
  };

  // visibleCirc.radius = 20;
  // let visibleCirc = new Revamped2AngleCircle(,)

  scene.draw = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    let coords = getCurrentPointDisplayCoords(numberOfDivisionsRef.current);
    let smallnessPoints = getSmallnessPoints(numberOfDivisionsRef.current);
    context.fillText(smallnessPoints.toString(), 100, 100);
    visibleCirc.center.x = context.canvas.width / 2;
    visibleCirc.center.y = context.canvas.height / 2;

    // visibleCirc.radius = 20;
    // visibleCirc.initialRadius = 20;
    let displayDivisions = Math.round(numberOfDivisionsRef.current).toString();
    // context.fillText(displayDivisions, 195, 195);
    // visibleCirc.draw();
    // visibleCirc.drawFullDivisions();
    // context.fillRect(coords.x, coords.y, 10, 10);
    context.beginPath();
    context.ellipse(coords.x, coords.y, radius, radius, 0, 0, Tau);
    context.fillStyle = cl.getHSL(cl.red);
    context.fill();
    // draw line
    drawLine();
    drawYAxis();

    // context.stroke();
  };

  return scene;
};

export default getSceneLinearLine;
