import { join } from 'path';
import React from 'react';
import cl from '../../../../colors';
import EventHandlerConfig from '../EventHandler/EventHandlerConfig';
import InteractivePoint from './InteractivePoint';
import NonInteractivePoint from './NonInteractivePoint';
import { Tau } from './UsefulConstants';
import P from '../../../P';

type angleMeasurmentUnit = 'radians' | 'degrees' | 'custom';
type angleSign = 'positive' | 'negative' | 'neutral';

class AngleCircle {
  vertex: InteractivePoint | NonInteractivePoint;
  zeroPoint: InteractivePoint | NonInteractivePoint;
  radialPoint: InteractivePoint | NonInteractivePoint;
  listenForAssets: (InteractivePoint | any)[];
  testFunction: any;
  checkDragValueToCorrect: any;
  handleOnUpdate: any;
  valueCheckedSinceLastDrag: boolean;
  customUnitDivisions?: number;
  decimalPlaces: number;
  labelColor: string;
  gradient: any;
  coverGradient: any;
  correctGradient: any;
  correctCoverGradient: any;
  isNegative: boolean;
  previousAngle: null | number;
  sign: angleSign;
  rotations: number;
  backgroundColor: string | undefined;
  foregroundColor: string | undefined;

  constructor(
    public context: CanvasRenderingContext2D,
    public eventHandlerConfig: EventHandlerConfig,
    public x: number,
    public y: number,
    public angle: number = 0,
    public unit: angleMeasurmentUnit = 'radians',
    public radius: number = 80,
    public color: string = cl.getHSL(cl.gray_dark)
  ) {
    this.listenForAssets = [];
    // this.vertex = new NonInteractivePoint(this.context, this.x, this.y);
    this.isNegative = false;
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

    this.gradient = this.context.createConicGradient(0, this.x, this.y);

    this.coverGradient = this.context.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.radius * 1.5
    );

    this.correctGradient = this.context.createConicGradient(0, this.x, this.y);

    this.correctGradient.addColorStop(0, cl.getHSL(cl.green));
    this.correctGradient.addColorStop(0.25, cl.getHSL(cl.yellow));
    this.correctGradient.addColorStop(0.5, cl.getHSL(cl.green));
    this.correctGradient.addColorStop(0.75, cl.getHSL(cl.yellow));
    this.correctGradient.addColorStop(1, cl.getHSL(cl.green));

