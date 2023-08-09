import { useEffect, useRef, useState } from 'react';
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
    selectedScaleRef,
  } = passedObject;

  const getFactors = (number: number) =>
    Array.from(Array(number + 1), (_, i) => i).filter((i) => number % i === 0);

  const getNumberOfFactors = (number: number) => {
    return getFactors(number).length;
  };

  let data: number[] = [];

  console.log('is happening! ahwao');

  const update = () => {};

  let xIncrement = context.canvas.width / data.length;
  let radius = 3;
  let radiusMax = 10;
  let bottomMargin = 0;
  let sideMargin = 15;

  data = [];
  for (let i = 1; i <= 10 ** 4; i++) {
    let numOfFators = getNumberOfFactors(i);
    data.push(numOfFators);
  }

  const drawPoints = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    console.log(data);
    context.moveTo(0, context.canvas.height);
    context.fillStyle = cl.getHSL(cl.purple);
    data.forEach((datum, index) => {
      if (index + 1 > Math.round(10 ** selectedScaleRef.current)) return;
      console.log(index + 1, 10 ** selectedScaleRef);
      if (index + 1 === selectedValueRef.current) {
        context.fillStyle = cl.getHSL(cl.purple);
        radius = 5;

        console.log('datum', datum);
      } else {
        radius = 3;
        context.fillStyle = cl.getHSLA(cl.purple, 0.2);
      }
      let xPos =
        (index * (context.canvas.width - 2 * sideMargin)) /
          (10 ** selectedScaleRef.current - 1) +
        sideMargin;
      let yPos =
        context.canvas.height -
        bottomMargin -
        datum * (context.canvas.height / 64);
      context.ellipse(xPos, yPos, radius, radius, 0, 0, Tau);
      context.fill();
      context.beginPath();
      // context.fillText(datum.toString(), 100, 150);
    });
    context.stroke();
  };

  scene.draw = () => {
    drawPoints();
    context.fillText(selectedValueRef.current, 100, 100);
    context.fillText((10 ** selectedScaleRef.current).toString(), 100, 130);
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
