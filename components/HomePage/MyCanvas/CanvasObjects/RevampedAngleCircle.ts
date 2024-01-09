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
  isCenterNodeLocked: boolean;
  radiusLengthInPixels: number;
  anchorAngleOfOffset: number;
  angle: number;
  color: color;
  interactionStateRef: { current: InteractionState };

  centerNodePosition: { x: number; y: number };

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.angle = Tau / 6;
    this.color = cl.black;
    this.canvas = this.context.canvas;
    this.radiusLengthInPixels = 120;
    this.anchorAngleOfOffset = 0 * Tau;
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
    this.updateAnchorPosition();
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

    // console.log('no match');
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
    //   // console.log('harah', this.anchorNodePositionRef);
    //   this.anchorNodePositionRef.current = {
    //     x: 100,
    //     y: 100,
    //   };
    // }
  };

  drawAngleCircleShadow = () => {
    this.context.beginPath();
    this.context.globalAlpha = 0.015;
    this.context.ellipse(
      this.centerNodePosition.x,
      this.centerNodePosition.y,
      this.radiusLengthInPixels,
      this.radiusLengthInPixels,
      0,
      0,
      Tau
    );

    this.context.fill();
    this.context.globalAlpha = 1;
    this.context.stroke();
    // console.log(
    //   this.centerNodePositionRef?.current.x,
    //   this.centerNodePosition.x
    // );
  };

  drawAnchorNotch = () => {
    this.context.beginPath();
    let cosValue = Math.cos(this.anchorAngleOfOffset);
    let sinValue = Math.sin(this.anchorAngleOfOffset);
    let notchThickness = 10;
    let notchColorString = cl.getHSLA(this.color, 0.5);
    let xPos = this.centerNodePosition.x + this.radiusLengthInPixels * cosValue;
    let yPos = this.centerNodePosition.y - this.radiusLengthInPixels * sinValue;

    let notchLength = 15;

    this.context.beginPath();
    this.context.strokeStyle = notchColorString;
    this.context.lineCap = 'round';
    this.context.moveTo(xPos, yPos);
    this.context.lineTo(
      xPos - cosValue * notchLength,
      yPos - sinValue * notchLength
    );
    this.context.lineWidth = notchThickness;
    this.context.stroke();
  };

  test = () => {
    this.update();
    this.drawAngleCircleShadow();
    this.drawAnchorNotch();

    // console.log(this.dragNodePositionRef);
  };
}

export default RevampedAngleCircle;
