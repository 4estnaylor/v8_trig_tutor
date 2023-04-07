import { join } from 'path';
import React from 'react';
import cl from '../../../../colors';
import EventHandlerConfig from '../EventHandler/EventHandlerConfig';
import InteractivePoint from './InteractivePoint';
import NonInteractivePoint from './NonInteractivePoint';
import { Tau } from './UsefulConstants';

type angleMeasurmentUnit = 'radians' | 'degrees';

class AngleCircle {
  vertex: InteractivePoint | NonInteractivePoint;
  zeroPoint: InteractivePoint | NonInteractivePoint;
  radialPoint: InteractivePoint | NonInteractivePoint;
  listenForAssets: InteractivePoint | NonInteractivePoint[];
  testFunction: any;
  constructor(
    public context: CanvasRenderingContext2D,
    public eventHandlerConfig: EventHandlerConfig,
    public x: number,
    public y: number,
    public angle: number = 0,
    public unit: angleMeasurmentUnit = 'radians',
    public radius: number = 100
  ) {
    this.listenForAssets = [];
    // this.vertex = new NonInteractivePoint(this.context, this.x, this.y);
    this.zeroPoint = new NonInteractivePoint(
      this.context,
      this.x + this.radius,
      this.y
    );

    this.zeroPoint.color = cl.getHSL(cl.white);
    this.vertex = new InteractivePoint(
      this.context,
      this.eventHandlerConfig,
      this.x,
      this.y,
      this.listenForAssets,
      30,
      cl.getHSL(cl.white)
    );

    this.radialPoint = new InteractivePoint(
      this.context,
      this.eventHandlerConfig,
      this.x + 80,
      this.y - this.radius - 40,
      this.listenForAssets,
      30,
      cl.getHSL(cl.white)
    );

    this.testFunction = this.context.canvas.onclick;

    this.listenForAssets = [this.vertex, this.zeroPoint, this.radialPoint];
  }

  update = () => {
    this.updatePosition();
    this.updateAngle();
    // console.log('angle', (this.angle * 180) / Math.PI);
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
    this.drawAngleInDegrees();
    this.drawAngleLabel();
    this.testFunction();
  };

  drawZeroStroke = () => {
    this.context.beginPath();
    this.context.moveTo(this.zeroPoint.x, this.zeroPoint.y);
    this.context.lineTo(this.zeroPoint.x - 15, this.zeroPoint.y);
    this.context.strokeStyle = cl.getHSL(cl.white);
    this.context.lineWidth = 3;
    this.context.stroke();
  };

  drawAngleInDegrees = () => {
    this.context.fillStyle = 'white';
    this.context.font = ' 30px system-ui';
    let x_offset = this.context.measureText(
      Math.round((this.angle * 180) / Math.PI) + '°'
    ).width;
    this.context.fillText(
      Math.round((this.angle * 180) / Math.PI) + '°',
      this.context.canvas.width - x_offset - 10,
      30
    );
  };

  drawAngleLabel = () => {
    this.context.fillStyle = cl.getHSL(cl.white);
    this.context.font = ' 16px system-ui';
    let x_offset =
      this.context.measureText(
        Math.round((100 * (this.angle * 180)) / Math.PI) / 100 + '°'
      ).width / 4;
    this.context.fillText(
      Math.round((this.angle * 180) / Math.PI) + '°',
      this.radialPoint.x - x_offset,
      this.radialPoint.y + 7
    );
  };

  drawDottedTouchConncetLine = () => {
    let x0 = this.x + this.radius * Math.cos(this.angle);
    let y0 = this.y - this.radius * Math.sin(this.angle);
    this.context.beginPath();
    this.context.moveTo(x0, y0);
    this.context.lineTo(this.radialPoint.x, this.radialPoint.y);
    this.context.strokeStyle = cl.getHSL(cl.white);
    this.context.lineWidth = 1;
    this.context.setLineDash([3, 7]);
    this.context.stroke();
    this.context.setLineDash([]);
  };

  drawAngle = () => {
    let angleEndpointX = Math.cos(this.angle) * this.radius;
    let angleEndpointY = Math.sin(this.angle) * this.radius;
    let context = this.context;
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.zeroPoint.x, this.zeroPoint.y);
    context.arc(this.x, this.y, this.radius, 0, Tau - this.angle, true);
    context.closePath();
    // let angleGradient = context.createConicGradient(0, this.x, this.y);
    // angleGradient.addColorStop(0, cl.getHSL(cl.blue));
    // angleGradient.addColorStop(0.33, cl.getHSL(cl.purple)),
    //   angleGradient.addColorStop(0.66, cl.getHSL(cl.red));

    context.fillStyle = cl.getHSLA(cl.white, 0.5);
    context.fill();

    // context.closePath();

    // context.stroke();
  };
}

export default AngleCircle;
