import { useRef, useEffect } from 'react';
import { SceneGetter } from './Scene/Scene';
import React from 'react';

const useMyCanvas: (
  sceneGetter: SceneGetter
) => React.MutableRefObject<null> = (sceneGetter) => {
  const canvasRef = useRef(null);

  class EventHandlerConfig {
    handlers = {
      mousemove: [] as Function[],
      mousedown: [] as Function[],
      mouseup: [] as Function[],

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

    constructor() {
      this.cursorPosition = {
        x: null,
        y: null,
      };
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current! as HTMLCanvasElement;

    const context = canvas?.getContext('2d') as CanvasRenderingContext2D;
    context.translate(0.5, 0.5);
    let animationFrameID: number;
    const scene = sceneGetter(context);
    const eventHandlerConfig = new EventHandlerConfig();
    const { handlers, cursorPosition } = eventHandlerConfig;

    const getCursorPosition = function (e: MouseEvent) {
      const xPos = e.pageX - canvas.offsetLeft;
      const yPos = e.pageY - canvas.offsetTop;

      cursorPosition.x = xPos;
      cursorPosition.y = yPos;
      console.log(cursorPosition);
    };

    handlers.mousemove.push(getCursorPosition);

    console.log('should get fired 1 time!');

    const handlersKeys = Object.getOwnPropertyNames(handlers);

    handlersKeys.forEach((key) => {
      const current = handlers[key as keyof Object] as any;
      current.forEach((element: any) => {
        canvas.addEventListener(key, element);
      });
    });

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      // context.fillRect(0, 0, 100, 100);
      scene.draw();
      // console.log('is rendering');
      requestAnimationFrame(render);
    };

    render();

    return () => {
      console.log('ending');
      cancelAnimationFrame(animationFrameID);
      handlersKeys.forEach((key) => {
        const current = handlers[key as keyof Object] as any;
        current.forEach((element: any) => {
          canvas.removeEventListener(key, element);
        });
      });
    };
  }, []);

  return canvasRef;
};

export default useMyCanvas;
