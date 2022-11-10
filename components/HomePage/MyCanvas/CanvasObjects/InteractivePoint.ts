import EventHandlerConfig from '../EventHandler/EventHandlerConfig';

class InteractivePoint {
  isUnderCursor: boolean;
  isBeingDragged: boolean;
  isVisible: boolean;
  listenerConfig: any;
  // context: CanvasRenderingContext2D;
  constructor(
    public context: CanvasRenderingContext2D,
    public eventHandlerConfig: EventHandlerConfig,
    public x: number,
    public y: number,
    public radius: number,
    public color: string = 'white',
    public colorActive: string = 'yellow',
    public colorDrag: string = 'red',
    public isActive: boolean = false,
    public form: 'hover' | 'selected' | 'grabbed' | 'default' = 'default',
    public locked: boolean = false
  ) {
    this.isUnderCursor = false;
    this.isBeingDragged = false;
    this.isVisible = true;
    this.form = 'default';
  }

  draw() {
    let colorString;
    let radiusSize;

    const context = this.context;

    this.update();

    switch (this.form) {
      case 'default':
        this.drawDefaultPoint();
        break;
      case 'hover':
        this.drawHoveredPoint();
        break;
    }

    // if (this.isActive) {
    //   colorString = this.colorActive;
    // } else {
    //   colorString = this.color;
    // }

    radiusSize = this.radius;

    // if (
    //   this.isUnderCursor &&
    //   this.eventHandlerConfig.cursorStatus.mouseIsDown
    // ) {
    //   colorString = this.colorDrag;
    //   this.setCursor('grabbing');
    // } else {
    //   colorString = this.color;
    //   this.setCursor('default');
    // }

    this.drawPointHalo();
  }

  update() {
    this.checkIfMouseIsOver();
    if (this.isUnderCursor) {
      this.form = 'hover';
    } else {
      this.form = 'default';
    }

    switch (this.form) {
      case 'default':
        this.setCursor('default');
        break;
      case 'hover':
        this.setCursor('grab');
        break;
    }
  }

  checkIfMouseIsOver = () => {
    let { x: mouseX, y: mouseY } = this.eventHandlerConfig.cursorPosition;
    if (!mouseX || !mouseY) return;
    const pixelDistance = this.getPixelDistBetweenCursorAndPoint();
    if (!pixelDistance) return;
    if (pixelDistance < this.radius) {
      this.isUnderCursor = true;
    } else {
      this.isUnderCursor = false;
    }
  };

  growRadius = () => {};

  drawDefaultPoint() {
    let context = this.context;
    this.drawPointHalo(1.5);
    context.beginPath();
    context.fillStyle = this.color;
    context.ellipse(
      this.x,
      this.y,
      this.radius,
      this.radius,
      0,
      0,
      Math.PI * 2
    );

    context.fill();
  }

  drawHoveredPoint() {
    let context = this.context;
    // this.drawPointHalo(2);
    context.beginPath();
    context.fillStyle = this.color;
    context.ellipse(
      this.x,
      this.y,
      this.radius * 1.5,
      this.radius * 1.5,
      0,
      0,
      Math.PI * 2
    );

    context.fill();
  }

  drawHovered() {
    this.setCursor('grab');
  }

  getPixelDistBetweenCursorAndPoint() {
    let { x: mouseX, y: mouseY } = this.eventHandlerConfig.cursorPosition;
    if (!mouseX || !mouseY) return null;
    const xDiff = mouseX - this.x;
    const yDiff = mouseY - this.y;
    const hypotenuse = Math.sqrt(xDiff ** 2 + yDiff ** 2);
    return hypotenuse;
  }

  setCursor(cursorStyle: 'grab' | 'grabbing' | 'default') {
    document.body.style.cursor = cursorStyle;
  }

  drawRingAroundPoint() {
    this.context.strokeStyle = this.colorDrag;
    this.context.stroke();
  }

  drawPointHalo(radiusScale: number = 1) {
    this.context.fillStyle = 'hsla(0  0% 100% / 0.5)';

    this.context.beginPath();
    this.context.ellipse(
      this.x,
      this.y,
      this.radius * radiusScale,
      this.radius * radiusScale,
      0,
      0,
      Math.PI * 2
    );
    this.context.fill();
  }
}

export default InteractivePoint;
