import { join } from 'path';
import React from 'react';
import cl from '../../../../colors';
import EventHandlerConfig from '../EventHandler/EventHandlerConfig';
import InteractivePoint from './InteractivePoint';
import NonInteractivePoint from './NonInteractivePoint';
import { Tau } from './UsefulConstants';

type angleMeasurmentUnit = 'radians' | 'degrees' | 'custom';

class AngleCircle {
  vertex: InteractivePoint | NonInteractivePoint;
  zeroPoint: InteractivePoint | NonInteractivePoint;
  radialPoint: InteractivePoint | NonInteractivePoint;
  listenForAssets: (InteractivePoint | any)[];
  testFunction: any;
  checkDragValueToCorrect: any;
  valueCheckedSinceLastDrag: boolean;
  customUnitDivisions?: number;
  decimalPlaces: number;
  labelColor: string;

  constructor(
    public context: CanvasRenderingContext2D,
    public eventHandlerConfig: EventHandlerConfig,
    public x: number,
    public y: number,
    public angle: number = 0,
    public unit: angleMeasurmentUnit = 'radians',
    public radius: number = 80,
    public color: string = cl.getHSL(cl.white)
  ) {
    this.listenForAssets = [];
    // this.vertex = new NonInteractivePoint(this.context, this.x, this.y);
    this.zeroPoint = new NonInteractivePoint(
      this.context,
      this.x + this.radius,
      this.y
    );
    this.labelColor = cl.getHSL(cl.white);
    this.valueCheckedSinceLastDrag = true;
    this.decimalPlaces = 0;

    this.zeroPoint.color = this.color;
    this.vertex = new InteractivePoint(
      this.context,
      this.eventHandlerConfig,
      this.x,
      this.y,
      this.listenForAssets,
      30,
      this.color
    );

    this.checkDragValueToCorrect = () => {};

    this.radialPoint = new InteractivePoint(
      this.context,
      this.eventHandlerConfig,
      this.x + this.radius,
      this.y - 0.1,
      this.listenForAssets,
      30,
      this.color
    );

    this.testFunction = this.context.canvas.onclick;
    //@ts-ignore
    this.listenForAssets = [];
    [this.vertex, this.radialPoint].forEach((point) => {
      if (point instanceof InteractivePoint) {
        this.listenForAssets.push(point);
      }
    });
    this.vertex.listenFor = this.listenForAssets;
    if (this.radialPoint instanceof InteractivePoint) {
      this.radialPoint.listenFor = this.listenForAssets;
    }
  }

  update = () => {
    this.updatePosition();
    this.updateAngle();
    this.checkValueWhenNotDragging();
    // console.log('angle', (this.angle * 180) / Math.PI);
  };

  moveRadiusToAngle = (angle: number, distanceInRadians: number = 1.8) => {
    let distance = distanceInRadians * this.radius;
    this.radialPoint.x = this.x + Math.cos(angle) * distance;
    this.radialPoint.y = this.y - Math.sin(angle) * distance;
  };

  updateAngle = () => {
    let diffY = this.radialPoint.y - this.vertex.y;
    let diffX = this.radialPoint.x - this.vertex.x;

    let opp = diffY;
    let adj = diffX;

    let oppositeOverAdjacent = opp / adj;

    let theta = -Math.atan2(diffY, diffX);
    if (theta < 0) {
      theta += Tau;
    }

    this.angle = theta;
  };

  updatePosition = () => {
    let xDiff = this.x - this.vertex.x;
    let yDiff = this.y - this.vertex.y;
    this.x = this.vertex.x;
    this.y = this.vertex.y;
    this.zeroPoint.x = this.x + this.radius;
    this.zeroPoint.y = this.y;
  };

  draw = () => {
    this.update();

    // this.zeroPoint.draw();
    this.drawDottedTouchConncetLine();
    this.drawAngle();
    this.vertex.draw();
    this.drawZeroStroke();
    this.radialPoint.draw();

    this.drawAngleLabel();
    this.testFunction();
    // if (this.radialPoint instanceof InteractivePoint) {
    //   console.log('form', this.radialPoint.form);
    // }
  };

  drawZeroStroke = () => {
    this.context.beginPath();
    this.context.moveTo(this.zeroPoint.x, this.zeroPoint.y);
    this.context.lineTo(this.zeroPoint.x - 15, this.zeroPoint.y);
    this.context.strokeStyle = this.color;
    this.context.lineWidth = 3;
    this.context.stroke();
  };

