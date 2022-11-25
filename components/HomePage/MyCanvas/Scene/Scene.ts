import EventHandlerConfig from '../EventHandler/EventHandlerConfig';

class Scene {
  public init: () => void;
  public draw: () => void;
  public assets: any;

  constructor(
    public context: CanvasRenderingContext2D,
    public eventHandlerConfig: EventHandlerConfig,
    public extra: any = {}
  ) {
    this.init = () => {
      console.log('create init function');
    };
    this.draw = () => {
      console.log('create draw function');
    };
    this.assets = {};
  }
}

export type SceneGetter = (
  context: CanvasRenderingContext2D,
  eventHandlerConfig: EventHandlerConfig
) => Scene;

const getScene: SceneGetter = (
  context: CanvasRenderingContext2D,
  eventHandlerConfig: EventHandlerConfig
) => {
  console.log('getting scene');
  const scene = new Scene(context, eventHandlerConfig);
  scene.init = () => {
    console.log('init of scene');
  };
  scene.draw = () => {
    console.log('draw of scene');
    scene.context.fillRect(0, 0, 100, 100);
  };
  return scene;
};

export { Scene, getScene };
