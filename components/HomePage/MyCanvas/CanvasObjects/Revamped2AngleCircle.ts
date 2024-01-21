import cl, { color } from '../../../../colors';
import {
  AngleInfo,
  ControlledPositions,
  InteractionState,
} from '../../../niche/Intro/DragToBigAngles';
import { Tau } from './UsefulConstants';

// display settings

const controlledButtonOffsetX = 25;
const controlledButtonOffsetY = 25;

const dashLength = 30;
const revolutionGap = 5;
let revolutionRingWidth = 10;
let revolutionRingGap = 2;

class Revamped2AngleCircle {
  context: CanvasRenderingContext2D;
  angleInfoRef: React.MutableRefObject<AngleInfo>;
  // angleInfo: AngleInfo;
  interactionStateRef: React.MutableRefObject<InteractionState>;
  controlledPositions: ControlledPositions;

  canvas: HTMLCanvasElement;
  revolutions: number;

  initialRadius: number;
  radius: number;
  color: color;
  dashDivisions: number;
  constructor(
    context: CanvasRenderingContext2D,
    angleInfoRef: React.MutableRefObject<AngleInfo>,
    interactionStateRef: React.MutableRefObject<InteractionState>,
    controlledPositions: ControlledPositions
  ) {
    this.context = context;
    this.canvas = this.context.canvas;
    this.angleInfoRef = angleInfoRef;
    this.interactionStateRef = interactionStateRef;
    this.controlledPositions = controlledPositions;
    this.color = cl.green;

    this.initialRadius = 100;
    this.radius = this.initialRadius;

    this.dashDivisions = 360;

    this.revolutions = 0;
  }

  // utilities
  getXYFromPolar = (angle: number, distanceInPixels: number) => {
    let center = this.controlledPositions.center.current;

    let xPos = center.x + distanceInPixels * Math.cos(angle);
    let yPos = center.y - distanceInPixels * Math.sin(angle);

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
    let center = this.controlledPositions.center.current;

    if (endAngle - startAngle < 0) {
      endAngleForContext = 0 - endAngle;
      isCounterclockwise = false;
    }

    this.context.arc(
      center.x,
      center.y,
      radius,
      startAngleForContext,
      endAngleForContext,
      isCounterclockwise
    );
  };

  moveLeadNodeButtonToDefaultPosition = () => {
    let center = this.controlledPositions.center.current;
    let angleOffset = this.angleInfoRef.current.angleOffset;
    let angle = this.angleInfoRef.current.angle;
    let xPos = center.x + this.radius * Math.cos(angleOffset + angle);
    let yPos = center.y - this.radius * Math.sin(angleOffset + angle);

    this.controlledPositions.lead.current = { x: xPos, y: yPos };
  };

  moveAnchorButtonToDefaultPosition = () => {
    let center = this.controlledPositions.center.current;
    let angleOffset = this.angleInfoRef.current.angleOffset;
    let xPos = center.x + this.radius * Math.cos(angleOffset);
    let yPos = center.y - this.radius * Math.sin(angleOffset);

    this.controlledPositions.anchor.current = { x: xPos, y: yPos };
  };

  positionAnchorOnCenterDrag = () => {
    if (
      this.interactionStateRef.current.center === 'dragged' ||
      this.interactionStateRef.current.center === 'pressed'
    ) {
      this.moveAnchorButtonToDefaultPosition();
    }
  };

  calculateAngleOffSetFromAnchorDrag = () => {
    if (this.interactionStateRef.current.anchor !== 'dragged') return;

    let center = this.controlledPositions.center.current;
    let anchor = this.controlledPositions.anchor.current;

    let diffY = center.y - anchor.y;
    let diffX = center.x - anchor.x;

    diffX *= -1;
    let calculatedAngleOffsett = Math.atan2(diffY, diffX);
    let changeInAngle =
      this.angleInfoRef.current.angleOffset - calculatedAngleOffsett;
    if (changeInAngle > Tau / 2) {
      calculatedAngleOffsett += Tau;
    }
    if (changeInAngle < -Tau / 2) {
      calculatedAngleOffsett -= Tau;
    }

    if (Math.abs(calculatedAngleOffsett) > Tau) {
      calculatedAngleOffsett %= Tau;
    }

    this.angleInfoRef.current.angleOffset = calculatedAngleOffsett;

    // put diff wrt to center node
  };

