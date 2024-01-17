import { Color } from '@mui/material';
import cl, { color } from '../../../../colors';
import {
  AngleInfo,
  InteractionState,
} from '../../../niche/Intro/DragToBigAngles';
import { Tau } from './UsefulConstants';

type ControlledPositionRef = { current: { x: number; y: number } };
type AngleInfoRef = { current: AngleInfo };

// const controlledButtonOffsetX = 24;
const controlledButtonOffsetX = 25;
const controlledButtonOffsetY = 25;

const dashLength = 30;
const revolutionGap = 5;
let revolutionRingWidth = 10;
let revolutionRingGap = 2;

class RevampedAngleCircle {
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  dragNodePositionRef?: ControlledPositionRef;
  centerNodePositionRef?: ControlledPositionRef;
  anchorNodePositionRef?: ControlledPositionRef;
  leadNodePositionRef?: ControlledPositionRef;
  angleInfoRef: AngleInfoRef;
  isCenterNodeLocked: boolean;
  radiusLengthInPixels: number;
  actualRadiusLengthInPixels: number;
  anchorAngleOfOffset: number;
  revolutions: number;
  angle: number;
  color: color;
  interactionStateRef: { current: InteractionState };
  dashDivisions: number;

  centerNodePosition: { x: number; y: number };

