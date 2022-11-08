import InteractivePoint from '../CanvasObjects/InteractivePoint';
import { Scene, SceneGetter } from '../Scene/Scene';

const getHomepageScene: SceneGetter = (context: CanvasRenderingContext2D) => {
  const scene = new Scene(context);
  const ctx = scene.context;

  const testPoint = new InteractivePoint(ctx, 200, 200, 10, 'white');

  scene.assets = { testPoint: testPoint };
  scene.draw = () => {
    ctx.fillStyle = 'white';

    ctx.fillRect(0, 0, 100, 100);
    scene.assets.testPoint.draw();
  };

  return scene;
};

export default getHomepageScene;
