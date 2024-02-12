import cl from '../../../colors';
import AngleCircle from '../../HomePage/MyCanvas/CanvasObjects/AngleCircle';
import Revamped2NonInteractiveAngleCircle from '../../HomePage/MyCanvas/CanvasObjects/Revamped2NonInteractiveAngleCircle';
// import RevampedAngleCircle from '../../HomePage/MyCanvas/CanvasObjects/RevampedAngleCircle';
import { Tau } from '../../HomePage/MyCanvas/CanvasObjects/UsefulConstants';
import EventHandlerConfig from '../../HomePage/MyCanvas/EventHandler/EventHandlerConfig';
import { Scene, SceneGetter } from '../../HomePage/MyCanvas/Scene/Scene';

const getSceneVisibility: SceneGetter = (
  context: CanvasRenderingContext2D,
  eventHandlerConfig: EventHandlerConfig
) => {
  let scene = new Scene(context, eventHandlerConfig);

  //@ts-ignore
  const passedObject = context?.objectPassedToScene;

  const {
    numberOfDivisionsRef,
    angleInfoRef,
    // valuesToTestRef,
    currentTestValueIndexRef,
    radiusLengthRef,
  } = passedObject;

  let testRadii = [50, 100, 200, 400, 800, 1600];

  let visibleCirc = new Revamped2NonInteractiveAngleCircle(
    context,
    angleInfoRef
  );
  visibleCirc.radius *= 1;
  visibleCirc.color = cl.purple;
  // visibleCirc.radius = 20;
  // let visibleCirc = new Revamped2AngleCircle(,)
  console.log('values to testref', currentTestValueIndexRef);

  const drawRadius = () => {
    let x0 = visibleCirc.center.x;
    let y0 = visibleCirc.center.y;
    let x1 = visibleCirc.center.x + visibleCirc.radius;
    let y1 = visibleCirc.center.y;
    let lineColor = cl.getHSL(cl.red);
    let con;

    context.strokeStyle = lineColor;
    context.lineWidth = 3;

    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.stroke();
  };

  scene.draw = () => {
    context.canvas.height = 300;
    visibleCirc.radius = radiusLengthRef.current * 20;
    visibleCirc.center.x =
      context.canvas.width / 2 - radiusLengthRef.current * 20;
    visibleCirc.center.y = context.canvas.height / 2;
    // visibleCirc.radius = 20;
    // visibleCirc.initialRadius = 20;
    let displayDivisions = Math.round(numberOfDivisionsRef.current).toString();
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillText(currentTestValueIndexRef.current, 195, 195);
    // visibleCirc.draw();
    visibleCirc.drawFullDivisions();
    drawRadius();
    // context.stroke();
  };

  return scene;
};

export default getSceneVisibility;
