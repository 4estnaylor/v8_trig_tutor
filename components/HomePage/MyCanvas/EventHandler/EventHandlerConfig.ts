class EventHandlerConfig {
  handlers = {
    mousemove: [] as Function[],
    mousedown: [] as Function[],
    touchstart: [] as Function[],
    mouseup: [] as Function[],
    touchend: [] as Function[],

    mouseover: [] as Function[],
    mouseout: [] as Function[],
    click: [] as Function[],
    dblclick: [] as Function[],
    contextmenu: [] as Function[],
  };

  cursorPosition: {
    x: number | null;
    y: number | null;
  };

  cursorStatus: {
    mouseIsDown: boolean;
    dragging: boolean;
  };

  constructor() {
    this.cursorPosition = {
      x: null,
      y: null,
    };

    this.cursorStatus = {
      mouseIsDown: false,
      dragging: false,
    };

    this.handlers.mousedown.push(this.defaultDown);
    this.handlers.mouseup.push(this.defaultUp);
    this.handlers.touchstart.push(this.defaultTouchStart);
    this.handlers.touchend.push(this.defaultTouchEnd);
  }

  defaultDown = () => {
    this.cursorStatus.mouseIsDown = true;
    console.log('mouse is down click');
  };

  defaultTouchStart = (e: TouchEvent) => {
    this.cursorStatus.mouseIsDown = true;

    e.preventDefault();
  };

  defaultUp = () => {
    this.cursorStatus.mouseIsDown = false;
  };

  defaultTouchEnd = (e: TouchEvent) => {
    this.cursorStatus.mouseIsDown = false;
    this.cursorPosition.x = null;
    this.cursorPosition.y = null;
    e.preventDefault();
    console.log('mouse is up touch');
  };
}

export default EventHandlerConfig;