  calculateRevolutions = () => {
    let angle = this.angleInfoRef.current.angle;
    let revolutions = Math.floor(angle / Tau);
    this.revolutions = revolutions;
  };

  calculateAngleForTouchControl = () => {
    if (this.angleInfoRef.current.inputControl === true) return;
    if (this.interactionStateRef.current.anchor === 'dragged') {
      return;
    }

    let center = this.controlledPositions.center.current;
    let lead = this.controlledPositions.lead.current;
    let angleOffset = this.angleInfoRef.current.angleOffset;
    let angle = this.angleInfoRef.current.angle;

    let diffY = center.y - lead.y;
    let diffX = center.x - lead.x;
    diffX *= -1;

    let leadAngle = Math.atan2(diffY, diffX) + this.revolutions * Tau;

    let calculatedAngle = leadAngle - angleOffset;

    let differenceBetweenPrevAndNewAngle = angle - calculatedAngle;

    // crossing Tau/2 in positive direction
    if (differenceBetweenPrevAndNewAngle > Tau / 2) {
      calculatedAngle += Tau;
    }

    // crossing -Tau/2 in negative direction
    if (differenceBetweenPrevAndNewAngle < -Tau / 2) {
      calculatedAngle -= Tau;
    }

    // crossing zero positive
    if ((angle % Tau) - (calculatedAngle % Tau) >= Tau * 0.9) {
      this.revolutions += 1;
      this.radius =
        this.initialRadius +
        Math.abs(this.revolutions) * (revolutionRingGap + revolutionRingWidth);
    }

    this.angleInfoRef.current.angle = calculatedAngle;
  };

  // updates

  updateLeadWithInputControl = () => {
    if (this.angleInfoRef.current.inputControl === true) {
      this.moveLeadNodeButtonToDefaultPosition();
      this.angleInfoRef.current.inputControl = false;
    }
  };

  updateLeadPosition = () => {
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
    this.calculateAngleOffSetFromAnchorDrag();
    this.positionAnchorOnCenterDrag();
  };