  drawAngleInDegrees = (posX: number, posY: number, fontSize: number = 20) => {
    this.context.fillStyle = this.color;
    this.context.font = `${fontSize}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif`;

    let displayValue = this.getDisplayValue();

    let x_offset = this.context.measureText(displayValue).width;

    this.context.fillText(displayValue, posX - x_offset / 2, posY);
  };

  drawAngleInUpperRight = (posX?: number, posY?: number) => {
    this.context.fillStyle = this.color;
    this.context.font =
      " 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

    let displayValue = this.getDisplayValue();

    let x_offset = this.context.measureText(displayValue).width;

    this.context.fillText(
      displayValue,
      this.context.canvas.width - x_offset - 10,
      30
    );
  };

  drawCompleteAngleInUpperRight = (posX?: number, posY?: number) => {
    this.context.fillStyle = this.color;
    this.context.font =
      " 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

    let unitlessDisplayValue = this.getDisplayValue();
    unitlessDisplayValue = unitlessDisplayValue.substring(
      0,
      unitlessDisplayValue.length - 1
    );

    // let x_offset = this.context.measureText(displayValue).width;

    ///
    // this.drawAngleInUpperRight();
    if (!this.customUnitDivisions) {
      return;
    }
    let displayValue = this.getDisplayValue();
    let denomDisplayValue = this.getDenomDisplayValue();

    let displayValueUnitless = displayValue.substring(
      0,
      displayValue.length - 1
    );
    let denomDisplayValueUnitless = denomDisplayValue.substring(
      0,
      denomDisplayValue.length - 1
    );

    let largerDisplayValue;
    if (
      this.context.measureText(displayValueUnitless).width >
      this.context.measureText(denomDisplayValueUnitless).width
    ) {
      largerDisplayValue = displayValueUnitless;
    } else {
      largerDisplayValue = denomDisplayValueUnitless;
    }
    let x_offset = this.context.measureText(largerDisplayValue).width;
    this.context.fillText(
      unitlessDisplayValue,
      this.context.canvas.width - x_offset - 60,
      30
    );
    this.context.beginPath();
    this.context.moveTo(this.context.canvas.width - x_offset - 60, 35);
    this.context.lineTo(this.context.canvas.width - 60, 35);

    this.context.lineWidth = 2;
    this.context.stroke();
    this.context.fillText(
      denomDisplayValueUnitless,
      this.context.canvas.width - x_offset - 60,
      58
    );
    this.context.font =
      " 14px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
    this.context.fillText('units', this.context.canvas.width - 50, 39);
  };

  getDisplayValue = () => {
    let decimalConstant = Math.pow(10, this.decimalPlaces);
    let displayValue =
      (
        Math.round((decimalConstant * (this.angle * 180)) / Math.PI) /
        decimalConstant
      ).toString() + '°';
    if (this.customUnitDivisions) {
      displayValue =
        Math.round(
          (decimalConstant * (this.angle * this.customUnitDivisions)) / Tau
        ) /
          decimalConstant +
        'ᵘ';
    }
    return displayValue;
  };

  getDenomDisplayValue = () => {
    let denomVal;
    let denomDisplay;
    if (this.customUnitDivisions) {
      denomVal = this.customUnitDivisions;
      denomDisplay = denomVal.toString() + 'ᵘ';
    } else {
      denomVal = 360;
      denomDisplay = '360°';
    }

    return denomDisplay;
  };

  drawAngleInSpecialUnit = () => {};

  drawAngleLabel = () => {
    this.context.fillStyle = this.labelColor;
    this.context.font =
      " 16px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";

    let displayValue = this.getDisplayValue();
    let x_offset = this.context.measureText(displayValue).width / 2;

    this.context.fillText(
      displayValue,
      this.radialPoint.x - x_offset,
      this.radialPoint.y + 7
    );
  };

  checkValueWhenNotDragging = () => {
    if (
      this.radialPoint instanceof InteractivePoint &&
      this.radialPoint.form !== 'grabbing' &&
      !this.valueCheckedSinceLastDrag
    ) {
      console.log('not dragging', this.radialPoint.form);
      this.checkDragValueToCorrect();
      this.valueCheckedSinceLastDrag = true;
    } else {
      this.resetCheckedSinceLastDragWhenDragging();
    }
  };

