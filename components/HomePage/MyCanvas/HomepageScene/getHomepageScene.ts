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
  scene.assets.listenFor = [];

  const drawTestPoinsts = () => {
    for (let i = 0; i < 3; i++) {
      let interactivePoint = new InteractivePoint(
        ctx,
        eventHandlerConfig,
        100,
        100,
        scene.assets.listenFor
      );
    }
  };

  drawTestPoinsts();
  scene.draw = () => {
    ctx.fillStyle = 'white';

    let itemUnderCursor = 0;
    scene.assets.listenFor.forEach((listenedForItem: any) => {
      listenedForItem.draw();
    });
  };

  return scene;
};

export default getHomepageScene;
