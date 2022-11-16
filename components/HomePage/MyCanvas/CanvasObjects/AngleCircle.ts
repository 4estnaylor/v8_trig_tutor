import React from 'react';
import cl from '../../../../colors';
import EventHandlerConfig from '../EventHandler/EventHandlerConfig';
import InteractivePoint from './InteractivePoint';
import NonInteractivePoint from './NonInteractivePoint';
import { Tau } from './UsefulConstants';

type angleMeasurmentUnit = 'radians' | 'degrees';

class UnitCircle {
  vertex: InteractivePoint | NonInteractivePoint;
  zeroPoint: InteractivePoint | NonInteractivePoint;
  radialPoint: InteractivePoint | NonInteractivePoint;
  constructor(
    public context: CanvasRenderingContext2D,
    public eventHandlerConfig: EventHandlerConfig,
    public x: number,
    public y: number,
    public angle: number = 0,
    public unit: angleMeasurmentUnit = 'radians',
    public radius: number = 100
  ) {
    this.vertex = new NonInteractivePoint(this.context, this.x, this.y);
    this.zeroPoint = new NonInteractivePoint(
      this.context,
      this.x + this.radius,
      this.y
    );
    this.radialPoint = new InteractivePoint(
      this.context,
      this.eventHandlerConfig,
      this.x + this.radius,
      this.y,
      [],
      30,
      cl.getHSL(cl.purple)
    );
  }

  update = () => {
    this.updateAngle();
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

    console.log('theta', theta);
    this.angle = theta;
  };

  draw = () => {
    this.update();
    this.zeroPoint.draw();
    this.vertex.draw();
    this.radialPoint.draw();
    this.drawAngle();
  };

  drawAngle = () => {
    let angleEndpointX = Math.cos(this.angle) * this.radius;
    let angleEndpointY = Math.sin(this.angle) * this.radius;
    let context = this.context;
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.zeroPoint.x, this.zeroPoint.y);
    context.arc(this.x, this.y, this.radius, 0, Tau - this.angle, true);
    // context.lineTo(this.radialPoint.x, this.radialPoint.y);

    // context.closePath();

    context.stroke();
  };
}

export default UnitCircle;
