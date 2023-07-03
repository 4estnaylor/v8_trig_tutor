import EventHandlerConfig from '../EventHandler/EventHandlerConfig';

class InteractivePoint {
  isUnderCursor: boolean;
  isVisible: boolean;
  listenerConfig: any;
  transitionPeriod: number;
  initialCursorGrabDistance: {
    x: number;
    y: number;
  };
  alpha: number;
  alphaDifference: number;
  // context: CanvasRenderingContext2D;
  constructor(
    public context: CanvasRenderingContext2D,
    public eventHandlerConfig: EventHandlerConfig,

    public x: number,
    public y: number,
    public listenFor: any[] = [],
    public radius: number = 18,
    public color: string = 'white',

    public form: 'hover' | 'selected' | 'grabbing' | 'default' = 'default'
  ) {
    this.isUnderCursor = false;
    this.isVisible = true;
    this.form = form;
    this.transitionPeriod = 0.5;
    this.listenFor.push(this);
    this.initialCursorGrabDistance = {
      x: 0,
      y: 0,
    };
    this.alphaDifference = 0.4;
    this.alpha = 1;
  }

  draw() {
    this.update();

    switch (this.form) {
      case 'default':
        this.drawDefaultPoint();
        break;
      case 'hover':
        this.drawHoveredPoint();
        break;
      case 'grabbing':
        this.drawGrabbingPoint();
        break;
    }
  }

  drawNoUpdate() {
    switch (this.form) {
      case 'default':
        this.drawDefaultPoint();
        break;
      case 'hover':
        this.drawHoveredPoint();
        break;
      case 'grabbing':
        this.drawGrabbingPoint();
        break;
    }

    this.drawPointHalo();
  }

  update() {
    this.checkIfMouseIsOver();

    // if (this.form !== 'default') {
    //   this.context.canvas.onscroll = function () {
    //     window.scrollTo(0, 0);
    //   };
    // }

    if (
      this.form === 'grabbing' &&
      this.eventHandlerConfig.cursorStatus.mouseIsDown
    ) {
      let cursorPosition = this.eventHandlerConfig.cursorPosition;
      if (
        !cursorPosition.x ||
        !cursorPosition.y ||
        !this.initialCursorGrabDistance
      )
        return;
      this.x = cursorPosition.x + this.initialCursorGrabDistance.x;
      this.y = cursorPosition.y + this.initialCursorGrabDistance.y;
      // this.x += this.eventHandlerConfig.cursorPosition.movementX;
      // this.y += this.eventHandlerConfig.cursorPosition.movementY;
    } else if (
      this.isUnderCursor &&
      !this.eventHandlerConfig.cursorStatus.mouseIsDown
    ) {
      this.form = 'hover';
    } else if (
      this.isUnderCursor &&
      this.eventHandlerConfig.cursorStatus.mouseIsDown
    ) {
      this.form = 'grabbing';
      this.getCursorAndInteractivePointPositionDifferenceOnGrab();
    } else if (
      !this.isUnderCursor &&
      !this.eventHandlerConfig.cursorStatus.mouseIsDown
    ) {
      this.form = 'default';

      // console.log('is happening');
    }

    switch (this.form) {
      case 'default':
        this.setCursor('default');
        break;
      case 'hover':
        this.setCursor('grab');
        break;
      case 'grabbing':
        this.setCursor('grabbing');
        break;
    }
    this.keepInBoundsOfCanvas();
  }

  keepInBoundsOfCanvas = () => {
    const canvasWidth = this.context.canvas.width;
    const canvasHeight = this.context.canvas.height;
    let buffer = 1;

    if (this.x > canvasWidth) {
      this.form = 'default';
      this.x = canvasWidth - buffer;
      this.eventHandlerConfig.cursorStatus.mouseIsDown = false;
      this.isUnderCursor = false;
    }
    if (this.x < 0) {
      this.form = 'default';
      this.x = buffer;
      this.eventHandlerConfig.cursorStatus.mouseIsDown = false;
      this.isUnderCursor = false;
    }
    if (this.y > canvasHeight) {
      this.form = 'default';
      this.y = canvasHeight - buffer;
      this.eventHandlerConfig.cursorStatus.mouseIsDown = false;
      this.isUnderCursor = false;
    }
    if (this.y < 0) {
      this.form = 'default';
      this.y = buffer;
      this.eventHandlerConfig.cursorStatus.mouseIsDown = false;
      this.isUnderCursor = false;
    }
  };

  checkIfMouseIsOver = () => {
    let { x: mouseX, y: mouseY } = this.eventHandlerConfig.cursorPosition;
    if (!mouseX || !mouseY) {
      this.isUnderCursor = false;
    }
    const pixelDistance = this.getPixelDistBetweenCursorAndPoint();
    if (!pixelDistance) return;
    if (pixelDistance < this.radius * 1.5) {
      if (this.CheckIfItemAlreadyUnderCursor()) return;
      this.isUnderCursor = true;
      // console.log(
      //   'under cursors!',
      //   this.eventHandlerConfig.cursorPosition,
      //   this.x,
      //   this.y
      // );
      this.listenFor.push(
        this.listenFor.splice(this.listenFor.indexOf(this), 1)[0]
      );
    } else {
      this.isUnderCursor = false;
    }
  };

  getCursorAndInteractivePointPositionDifferenceOnGrab() {
    let cursor = this.eventHandlerConfig.cursorPosition;

    if (!cursor.x || !cursor.y) {
      return;
    }

    let dx = this.x - cursor.x;
    let dy = this.y - cursor.y;

    this.initialCursorGrabDistance = {
      x: dx,
      y: dy,
    };
  }

  growRadius = () => {};

  CheckIfItemAlreadyUnderCursor() {
    let alreadyUnderCursor = false;

    this.listenFor.forEach((item) => {
      if (item.isUnderCursor) {
        alreadyUnderCursor = true;
      }
    });
    return alreadyUnderCursor;
  }

  drawDefaultPoint() {
    let context = this.context;
    this.drawPointHalo(1.5);
    context.beginPath();
    context.fillStyle = this.color;
    context.globalAlpha = 1 - this.alphaDifference;
    context.ellipse(
      this.x,
      this.y,
      this.radius * 0.75,
      this.radius * 0.75,
      0,
      0,
      Math.PI * 2
    );

    context.fill();
    context.globalAlpha = 1;
  }

  drawHoveredPoint() {
    let context = this.context;
    this.drawPointHalo(2);
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

  drawGrabbingPoint() {
    let context = this.context;
    this.drawPointHalo(2.5);
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
    this.context.strokeStyle = this.color;
    this.context.stroke();
  }

  drawPointHalo(radiusScale: number = 1, alpha: number = 0.2) {
    this.context.fillStyle = 'hsla(0  0% 100% / 0.5)';

    this.context.beginPath();
    this.context.fillStyle = this.color;
    this.context.globalAlpha = alpha;
    this.context.ellipse(
      this.x,
      this.y,
      this.radius,
      this.radius,
      0,
      0,
      Math.PI * 2
    );
    this.context.fill();
    this.context.globalAlpha = 1;
  }
}

export default InteractivePoint;
