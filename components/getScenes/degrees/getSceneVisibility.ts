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
  } = passedObject;

  let testRadii = [50, 100, 500, 1000, 2000, 4000];

  let visibleCirc = new Revamped2NonInteractiveAngleCircle(
    context,
    angleInfoRef
  );
  visibleCirc.radius *= 1.25;
  visibleCirc.color = cl.purple;
  // visibleCirc.radius = 20;
  // let visibleCirc = new Revamped2AngleCircle(,)
  console.log('values to testref', currentTestValueIndexRef);

  scene.draw = () => {
    visibleCirc.radius = testRadii[currentTestValueIndexRef.current];
    visibleCirc.center.x =
      context.canvas.width / 2 - testRadii[currentTestValueIndexRef.current];
    // visibleCirc.radius = 20;
    // visibleCirc.initialRadius = 20;
    let displayDivisions = Math.round(numberOfDivisionsRef.current).toString();
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.fillText(currentTestValueIndexRef.current, 195, 195);
    // visibleCirc.draw();
    visibleCirc.drawFullDivisions();
    // context.stroke();
  };

  return scene;
};

export default getSceneVisibility;