  resetCheckedSinceLastDragWhenDragging = () => {
    if (
      this.radialPoint instanceof InteractivePoint &&
      this.radialPoint.form === 'grabbing'
    ) {
      this.valueCheckedSinceLastDrag = false;
    }
  };

  drawDottedTouchConncetLine = () => {
    let x0 = this.x + this.radius * Math.cos(this.angle);
    let y0 = this.y - this.radius * Math.sin(this.angle);
    this.context.beginPath();
    this.context.moveTo(x0, y0);
    this.context.lineTo(
      this.radialPoint.x - this.radialPoint.radius * Math.cos(this.angle),
      this.radialPoint.y + this.radialPoint.radius * Math.sin(this.angle)
    );
    this.context.strokeStyle = this.color;
    this.context.lineWidth = 2;
    this.context.setLineDash([4, 7]);
    this.context.stroke();
    this.context.setLineDash([]);
  };

  lineToCirclePerimeter = (angle: number) => {
    let x0 = this.x;
    let y0 = this.y;

    const multiplier = this.radius;

    let x1 = x0 + multiplier * 1.35 * Math.cos(angle);
    let y1 = y0 + multiplier * 1.35 * Math.sin(angle);

    let x2 = x0 + multiplier * 1.2 * Math.cos(angle);
    let y2 = y0 + multiplier * 1.2 * Math.sin(angle);
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
  };

  drawDivisionTicks = (numberOfTicks?: number) => {
    let numOfTicks;

    numOfTicks = numberOfTicks || this.customUnitDivisions || 12;

    let numberOfDecimalPlaces;
    if (numOfTicks <= 1) {
      numberOfDecimalPlaces = 1;
    } else if (numOfTicks <= 10) {
      numberOfDecimalPlaces = 1;
    } else {
      numberOfDecimalPlaces = 0;
    }
    this.decimalPlaces = numberOfDecimalPlaces;
    let angleIncrement = Tau / numOfTicks;
    if (numOfTicks > 500) {
      angleIncrement = Tau / 500;
    }

    this.context.strokeStyle = this.color;
    let lineWidth = 50 / numOfTicks;
    if (lineWidth > 3) {
      lineWidth = 3;
    }
    if (lineWidth < 1) {
      lineWidth = 1;
    }
    this.context.lineWidth = lineWidth;

    let finalIteration = this.customUnitDivisions;
    if (numOfTicks > 500) {
      finalIteration = 500;
    }

    for (let i = 0; i < numOfTicks; i++) {
      this.context.beginPath();

      this.lineToCirclePerimeter(angleIncrement * i);
      this.context.stroke();
    }
  };

  drawAngle = () => {
    let angleEndpointX = Math.cos(this.angle) * this.radius;
    let angleEndpointY = Math.sin(this.angle) * this.radius;
    let context = this.context;
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.zeroPoint.x, this.zeroPoint.y);
    if (this.angle === Tau) {
      context.arc(
        this.x,
        this.y,
        this.radius,
        0,
        Tau - this.angle + 0.0001,
        true
      );
    } else if (this.angle === 0) {
      context.arc(
        this.x,
        this.y,
        this.radius,
        0,
        Tau - this.angle - 0.0001,
        true
      );
    } else {
      context.arc(this.x, this.y, this.radius, 0, Tau - this.angle, true);
    }

    context.closePath();
    // let angleGradient = context.createConicGradient(0, this.x, this.y);
    // angleGradient.addColorStop(0, cl.getHSL(cl.blue));
    // angleGradient.addColorStop(0.33, cl.getHSL(cl.purple)),
    //   angleGradient.addColorStop(0.66, cl.getHSL(cl.red));
    context.globalAlpha = 0.5;

    context.fillStyle = this.color;
    context.fill();
    context.globalAlpha = 1;

    // context.closePath();

    // context.stroke();
  };

  drawFixedAngle = (angle: number) => {
    let context = this.context;
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.zeroPoint.x, this.zeroPoint.y);
    context.arc(this.x, this.y, this.radius, 0, Tau - angle, true);
    context.closePath();
    // let angleGradient = context.createConicGradient(0, this.x, this.y);
    // angleGradient.addColorStop(0, cl.getHSL(cl.blue));
    // angleGradient.addColorStop(0.33, cl.getHSL(cl.purple)),
    //   angleGradient.addColorStop(0.66, cl.getHSL(cl.red));
    context.globalAlpha = 0.5;

    context.fillStyle = this.color;
    context.fill();
    context.globalAlpha = 1;
  };
}

export default AngleCircle;
