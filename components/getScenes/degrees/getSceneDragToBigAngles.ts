import cl from '../../../colors';
import AngleCircle from '../../HomePage/MyCanvas/CanvasObjects/AngleCircle';
import RevampedAngleCircle from '../../HomePage/MyCanvas/CanvasObjects/RevampedAngleCircle';
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

  const {
    controlledPositionCenterRef,
    controlledPositionAnchorRef,
    controlledPositionLeadRef,
    interactionStateRef,
  } = passedObject;

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

  let revampedCircle = new RevampedAngleCircle(context);

  // revampedCircle.centerNodePositionRef = controlledPositionRef;
  revampedCircle.centerNodePosition = {
    x: 0,
    y: 0,
  };

  revampedCircle.centerNodePositionRef = controlledPositionCenterRef;
  revampedCircle.anchorNodePositionRef = controlledPositionAnchorRef;
  revampedCircle.leadNodePositionRef = controlledPositionLeadRef;
  revampedCircle.interactionStateRef = interactionStateRef;
  revampedCircle.color = cl.purple;

  // console.log(context);
  // console.log(interactionStateRef);

  // revampedCircle.updateCenterPosition();
  // revampedCircle.updateAnchorPosition();
  scene.draw = () => {
    revampedCircle.test();
    let angleString = Math.round(
      (100 * revampedCircle.angle * 360) / Tau / 100
    ).toString();
    let revolutionsString = revampedCircle.revolutions.toString();

    context.fillText('angle: ' + angleString, 100, 100);
    context.fillText('revoltuions: ' + revolutionsString, 100, 50);

    // console.log(controlledPositionCenterRef);
    // console.log(interactionStateRef.current.anchor);
    // console.log(controlledPositionRef.current.x);
    // console.log(controlledPositionAnchorRef.current.x);
    // console.log(controlledPositionAnchorRef.current.x);
    // controlledPositionAnchorRef.current.x = 200;
    // controlledPositionAnchorRef.current = { x: 100, y: 100 };

    // bigAngleDragger.checkValueWhenNotDragging();
    // bigAngleDragger.radialPoint.x = controlledPositionRef.current.x + 25;
    // bigAngleDragger.radialPoint.y = controlledPositionRef.current.y + 25;
    // bigAngleDragger.updateAngle();
    // bigAngleDragger.drawAngle();
    // bigAngleDragger.drawAngleWithRotations();

    // revampedCircle.drawAnchorNotch();
    // revampedCircle.drawAngleCircleShadow();
    // revampedCircle.drawAnchorNotch();

    context.fill();
    // context.fillText(controlledPositionAnchorRef.current.y, 100, 200);
    // bigAngleDragger.drawAngleInUpperRight();
    // context.fillRect(0, 0, 100, 100);
  };

  return scene;
};

export default getSceneDragToBigAngles;
