import AngleCircle from '../../HomePage/MyCanvas/CanvasObjects/AngleCircle';
import { Tau } from '../../HomePage/MyCanvas/CanvasObjects/UsefulConstants';
import EventHandlerConfig from '../../HomePage/MyCanvas/EventHandler/EventHandlerConfig';
import { Scene, SceneGetter } from '../../HomePage/MyCanvas/Scene/Scene';

const getSceneDragToBigAngles: SceneGetter = (
  context: CanvasRenderingContext2D,
  eventHandlerConfig: EventHandlerConfig
) => {
  let scene = new Scene(context, eventHandlerConfig);

  //@ts-ignore
  const passedObject = context?.objectPassedToScene;

  const { controlledPositionRef } = passedObject;

  let width = context.canvas.parentElement?.clientWidth || 0;
  let bigAngleDragger = new AngleCircle(
    context,
    eventHandlerConfig,
    width / 2,
    context.canvas.height / 2,
    Tau / 4
  );

  // bigAngleDragger.angle = Tau * 3.5;

  bigAngleDragger.rotations = 0;

  scene.draw = () => {
    // bigAngleDragger.checkValueWhenNotDragging();
    bigAngleDragger.radialPoint.x = controlledPositionRef.current.x + 25;
    bigAngleDragger.radialPoint.y = controlledPositionRef.current.y + 25;
    bigAngleDragger.updateAngle();

    bigAngleDragger.drawAngle();

    context.fill();
    // context.fillText(controlledPositionRef.current.x, 100, 100);
    bigAngleDragger.drawAngleInUpperRight();
    // context.fillRect(0, 0, 100, 100);
  };

  return scene;
};

export default getSceneDragToBigAngles;