  constructor(
    context: CanvasRenderingContext2D,
    angleInfoRef: AngleInfoRef,
    controlledPositions: any
  ) {
    this.context = context;
    this.angleInfoRef = angleInfoRef;
    this.centerNodePositionRef = controlledPositions.centerRef;
    this.anchorNodePositionRef = controlledPositions.anchorRef;
    this.leadNodePositionRef = controlledPositions.leadRef;
    // this.angle = angleInfoRef.current.angle;

    this.color = angleInfoRef.current.color;
    this.revolutions = 0;
    this.canvas = this.context.canvas;
    this.radiusLengthInPixels = 75;
    this.actualRadiusLengthInPixels = this.radiusLengthInPixels;
    this.anchorAngleOfOffset = 0;
    this.dashDivisions = angleInfoRef.current.divisions;
    // set default Interaction STate to none;
    this.interactionStateRef = {
      current: {
        inputControl: false,
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
    this.anchorAngleOfOffset = this.angleInfoRef.current.angleOffset;
    this.angle = this.angleInfoRef.current.angle;
    this.initialize();
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

  makeArc = (radius: number, startAngle: number, endAngle: number) => {
    let startAngleForContext = Tau - startAngle;
    let endAngleForContext = Tau - endAngle;
    let isCounterclockwise = true;

    if (endAngle - startAngle < 0) {
      endAngleForContext = 0 - endAngle;
      isCounterclockwise = false;
    }

    this.context.arc(
      this.centerNodePosition.x,
      this.centerNodePosition.y,
      radius,
      startAngleForContext,
      endAngleForContext,
      isCounterclockwise
    );
  };

  update = () => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (this.angleInfoRef.current.inputControl === true) {
      console.log('hrm', (this.angleInfoRef.current.angle * 360) / Tau);

      this.angle = this.angleInfoRef.current.angle;
      this.angleInfoRef.current.inputControl = false;
      this.moveLeadNodeButtonToDefaultPosition();
      // this.leadNodePositionRef!.current.x = 0;
      this.moveAnchorButtonToDefaultPosition();
      // this.updateLeadPosition();
    }
    // console.log(this.angle);
    this.updateCenterPosition();
    this.updateAnchorPosition();
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

  updateLeadPosition = () => {
    if (!this.centerNodePositionRef) return;
    if (!this.leadNodePositionRef) return;

    let currentCenterState = this.interactionStateRef.current.center;
    let currentAnchorState = this.interactionStateRef.current.anchor;

    if (currentCenterState === 'pressed' || currentCenterState === 'dragged') {
      this.moveLeadNodeButtonToDefaultPosition();
    }
    if (currentAnchorState === 'pressed' || currentAnchorState === 'dragged') {
      this.moveLeadNodeButtonToDefaultPosition();
    }
  };

  updateAnchorPosition = () => {
    this.calculateAngleOffSetFromAnchorButtonDrag();
    this.calculateAngleOffsetFromCenterDrag();
  };

  initialize = () => {
    // this.moveAnchorButtonToDefaultPosition();
    // this.moveLeadNodeButtonToDefaultPosition();
    // if (!this.anchorNodePositionRef) return;
    // let [anchorX, anchorY] = this.getXYFromPolar(
    //   this.anchorAngleOfOffset,
    //   this.radiusLengthInPixels
    // );
    // this.anchorNodePositionRef!.current.x = anchorX;
    // this.anchorNodePositionRef!.current.y = anchorY;
    this.moveAnchorButtonToDefaultPosition();
    let [leadX, leadY] = this.getXYFromPolar(
      this.angle + this.anchorAngleOfOffset,
      this.radiusLengthInPixels
    );
    this.leadNodePositionRef!.current.x = leadX - controlledButtonOffsetX;
    this.leadNodePositionRef!.current.y = leadY - controlledButtonOffsetY;
    // if (!this.anchorNodePositionRef) return;
    // this.anchorNodePositionRef!.current.x = 100;
    // this.anchorNodePositionRef!.current.y = 100;
  };

  moveLeadNodeButtonToDefaultPosition = () => {
    if (!this.centerNodePositionRef) return;
    if (!this.leadNodePositionRef) return;
    let xPos =
      this.centerNodePositionRef.current.x +
      this.actualRadiusLengthInPixels *
        Math.cos(this.anchorAngleOfOffset + this.angle);
    let yPos =
      this.centerNodePositionRef.current.y -
      this.actualRadiusLengthInPixels *
        Math.sin(this.anchorAngleOfOffset + this.angle);

    this.leadNodePositionRef.current = { x: xPos, y: yPos };
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
    if (this.interactionStateRef.current.anchor === 'dragged') {
      return;
    }
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

    this.context.fillText(
      'calculated angle: ' + (calculatedAngle * this.dashDivisions) / Tau,
      100,
      75
    );

    let differenceBetweenPrevAndNewAngle = this.angle - calculatedAngle;

    // crossing Tau/2 in positive direction
    if (differenceBetweenPrevAndNewAngle > Tau / 2) {
      calculatedAngle += Tau;
    }

    // crossing -Tau/2 in negative direction
    if (differenceBetweenPrevAndNewAngle < -Tau / 2) {
      calculatedAngle -= Tau;
    }

    // crossing zero positive
    if ((this.angle % Tau) - (calculatedAngle % Tau) >= Tau * 0.9) {
      this.revolutions += 1;
      this.actualRadiusLengthInPixels =
        this.radiusLengthInPixels +
        Math.abs(this.revolutions) * (revolutionRingGap + revolutionRingWidth);
    }

    // crossing zero negative
    if ((this.angle % Tau) - (calculatedAngle % Tau) <= -Tau * 0.9) {
      this.revolutions -= 1;
      this.actualRadiusLengthInPixels =
        this.radiusLengthInPixels +
        Math.abs(this.revolutions) * (revolutionRingGap + revolutionRingWidth);
    }

    this.angle = calculatedAngle;
    this.angleInfoRef.current.angle = calculatedAngle;
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
      this.actualRadiusLengthInPixels - notchLength,
      this.anchorAngleOfOffset,
      this.actualRadiusLengthInPixels
    );
    this.context.lineWidth = notchThickness;
    this.context.stroke();
  };

  calculateAngleOffSetFromAnchorButtonDrag = () => {
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
    // if (this.interactionStateRef.current.center !== 'dragged') return;
    if (
      this.interactionStateRef.current.center === 'dragged' ||
      this.interactionStateRef.current.center === 'pressed'
    ) {
      this.moveAnchorButtonToDefaultPosition();
    }
  };

  moveAnchorButtonToDefaultPosition = () => {
    if (!this.centerNodePositionRef?.current) return;
    if (!this.anchorNodePositionRef?.current) return;
    let xPos =
      this.centerNodePositionRef.current.x +
      this.actualRadiusLengthInPixels * Math.cos(this.anchorAngleOfOffset);
    let yPos =
      this.centerNodePositionRef.current.y -
      this.actualRadiusLengthInPixels * Math.sin(this.anchorAngleOfOffset);

    this.anchorNodePositionRef.current = { x: xPos, y: yPos };
  };

  drawLeadLine = () => {
    if (!this.leadNodePositionRef) return;
    this.context.beginPath();

    let [x0, y0] = this.getXYFromPolar(
      this.angle + this.anchorAngleOfOffset,
      this.radiusLengthInPixels
    );
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

  drawAngle = () => {
    for (let i = 0; i < Math.abs(this.revolutions); i++) {
      let startRingBuffer = revolutionGap;
      let widthOfRing = revolutionRingWidth;
      let spaceForRing = revolutionRingWidth + revolutionRingGap;
      let startRadius =
        startRingBuffer + this.radiusLengthInPixels + spaceForRing * (i - 1);
      let endRadius = startRadius + widthOfRing;
      this.drawFullRing(startRadius, endRadius, cl.getHSLA(this.color, 0.2));
    }

    let partialAngle = this.angle % Tau;
    let startRadius = this.radiusLengthInPixels + 2 + 12 * this.revolutions;
    let endRadius = startRadius + 10;
    this.drawPartialRing(partialAngle, cl.getHSLA(this.color, 0.8));
  };

  drawLeadVisual = () => {
    let color;
    let lead = this.interactionStateRef.current.lead;

    // don't draw lead visual if lead button is not pressed or dragged.
    if (lead !== 'pressed' && lead !== 'dragged') {
      return;
    }

    this.drawLeadLine();
    if (this.angle > 0) {
      color = cl.getHSL(cl.blue);
    } else if (this.angle < 0) {
      color = cl.getHSL(cl.red);
    }

    let dashesInRevolution = this.dashDivisions;

    this.drawAngleDashes(
      this.angle,
      this.anchorAngleOfOffset,
      dashesInRevolution,
      this.revolutions
    );
  };

  drawAnchorOffsetVisual = () => {
    // draw 3 oclock line
    this.context.lineWidth = 4;
    this.context.strokeStyle = cl.getHSLA(cl.gray_dark, 0.5);

    this.context.beginPath();
    this.makePolarLine(
      0,
      0,
      0,
      this.actualRadiusLengthInPixels + revolutionGap + dashLength
    );

    // this.context.setLineDash([8, 25]);
    // this.context.lineCap = 'round';

    this.context.stroke();
    this.context.lineCap = 'butt';

    this.drawAngleDashes(
      this.anchorAngleOfOffset,
      0,
      this.dashDivisions,
      this.revolutions
    );

    this.context.beginPath();
    this.makePolarLine(
      this.anchorAngleOfOffset,
      this.radiusLengthInPixels,
      this.anchorAngleOfOffset,
      this.actualRadiusLengthInPixels + revolutionGap + dashLength
    );

    // this.context.stroke();

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

    this.makeArc(
      (this.actualRadiusLengthInPixels * 2) / 3,
      0,
      this.anchorAngleOfOffset
    );

    this.context.closePath();
    this.context.fillStyle = cl.getHSL(cl.gray_dark);
    if (this.anchorAngleOfOffset === 0) {
      return;
    } else {
      this.context.fill();
    }

    // this.context.stroke();

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

    revolutions: number = 0
  ) => {
    this.context.beginPath();

    // let anchorX = this.centerNodePosition.x + this.radiusLengthInPixels*Math.cos(offset);
    // let anchorY = this.centerNodePosition.y - this.radiusLengthInPixels*Math.sin(offset);
    // let angleX = this.centerNodePosition.x + this.radiusLengthInPixels*Math.cos(offset + angle );
    // let angleY = this.centerNodePosition.y - this.radiusLengthInPixels*Math.sin(offset + angle);
    this.context.lineWidth = 1;

    let outerAngle = angle % Tau;
    let totalDashes = dashesInRevolution * (outerAngle / Tau);

    // make Total Dashes positive
    totalDashes = Math.abs(totalDashes);

    // let pxSpacePerDash = circumferanceInPx / dashesInRevolution;
    let dashWidth = 1;
    let dashLength = 120;

    let dashColor = angle > 0 ? cl.getHSL(cl.blue) : cl.getHSL(cl.red);
    let angleIncrement = Tau / dashesInRevolution;
    // let minLength = 5 + 12 * Math.abs(revolutions);
    let minLength = 5;
    // let minLength = 80;

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
    this.context.lineWidth = revolutionRingWidth;
    this.context.strokeStyle = color;
    this.context.beginPath();
    this.context.lineCap = 'butt';
    this.makeArc(radius, 0, Tau);
    this.context.stroke();
  };

  drawPartialRing = (partialAngle: number, color: string) => {
    let startAngle = this.anchorAngleOfOffset;
    let endAngle = partialAngle + this.anchorAngleOfOffset;

    let radius = this.radiusLengthInPixels + Math.abs(this.revolutions) * 12;
    this.context.beginPath();
    this.makeArc(radius, startAngle, endAngle);

    this.context.strokeStyle = color;
    this.context.lineCap = 'butt';
    this.context.lineWidth = 10;

    // this.context.stroke();
    this.context.lineTo(this.centerNodePosition.x, this.centerNodePosition.y);
    this.context.closePath();
    this.context.fillStyle = cl.getHSLA(this.color, 0.5);
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

    //find distance to lead button
    let hypotenuseToLeadButton;
    if (!this.leadNodePositionRef || !this.centerNodePositionRef) return;
    let xDiff =
      this.leadNodePositionRef?.current.x -
      this.centerNodePositionRef?.current.x;
    let yDiff =
      this.leadNodePositionRef.current.y -
      this.centerNodePositionRef?.current.y;

    hypotenuseToLeadButton = Math.sqrt(xDiff ** 2 + yDiff ** 2);

    // maake calculatedLengthFromRadius
    let caluculatedLengthFromRadius = hypotenuseToLeadButton + 0;
    if (
      caluculatedLengthFromRadius <
      this.actualRadiusLengthInPixels + minLengthFromRadius + dashLengthPx
    ) {
      caluculatedLengthFromRadius =
        minLengthFromRadius + this.actualRadiusLengthInPixels + dashLengthPx;
    }

    this.context.strokeStyle = color;
    this.context.beginPath();
    let startRadius = minLengthFromRadius + this.actualRadiusLengthInPixels;
    let endRadius = caluculatedLengthFromRadius;
    this.makePolarLine(angle, startRadius, angle, endRadius);

    this.context.stroke();
    this.context.beginPath();
  };

  draw = () => {
    this.update();
    this.drawAngle();
    let { anchor, lead, center } = this.interactionStateRef.current;
    this.drawLeadLine();
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
  };

  getOutsideInput = () => {
    this.angle = this.angleInfoRef.current.angle;
    this.moveLeadNodeButtonToDefaultPosition();
  };

  test = () => {
    // this.angle = this.angleInfoRef.current.angle;
    // this.initialize();
    this.draw();
    // console.log((this.angleInfoRef.current.angle * 360) / Tau);
  };
}

export default RevampedAngleCircle;
