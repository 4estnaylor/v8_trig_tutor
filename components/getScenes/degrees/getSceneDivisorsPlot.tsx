import { useEffect, useRef, useState } from 'react';
import cl from '../../../colors';
import AngleCircle from '../../HomePage/MyCanvas/CanvasObjects/AngleCircle';
import { Pi, Tau } from '../../HomePage/MyCanvas/CanvasObjects/UsefulConstants';
import EventHandlerConfig from '../../HomePage/MyCanvas/EventHandler/EventHandlerConfig';
import { Scene, SceneGetter } from '../../HomePage/MyCanvas/Scene/Scene';
import divisorCountsUnder10Thousand from '../../../divisorCount';

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

  const update = () => {};

  let xIncrement = context.canvas.width / data.length;
  let radiusNormal = 3;
  let radius = radiusNormal;
  let radiusRing = 5;

  let bottomMargin = 0;
  let sideMargin = 30;

  data = divisorCountsUnder10Thousand;

  let highlyComposites = [
    1, 2, 4, 6, 12, 24, 36, 48, 60, 120, 180, 240, 360, 720, 840, 1260, 1680,
    2520, 5040, 7560,
  ];

  const getYLimit = (limit: number) => {
    if (!limit) return 64;
    var index = highlyComposites.findIndex(function (number) {
      return number > limit;
    });

    let yLimit = getNumberOfFactors(highlyComposites[index]);

    return yLimit;
  };

  const drawPoints = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.moveTo(0, context.canvas.height);
    context.fillStyle = cl.getHSL(cl.purple);

    let maxVal = 10 ** selectedScaleRef.current;

    let yIncrementDivisor;
    if (maxVal < 50) {
      yIncrementDivisor = 10 + (maxVal / 50) * 10;
    } else if (maxVal < 240) {
      yIncrementDivisor = 20 + ((maxVal - 50) / (240 - 50)) * 20;
    } else if (maxVal < 1700) {
      yIncrementDivisor = 40 + ((maxVal - 240) / (1700 - 240)) * 24;
    } else {
      yIncrementDivisor = 64;
    }

    let yIncrement = (context.canvas.height - radius * 2) / yIncrementDivisor;
    radiusNormal = 150 / yIncrementDivisor;
    radiusRing = 10;

    data.forEach((datum, index) => {
      context.beginPath();
      if (index + 1 > Math.round(10 ** selectedScaleRef.current)) return;
      let drawRing = false;
      if (index + 1 === selectedValueRef.current) {
        context.fillStyle = cl.getHSL(cl.purple);
        radius = radiusNormal;
        drawRing = true;
      } else {
        radius = radiusNormal;
        context.fillStyle = cl.getHSLA(cl.purple, 0.2);
        drawRing = false;
      }
      let xPos =
        (index * (context.canvas.width - 2 * sideMargin)) /
          (10 ** selectedScaleRef.current - 1) +
        sideMargin;
      if (!selectedScaleRef.current) return;
      let yPos =
        context.canvas.height -
        bottomMargin -
        datum * yIncrement +
        yIncrement -
        20;

      if (drawRing) {
        context.strokeStyle = cl.getHSL(cl.purple);
        context.lineWidth = 5;
        context.ellipse(xPos, yPos, radiusRing, radiusRing, 0, 0, Tau);
        context.stroke();

        context.beginPath();
      }

      context.ellipse(xPos, yPos, radiusNormal, radiusNormal, 0, 0, Tau);
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
