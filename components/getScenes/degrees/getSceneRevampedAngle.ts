import Revamped2AngleCircle from '../../HomePage/MyCanvas/CanvasObjects/Revamped2AngleCircle';
import EventHandlerConfig from '../../HomePage/MyCanvas/EventHandler/EventHandlerConfig';
import { Scene, SceneGetter } from '../../HomePage/MyCanvas/Scene/Scene';
import {
  AngleInfo,
  ControlledPositions,
  InteractionState,
} from '../../niche/Intro/DragToBigAngles';

interface objectPassedForAngleCircle {
  controlledPositions: ControlledPositions;
  interactionStateRef: React.RefObject<InteractionState>;
  angleInfoRef: React.RefObject<AngleInfo>;
}

const getSceneRevampedAngle: SceneGetter = (
  context: CanvasRenderingContext2D,
  eventHandlerConfig: EventHandlerConfig
) => {
  let scene = new Scene(context, eventHandlerConfig);
  //@ts-ignore
  const passedObject = context?.objectPassedToScene;

  const { controlledPositions, interactionStateRef, angleInfoRef } =
    passedObject;

  let revamped2Circle = new Revamped2AngleCircle(
    context,
    angleInfoRef,
    interactionStateRef,
    controlledPositions
  );

  // revampedCircle.interactionStateRef = interactionStateRef;

  scene.draw = () => {
    // revampedCircle.test();
    revamped2Circle.test();
  };

  return scene;
};

export default getSceneRevampedAngle;
