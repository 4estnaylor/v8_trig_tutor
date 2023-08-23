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
  const { userValueRef } = passedObject;

  const base = 10;
  const startPower = 0;
  const endPower = 4;

  const selectedValue = 50;

  context.canvas.width = context.canvas.parentElement?.clientWidth || 500;

  const NumberOfSegments = 300;

  const coordinates: Coordinate[] = [];

  let maxHeight = context.canvas.height;
  let maxWidth = context.canvas.width;

  let userValuePower = Math.log10(userValueRef.current);
  let userValueX = maxWidth * (userValuePower / endPower);
  let userValueY =
    maxHeight - (userValueRef.current / base ** endPower) * maxHeight;

  const fillGradient = context.createLinearGradient(0, maxHeight, maxWidth, 0);
  // fillGradient.addColorStop(0, cl.getHSL(cl.red_light));
  fillGradient.addColorStop(0.5, cl.getHSL(cl.red));
  fillGradient.addColorStop(1, cl.getHSL(cl.red_dark));

  const displayValue = (value: number) => {
    let xPos = (value * context.canvas.width) / NumberOfSegments;
  };

  for (let index = 0; index <= NumberOfSegments; index++) {
    console.log('happening');
    let power = endPower * (index / NumberOfSegments);
    let maxHeight = context.canvas.height;
    let xPos = (index * context.canvas.width) / NumberOfSegments;
    let yPos = maxHeight - (base ** power / base ** endPower) * maxHeight;

    let newCoordinate = { x: xPos, y: yPos };
    coordinates.push(newCoordinate);
  }

  // for (let index = 0; index < NumberOfSegments; index++) {
  //   let maxHeight = context.canvas.height;
  //   let xPos = (index * context.canvas.width) / NumberOfSegments;
  //   let yPos = maxHeight - (maxHeight * index) / NumberOfSegments;

  //   let newCoordinate = { x: xPos, y: yPos };
  //   coordinates.push(newCoordinate);

  //   coordinates.push;
  // }

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
    let power = Math.log10(userValueRef.current);
    let xPos = context.canvas.width * (power / endPower);
    coordinates.forEach((coordinate) => {
      if (coordinate.x <= xPos) {
        placeCoordinate(coordinate);
      }
    });
  };

  const drawUserValue = () => {
    let maxHeight = context.canvas.height;
    let power = Math.log10(userValueRef.current);
    let xPos = context.canvas.width * (power / endPower);
    let yPos =
      maxHeight - (userValueRef.current / base ** endPower) * maxHeight;

    context.beginPath();
    context.ellipse(xPos, yPos, 10, 10, 0, 0, Tau);
    context.fillStyle = cl.getHSL(cl.purple);
    context.fill();
  };

  const drawUnfilled = () => {
    context.beginPath();
    placeCoordinates();
    context.lineTo(context.canvas.width, context.canvas.height);
    context.lineTo(0, context.canvas.height);

    context.fillText(
      userValueRef.current.toString(),
      100,
      context.canvas.height - 200
    );

    context.fillStyle = cl.getHSL(cl.gray_light);
    context.fill();
  };

  const drawFilled = () => {
    context.beginPath();
    let power = Math.log10(userValueRef.current);
    let maxHeight = context.canvas.height;
    let xPos = context.canvas.width * (power / endPower);
    let yPos =
      maxHeight - (userValueRef.current / base ** endPower) * maxHeight;
    placeCoordinatesUpTo(xPos);
    context.lineTo(xPos, yPos);
    context.lineTo(xPos, context.canvas.height);
    context.lineTo(0, context.canvas.height);
    context.fillStyle = fillGradient;
    context.fill();
  };

  scene.draw = () => {
    // context.fillRect(0, 0, 1, 100);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawUnfilled();
    drawFilled();

    // drawUserValue();
  };

  return scene;
};

export default getSceneExponentialSlider;
