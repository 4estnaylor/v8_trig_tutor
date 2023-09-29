import cl from '../../../colors';
import AngleCircle from '../../HomePage/MyCanvas/CanvasObjects/AngleCircle';
import { Pi, Tau } from '../../HomePage/MyCanvas/CanvasObjects/UsefulConstants';
import EventHandlerConfig from '../../HomePage/MyCanvas/EventHandler/EventHandlerConfig';
import { Scene, SceneGetter } from '../../HomePage/MyCanvas/Scene/Scene';

const dragToTargetAngles: SceneGetter = (
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

  const drawOtherCircle = () => {
    let context = scene.context;
    context.beginPath();
    context.lineWidth = 7;
    context.strokeStyle = cl.getHSL(cl.white);
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

  const testUnitCirc = new AngleCircle(
    context,
    eventHandlerConfig,
    2000,
    context.canvas.height / 2
  );
  testUnitCirc.radius = 50;
  testUnitCirc.x = 200;
  testUnitCirc.y = 100;

  scene.draw = () => {
    // console.log('userEnteredDegreeValue', userEnteredDegreeValue);
    // draw360Circle();
    // drawOtherCircle();
    testUnitCirc.draw();
    testUnitCirc.drawDivisionTicks();
    context.fillStyle = 'black';
    context.fillText(controlledPositionRef.current.y, 100, 75);
    context.fillText(controlledPositionRef.current.x, 100, 100);
    // setChangeMe((prev: any) => {
    //   prev + 1;
    // });
  };

  return scene;
};

export default dragToTargetAngles;
