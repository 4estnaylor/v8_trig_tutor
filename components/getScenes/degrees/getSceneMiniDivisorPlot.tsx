import { useEffect, useRef, useState } from 'react';
import cl from '../../../colors';
import AngleCircle from '../../HomePage/MyCanvas/CanvasObjects/AngleCircle';
import { Pi, Tau } from '../../HomePage/MyCanvas/CanvasObjects/UsefulConstants';
import EventHandlerConfig from '../../HomePage/MyCanvas/EventHandler/EventHandlerConfig';
import { Scene, SceneGetter } from '../../HomePage/MyCanvas/Scene/Scene';
import divisorCountsUnder10Thousand from '../../../divisorCount';

const getSceneMiniDivisorPlot: SceneGetter = (
  context: CanvasRenderingContext2D,
  eventHandlerConfig: EventHandlerConfig
) => {
  const scene = new Scene(context, eventHandlerConfig);

  // @ts-ignore
  // ingoring missing ev for onclick;
  const passedObject = context?.objectPassedToScene;
  const { selectedValueRef, selectedScaleRef } = passedObject;

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

  let verticalAxisSpace = 20;
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

  let numOfFactors = getNumberOfFactors(selectedValueRef.current);

  let fillValue = selectedValueRef.current;

  let maxVal = 10 ** selectedScaleRef.current;

  let minVal = 0;

  const bottomBorder = 15;

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

  let yIncrement =
    (context.canvas.height - radius * 2 - bottomBorder) / yIncrementDivisor;
  radiusNormal = 100 / yIncrementDivisor;
  if (radiusNormal < 3) {
    radiusNormal = 3;
  }
  radiusRing = 8;

  const drawVerticalAxisFill = () => {
    context.beginPath();
    // let fillValue = 0.8;
    context.strokeStyle = cl.getHSLA(cl.blue, 1);
    context.lineWidth = 3;
    context.lineCap = 'round';
    let y0 = context.canvas.height - bottomBorder;
    let y1 =
      context.canvas.height -
      bottomMargin -
      getNumberOfFactors(selectedValueRef.current) * yIncrement +
      yIncrement -
      bottomBorder;

    let totalLength = y0 - 5 + bottomBorder;
    // let fillPxls = totalLength * (1 - fillValue);
    context.moveTo(15, y0);
    context.lineTo(15, y1);
    context.stroke();
  };

  const drawVerticalAxis = () => {
    context.strokeStyle = cl.getHSLA(cl.blue, 0.2);
    context.lineWidth = 3;
    context.lineCap = 'round';
    let y0 = context.canvas.height - bottomBorder;
    context.moveTo(15, y0);
    context.lineTo(15, 5);
    context.lineTo(10, 10);
    context.moveTo(15, 5);
    context.lineTo(20, 10);
    context.stroke();
    drawVerticalAxisFill();
    // draw Arrow Head
  };

  const drawHorizontalDashedLine = () => {};

  const drawPoints = () => {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.moveTo(0, context.canvas.height);
    context.fillStyle = cl.getHSL(cl.purple);

    data.forEach((datum, index) => {
      context.beginPath();
      if (index + 1 > Math.round(10 ** selectedScaleRef.current)) return;
      let drawRing = false;
      // if (index + 1 === selectedValueRef.current) {
      //   context.fillStyle = cl.getHSL(cl.red);
      //   radius = radiusNormal;
      //   drawRing = true;
      // } else {

      radius = radiusNormal;
      context.fillStyle = cl.getHSLA(cl.purple, 0.2);
      drawRing = false;

      let xPos =
        (index * (context.canvas.width - 2 * sideMargin - verticalAxisSpace)) /
          (10 ** selectedScaleRef.current - 1) +
        sideMargin +
        verticalAxisSpace;
      if (!selectedScaleRef.current) return;
      let yPos =
        context.canvas.height -
        bottomMargin -
        datum * yIncrement +
        yIncrement -
        bottomBorder;

      if (drawRing) {
        context.strokeStyle = cl.getHSL(cl.blue);
        context.lineWidth = 5;
        context.ellipse(xPos, yPos, radiusRing, radiusRing, 0, 0, Tau);
        context.stroke();

        context.beginPath();

        context.strokeStyle = cl.getHSL(cl.blue);
        context.setLineDash([5, 15]);
        context.lineWidth = 3;

        context.moveTo(xPos, yPos);
        context.lineTo(15, yPos);
        context.stroke();
        context.setLineDash([]);

        context.beginPath();
      }

      context.ellipse(xPos, yPos, radiusNormal, radiusNormal, 0, 0, Tau);
      context.fill();
      context.beginPath();

      // context.fillText(datum.toString(), 100, 150);
    });
    context.stroke();
  };

  const drawSelectedPoint = () => {
    let xPos =
      ((selectedValueRef.current - 1) *
        (context.canvas.width - 2 * sideMargin - verticalAxisSpace)) /
        (10 ** selectedScaleRef.current - 1) +
      sideMargin +
      verticalAxisSpace;

    let yPos =
      context.canvas.height -
      bottomMargin -
      getNumberOfFactors(selectedValueRef.current) * yIncrement +
      yIncrement -
      bottomBorder;

    context.strokeStyle = cl.getHSL(cl.blue);

    context.fillStyle = cl.getHSLA(cl.blue, 0.6);

    context.ellipse(xPos, yPos, radiusNormal * 3, radiusNormal * 3, 0, 0, Tau);
    // context.stroke();
    context.fill();
    context.beginPath();
    context.fillStyle = cl.getHSL(cl.purple);
    context.strokeStyle = cl.getHSL(cl.white);
    context.lineWidth = 2;
    context.ellipse(xPos, yPos, radiusNormal, radiusNormal, 0, 0, Tau);

    context.fill();
    context.stroke();
  };

  scene.draw = () => {
    drawPoints();
    drawSelectedPoint();
    drawVerticalAxis();
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

export default getSceneMiniDivisorPlot;
