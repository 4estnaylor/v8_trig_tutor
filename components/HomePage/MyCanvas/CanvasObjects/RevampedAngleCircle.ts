import { Color } from '@mui/material';
import cl, { color } from '../../../../colors';
import { InteractionState } from '../../../niche/Intro/DragToBigAngles';
import { Tau } from './UsefulConstants';

type ControlledPositionRef = { current: { x: number; y: number } };

// const controlledButtonOffsetX = 24;
const controlledButtonOffsetX = 25;
const controlledButtonOffsetY = 25;

class RevampedAngleCircle {
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  dragNodePositionRef?: ControlledPositionRef;
  centerNodePositionRef?: ControlledPositionRef;
  anchorNodePositionRef?: ControlledPositionRef;
  leadNodePositionRef?: ControlledPositionRef;
  isCenterNodeLocked: boolean;
  radiusLengthInPixels: number;
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
    this.radiusLengthInPixels = 120;
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
    this.context.lineCap = 'square';
    this.context.moveTo(xPos, yPos);
    this.context.lineTo(
      xPos - Math.cos(this.anchorAngleOfOffset) * notchLength,
      yPos + Math.sin(this.anchorAngleOfOffset) * notchLength
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
    this.context.moveTo(this.centerNodePosition.x, this.centerNodePosition.y);
    let leadX = this.leadNodePositionRef?.current.x + controlledButtonOffsetX;
    let leadY = this.leadNodePositionRef?.current.y + controlledButtonOffsetY;
    this.context.lineTo(leadX, leadY);
    this.context.setLineDash([8, 25]);
    this.context.lineCap = 'round';
    this.context.lineWidth = 3;
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
    this.context.fillStyle = cl.getHSLA(this.color, 0.6);
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
    this.context.fillStyle = cl.getHSLA(this.color, 0.6);
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
  };

  drawLeadVisual = () => {
    let color;
    if (this.angle > 0) {
      color = cl.getHSL(cl.blue);
    } else if (this.angle < 0) {
      color = cl.getHSL(cl.red);
    }

    this.drawAngleDashes(
      this.angle,
      this.anchorAngleOfOffset,
      360,
      cl.getHSL(this.color)
    );
  };

  drawAnchorOffsetVisual = () => {
    // draw 3'oclock dotted line
    this.context.beginPath();
    this.context.moveTo(this.centerNodePosition.x, this.centerNodePosition.y);
    this.context.lineTo(
      this.centerNodePosition.x + this.radiusLengthInPixels,
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
    color: string
  ) => {
    this.context.beginPath();
    // let anchorX = this.centerNodePosition.x + this.radiusLengthInPixels*Math.cos(offset);
    // let anchorY = this.centerNodePosition.y - this.radiusLengthInPixels*Math.sin(offset);
    // let angleX = this.centerNodePosition.x + this.radiusLengthInPixels*Math.cos(offset + angle );
    // let angleY = this.centerNodePosition.y - this.radiusLengthInPixels*Math.sin(offset + angle);
    this.context.lineWidth = 1;
    let circumferanceInPx = this.radiusLengthInPixels * Tau;
    let totalDashes = dashesInRevolution * (angle / Tau);
    // make Total Dashes positive
    totalDashes = Math.abs(totalDashes);

    // let pxSpacePerDash = circumferanceInPx / dashesInRevolution;
    let dashWidth = 1;
    let dashLength = 40;

    let dashColor = color;
    let angleIncrement = Tau / dashesInRevolution;
    let minLength = 50;
    if (angle < 0) {
      angleIncrement *= -1;
    }

    for (let i = 0; i <= totalDashes; i++) {
      let angle = offset + i * angleIncrement;
      this.drawDash(angle, dashWidth, dashLength, dashColor, minLength);
    }

    // this.drawDash(-Tau / 8, dashWidth, dashLength, dashColor);

    // this.context.moveTo(anchorX, anchorY);
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
    let x0Pos =
      this.centerNodePosition.x +
      (this.radiusLengthInPixels + minLengthFromRadius) * Math.cos(angle);
    let y0Pos =
      this.centerNodePosition.y -
      (this.radiusLengthInPixels + minLengthFromRadius) * Math.sin(angle);
    let x1Pos =
      this.centerNodePosition.x +
      (this.radiusLengthInPixels + dashLengthPx + minLengthFromRadius) *
        Math.cos(angle);
    let y1Pos =
      this.centerNodePosition.y -
      (this.radiusLengthInPixels + dashLengthPx + minLengthFromRadius) *
        Math.sin(angle);

    this.context.strokeStyle = color;
    this.context.beginPath();
    this.context.moveTo(x0Pos, y0Pos);
    this.context.lineTo(x1Pos, y1Pos);
    this.context.stroke();
    this.context.beginPath();
  };

  test = () => {
    this.update();
    //test
    // this.drawAngleCircleShadow();
    let { anchor, lead, center } = this.interactionStateRef.current;
    console.log(anchor, lead, center);
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
    // if(this.interactionStateRef.current)
    this.drawLeadLine();
    this.drawAngle();
    this.drawAnchorNotch();
    // this.drawAngleDashes(Tau / 4, 0, 360);
  };
}

export default RevampedAngleCircle;
