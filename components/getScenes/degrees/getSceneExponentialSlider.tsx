import { useEffect, useRef, useState } from 'react';
import cl from '../../../colors';
import AngleCircle from '../../HomePage/MyCanvas/CanvasObjects/AngleCircle';
import { Pi, Tau } from '../../HomePage/MyCanvas/CanvasObjects/UsefulConstants';
import EventHandlerConfig from '../../HomePage/MyCanvas/EventHandler/EventHandlerConfig';
import { Scene, SceneGetter } from '../../HomePage/MyCanvas/Scene/Scene';
import divisorCountsUnder10Thousand from '../../../divisorCount';
import exponentialCoords from '../../../exponentialCoords';

type Coordinate = {
  x: number;
  y: number;
};

const getSceneExponentialSlider: SceneGetter = (
  context: CanvasRenderingContext2D,
  eventHandlerConfig: EventHandlerConfig
) => {
  const scene = new Scene(context, eventHandlerConfig);
  // scene.isStatic = true;

  // @ts-ignore
  // ingoring missing ev for onclick;
  const passedObject = context?.objectPassedToScene;
  const { userValueRef, visualTypeRef } = passedObject;

  const base = 10;
  const endPower = 4;

  context.canvas.width = context.canvas.parentElement?.clientWidth || 500;

  const NumberOfSegments = 300;

  const coordinates: Coordinate[] = [];

  let maxHeight = context.canvas.height;
  let maxWidth = context.canvas.width;

  let userValuePower = Math.log10(userValueRef.current);
  let userValueX = maxWidth * (userValuePower / endPower);
  let userValueY =
    maxHeight - (userValueRef.current / base ** endPower) * maxHeight;

  let fillGradient = context.createLinearGradient(
    0,
    maxHeight,
    userValueX,
    userValueY
  );
  fillGradient.addColorStop(0, cl.getHSL(cl.red_dark));
  fillGradient.addColorStop(0.25, cl.getHSL(cl.red));
  fillGradient.addColorStop(0.4, cl.getHSL(cl.white));
  fillGradient.addColorStop(0.6, cl.getHSL(cl.red_light));
  fillGradient.addColorStop(0.75, cl.getHSL(cl.red));
  fillGradient.addColorStop(1, cl.getHSL(cl.red_dark));

  const update = () => {
    userValuePower = Math.log10(userValueRef.current);
    userValueX = maxWidth * (userValuePower / endPower);
    userValueY =
      maxHeight - (userValueRef.current / base ** endPower) * maxHeight;

    fillGradient = context.createLinearGradient(
      0,
      maxHeight,
      userValueX,
      userValueY
    );

    fillGradient.addColorStop(0.99, cl.getHSL(cl.yellow));
    fillGradient.addColorStop(0.7, cl.getHSL(cl.red));
  };

  const displayValue = (value: number) => {
    let xPos = (value * context.canvas.width) / NumberOfSegments;
  };

  const minVisibleHeight = 0.2;

  for (let index = 0; index <= NumberOfSegments; index++) {
    console.log('happening');
    let power = endPower * (index / NumberOfSegments);
    let maxHeight = context.canvas.height;
    let xPos = (index * context.canvas.width) / NumberOfSegments;
    let yPos = maxHeight - (base ** power / base ** endPower) * maxHeight;
    if (yPos > maxHeight - minVisibleHeight) {
      yPos = maxHeight - minVisibleHeight;
    }

    let newCoordinate = { x: xPos, y: yPos };
    coordinates.push(newCoordinate);
  }

  const placeCoordinate = (coordinate: Coordinate) => {
    let xPos = coordinate.x;
    let yPos = coordinate.y;
    let radius = 1;
    // context.ellipse(xPos, yPos, radius, radius, 0, 0, Tau);
    context.lineTo(xPos, yPos);
  };

  const placeCoordinates = () => {
    coordinates.forEach((coordinate) => placeCoordinate(coordinate));
  };

  const placeCoordinatesUpTo = (value: number) => {
    coordinates.forEach((coordinate) => {
      if (coordinate.x <= userValueX) {
        placeCoordinate(coordinate);
      }
    });
  };

  const drawUnfilledExp = () => {
    context.beginPath();
    placeCoordinates();
    context.lineTo(context.canvas.width, context.canvas.height);
    context.lineTo(0, context.canvas.height);
    context.fillStyle = cl.getHSL(cl.gray_light);
    context.fill();
  };

  const drawFilledExp = () => {
    context.beginPath();

    placeCoordinatesUpTo(userValueX);
    context.lineTo(userValueX, userValueY);
    context.lineTo(userValueX, context.canvas.height);
    context.lineTo(0, context.canvas.height);
    context.fillStyle = cl.getHSL(cl.red);
    context.fill();
  };

  const drawExponential = () => {
    drawUnfilledExp();
    drawFilledExp();
  };

  const drawUnfilledLinear = () => {
    context.beginPath();
    context.moveTo(0, maxHeight);
    context.lineTo(maxWidth, 0);
    context.lineTo(maxWidth, maxHeight);
    context.lineTo(0, maxHeight);
    context.fillStyle = cl.getHSL(cl.gray_light);
    context.fill();
  };

  const drawFilledLinear = () => {
    context.beginPath();
    let xPos = (maxWidth * userValueRef.current) / base ** endPower;
    let yPos =
      maxHeight - (maxHeight * userValueRef.current) / base ** endPower;
    context.moveTo(0, maxHeight);
    context.lineTo(xPos, yPos);
    context.lineTo(xPos, maxHeight);
    context.lineTo(0, maxHeight);
    context.fillStyle = cl.getHSL(cl.red);
    context.fill();
  };

  const drawLinear = () => {
    drawUnfilledLinear();
    drawFilledLinear();
  };

  scene.draw = () => {
    // context.fillRect(0, 0, 1, 100);
    update();
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    // drawExponential();
    if (visualTypeRef.current === 'linear') {
      drawLinear();
    }

    if (visualTypeRef.current === 'exponential') {
      drawExponential();
    }

    // drawUserValue();
  };

  return scene;
};

export default getSceneExponentialSlider;
