import { ListItem } from '@mui/material';
import InteractivePoint from '../CanvasObjects/InteractivePoint';
import EventHandlerConfig from '../EventHandler/EventHandlerConfig';
import { Scene, SceneGetter } from '../Scene/Scene';

const getHomepageScene: SceneGetter = (
  context: CanvasRenderingContext2D,
  eventHandlerConfig: EventHandlerConfig
) => {
  const scene = new Scene(context, eventHandlerConfig);
  console.log(scene.eventHandlerConfig);
  const ctx = scene.context;
  let assets = scene.assets;

  const testPoint = new InteractivePoint(
    ctx,
    scene.eventHandlerConfig,
    200,
    200,
    []
  );

  const testPoint2 = new InteractivePoint(
    ctx,
    scene.eventHandlerConfig,
    260,
    260,
    []
  );

  const testPoint3 = new InteractivePoint(
    ctx,
    scene.eventHandlerConfig,
    20,
    20,
    []
  );

  scene.assets = { listenFor: [testPoint, testPoint2, testPoint3] };
  scene.draw = () => {
    ctx.fillStyle = 'white';

    scene.assets.listenFor.forEach((listenedForItem: any) => {
      listenedForItem.draw();
    });
  };

  return scene;
};

export default getHomepageScene;
