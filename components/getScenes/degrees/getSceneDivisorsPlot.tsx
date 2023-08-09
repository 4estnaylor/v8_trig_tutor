import cl from '../../../colors';
import AngleCircle from '../../HomePage/MyCanvas/CanvasObjects/AngleCircle';
import { Pi, Tau } from '../../HomePage/MyCanvas/CanvasObjects/UsefulConstants';
import EventHandlerConfig from '../../HomePage/MyCanvas/EventHandler/EventHandlerConfig';
import { Scene, SceneGetter } from '../../HomePage/MyCanvas/Scene/Scene';

const getSceneDivisorsPlot: SceneGetter = (
  context: CanvasRenderingContext2D,
  eventHandlerConfig: EventHandlerConfig
) => {
  const scene = new Scene(context, eventHandlerConfig);
  // @ts-ignore
  // ingoring missing ev for onclick;
  const passedObject = context?.objectPassedToScene;
  const {
    // userEnteredDegreeValue,
    // setUserEnteredDegreeValue,
    // changeMe,
    // setChangeMe,
    setSelectedScale,
    setSelectedValue,
    selectedValueRef,
  } = passedObject;

  const getFactors = (number: number) =>
    Array.from(Array(number + 1), (_, i) => i).filter((i) => number % i === 0);

  const getNumberOfFactors = (number: number) => {
    return getFactors(number).length;
  };

  let data: number[] = [];

  console.log('is happening! ahwao');

  for (let i = 0; i < 10; i++) {
    let numOfFators = getNumberOfFactors(i);
    data.push(numOfFators);
  }

  const max = Math.max(...data);
  const res: number[] = [];
  data.forEach((item, index) => (item === max ? res.push(index) : null));
  console.log(res);

  let xIncrement = context.canvas.width / data.length;
  let radius = 3;
  let radiusMax = 10;
  let bottomMargin = 30;

  const drawPoints = () => {
    context.moveTo(0, context.canvas.height);
    context.fillStyle = cl.getHSL(cl.purple);
    data.forEach((data, index) => {
      if (index + 1 === selectedValueRef.current && radius < 10) {
        radius = 10;
      } else {
        radius = 3;
      }
      let xPos = (index * context.canvas.width) / 9;
      let yPos = context.canvas.height - bottomMargin - data * 20;
      context.ellipse(xPos, yPos, radius, radius, 0, 0, Tau);
      context.fill();
      context.beginPath();
    });
    context.stroke();
  };

  scene.draw = () => {
    drawPoints();
    context.fillText(selectedValueRef.current, 100, 100);
    // console.log('userEnteredDegreeValue', userEnteredDegreeValue);
    // draw360Circle();
    // drawOtherCircle();
    // context.fillText(changeMe, 300, 100);
    // setChangeMe((prev: any) => {
    //   prev + 1;
    // });
  };

  return scene;
};

export default getSceneDivisorsPlot;
