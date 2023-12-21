import { Tau } from './UsefulConstants';

type ControlledPositionRef = { current: { x: number; y: number } };

// const controlledButtonOffsetX = 24;
const controlledButtonOffsetX = 24;
const controlledButtonOffsetY = 24;

class RevampedAngleCircle {
  context: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  dragNodePositionRef?: ControlledPositionRef;
  centerNodePositionRef?: ControlledPositionRef;
  anchorNodePositionRef?: ControlledPositionRef;
  isCenterNodeLocked: boolean;
  radiusLengthInPixels: number;

  centerNodePosition: { x: number; y: number };

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.canvas = this.context.canvas;
    this.radiusLengthInPixels = 120;
    this.centerNodePosition = this.centerNodePositionRef
      ? {
          x: this.centerNodePositionRef.current.x + controlledButtonOffsetX,
          y: this.centerNodePositionRef.current.y + controlledButtonOffsetY,
        }
      : { x: 0, y: 0 };
    this.isCenterNodeLocked = false;

    console.log(this.canvas.width);
  }

  update = () => {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updateCenterPosition();

    // this.centerNodePosition = this.centerNodePositionRef
    //   ? this.centerNodePositionRef.current
    //   : { x: this.canvas.width / 2, y: this.canvas.height / 2 };
  };

  updateCenterPosition = () => {
    // update center node position

    // if isCenterNodeLocked don't update
    if (this.isCenterNodeLocked) return;

    // if provided centerNodePositionRef, sync it with the position.
    if (this.centerNodePositionRef) {
      this.centerNodePosition = {
        x: this.centerNodePositionRef.current.x + controlledButtonOffsetX,
        y: this.centerNodePositionRef.current.y + controlledButtonOffsetY,
      };
    }
  };

  drawAngleCircleShadow = () => {
    this.context.beginPath();
    this.context.globalAlpha = 0.1;
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
  };

  test = () => {
    this.update();
    this.drawAngleCircleShadow();
    // console.log(this.dragNodePositionRef);
  };
}

export default RevampedAngleCircle;
