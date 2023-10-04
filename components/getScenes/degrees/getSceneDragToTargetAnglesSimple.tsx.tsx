import cl from '../../../colors';
import AngleCircle from '../../HomePage/MyCanvas/CanvasObjects/AngleCircle';
import { Pi, Tau } from '../../HomePage/MyCanvas/CanvasObjects/UsefulConstants';
import EventHandlerConfig from '../../HomePage/MyCanvas/EventHandler/EventHandlerConfig';
import { Scene, SceneGetter } from '../../HomePage/MyCanvas/Scene/Scene';

const getSceneDragToTargetAnglesSimple: SceneGetter = (
  context: CanvasRenderingContext2D,
  eventHandlerConfig: EventHandlerConfig
) => {
  const scene = new Scene(context, eventHandlerConfig);
  // @ts-ignore
  // ingoring missing ev for onclick;
  const passedObject = context?.objectPassedToScene;
  const { controlledPositionRef } = passedObject;

  context.canvas.addEventListener('click', () => {});

  // const draw360Circle = () => {
  //   // console.log('drawing');
  //   let context = scene.context;
  //   context.beginPath();
  //   context.lineWidth = 7;
  //   context.strokeStyle = cl.getHSL(cl.purple_light);
  //   context.ellipse(
  //     context.canvas.width / 4,
  //     context.canvas.width / 4 + 60,
  //     context.canvas.width / 5,
  //     context.canvas.width / 5,
  //     0,
  //     0,
  //     Tau
  //   );
  //   context.stroke();
  // };

  // const drawOtherCircle = () => {
  //   let context = scene.context;
  //   context.beginPath();
  //   context.lineWidth = 7;
  //   context.strokeStyle = cl.getHSL(cl.white);
  //   context.ellipse(
  //     context.canvas.width / 4,
  //     context.canvas.width / 4 + 60,
  //     context.canvas.width / 5,
  //     context.canvas.width / 5,
  //     0,
  //     0,
  //     Tau
  //   );
  //   context.stroke();
  // };

  const width = context.canvas.parentElement?.clientWidth || 0;

  context.canvas.width = width;

  const testUnitCirc = new AngleCircle(
    context,
    eventHandlerConfig,
    width / 2,
    context.canvas.height / 2
  );

  testUnitCirc.color = cl.getHSL(cl.purple);
  testUnitCirc.radialPoint.color = cl.getHSL(cl.purple);
  testUnitCirc.vertex.color = cl.getHSL(cl.purple);

  let smallerLength = context.canvas.width;
  if (smallerLength > context.canvas.height) {
    smallerLength = context.canvas.height;
  }

  testUnitCirc.radius = smallerLength / 3;

  // testUnitCirc.radius = 50;
  // // testUnitCirc.x = context.canvas.width / 2;
  // testUnitCirc.y = context.canvas.height / 2;
  // testUnitCirc.customUnitDivisions = 100;
  // testUnitCirc.angle = Tau;
  // testUnitCirc.color = 'green';
  // testUnitCirc.radialPoint.color = 'black';
  // testUnitCirc.angle = Tau;

  scene.draw = () => {
    testUnitCirc.radialPoint.x = controlledPositionRef.current.x + 25;
    testUnitCirc.radialPoint.y = controlledPositionRef.current.y + 25;
    // console.log('userEnteredDegreeValue', userEnteredDegreeValue);
    // draw360Circle();
    // drawOtherCircle();
    context.fillStyle = 'red';

    testUnitCirc.draw();

    context.fillStyle = 'black';
    context.fillText(controlledPositionRef.current.y, 100, 75);
    context.fillText(controlledPositionRef.current.x, 100, 100);
    // testUnitCirc.drawFilledLoop();
    testUnitCirc.drawAngleInUpperRight();

    console.log('testUnitx', testUnitCirc.x);
    // setChangeMe((prev: any) => {
    //   prev + 1;
    // });
  };

  return scene;
};

export default getSceneDragToTargetAnglesSimple;
