class InteractivePoint {
  isUnderCursor: boolean;
  isBeingDragged: boolean;
  isVisible: boolean;
  listenerConfig: any;
  // context: CanvasRenderingContext2D;
  constructor(
    public context: CanvasRenderingContext2D,
    public x: number,
    public y: number,
    public radius: number,
    public color: string = 'white',
    public colorActive: string = 'yellow',
    public colorDrag: string = 'red',
    public isActive: boolean = false
  ) {
    this.isUnderCursor = false;
    this.isBeingDragged = false;
    this.isVisible = true;
  }

  draw() {
    let colorString;
    let radiusSize;
    const context = this.context;

    if (this.isActive) {
      colorString = this.colorActive;
    } else {
      colorString = this.color;
    }

    if (this.isUnderCursor) {
      radiusSize = 1.6 * this.radius;
    } else {
      radiusSize = this.radius;
    }

    context.fillStyle = colorString;
    context.ellipse(this.x, this.y, radiusSize, radiusSize, 0, 0, Math.PI * 2);

    context.fill();
    if (this.isBeingDragged) {
      this.drawRingAroundPoint();
    }
  }

  drawRingAroundPoint() {
    this.context.strokeStyle = this.colorDrag;
    this.context.stroke();
  }
}

export default InteractivePoint;
