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
  const {} = passedObject;

  const base = 10;
  const startPower = 0;
  const endPower = 4;

  context.canvas.width = context.canvas.parentElement?.clientWidth || 500;

  const NumberOfSegments = 300;

  const coordinates: Coordinate[] = [];

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

  context.fillStyle = cl.getHSLA(cl.black, 1);

  scene.draw = () => {
    // context.fillRect(0, 0, 1, 100);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.beginPath();
    placeCoordinates();
    context.lineTo(context.canvas.width, context.canvas.height);
    context.lineTo(0, context.canvas.height);

    context.fill();
  };

  return scene;
};

export default getSceneExponentialSlider;
