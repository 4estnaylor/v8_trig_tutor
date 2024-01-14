import { Color } from '@mui/material';
import cl, { color } from '../../../../colors';
import { InteractionState } from '../../../niche/Intro/DragToBigAngles';
import { Tau } from './UsefulConstants';

type ControlledPositionRef = { current: { x: number; y: number } };

// const controlledButtonOffsetX = 24;
const controlledButtonOffsetX = 25;
const controlledButtonOffsetY = 25;

const notchLength = 30;
const gapFromAngleToNotches = 5;

class RevampedAngleCircle {
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  dragNodePositionRef?: ControlledPositionRef;
  centerNodePositionRef?: ControlledPositionRef;
  anchorNodePositionRef?: ControlledPositionRef;
  leadNodePositionRef?: ControlledPositionRef;
  isCenterNodeLocked: boolean;
  radiusLengthInPixels: number;
  actualRadiusLengthInPixels: number;
  anchorAngleOfOffset: number;
  revolutions: number;
  angle: number;
  color: color;
  interactionStateRef: { current: InteractionState };

  centerNodePosition: { x: number; y: number };

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.angle = Tau / 6;
    this.color = cl.black;
    this.revolutions = 0;
    this.canvas = this.context.canvas;
    this.radiusLengthInPixels = 100;
    this.actualRadiusLengthInPixels = this.radiusLengthInPixels;
    this.anchorAngleOfOffset = 0;
    // set default Interaction STate to none;
    this.interactionStateRef = {
      current: {
        center: 'none',
        anchor: 'none',
        lead: 'none',
        overall: 'none',
      },
    };
    this.centerNodePosition = this.centerNodePositionRef
      ? {
          x: this.centerNodePositionRef.current.x + controlledButtonOffsetX,
          y: this.centerNodePositionRef.current.y + controlledButtonOffsetY,
        }
      : { x: 0, y: 0 };
    this.isCenterNodeLocked = false;
  }

  // utitility function specific to class

  getXYFromPolar = (angle: number, distanceInPixels: number) => {
    let xPos = this.centerNodePosition.x + distanceInPixels * Math.cos(angle);
    let yPos = this.centerNodePosition.y - distanceInPixels * Math.sin(angle);

    return [xPos, yPos];
  };

  makePolarLine = (
    startAngle: number,
    startRadius: number,
    endAngle: number,
    endRadius: number
  ) => {
    let [startX, startY] = this.getXYFromPolar(startAngle, startRadius);
    let [endX, endY] = this.getXYFromPolar(endAngle, endRadius);

    this.context.moveTo(startX, startY);
    this.context.lineTo(endX, endY);
  };

  update = () => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updateCenterPosition();
    // this.updateAnchorPosition();

    this.calculateAngleOffSetFromButtonDrag();
    this.calculateAngleOffsetFromCenterDrag();
    this.updateLeadPosition();
    this.calculateAngle();
  };

  updateCenterPosition = () => {
    // update center node position
    this.centerNodePosition = this.centerNodePositionRef
      ? {
          x: this.centerNodePositionRef.current.x + controlledButtonOffsetX,
          y: this.centerNodePositionRef.current.y + controlledButtonOffsetY,
        }
      : { x: this.canvas.width / 2, y: this.canvas.height / 2 };

    // if isCenterNodeLocked don't update
    let currentCenterState = this.interactionStateRef.current.center;
    if (currentCenterState !== 'dragged' && currentCenterState !== 'pressed')
      return;
    if (this.isCenterNodeLocked) return;
    if (!this.centerNodePositionRef?.current) return;

    // if provided centerNodePositionRef, sync it with the position.

    let newCenterNodePosition = {
      x: this.centerNodePositionRef.current.x + controlledButtonOffsetX,
      y: this.centerNodePositionRef.current.y + controlledButtonOffsetY,
    };

    this.centerNodePosition = newCenterNodePosition;
    // this.updateAnchorPosition();
  };

  updateAnchorPosition = () => {
    if (!this.anchorNodePositionRef?.current) return;
    let currentAnchorState = this.interactionStateRef.current.anchor;
    if (currentAnchorState === 'pressed' || currentAnchorState === 'dragged') {
      // this is where I need to calculate anchorOffsetAngle
      return;
    }
    // if (currentCenterState !== 'dragged' && currentCenterState !== 'pressed') return;
    let calculatedAnchorXPos =
      this.centerNodePosition.x +
      this.radiusLengthInPixels * Math.cos(this.anchorAngleOfOffset) -
      controlledButtonOffsetX;
    let calculatedAnchorYPos =
      this.centerNodePosition.y -
      this.radiusLengthInPixels * Math.sin(this.anchorAngleOfOffset) -
      controlledButtonOffsetY;
    let calculatedAnchorPosition = {
      x: calculatedAnchorXPos,
      y: calculatedAnchorYPos,
    };

    this.anchorNodePositionRef.current = calculatedAnchorPosition;

    // if (this.anchorNodePositionRef) {
    //   this.anchorNodePositionRef.current = {
    //     x: 100,
    //     y: 100,
    //   };
    // }
  };

  updateLeadPosition = () => {
    if (!this.centerNodePositionRef) return;
    if (!this.leadNodePositionRef) return;

    let currentLeadState = this.interactionStateRef.current.lead;
    let currentCenterState = this.interactionStateRef.current.center;
    let currentAnchorState = this.interactionStateRef.current.anchor;
    // if (currentLeadState === 'pressed' || currentLeadState === 'dragged') {
    //   // this is where I need to calculate anchorOffsetAngle
    //   return;
    // }
    if (currentCenterState === 'pressed' || currentCenterState === 'dragged') {
      let xPos =
        this.centerNodePositionRef.current.x +
        this.radiusLengthInPixels *
          Math.cos(this.anchorAngleOfOffset + this.angle);
      let yPos =
        this.centerNodePositionRef.current.y -
        this.radiusLengthInPixels *
          Math.sin(this.anchorAngleOfOffset + this.angle);

      this.leadNodePositionRef.current = { x: xPos, y: yPos };
    }
    if (currentAnchorState === 'pressed' || currentAnchorState === 'dragged') {
      let xPos =
        this.centerNodePositionRef.current.x +
        this.radiusLengthInPixels *
          Math.cos(this.anchorAngleOfOffset + this.angle);
      let yPos =
        this.centerNodePositionRef.current.y -
        this.radiusLengthInPixels *
          Math.sin(this.anchorAngleOfOffset + this.angle);

      this.leadNodePositionRef.current = { x: xPos, y: yPos };
    }
  };

  drawAngleCircleShadow = () => {
    this.context.beginPath();
    // this.context.globalAlpha = 0.015;
    this.context.ellipse(
      this.centerNodePosition.x,
      this.centerNodePosition.y,
      this.radiusLengthInPixels,
      this.radiusLengthInPixels,
      0,
      0,
      Tau
    );

    // this.context.fill();
    // this.context.globalAlpha = 1;
    // this.context.setLineDash([10, 5]);
    this.context.lineWidth = 4;
    this.context.stroke();
  };

  calculateAngle = () => {
    if (!this.anchorNodePositionRef) return;
    if (!this.leadNodePositionRef) return;
    if (!this.centerNodePositionRef) return;

    let diffY =
      this.centerNodePositionRef?.current.y -
      this.leadNodePositionRef?.current.y;
    let diffX =
      this.centerNodePositionRef?.current.x -
      this.leadNodePositionRef?.current.x;

    diffX *= -1;
    let leadAngle = Math.atan2(diffY, diffX) + this.revolutions * Tau;

    let calculatedAngle = leadAngle - this.anchorAngleOfOffset;

    // console.log(this.angle % Tau);

    this.context.fillText(
      'calculated angle: ' + (calculatedAngle * 360) / Tau,
      100,
      75
    );

    let calculatedAngleRevolutions = Math.floor(calculatedAngle / Tau);
    let previousAngleRevolutions = Math.floor(this.angle / Tau);

    // if (calculatedAngleRevolutions > previousAngleRevolutions) {
    //   this.revolutions += 1;
    // }

    // if (calculatedAngle > Tau / 2) {
    //   calculatedAngle -= Tau;
    // }
    // if (calculatedAngle < -Tau / 2) {
    //   calculatedAngle += Tau;
    // }

    let differenceBetweenPrevAndNewAngle = this.angle - calculatedAngle;
    // console.log('angle: ' + this.angle, 'calculated angle: ' + calculatedAngle);
    // console.log(differenceBetweenPrevAndNewAngle);
    // console.log(this.angle, calculatedAngle);

    // if (this.angle < 0 && calculatedAngle >= 0) {
    // }

    // crossing zero in positive direction
    // if (
    //   differenceBetweenPrevAndNewAngle > Tau / 2 &&
    //   calculatedAngle > 0 &&
    //   calculatedAngle < Tau / 2
    // ) {
    //   console.log(
    //     'crossing zero positive direction',
    //     differenceBetweenPrevAndNewAngle
    //   );
    // }

    // crossing Tau/2 in positive direction
    if (differenceBetweenPrevAndNewAngle > Tau / 2) {
      // console.log('scha-wing');

      calculatedAngle += Tau;
    }

    // crossing -Tau/2 in negative direction
    if (differenceBetweenPrevAndNewAngle < -Tau / 2) {
      // console.log('chacha real smooth now');
      calculatedAngle -= Tau;
    }

    // this.revolutions = Math.floor(calculatedAngle / Tau);
    // add revolution in positive direction

    // console.log(this.angle % Tau, calculatedAngle % Tau);

    if ((this.angle % Tau) - (calculatedAngle % Tau) >= Tau * 0.9) {
      console.log('crossing zero positive');
      this.revolutions += 1;
    }

    if ((this.angle % Tau) - (calculatedAngle % Tau) <= -Tau * 0.9) {
      console.log('crossing zero negative');
      this.revolutions -= 1;
    }

    this.angle = calculatedAngle;

    // get lead angle
  };

  drawAnchorNotch = () => {
    this.context.beginPath();
    let cosValue = Math.cos(this.anchorAngleOfOffset);
    let sinValue = Math.sin(this.anchorAngleOfOffset);
    let notchThickness = 6;
    let notchColorString = cl.getHSLA(cl.gray_dark, 1);
    let lineWidthOffset = 2;
    let xPos =
      this.centerNodePosition.x +
      (this.radiusLengthInPixels - lineWidthOffset) * cosValue;
    let yPos =
      this.centerNodePosition.y -
      (this.radiusLengthInPixels - lineWidthOffset) * sinValue;

    let notchLength = 15;

    this.context.beginPath();
    this.context.strokeStyle = notchColorString;
    this.context.lineCap = 'butt';

    this.makePolarLine(
      this.anchorAngleOfOffset,
      this.radiusLengthInPixels - notchLength,
      this.anchorAngleOfOffset,
      this.radiusLengthInPixels
    );
    this.context.lineWidth = notchThickness;
    this.context.stroke();
  };

  calculateAngleOffSetFromButtonDrag = () => {
    if (this.interactionStateRef.current.anchor !== 'dragged') return;
    if (
      !this.anchorNodePositionRef?.current ||
      !this.centerNodePositionRef?.current
    )
      return;
    let diffY =
      this.centerNodePositionRef?.current.y -
      this.anchorNodePositionRef?.current.y;
    let diffX =
      this.centerNodePositionRef?.current.x -
      this.anchorNodePositionRef?.current.x;

    diffX *= -1;
    let calculatedAngleOffsett = Math.atan2(diffY, diffX);
    let changeInAngle = this.anchorAngleOfOffset - calculatedAngleOffsett;
    if (changeInAngle > Tau / 2) {
      calculatedAngleOffsett += Tau;
    }
    if (changeInAngle < -Tau / 2) {
      calculatedAngleOffsett -= Tau;
    }

    if (Math.abs(calculatedAngleOffsett) > Tau) {
      calculatedAngleOffsett %= Tau;
    }

    this.anchorAngleOfOffset = calculatedAngleOffsett;

    // put diff wrt to center node
  };

  calculateAngleOffsetFromCenterDrag = () => {
    if (this.interactionStateRef.current.center !== 'dragged') return;
    if (!this.centerNodePositionRef?.current) return;
    if (!this.anchorNodePositionRef?.current) return;
    let xPos =
      this.centerNodePositionRef.current.x +
      this.radiusLengthInPixels * Math.cos(this.anchorAngleOfOffset);
    let yPos =
      this.centerNodePositionRef.current.y -
      this.radiusLengthInPixels * Math.sin(this.anchorAngleOfOffset);

    this.anchorNodePositionRef.current = { x: xPos, y: yPos };
  };

  drawLeadLine = () => {
    if (!this.leadNodePositionRef) return;
    this.context.beginPath();
    let x0 =
      this.centerNodePosition.x +
      this.radiusLengthInPixels *
        Math.cos(this.angle + this.anchorAngleOfOffset);
    let y0 =
      this.centerNodePosition.y -
      this.radiusLengthInPixels *
        Math.sin(this.angle + this.anchorAngleOfOffset);
    this.context.moveTo(x0, y0);
    let leadX = this.leadNodePositionRef?.current.x + controlledButtonOffsetX;
    let leadY = this.leadNodePositionRef?.current.y + controlledButtonOffsetY;
    this.context.lineTo(leadX, leadY);
    this.context.setLineDash([8, 25]);
    this.context.lineCap = 'round';
    this.context.lineWidth = 2;
    if (
      this.interactionStateRef.current.lead === 'pressed' ||
      this.interactionStateRef.current.lead === 'dragged'
    ) {
      this.context.stroke();
    }
    // this.context.stroke();
    this.context.setLineDash([]);
  };

  drawAnglePositive = () => {
    if (!this.leadNodePositionRef) return;
    if (!this.anchorNodePositionRef) return;

    let leadX = this.leadNodePositionRef?.current.x + controlledButtonOffsetX;
    let leadY = this.leadNodePositionRef?.current.y + controlledButtonOffsetY;

    let cosValue = Math.cos(this.anchorAngleOfOffset);
    let sinValue = Math.sin(this.anchorAngleOfOffset);

    let anchorX =
      this.centerNodePosition.x + this.radiusLengthInPixels * cosValue;
    let anchorY =
      this.centerNodePosition.y - this.radiusLengthInPixels * sinValue;

    this.context.beginPath();
    this.context.strokeStyle = cl.getHSL(cl.blue);
    this.context.lineWidth = 1;
    this.context.moveTo(this.centerNodePosition.x, this.centerNodePosition.y);
    this.context.lineTo(anchorX, anchorY);
    // this.context.stroke();
    let startAngle = Tau - this.anchorAngleOfOffset;
    let endAngle = Tau - this.anchorAngleOfOffset - this.angle;
    this.context.arc(
      this.centerNodePosition.x,
      this.centerNodePosition.y,
      this.radiusLengthInPixels,
      startAngle,
      endAngle,
      true
    );

    this.context.strokeStyle = cl.getHSL(cl.gray_dark);
    this.context.fillStyle = cl.getHSLA(this.color, 0.05);
    this.context.fill();
    this.context.beginPath();
    this.context.lineWidth = 2;
  };

  drawAngleNegative = () => {
    if (!this.leadNodePositionRef) return;
    if (!this.anchorNodePositionRef) return;

    let leadX = this.leadNodePositionRef?.current.x + controlledButtonOffsetX;
    let leadY = this.leadNodePositionRef?.current.y + controlledButtonOffsetY;

    let cosValue = Math.cos(this.anchorAngleOfOffset);
    let sinValue = Math.sin(this.anchorAngleOfOffset);

    let anchorX =
      this.centerNodePosition.x + this.radiusLengthInPixels * cosValue;
    let anchorY =
      this.centerNodePosition.y - this.radiusLengthInPixels * sinValue;

    this.context.beginPath();
    // this.context.strokeStyle = cl.getHSL(cl.red);
    this.context.lineWidth = 1;
    this.context.moveTo(this.centerNodePosition.x, this.centerNodePosition.y);
    this.context.lineTo(anchorX, anchorY);
    // this.context.stroke();
    let startAngle = Tau - this.anchorAngleOfOffset;
    let endAngle = Tau - this.anchorAngleOfOffset - this.angle;
    this.context.arc(
      this.centerNodePosition.x,
      this.centerNodePosition.y,
      this.radiusLengthInPixels,
      startAngle,
      endAngle,
      false
    );

    this.context.strokeStyle = cl.getHSL(cl.gray_dark);
    this.context.fillStyle = cl.getHSLA(this.color, 0.05);
    this.context.fill();
    this.context.beginPath();
    this.context.lineWidth = 2;
  };

  drawAngle = () => {
    if (this.angle > 0) {
      this.drawAnglePositive();
    }
    if (this.angle < 0) {
      this.drawAngleNegative();
    }
    for (let i = 0; i < Math.abs(this.revolutions) - 1; i++) {
      let startRingBuffer = 2;
      let widthOfRing = 10;
      let spaceForRing = 12;
      let startRadius =
        startRingBuffer + this.radiusLengthInPixels + spaceForRing * i;
      let endRadius = startRadius + widthOfRing;
      this.drawFullRing(startRadius, endRadius, cl.getHSLA(this.color, 0.05));
      // le
      // this.drawAngleDashes(
      //   angle,
      //   0,
      //   dashesInRevolution,
      //   cl.getHSL(this.color),
      //   i
      // );
    }
    let partialAngle = this.angle % Tau;
    let startRadius = this.radiusLengthInPixels + 2 + 12 * this.revolutions;
    let endRadius = startRadius + 10;
    this.drawPartialRing(
      partialAngle,
      startRadius,
      endRadius,
      cl.getHSLA(cl.purple, 0.8)
    );
  };

  drawLeadVisual = () => {
    let color;
    if (this.angle > 0) {
      color = cl.getHSL(cl.blue);
    } else if (this.angle < 0) {
      color = cl.getHSL(cl.red);
    }

    let dashesInRevolution = 360;

    this.drawAngleDashes(
      this.angle,
      this.anchorAngleOfOffset,
      dashesInRevolution,
      'green',
      this.revolutions
    );

    // this.drawAngleDashes(
    //   this.angle,
    //   this.anchorAngleOfOffset,
    //   360,
    //   cl.getHSL(this.color)
    // );
  };

  drawAnchorOffsetVisual = () => {
    // draw 3'oclock dotted line
    this.context.beginPath();
    this.context.moveTo(this.centerNodePosition.x, this.centerNodePosition.y);
    this.context.lineTo(
      this.centerNodePosition.x + this.radiusLengthInPixels + 90,
      this.centerNodePosition.y
    );

    // this.context.setLineDash([8, 25]);
    // this.context.lineCap = 'round';
    this.context.lineWidth = 4;
    this.context.strokeStyle = cl.getHSLA(cl.gray_dark, 0.5);
    this.context.stroke();
    this.drawAngleDashes(
      this.anchorAngleOfOffset,
      0,
      360,
      cl.getHSLA(cl.gray_dark, 0.5)
    );

    // draw dotted line and anchorAngle
    // let x0Pos =
    //   this.centerNodePosition.x +
    //   this.radiusLengthInPixels * Math.cos(this.anchorAngleOfOffset);
    // let y0Pos =
    //   this.centerNodePosition.y -
    //   this.radiusLengthInPixels * Math.sin(this.anchorAngleOfOffset);

    // let x1Pos =
    //   this.centerNodePosition.x +
    //   (this.radiusLengthInPixels + 90) * Math.cos(this.anchorAngleOfOffset);
    // let y1Pos =
    //   this.centerNodePosition.y -
    //   (this.radiusLengthInPixels + 90) * Math.sin(this.anchorAngleOfOffset);

    this.context.beginPath();
    this.makePolarLine(
      this.anchorAngleOfOffset,
      this.radiusLengthInPixels,
      this.anchorAngleOfOffset,
      this.radiusLengthInPixels + gapFromAngleToNotches + notchLength
    );
    // this.context.moveTo(x0Pos, y0Pos);
    // this.context.lineTo(x1Pos, y1Pos);
    this.context.stroke();

    this.context.beginPath();
    let startAngle = 0;
    let endAngle = Tau - this.anchorAngleOfOffset;
    let directionCounterClockwise = true;
    if (this.anchorAngleOfOffset < 0) {
      directionCounterClockwise = true;
      endAngle = Tau;
      startAngle = Tau - this.anchorAngleOfOffset;
    }

    this.context.moveTo(this.centerNodePosition.x, this.centerNodePosition.y);
    this.context.arc(
      this.centerNodePosition.x,
      this.centerNodePosition.y,
      (this.radiusLengthInPixels * 2) / 3,
      startAngle,
      endAngle,
      directionCounterClockwise
    );

    this.context.closePath();
    this.context.fillStyle = cl.getHSL(cl.gray_dark);
    if (this.anchorAngleOfOffset === 0) {
      return;
    } else {
      this.context.fill();
    }

    this.context.stroke();

    this.context.fillText(
      (Math.round(this.anchorAngleOfOffset * 100) / 100).toString(),
      50,
      50
    );
  };

  drawAngleDashes = (
    angle: number,
    offset: number,
    dashesInRevolution: number,
    color: string,
    revolutions: number = 0
  ) => {
    this.context.beginPath();

    // let anchorX = this.centerNodePosition.x + this.radiusLengthInPixels*Math.cos(offset);
    // let anchorY = this.centerNodePosition.y - this.radiusLengthInPixels*Math.sin(offset);
    // let angleX = this.centerNodePosition.x + this.radiusLengthInPixels*Math.cos(offset + angle );
    // let angleY = this.centerNodePosition.y - this.radiusLengthInPixels*Math.sin(offset + angle);
    this.context.lineWidth = 1;
    let circumferanceInPx = this.radiusLengthInPixels * Tau;
    let outerAngle = angle % Tau;
    let totalDashes = dashesInRevolution * (outerAngle / Tau);

    // make Total Dashes positive
    totalDashes = Math.abs(totalDashes);

    // let pxSpacePerDash = circumferanceInPx / dashesInRevolution;
    let dashWidth = 1;
    let dashLength = 30;

    let dashColor = angle > 0 ? cl.getHSL(cl.blue) : cl.getHSL(cl.red);
    let angleIncrement = Tau / dashesInRevolution;
    let minLength = 5 + 12 * Math.abs(revolutions);

    if (angle < 0) {
      angleIncrement *= -1;
    }

    for (let i = 0; i <= totalDashes; i++) {
      let angle = offset + i * angleIncrement;
      this.drawDash(angle, dashWidth, dashLength, dashColor, minLength);
    }

    // draw earlier revolutions;

    // for (let i = 0; i < revolutions; i++) {
    //   this.drawAngleDashes(0.999 * Tau, 0, dashesInRevolution, color);
    // }

    // this.drawDash(-Tau / 8, dashWidth, dashLength, dashColor);

    // this.context.moveTo(anchorX, anchorY);
  };

  drawFullRing = (startRadius: number, endRadius: number, color: string) => {
    let radius = (startRadius + endRadius) / 2;
    this.context.lineWidth = endRadius - startRadius;
    this.context.strokeStyle = color;
    this.context.beginPath();
    this.context.lineCap = 'butt';
    // this.context.ellipse(
    //   this.centerNodePosition.x,
    //   this.centerNodePosition.y,
    //   radius,
    //   radius,
    //   0,
    //   0,
    //   Tau
    // );
    this.context.arc(
      this.centerNodePosition.x,
      this.centerNodePosition.y,
      radius,
      0,
      Tau
    );
    this.context.stroke();
  };

  drawPartialRing = (
    partialAngle: number,
    startRadius: number,
    endRadius: number,
    color: string
  ) => {
    let startAngle = -this.anchorAngleOfOffset;
    let endAngle = Tau - partialAngle - this.anchorAngleOfOffset;

    let isCounterclockwise = true;
    if (partialAngle < 0) {
      startAngle = -this.anchorAngleOfOffset;
      endAngle = 0 - partialAngle - this.anchorAngleOfOffset;
      isCounterclockwise = false;
    }

    let radius = this.radiusLengthInPixels + Math.abs(this.revolutions) * 12;
    this.context.beginPath();
    this.context.arc(
      this.centerNodePosition.x,
      this.centerNodePosition.y,
      radius,
      startAngle,
      endAngle,
      isCounterclockwise
    );
    this.context.strokeStyle = color;
    this.context.lineCap = 'butt';
    this.context.lineWidth = 10;

    // this.context.stroke();
    this.context.lineTo(this.centerNodePosition.x, this.centerNodePosition.y);
    this.context.closePath();
    this.context.fillStyle = cl.getHSLA(cl.purple, 0.5);
    this.context.fill();
  };

  drawDash = (
    angle: number,
    dashWidthPx: number,
    dashLengthPx: number,
    color: string,
    minLength?: number
  ) => {
    this.context.lineWidth = dashWidthPx;
    let minLengthFromRadius = minLength || 0;

    this.context.strokeStyle = color;
    this.context.beginPath();
    let startRadius = this.radiusLengthInPixels + minLengthFromRadius;
    let endRadius = startRadius + dashLengthPx;
    this.makePolarLine(angle, startRadius, angle, endRadius);

    this.context.stroke();
    this.context.beginPath();
  };

  test = () => {
    this.update();
    //test
    // this.drawAngleCircleShadow();
    let { anchor, lead, center } = this.interactionStateRef.current;

    // if(this.interactionStateRef.current)
    this.drawLeadLine();
    this.drawAngle();
    if (
      // anchor === 'pressed' ||
      // anchor === 'dragged' ||
      lead === 'pressed' ||
      lead === 'dragged'
    ) {
      // this.drawAngleCircleShadow();
      this.drawLeadVisual();
    }
    if (anchor === 'pressed' || anchor === 'dragged') {
      this.drawAnchorOffsetVisual();
    }
    this.drawAnchorNotch();
    // this.drawAngleDashes(Tau / 4, 0, 360);
    //asdf
  };
}

export default RevampedAngleCircle;
