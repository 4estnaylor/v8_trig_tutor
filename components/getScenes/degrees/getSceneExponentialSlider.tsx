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
  let coordinatesSquished: Coordinate[] = [];
  let coordinatesTall: Coordinate[] = [];

  let squishedMaxHeight = 200;
  let tallMaxHeight = 2000;

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
    coordinatesSquished = [];
    coordinatesTall = [];

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
  let expUserValueX = maxWidth * (userValuePower / endPower);
  // let userValueX = context.canvas.width*userValueRef.current/10000
  let yRatio = userValueRef.current / base ** endPower;
  let userValueY =
    maxHeight - (userValueRef.current / base ** endPower) * maxHeight;
  let squishedUserValueY = squishedMaxHeight * (1 - yRatio);
  let tallUserValueY = tallMaxHeight * (1 - yRatio);

  const updateValues = () => {
    userValuePower = Math.log10(userValueRef.current);
    expUserValueX = maxWidth * (userValuePower / endPower);
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
      let yRatio = base ** power / base ** endPower;
      let yPosTall = tallMaxHeight * (1 - yRatio);
      let yPosSquished = squishedMaxHeight * (1 - yRatio);
      if (yPos > maxHeight - minVisibleHeight) {
        yPos = maxHeight - minVisibleHeight;
      }

      let newCoordinate = { x: xPos, y: yPos };
      let newTallCoordinate = { x: xPos, y: yPosTall };
      let newSquishedCoordinate = { x: xPos, y: yPosSquished };
      coordinates.push(newCoordinate);
      coordinatesTall.push(newTallCoordinate);
      coordinatesSquished.push(newSquishedCoordinate);
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

  // const placeCoordinates = () => {
  //   coordinates.forEach((coordinate) => placeCoordinate(coordinate));
  // };

  const placeTallCoordinates = () => {
    coordinatesTall.forEach((coordinate) => {
      placeCoordinate(coordinate);
    });
  };

  const placeCoordinates = (squished: 'squished' | 'unsquished') => {
    if (squished === 'squished') {
      coordinatesSquished.forEach((coordinate) => {
        placeCoordinate(coordinate);
      });
    }
    if (squished === 'unsquished') {
      coordinatesTall.forEach((coordinate) => {
        placeCoordinate(coordinate);
      });
    }
  };

  // const placeCoordinatesUpTo = (value: number) => {
  //   coordinates.forEach((coordinate) => {
  //     if (coordinate.x <= expUserValueX) {
  //       placeCoordinate(coordinate);
  //     }
  //   });
  // };

  const placeCoordinatesUpTo = (coordinates: Coordinate[], xValue: number) => {
    updateValues();
    coordinates.forEach((coordinate) => {
      if (coordinate.x <= expUserValueX) {
        placeCoordinate(coordinate);
      }
    });
  };

  const drawUnfilledExp = () => {
    context.beginPath();
    placeCoordinates(squishedRef.current);
    context.lineTo(context.canvas.width, context.canvas.height);
    context.lineTo(0, context.canvas.height);
    context.fillStyle = cl.getHSLA(cl.purple_light, 0.1);
    context.fill();
  };

  const drawFilledExp = () => {
    context.beginPath();

    let currentCoordinates = coordinatesTall;
    if (squishedRef.current === 'squished') {
      currentCoordinates = coordinatesSquished;
    }

    // placeCoordinatesUpTo(expUserValueX);
    placeCoordinatesUpTo(currentCoordinates, expUserValueX);
    context.lineTo(expUserValueX, userValueY);
    context.lineTo(expUserValueX, context.canvas.height);
    context.lineTo(0, context.canvas.height);
    context.fillStyle = cl.getHSL(cl.red);
    context.fill();
  };

  const drawExponential = () => {
    drawUnfilledExp();
    drawFilledExp();
  };

  const drawUnfilledLinear = () => {
    let maxHeight = 200;
    if (squishedRef.current === 'unsquished') {
      maxHeight = 2000;
    }
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
    let maxHeight = 200;
    if (squishedRef.current === 'unsquished') {
      maxHeight = 2000;
    }

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

  const makeTall = () => {
    if (squishedRef.current === 'squished' || context.canvas.height === 2000) {
      return;
    } else {
      let oldY = window.pageYOffset;
      let heightChange = 2000 - context.canvas.height;
      let newY = oldY + heightChange;
      context.canvas.height = tallMaxHeight;
      window.scrollTo(0, newY);
    }
  };

  const makeSquished = () => {
    if (squishedRef.current === 'unsquished' || context.canvas.height === 200)
      return;
    let oldY = window.pageYOffset;
    let heightChange = context.canvas.height - 200;
    let newY = oldY - heightChange;

    maxHeight = context.canvas.height;

    context.canvas.height = 200;
    window.scrollTo(0, newY);
  };

  scene.draw = () => {
    // context.fillRect(0, 0, 1, 100);
    makeTall();
    makeSquished();

    if (squishedRef.current === 'squished' && context.canvas.height !== 200) {
      // shrinkHeight();
      // updateValues();
    }

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    // drawExponential();
    if (visualTypeRef.current === 'linear') {
      drawLinear();
    }

    if (visualTypeRef.current === 'exponential') {
      // drawExponential();
      drawUnfilledExp();
      drawFilledExp();
    }

    // drawUserValue();
  };

  return scene;
};

export default getSceneExponentialSlider;
