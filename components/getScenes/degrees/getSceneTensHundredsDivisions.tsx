import React, { useEffect } from 'react';
import InteractivePoint from '../../HomePage/MyCanvas/CanvasObjects/InteractivePoint';
import EventHandlerConfig from '../../HomePage/MyCanvas/EventHandler/EventHandlerConfig';
import { Scene, SceneGetter } from '../../HomePage/MyCanvas/Scene/Scene';
import cl from '../../../colors';
import NonInteractivePoint from '../../HomePage/MyCanvas/CanvasObjects/NonInteractivePoint';
import AngleCircle from '../../HomePage/MyCanvas/CanvasObjects/AngleCircle';
import { TargetValueObj } from '../../../pages/%C2%B0';
import { Tau } from '../../HomePage/MyCanvas/CanvasObjects/UsefulConstants';

const getSceneTensHundredsDivisions: SceneGetter = (
  context: CanvasRenderingContext2D,
  eventHandlerConfig: EventHandlerConfig
) => {
  let scene = new Scene(context, eventHandlerConfig);

  let maxDivisions = 500;

  // @ts-ignore
  // ingoring missing ev for onclick;
  const passedObject = context?.objectPassedToScene;
  const {
    userCircleDivisions,
    setUserCircleDivisions,
  }: {
    targetValueObjs: TargetValueObj[];
    setTargetValueObjs: any;
    userCircleDivisions: number;
    setUserCircleDivisions: any;
  } = passedObject;

  console.log(userCircleDivisions, setUserCircleDivisions);

  let numberOfDivisions = 5;

  // setTargetValueObjs([{ value: 9, completed: true }]);

  const width = context.canvas.parentElement?.clientWidth || 0;

  context.canvas.width = width;

  scene.assets.listenFor = [];

  const testUnitCirc = new AngleCircle(
    context,
    eventHandlerConfig,
    width / 2,
    context.canvas.height / 2
  );
  testUnitCirc.radialPoint.color = cl.getHSLA(cl.red, 0);
  testUnitCirc.color = cl.getHSL(cl.purple);
  testUnitCirc.vertex.color = cl.getHSL(cl.red);
  testUnitCirc.labelColor = cl.getHSL(cl.purple);
  testUnitCirc.customUnitDivisions = 10;
  testUnitCirc.vertex.color = cl.getHSLA(cl.red, 0);

  testUnitCirc.radius *= 0.5;
  // testUnitCirc.radialPoint.color = cl.getHSL(cl.red);
  // testUnitCirc.vertex.color = 'black';

  // testUnitCirc.radialPoint.color = cl.getHSL(cl.red);

  scene.draw = () => {
    testUnitCirc.draw();
    setUserCircleDivisions((prev: number) => {
      numberOfDivisions = prev;
      return prev;
    });
    // drawDivisions();
    testUnitCirc.drawDivisionTicks();
  };

  return scene;
};

export default getSceneTensHundredsDivisions;
