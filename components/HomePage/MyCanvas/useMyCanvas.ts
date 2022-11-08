import { useRef, useEffect } from 'react';
import { SceneGetter } from './Scene/Scene';
import React from 'react';

const useMyCanvas: (
  sceneGetter: SceneGetter
) => React.MutableRefObject<null> = (sceneGetter) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current! as HTMLCanvasElement;
    const context = canvas?.getContext('2d') as CanvasRenderingContext2D;
    let animationFrameID: number;
    const scene = sceneGetter(context);

    const render = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      // context.fillRect(0, 0, 100, 100);
      scene.draw();
      // console.log('is rendering');
      requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameID);
    };
  }, []);

  return canvasRef;
};

export default useMyCanvas;