    this.correctCoverGradient = this.context.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.radius * 2.25
    );

    this.correctCoverGradient.addColorStop(0, cl.getHSLA(cl.green, 1));

    this.correctCoverGradient.addColorStop(1, cl.getHSLA(cl.green, 0));

    // Add five color stops
    // this.gradient.addColorStop(0, cl.getHSL(cl.purple));
    // this.gradient.addColorStop(0.2, cl.getHSL(cl.red));
    // this.gradient.addColorStop(0.4, cl.getHSL(cl.yellow));
    // this.gradient.addColorStop(0.6, cl.getHSL(cl.green));
    // this.gradient.addColorStop(0.8, cl.getHSL(cl.blue));
    // this.gradient.addColorStop(1, cl.getHSL(cl.purple));

    this.gradient.addColorStop(0, cl.getHSL(cl.purple));
    this.gradient.addColorStop(0.25, cl.getHSL(cl.red));
    this.gradient.addColorStop(0.5, cl.getHSL(cl.purple));
    // this.gradient.addColorStop(0.4, cl.getHSL(cl.yellow));
    // this.gradient.addColorStop(0.6, cl.getHSL(cl.green));
    this.gradient.addColorStop(0.75, cl.getHSL(cl.blue));
    this.gradient.addColorStop(1, cl.getHSL(cl.purple));

    this.coverGradient.addColorStop(0, cl.getHSLA(cl.purple, 1));

    this.coverGradient.addColorStop(1, cl.getHSLA(cl.purple, 0));

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
    if (this.angle > 0) {
      this.sign = 'positive';
    } else if (this.angle < 0) {
      this.sign = 'negative';
    } else {
      this.sign = 'neutral';
    }

    this.rotations = Math.floor(this.angle / Tau) | 0;
  }

  update = () => {
    this.handleOnUpdate && this.handleOnUpdate();
    this.updatePosition();
    this.updateAngle();
    this.checkValueWhenNotDragging();
  };

  moveRadiusToAngle = (angle: number, distanceInRadians: number = 1.8) => {
    let distance = distanceInRadians * this.radius;
    this.radialPoint.x = this.x + Math.cos(angle) * distance;
    this.radialPoint.y = this.y - Math.sin(angle) * distance;
  };

  updateAngle = () => {
    this.previousAngle = this.angle;
    let diffY = this.radialPoint.y - this.vertex.y;
    let diffX = this.radialPoint.x - this.vertex.x;

    let opp = diffY;
    let adj = diffX;

    let theta = -Math.atan2(diffY, diffX);

    // allow angle to get bigger than 360

    // make sure stays positive
    if (
      this.sign === 'positive' &&
      theta < 0 &&
      this.previousAngle >= Tau / 4
    ) {
      theta += Tau;
    }

    // make sure stays negative
    if (
      this.sign === 'negative' &&
      theta > 0 &&
      this.previousAngle <= -Tau / 4
    ) {
      theta -= Tau;
    }

    //switch to negative

    // if (this.sign === "positive" && this.previousAngle >= Tau / 1000) {
    //   theta += Tau;
    // }

    // if (theta < 0 && this.previousAngle <= Tau / 1000) {
    //   theta += 0;
    // }

    // if (theta <= Tau && theta > 0 && this.previousAngle < 0) {
    //   theta -= Tau;
    // }

    // allow rotations to go up

    if (this.previousAngle > Tau * 0.75 && theta < Tau * 0.25) {
      this.rotations += 1;
    }

    if (
      this.previousAngle < 0.25 * Tau &&
      this.previousAngle > 0 &&
      theta < 0
    ) {
      this.rotations -= 1;
    }

    if (this.previousAngle < -Tau * 0.75 && theta > -Tau * 0.25) {
      this.rotations -= 1;
    }

    // if(0 > this.previousAngle && this.previousAngle < Tau*0.25 && theta < )

    this.angle = theta;
    if (this.angle > 0) {
      this.sign = 'positive';
    } else if (this.angle < 0) {
      this.sign = 'negative';
    } else {
      this.sign = 'neutral';
    }
  };

  updatePosition = () => {
    let xDiff = this.x - this.vertex.x;
    let yDiff = this.y - this.vertex.y;
    this.x = this.vertex.x;
    this.y = this.vertex.y;
    this.zeroPoint.x = this.x + this.radius;
    this.zeroPoint.y = this.y;
  };

  drawBase = () => {};

  draw = () => {
    // this.update();

    // this.zeroPoint.draw();
    this.drawDottedTouchConncetLine();
    this.drawAngle();
    this.vertex.draw();
    this.drawZeroStroke();
    this.radialPoint.draw();

    this.drawAngleLabel();
    this.testFunction();
    // if (this.radialPoint instanceof InteractivePoint) {
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

  drawAngleInUpperRight = (color?: string, posX?: number, posY?: number) => {
    this.context.fillStyle = color || cl.getHSL(cl.gray_dark);
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

    this.context.globalAlpha = 0.5;
    this.context.fillText(
      unitlessDisplayValue,
      this.context.canvas.width - x_offset - 60,
      30
    );
    this.context.globalAlpha = 1;
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
        Math.round(
          (decimalConstant * ((this.angle + this.rotations * Tau) * 180)) /
            Math.PI
        ) / decimalConstant
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
    if (angle <= this.angle) {
    } else {
      return;
      this.context.globalAlpha = 0.1;
    }
    let x0 = this.x;
    let y0 = this.y;

    let far = 1.35;
    let close = 1.2;

    const multiplier = this.radius;

    let x1 = x0 + multiplier * far * Math.cos(angle);
    let y1 = y0 - multiplier * far * Math.sin(angle);

    let x2 = x0 + multiplier * close * Math.cos(angle);
    let y2 = y0 - multiplier * close * Math.sin(angle);
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.stroke();
    this.context.globalAlpha = 1;
  };

  lineToCirclePerimeterShort = (angle: number) => {
    let x0 = this.x;
    let y0 = this.y;

    let far = 1.2;
    let close = 1.05;

    const multiplier = this.radius;

    let x1 = x0 + multiplier * far * Math.cos(angle);
    let y1 = y0 + multiplier * far * Math.sin(angle);

    let x2 = x0 + multiplier * close * Math.cos(angle);
    let y2 = y0 + multiplier * close * Math.sin(angle);
    this.context.beginPath();
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

    let finalIteration = this.customUnitDivisions || 360;
    // if (numOfTicks > 500) {
    //   finalIteration = 500;
    // } else {
    //   finalIteration = numOfTicks;
    // }

    if (finalIteration >= 400) {
      this.drawFilledLoop();
    } else {
      for (let i = 0; i < finalIteration; i++) {
        // this.context.beginPath();
        this.lineToCirclePerimeter(angleIncrement * i);
      }
      this.context.strokeStyle = cl.getHSL(cl.black);
      // this.context.stroke();
    }
  };

  drawAngleWithRotations = (color?: string) => {
    if (this.rotations === 0) {
      this.drawAngle();
      return;
    }
    let n = 0;
    this.context.beginPath();
    this.context.ellipse(this.x, this.y, this.radius, this.radius, 0, 0, Tau);
    this.context.fillStyle = color ? color : this.color;
    this.context.fill();
    this.context.fillText(n.toString(), 100, 100);
    // this.context.fillRect(0, 0, 100, 100);
  };

  drawAngleRing = () => {};

  drawFullAngleRing = () => {};

  drawFilledLoop = () => {
    this.context.beginPath();
    this.context.ellipse(
      this.x,
      this.y,
      this.radius * 1.27,
      this.radius * 1.27,
      0,
      0,
      Tau
    );
    this.context.lineWidth = this.radius * 0.15;
    this.context.stroke();
    this.context.beginPath();
    this.drawLoopDot();
  };

  drawLoopDot = () => {
    this.context.beginPath();
    let xPos = this.x + this.radius * 1.27 * Math.cos(this.angle);
    let yPos = this.y - this.radius * 1.27 * Math.sin(this.angle);
    this.context.ellipse(
      xPos,
      yPos,
      this.radius * 0.03,
      this.radius * 0.03,
      0,
      0,
      Tau
    );
    this.context.fillStyle = cl.getHSL(cl.white);
    this.context.fill();
    // this.context.strokeStyle = cl.getHSL(cl.white);
    // this.context.lineWidth = 2;
    // this.context.stroke();
  };

  drawAngle = (color?: string) => {
    let angleEndpointX = Math.cos(this.angle) * this.radius;
    let angleEndpointY = Math.sin(this.angle) * this.radius;
    let context = this.context;
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.zeroPoint.x, this.zeroPoint.y);
    if (this.angle === 0) {
      context.arc(
        this.x,
        this.y,
        this.radius,
        0,
        Tau - this.angle - 0.0001,
        true
      );
    } else if (this.angle % Tau === 0) {
      context.arc(
        this.x,
        this.y,
        this.radius,
        0,
        Tau - this.angle + 0.0001,
        true
      );
    } else if (this.angle > 0) {
      context.arc(this.x, this.y, this.radius, 0, Tau - this.angle, true);
    } else if (this.angle < 0) {
      context.arc(
        this.x,
        this.y,
        this.radius,
        0,
        -1 * (Tau + this.angle),
        false
      );
    }

    context.closePath();
    // let angleGradient = context.createConicGradient(0, this.x, this.y);
    // angleGradient.addColorStop(0, cl.getHSL(cl.blue));
    // angleGradient.addColorStop(0.33, cl.getHSL(cl.purple)),
    //   angleGradient.addColorStop(0.66, cl.getHSL(cl.red));
    context.globalAlpha = 0.5;

    if (color) {
      context.fillStyle = color;
      context.fill();
    } else {
      if (this.backgroundColor) {
        context.fillStyle = this.backgroundColor;
        context.fill();
      }
      if (this.foregroundColor) {
        context.fillStyle = this.foregroundColor;
        context.fill();
      }
    }

    // context.fillStyle = cl.getHSLA(cl.red, 0.5);
    // context.fill();
    context.globalAlpha = 1;

    // context.closePath();

    // context.stroke();
  };

  drawAngleRainbow = () => {
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

    context.fillStyle = this.gradient;
    // context.fillStyle = 'black';
    context.fill();
    context.globalAlpha = 1;
  };
  drawPurpleCenterCover = () => {
    let angleEndpointX = Math.cos(this.angle) * this.radius;
    let angleEndpointY = Math.sin(this.angle) * this.radius;
    let context = this.context;
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.zeroPoint.x, this.zeroPoint.y);
    if (this.angle === 0) {
      context.arc(
        this.x,
        this.y,
        this.radius,
        0,
        Tau - this.angle - 0.0001,
        true
      );
    } else if (this.angle % Tau === 0) {
      context.arc(
        this.x,
        this.y,
        this.radius,
        0,
        Tau - this.angle + 0.0001,
        true
      );
    } else if (this.angle > 0) {
      context.arc(this.x, this.y, this.radius, 0, Tau - this.angle, true);
    } else if (this.angle < 0) {
      context.arc(
        this.x,
        this.y,
        this.radius,
        0,
        -1 * (Tau + this.angle),
        false
      );
    }

    context.closePath();
    // let angleGradient = context.createConicGradient(0, this.x, this.y);
    // angleGradient.addColorStop(0, cl.getHSL(cl.blue));
    // angleGradient.addColorStop(0.33, cl.getHSL(cl.purple)),
    //   angleGradient.addColorStop(0.66, cl.getHSL(cl.red));
    context.globalAlpha = 1;

    context.fillStyle = this.coverGradient;
    // context.fillStyle = 'black';
    context.fill();
    context.globalAlpha = 1;
  };

  drawAngleCorrect = () => {
    let angleEndpointX = Math.cos(this.angle) * this.radius;
    let angleEndpointY = Math.sin(this.angle) * this.radius;
    let context = this.context;
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.zeroPoint.x, this.zeroPoint.y);

    if (this.angle === 0) {
      context.arc(
        this.x,
        this.y,
        this.radius,
        0,
        Tau - this.angle - 0.0001,
        true
      );
    } else if (this.angle % Tau === 0) {
      context.arc(
        this.x,
        this.y,
        this.radius,
        0,
        Tau - this.angle + 0.0001,
        true
      );
    } else if (this.angle > 0) {
      context.arc(this.x, this.y, this.radius, 0, Tau - this.angle, true);
    } else if (this.angle < 0) {
      context.arc(
        this.x,
        this.y,
        this.radius,
        0,
        -1 * (Tau + this.angle),
        false
      );
    }

    context.closePath();
    // let angleGradient = context.createConicGradient(0, this.x, this.y);
    // angleGradient.addColorStop(0, cl.getHSL(cl.blue));
    // angleGradient.addColorStop(0.33, cl.getHSL(cl.purple)),
    //   angleGradient.addColorStop(0.66, cl.getHSL(cl.red));
    context.globalAlpha = 1;

    context.fillStyle = this.correctGradient;
    // context.fillStyle = 'black';
    context.fill();
    context.globalAlpha = 1;
  };

  drawAngleCoverCorrect = () => {
    let angleEndpointX = Math.cos(this.angle) * this.radius;
    let angleEndpointY = Math.sin(this.angle) * this.radius;
    let context = this.context;
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.zeroPoint.x, this.zeroPoint.y);
    if (this.angle === 0) {
      context.arc(
        this.x,
        this.y,
        this.radius,
        0,
        Tau - this.angle - 0.0001,
        true
      );
    } else if (this.angle % Tau === 0) {
      context.arc(
        this.x,
        this.y,
        this.radius,
        0,
        Tau - this.angle + 0.0001,
        true
      );
    } else if (this.angle > 0) {
      context.arc(this.x, this.y, this.radius, 0, Tau - this.angle, true);
    } else if (this.angle < 0) {
      context.arc(
        this.x,
        this.y,
        this.radius,
        0,
        -1 * (Tau + this.angle),
        false
      );
    }

    context.closePath();
    // let angleGradient = context.createConicGradient(0, this.x, this.y);
    // angleGradient.addColorStop(0, cl.getHSL(cl.blue));
    // angleGradient.addColorStop(0.33, cl.getHSL(cl.purple)),
    //   angleGradient.addColorStop(0.66, cl.getHSL(cl.red));
    context.globalAlpha = 1;

    context.fillStyle = this.correctCoverGradient;
    // context.fillStyle = 'black';
    context.fill();
    context.globalAlpha = 1;
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
