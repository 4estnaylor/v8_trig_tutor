import Revamped2AngleCircle from '../../HomePage/MyCanvas/CanvasObjects/Revamped2AngleCircle';
import EventHandlerConfig from '../../HomePage/MyCanvas/EventHandler/EventHandlerConfig';
import { Scene, SceneGetter } from '../../HomePage/MyCanvas/Scene/Scene';

const getSceneRevampedAngle: SceneGetter = (
  context: CanvasRenderingContext2D,
  eventHandlerConfig: EventHandlerConfig
) => {
  let scene = new Scene(context, eventHandlerConfig);
  //@ts-ignore
  const passedObject = context?.objectPassedToScene;

  const { controlledPositions, interactionStateRef, angleInfoRef } =
    passedObject;

  console.log(controlledPositions);

  // let revampedCircle = new RevampedAngleCircle(
  //   context,
  //   angleInfoRef,
  //   controlledPositions
  // );
  let revamped2Circle = new Revamped2AngleCircle();

  // revampedCircle.interactionStateRef = interactionStateRef;

  scene.draw = () => {
    // revampedCircle.test();
    revamped2Circle.test();
  };

  return scene;
};

export default getSceneRevampedAngle;
