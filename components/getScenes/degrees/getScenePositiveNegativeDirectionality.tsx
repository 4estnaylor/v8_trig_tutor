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

  scene.draw = () => {
    // positiveCircle.update();
    // negativeCircle.update();
    mainAngle.update();
    mainAngle.angle = (userSliderValueRef.current * Tau) / 360;
    if (mainAngle.angle > 0) {
      mainAngle.color = cl.getHSL(cl.blue);
    } else {
      mainAngle.color = cl.getHSL(cl.red);
    }
    // positiveCircle.angle = (userSliderValueRef.current * Tau) / 360;
    // negativeCircle.angle = (userSliderValueRef.current * Tau) / 360;
    context.fillText(userSliderValueRef.current, 100, 100);
    mainAngle.drawAngle();
    mainAngle.drawPurpleCenterCover();
    // positiveCircle.drawAngle();
    // negativeCircle.drawAngle();
  };

  return scene;
};

export default getScenePositiveNegativeDirectionality;
