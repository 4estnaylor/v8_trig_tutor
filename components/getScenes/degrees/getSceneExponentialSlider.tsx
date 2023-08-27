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
  const { userValueRef, visualTypeRef, squishedRef } = passedObject;

  const base = 10;
  const endPower = 4;

  context.canvas.width = context.canvas.parentElement?.clientWidth || 500;

  // setTimeout(() => {
  //   shrinkHeight();
  // }, 6000);

  const NumberOfSegments = 300;

  let coordinates: Coordinate[] = [];

  // let linearCoordinates: Coordinate[] = [];
  // let exponentialCoordinates: Coordinate[] = [];

  const minVisibleHeight = 0.2;

  // for (let index = 0; index <= NumberOfSegments; index++) {
  //   console.log('happening');
  //   let power = endPower * (index / NumberOfSegments);
  //   let maxHeight = context.canvas.height;
  //   let xPos = (index * context.canvas.width) / NumberOfSegments;
  //   let yPos = maxHeight - (base ** power / base ** endPower) * maxHeight;
  //   if (yPos > maxHeight - minVisibleHeight) {
  //     yPos = maxHeight - minVisibleHeight;
  //   }

  //   let newCoordinate = { x: xPos, y: yPos };
  //   linearCoordinates.push(newCoordinate);
  // }

  const shrinkHeight = () => {
    coordinates = [];

    let oldY = window.pageYOffset;
    let heightChange = context.canvas.height - 200;
    let newY = oldY - heightChange;
    context.canvas.height = 200;

    maxHeight = context.canvas.height;

    window.scrollTo(0, newY);
  };

  // shrinkHeight();

  let maxHeight = context.canvas.height;
  let maxWidth = context.canvas.width;

  let userValuePower = Math.log10(userValueRef.current);
  let userValueX = maxWidth * (userValuePower / endPower);
  let userValueY =
    maxHeight - (userValueRef.current / base ** endPower) * maxHeight;

  const updateValues = () => {
    userValuePower = Math.log10(userValueRef.current);
    userValueX = maxWidth * (userValuePower / endPower);
    userValueY =
      maxHeight - (userValueRef.current / base ** endPower) * maxHeight;
  };

  const displayValue = (value: number) => {
    let xPos = (value * context.canvas.width) / NumberOfSegments;
  };

  const populateCoordinates = () => {
    for (let index = 0; index <= NumberOfSegments; index++) {
      // coordinates = [];
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
  };

  populateCoordinates();

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
    context.fillStyle = cl.getHSLA(cl.purple_light, 0.1);
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
    context.fillStyle = cl.getHSLA(cl.purple, 0.1);
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

    if (squishedRef.current === 'squished' && context.canvas.height !== 200) {
      shrinkHeight();
      populateCoordinates();
      updateValues();
    }

    console.log(squishedRef.current, coordinates);

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
