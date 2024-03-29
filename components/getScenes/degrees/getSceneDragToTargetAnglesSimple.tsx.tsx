import { useState } from 'react';
import cl from '../../../colors';
import AngleCircle from '../../HomePage/MyCanvas/CanvasObjects/AngleCircle';
import { Pi, Tau } from '../../HomePage/MyCanvas/CanvasObjects/UsefulConstants';
import EventHandlerConfig from '../../HomePage/MyCanvas/EventHandler/EventHandlerConfig';
import { Scene, SceneGetter } from '../../HomePage/MyCanvas/Scene/Scene';
import greatJobSayings from '../../../greatJobAlternatives';

const getSceneDragToTargetAnglesSimple: SceneGetter = (
  context: CanvasRenderingContext2D,
  eventHandlerConfig: EventHandlerConfig
) => {
  const scene = new Scene(context, eventHandlerConfig);
  // @ts-ignore
  // ingoring missing ev for onclick;
  const passedObject = context?.objectPassedToScene;
  const { controlledPositionRef, angleRef, targetAngleObjRef } = passedObject;

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

  // testUnitCirc.color = cl.getHSL(cl.blue);
  testUnitCirc.radialPoint.color = cl.getHSL(cl.blue);
  testUnitCirc.vertex.color = cl.getHSL(cl.blue);

  let smallerLength = context.canvas.width;
  if (smallerLength > context.canvas.height) {
    smallerLength = context.canvas.height;
  }

  testUnitCirc.radius = smallerLength / 3;
  testUnitCirc.handleOnUpdate = () => {
    angleRef.current = Math.round((testUnitCirc.angle * 360) / Tau);
  };

  // testUnitCirc.radius = 50;
  // // testUnitCirc.x = context.canvas.width / 2;
  // testUnitCirc.y = context.canvas.height / 2;
  // testUnitCirc.customUnitDivisions = 100;
  // testUnitCirc.angle = Tau;
  // testUnitCirc.color = 'green';
  // testUnitCirc.radialPoint.color = 'black';
  // testUnitCirc.angle = Tau;
  let alreadyFlashed = false;
  let greenOpacity;

  const greenFlashTimer = (opacity: number) => {
    alreadyFlashed = true;
  };

  setTimeout(() => {
    alreadyFlashed = true;
  }, 1000);

  const triggerGreenFlash = () => {
    greenOpacity = 1;
  };

  const greenFlashCover = () => {};

  // green flash "cover"
  // start increasing green opacity with each frame
  // set timer to start decreasing green opacity down to zero

  const greenFlash = () => {
    context.fillStyle = cl.getHSLA(cl.green, 0.5);
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  };

  const unansweredDraw = () => {
    testUnitCirc.radialPoint.x = controlledPositionRef.current.x + 25;
    testUnitCirc.radialPoint.y = controlledPositionRef.current.y + 25;

    testUnitCirc.update();
    testUnitCirc.rotations = 0;
    if (testUnitCirc.angle < 0) {
      testUnitCirc.angle = Tau + testUnitCirc.angle;
      testUnitCirc.sign = 'positive';
    }
    testUnitCirc.drawAngle();
    testUnitCirc.drawDivisionTicks(360);
    // testUnitCirc.drawPurpleCenterCover();
    // testUnitCirc.drawAngleRainbow();
    // testUnitCirc.drawPurpleCenterCover();
    testUnitCirc.drawDottedTouchConncetLine();

    // testUnitCirc.drawFilledLoop();
    // context.fillStyle = 'black';
    testUnitCirc.drawAngleInUpperRight();
  };

  const correctDraw = () => {
    testUnitCirc.angle = (targetAngleObjRef.current.angle * Tau) / 360;
    testUnitCirc.drawDivisionTicks(360);
    testUnitCirc.drawAngle();

    testUnitCirc.drawAngleCorrect();

    testUnitCirc.drawAngleCoverCorrect();

    // testUnitCirc.drawFilledLoop();
    // context.fillStyle = 'black';
    let affirmationphrase = 'Correct' as string;
    let affirmationphraseMetrics =
      testUnitCirc.context.measureText(affirmationphrase);
    let xVal = context.canvas.width / 2 - affirmationphraseMetrics.width / 2;
    let yVal = context.canvas.height - 30;
    context.fillStyle = cl.getHSL(cl.green);
    context.fillText(affirmationphrase, xVal, yVal);
    // draw
  };

  scene.draw = () => {
    testUnitCirc.color = cl.getHSL(cl.blue);
    if (testUnitCirc.sign === 'positive') {
      testUnitCirc.color === cl.getHSL(cl.blue);
      testUnitCirc.backgroundColor = cl.getHSL(cl.blue);
      testUnitCirc.foregroundColor = cl.getHSL(cl.blue);
    } else if (testUnitCirc.sign === 'negative') {
      // testUnitCirc.color = cl.getHSL(cl.red);
      testUnitCirc.sign = 'positive';
      testUnitCirc.angle = Tau + testUnitCirc.angle;
    }
    // unansweredDraw();
    if (targetAngleObjRef.current.correct) {
      correctDraw();
    } else {
      unansweredDraw();
    }

    // testUnitCirc.radialPoint.x = controlledPositionRef.current.x + 25;
    // testUnitCirc.radialPoint.y = controlledPositionRef.current.y + 25;
    // // console.log('userEnteredDegreeValue', userEnteredDegreeValue);
    // // draw360Circle();
    // // drawOtherCircle();
    // // context.fillStyle = 'red';

    // // testUnitCirc.draw();
    // testUnitCirc.update();
    // // testUnitCirc.drawAngleRainbow();

    // testUnitCirc.drawAngleCorrect();
    // testUnitCirc.drawAngleCoverCorrect();

    // context.fillStyle = 'black';

    // // testUnitCirc.drawFilledLoop();
    // testUnitCirc.drawAngleInUpperRight();

    // setChangeMe((prev: any) => {
    //   prev + 1;
    // });
  };

  return scene;
};

export default getSceneDragToTargetAnglesSimple;
