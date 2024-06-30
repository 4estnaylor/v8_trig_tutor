import { buffer } from 'micro';
import cl from '../../../colors';
import AngleCircle from '../../HomePage/MyCanvas/CanvasObjects/AngleCircle';
import Revamped2NonInteractiveAngleCircle from '../../HomePage/MyCanvas/CanvasObjects/Revamped2NonInteractiveAngleCircle';
// import RevampedAngleCircle from '../../HomePage/MyCanvas/CanvasObjects/RevampedAngleCircle';
import { Tau } from '../../HomePage/MyCanvas/CanvasObjects/UsefulConstants';
import EventHandlerConfig from '../../HomePage/MyCanvas/EventHandler/EventHandlerConfig';
import { Scene, SceneGetter } from '../../HomePage/MyCanvas/Scene/Scene';
import P from '../../P';

const getSceneVisibilityGraph: SceneGetter = (
  context: CanvasRenderingContext2D,
  eventHandlerConfig: EventHandlerConfig
) => {
  let scene = new Scene(context, eventHandlerConfig);

  //@ts-ignore
  const passedObject = context?.objectPassedToScene;

  const {
    rowsRef,
    currentTestValueIndexRef,
    numberOfDivisionsRef,
    radiusLengthRef,
    lineSlopeRef,
  } = passedObject;

  let testRadii = [50, 100, 200, 400, 800, 1600];

  // let visibleCirc = new Revamped2NonInteractiveAngleCircle(
  //   context,
  //   angleInfoRef
  // );
  // visibleCirc.radius *= 1.25;
  // visibleCirc.color = cl.purple;
  // visibleCirc.radius = 20;
  // let visibleCirc = new Revamped2AngleCircle(,)
  console.log('values to testref', rowsRef.current);

  context.canvas.style.background = cl.getHSLA(cl.white, 0);

  let maxDivisionsSoFar = 0;

  rowsRef.current.forEach((row: any) => {
    if (row.maxDivisionsDistinguishable !== null) {
      if (row.maxDivisionsDistinguishable > maxDivisionsSoFar) {
        maxDivisionsSoFar = row.maxDivisionsDistinguishable;
      } else {
      }
    }
  });

  let maxDivisionsCurrently = maxDivisionsSoFar;

  let maxY = 10000;
  // if (maxY > 10000) {
  //   maxY = 10000;
  // }

  // maxY = 10000;
  let maxX = 1600;
  let bufferPx = 25;
  let dotRadius = 4;
  let selectDotRadius = dotRadius * 1.75;
  let color = cl.getHSLA(cl.green, 0.8);
  let currentColor = cl.getHSLA(cl.green, 0.8);
  let selectColor = cl.getHSL(cl.green);

  const getContextCoords = (radius: number, numberOfDivisions: number) => {
    let length = context.canvas.width - 2 * bufferPx - 2 * dotRadius - 115;
    let height = context.canvas.height - 2 * bufferPx - 2 * dotRadius;
    let xPos = 20 + bufferPx + length * (radius / maxX);
    let yPos =
      dotRadius + bufferPx + height - (numberOfDivisions / maxY) * height;
    return { x: xPos, y: yPos };
  };

  const drawDot = (x: number, y: number) => {
    context.beginPath();
    context.ellipse(x, y, dotRadius, dotRadius, 0, 0, Tau);
    context.fillStyle = color;
    context.fill();
  };

  const drawCurrentDot = (x: number, y: number) => {
    context.beginPath();
    context.ellipse(x, y, dotRadius, dotRadius, 0, 0, Tau);
    context.fillStyle = currentColor;
    context.fill();
  };

  const drawSelectDot = (x: number, y: number) => {
    context.beginPath();
    context.ellipse(x, y, selectDotRadius, selectDotRadius, 0, 0, Tau);
    context.strokeStyle = selectColor;
    context.lineWidth = 3;
    context.stroke();
  };

  const drawMarkedDots = () => {
    rowsRef.current.forEach((row: any, index: number) => {
      if (row.maxDivisionsDistinguishable !== null) {
        let { x, y } = getContextCoords(
          row.pixelSize,
          row.maxDivisionsDistinguishable
        );
        if (index === currentTestValueIndexRef.current) {
          drawCurrentDot(x, y);
        } else {
          drawDot(x, y);
        }
      }
    });
  };

  const drawLinearRegression = () => {
    if (!lineSlopeRef.current) return;
    if (rowsRef.current.length < 1) return;
    let length = context.canvas.width - 2 * bufferPx - 2 * dotRadius - 150;
    let height = context.canvas.height - 2 * bufferPx - 2 * dotRadius;
    let x0 = 20 + bufferPx;
    let y0 = dotRadius + bufferPx + height;

    // let finalRow = rowsRef.current[rowsRef.current.length - 1];
    let { x, y } = getContextCoords(2000, 2000 * lineSlopeRef.current);

    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x, y);
    context.lineCap = 'round';
    context.lineWidth = 15;
    context.strokeStyle = cl.getHSLA(cl.green, 0.3);
    context.stroke();
  };

  const drawSelectingDot = () => {
    let { x, y } = getContextCoords(
      radiusLengthRef.current,
      numberOfDivisionsRef.current
    );
    drawSelectDot(x, y);

    // rowsRef.current.forEach((row: any, index: number) => {
    //   if (row.maxDivisionsDistinguishable !== null) {
    //     let { x, y } = getContextCoords(
    //       radiusLengthRef.current,
    //       numberOfDivisionsRef.current
    //     );
    //     if (index === currentTestValueIndexRef.current) {
    //       drawSelectDot(x, y);
    //     } else {
    //       // drawDot(x, y);
    //     }
    //   }
    // });
  };

  const setCanvasHeight = () => {};

  scene.draw = () => {
    context.canvas.height = 500;
    drawMarkedDots();
    drawSelectingDot();
    drawLinearRegression();
    context.fillText(lineSlopeRef.current, 100, 100);
    // drawDot(100, 50);
    // console.log(rowsRef.current);
    // visibleCirc.radius = testRadii[currentTestValueIndexRef.current];
    // visibleCirc.center.x =
    //   context.canvas.width / 2 - testRadii[currentTestValueIndexRef.current];
    // visibleCirc.radius = 20;
    // visibleCirc.initialRadius = 20;
    // let displayDivisions = Math.round(numberOfDivisionsRef.current).toString();
    // context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    // context.fillText(currentTestValueIndexRef.current, 195, 195);
    // visibleCirc.draw();
    // visibleCirc.drawFullDivisions();
    // context.stroke();
  };

  return scene;
};

export default getSceneVisibilityGraph;