  update = () => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.updateAnchorPosition();
    this.updateLeadPosition();
    if (this.angleInfoRef.current.inputControl === true) {
      this.updateLeadWithInputControl();
    } else {
      this.calculateAngleForTouchControl();
    }
    this.calculateRevolutions();
  };

  // draw functions

  drawAngle = () => {
    for (let i = 0; i < Math.abs(this.revolutions); i++) {
      let startRingBuffer = revolutionGap;
      let widthOfRing = revolutionRingWidth;
      let spaceForRing = revolutionRingWidth + revolutionRingGap;
      let startRadius =
        startRingBuffer + this.initialRadius + spaceForRing * (i - 1);
      let endRadius = startRadius + widthOfRing;
      this.drawFullRing(startRadius, endRadius, cl.getHSLA(this.color, 0.2));
    }

    let angle = this.angleInfoRef.current.angle;

    let partialAngle = angle % Tau;
    let startRadius = this.initialRadius + 2 + 12 * this.revolutions;
    let endRadius = startRadius + 10;
    this.drawPartialRing(partialAngle, cl.getHSLA(this.color, 0.8));
  };

  drawPartialRing = (partialAngle: number, color: string) => {
    let angleOffset = this.angleInfoRef.current.angleOffset;
    let center = this.controlledPositions.center.current;
    let startAngle = angleOffset;
    let endAngle = partialAngle + angleOffset;

    let radius = this.initialRadius + Math.abs(this.revolutions) * 12;
    this.context.beginPath();
    this.makeArc(radius, startAngle, endAngle);

    this.context.strokeStyle = color;
    this.context.lineCap = 'butt';
    this.context.lineWidth = 10;

    // this.context.stroke();
    this.context.lineTo(center.x, center.y);
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
    //parameters
    let minLengthFromRadius = minLength || 0;
    let startLength = this.radius + revolutionGap;
    let endLength = startLength + dashLengthPx;

    // styling
    this.context.lineWidth = dashWidthPx;
    this.context.strokeStyle = color;
    this.context.beginPath();
    let startRadius = minLengthFromRadius + this.radius;
    if (startRadius < 150) {
      startRadius = 150;
    }
    let endRadius = startRadius + dashLengthPx;
    this.makePolarLine(angle, startRadius, angle, endRadius);

    this.context.stroke();
    this.context.beginPath();
  };

  drawAngleDashes = (
    angle: number,
    offset: number,
    dashesInRevolution: number,

    revolutions: number = 0
  ) => {
    this.context.beginPath();
    this.context.lineWidth = 1;

    let outerAngle = angle % Tau;
    let totalDashes = dashesInRevolution * (outerAngle / Tau);

    // make Total Dashes positive
    totalDashes = Math.abs(totalDashes);

    // let pxSpacePerDash = circumferanceInPx / dashesInRevolution;
    let dashWidth = 1;
    let dashLength = 20;

    let dashColor = angle > 0 ? cl.getHSL(cl.blue) : cl.getHSL(cl.red);
    let angleIncrement = Tau / dashesInRevolution;

    let minLength = 5;

    if (angle < 0) {
      angleIncrement *= -1;
    }

    for (let i = 0; i <= totalDashes; i++) {
      let angle = offset + i * angleIncrement;
      this.drawDash(angle, dashWidth, dashLength, dashColor, minLength);
    }
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

  drawLeadLine = () => {
    this.context.beginPath();

    let angleOffset = this.angleInfoRef.current.angleOffset;
    let lead = this.controlledPositions.lead.current;
    let angle = this.angleInfoRef.current.angle;

    let [x0, y0] = this.getXYFromPolar(angle + angleOffset, this.initialRadius);

    this.context.moveTo(x0, y0);

    this.context.lineTo(lead.x, lead.y);

    this.context.setLineDash([8, 25]);
    this.context.lineCap = 'butt';
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

  drawLeadVisual = () => {
    let color;
    let leadState = this.interactionStateRef.current.lead;
    let angle = this.angleInfoRef.current.angle;
    let angleOffsett = this.angleInfoRef.current.angleOffset;

    // don't draw lead visual if lead button is not pressed or dragged.
    // if (leadState !== 'pressed' && leadState !== 'dragged') {
    //   return;
    // }

    this.drawLeadLine();
    if (angle > 0) {
      color = cl.getHSL(cl.blue);
    } else if (angle < 0) {
      color = cl.getHSL(cl.red);
    }

    let dashesInRevolution = this.dashDivisions;

    this.drawAngleDashes(
      angle,
      angleOffsett,
      dashesInRevolution,
      this.revolutions
    );
  };

  drawAnchorOffsetVisual = () => {
    let angleOffset = this.angleInfoRef.current.angleOffset;
    let center = this.controlledPositions.center.current;
    // draw 3 oclock line
    this.context.lineWidth = 4;
    this.context.strokeStyle = cl.getHSLA(cl.gray_dark, 0.5);

    this.context.beginPath();
    this.makePolarLine(0, 0, 0, this.radius);

    // this.context.setLineDash([8, 25]);
    // this.context.lineCap = 'round';

    this.context.lineCap = 'butt';
    this.context.stroke();

    this.drawAngleDashes(angleOffset, 0, this.dashDivisions, this.revolutions);

    this.context.beginPath();
    this.makePolarLine(
      angleOffset,
      this.initialRadius,
      angleOffset,
      this.radius + revolutionGap + dashLength
    );

    // this.context.stroke();

    this.context.beginPath();
    let startAngle = 0;
    let endAngle = Tau - angleOffset;
    let directionCounterClockwise = true;
    if (angleOffset < 0) {
      directionCounterClockwise = true;
      endAngle = Tau;
      startAngle = Tau - angleOffset;
    }

    this.context.moveTo(center.x, center.y);

    this.makeArc((this.radius * 2) / 3, 0, angleOffset);

    this.context.closePath();
    this.context.fillStyle = cl.getHSL(cl.gray_dark);
    if (angleOffset === 0) {
      return;
    } else {
      this.context.fill();
    }

    // this.context.stroke();
  };

  test = () => {
    this.update();
    // console.log((this.angleInfoRef.current.angle * 360) / Tau);

    this.drawAngleDashes(
      this.angleInfoRef.current.angle,
      this.angleInfoRef.current.angleOffset,
      360,
      this.revolutions
    );
    this.drawAngle();
  };
}

export default Revamped2AngleCircle;
