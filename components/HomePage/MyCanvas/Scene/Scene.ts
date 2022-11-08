class Scene {
  public init: () => void;
  public draw: () => void;
  public assets: any;

  constructor(public context: CanvasRenderingContext2D) {
    this.init = () => {
      console.log('create init function');
    };
    this.draw = () => {
      console.log('create draw function');
      console.log(this.context);
    };
    this.assets = {};
  }
}

export type SceneGetter = (context: CanvasRenderingContext2D) => Scene;

const getScene = (context: CanvasRenderingContext2D) => {
  console.log('getting scene');
  const scene = new Scene(context);
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
