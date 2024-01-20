import {
  AngleInfo,
  ControlledPositions,
  InteractionState,
} from '../../../niche/Intro/DragToBigAngles';

class Revamped2AngleCircle {
  context: CanvasRenderingContext2D;
  angleInfoRef: React.Ref<AngleInfo>;
  interactionStateRef: React.Ref<InteractionState>;
  controlledPositions: ControlledPositions;
  constructor(
    context: CanvasRenderingContext2D,
    angleInfoRef: React.Ref<AngleInfo>,
    interactionStateRef: React.Ref<InteractionState>,
    controlledPositions: ControlledPositions
  ) {
    console.log('constructing revamped 2');
  }

  test = () => {
    console.log('testing revamped 2');
  };
}

export default Revamped2AngleCircle;
