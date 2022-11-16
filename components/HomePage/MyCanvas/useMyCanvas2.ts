import { useRef, useEffect } from 'react';
import { SceneGetter } from './Scene/Scene';
import React from 'react';
import EventHandlerConfig from './EventHandler/EventHandlerConfig';

const useMyCanvas2: (
  sceneGetter: SceneGetter
) => React.MutableRefObject<null> = (sceneGetter) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current! as HTMLCanvasElement;

    const context = canvas?.getContext('2d') as CanvasRenderingContext2D;
    // context.translate(0.5, 0.5);
    let animationFrameID: number;

    const canvasEventHandlerConfig = new EventHandlerConfig();
    const { handlers, cursorPosition } = canvasEventHandlerConfig;

    const getCursorPosition = function (e: MouseEvent) {
      const offsetLeft = canvas.offsetLeft || 0;
      const offsetTop = canvas.offsetTop || 0;
      const xPos = e.pageX - offsetLeft;
      const yPos = e.pageY - offsetTop;

      cursorPosition.x = xPos;
      cursorPosition.y = yPos;
    };

    const getTouchPosition = function (e: TouchEvent) {
      const offsetLeft = canvas.offsetLeft || 0;
      const offsetTop = canvas.offsetTop || 0;

      const xPos = e.touches[0].pageX - offsetLeft;
      const yPos = e.touches[0].pageY - offsetTop;

      cursorPosition.x = xPos;
      cursorPosition.y = yPos;

      e.preventDefault();
    };

    const scene = sceneGetter(context, canvasEventHandlerConfig);

    handlers.mousemove.push(getCursorPosition);
    handlers.touchstart.push(getTouchPosition);
    handlers.touchmove.push(getTouchPosition);

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

export default useMyCanvas2;
