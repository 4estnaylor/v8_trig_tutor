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
    10,
    'white',
    'white',
    'white',
    false,
    'default'
  );

  scene.assets = { listenFor: [testPoint] };
  scene.draw = () => {
    ctx.fillStyle = 'white';

    ctx.fillRect(0, 0, 100, 100);
    scene.assets.listenFor.forEach((listenedForItem: any) => {
      listenedForItem.draw();
    });
  };

  return scene;
};

export default getHomepageScene;
