import { useState } from 'react';
import cl from '../../../colors';
import AngleCircle from '../../HomePage/MyCanvas/CanvasObjects/AngleCircle';
import { Pi, Tau } from '../../HomePage/MyCanvas/CanvasObjects/UsefulConstants';
import EventHandlerConfig from '../../HomePage/MyCanvas/EventHandler/EventHandlerConfig';
import { Scene, SceneGetter } from '../../HomePage/MyCanvas/Scene/Scene';
import greatJobSayings from '../../../greatJobAlternatives';

const getScenePositiveNegativeDirectionality: SceneGetter = (
  context: CanvasRenderingContext2D,
  eventHandlerConfig: EventHandlerConfig
) => {
  const scene = new Scene(context, eventHandlerConfig);
  // @ts-ignore
  // ingoring missing ev for onclick;
  const passedObject = context?.objectPassedToScene;
  const { userSliderValueRef } = passedObject;

  const width = context.canvas.parentElement?.clientWidth || 0;

  context.canvas.width = width;

  const mainAngle = new AngleCircle(
    context,
    eventHandlerConfig,
    width / 2,
    context.canvas.height / 2
  );
  mainAngle.color = 'red';

  if (context.canvas.height > context.canvas.width) {
    mainAngle.radius = context.canvas.width / 3;
  } else {
    mainAngle.radius = context.canvas.height / 3;
  }

  const positiveCircle = new AngleCircle(
    context,
    eventHandlerConfig,
    (3 * width) / 4,
    context.canvas.height / 2
  );

  positiveCircle.color = cl.getHSL(cl.blue);
  positiveCircle.radialPoint.color = cl.getHSL(cl.blue);
  positiveCircle.vertex.color = cl.getHSL(cl.blue);
  positiveCircle.radius = 100;

  const negativeCircle = new AngleCircle(
    context,
    eventHandlerConfig,
    (1 * width) / 4,
    context.canvas.height / 2
  );

  negativeCircle.color = cl.getHSL(cl.red);
  negativeCircle.radialPoint.color = cl.getHSL(cl.red);
  negativeCircle.vertex.color = cl.getHSL(cl.red);
  negativeCircle.radius = 100;
  negativeCircle.isNegative = true;

  const drawDirectionArrow = (angle: number) => {
    context.beginPath();
    let color;
    if (angle > 0) {
      color = cl.getHSLA(cl.blue, 0.5);
    } else if (angle < 0) {
      color = cl.getHSLA(cl.red, 0.5);
    } else {
      color = cl.getHSL(cl.gray_mid);
    }
    context.strokeStyle = color;
    context.lineWidth = 3;
    context.lineCap = 'round';
    context.arc(
      mainAngle.x,
      mainAngle.y,
      mainAngle.radius * 1.2,
      0,
      -1 * angle,
      angle > 0 ? true : false
    );

    context.stroke();

    //directionalArrowsPositive

    // rigth arrow
    context.beginPath();
    let arrowX = mainAngle.x + mainAngle.radius * 1.2 * Math.cos(angle);

    let arrowY = mainAngle.y - mainAngle.radius * 1.2 * Math.sin(angle);
    let TrailMagnitude = 0.05;
    let angleDiff;
    let angleDiffDivisor = 100;
    if (angle > 0) {
      angleDiff = -Tau / angleDiffDivisor;
    } else if (angle < 0) {
      angleDiff = Tau / angleDiffDivisor;
    } else {
      angleDiff = 0;
    }
    let trailXInner =
      mainAngle.x +
      mainAngle.radius * (1.2 - TrailMagnitude) * Math.cos(angle + angleDiff);
    let trailXOuter =
      mainAngle.x +
      mainAngle.radius * (1.2 + TrailMagnitude) * Math.cos(angle + angleDiff);

    let trailYInner =
      mainAngle.y -
      mainAngle.radius * (1.2 - TrailMagnitude) * Math.sin(angle + angleDiff);
    let trailYOuter =
      mainAngle.y -
      mainAngle.radius * (1.2 + TrailMagnitude) * Math.sin(angle + angleDiff);
    let xDiff = 5;
    let yDif = 5;
    context.moveTo(arrowX, arrowY);

    context.lineTo(trailXInner, trailYInner);
    context.moveTo(arrowX, arrowY);
    context.lineTo(trailXOuter, trailYOuter);
    context.stroke();

    context.stroke();
  };

  scene.draw = () => {
    // positiveCircle.update();
    // negativeCircle.update();
    mainAngle.update();
    mainAngle.angle = (userSliderValueRef.current * Tau) / 360;
    if (mainAngle.angle > 0) {
      mainAngle.color = cl.getHSL(cl.blue);
      mainAngle.backgroundColor = cl.getHSL(cl.blue);
    } else {
      mainAngle.color = cl.getHSL(cl.red);
      mainAngle.backgroundColor = cl.getHSL(cl.red);
    }
    // positiveCircle.angle = (userSliderValueRef.current * Tau) / 360;
    // negativeCircle.angle = (userSliderValueRef.current * Tau) / 360;

    mainAngle.drawAngle();
    mainAngle.drawPurpleCenterCover();
    // context.fillStyle = 'black';
    // context.font = '30px Arial';
    if (mainAngle.angle > 0) {
      mainAngle.drawAngleInUpperRight(cl.getHSL(cl.blue));
    } else if (mainAngle.angle < 0) {
      mainAngle.drawAngleInUpperRight(cl.getHSL(cl.red));
    } else {
      mainAngle.drawAngleInUpperRight(cl.getHSL(cl.gray_mid));
    }

    drawDirectionArrow(mainAngle.angle);

    // draw curve arrow with dirreciton
    // context.fillRect(0, 0, 100, 100);

    // let displayText = userSliderValueRef.current.toString();

    // if (userSliderValueRef.current <= 0) {
    //   displayText = userSliderValueRef.current.toString().substring(1);
    // }

    // let displayTextForMeasure = displayText.substring(1);

    // let textMeasureWidth = context.measureText(displayTextForMeasure).width;
    // context.fillText(
    //   displayText,
    //   context.canvas.width / 2 - textMeasureWidth / 2,
    //   context.canvas.height - 20
    // );
    // positiveCircle.drawAngle();
    // negativeCircle.drawAngle();
  };

  return scene;
};

export default getScenePositiveNegativeDirectionality;
