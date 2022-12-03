import { Topic } from '@mui/icons-material';

export class TopicSection {
  topicComponents: TopicComponent[];
  constructor(public title: string, topicComponents: TopicComponent[]) {
    this.topicComponents = topicComponents || [];
    this.topicComponents.forEach((topicComponent: TopicComponent) => {
      topicComponent.parentTopicSection = this;
    });
  }
}

export class TopicComponent {
  subComponents?: SubComponent[];
  public parentTopicSection: TopicSection;

  constructor(public title: string, subComponents?: SubComponent[]) {
    this.subComponents = subComponents;
    this.title = title;
    this.subComponents?.forEach((subComponent: SubComponent) => {
      subComponent.parentTopicComponent = this;
    });
  }
}

export class SubComponent {
  tags: 'grind' | 'deep thinking' | 'important'[] | null;
  parentTopicComponent: TopicComponent;
  constructor(
    public title: string,
    tags?: 'grind' | 'deep thinking' | 'important'[]
  ) {}
}

const introduction = new TopicSection('Introduction', [
  new TopicComponent('welcome 🖖'),
  new TopicComponent('double down'),
  new TopicComponent('strategy', [
    new SubComponent('conceptual'),
    new SubComponent('fluency'),
  ]),
]);

const measurement = new TopicSection('Measuring Angles ∡', [
  new TopicComponent('°', [
    new SubComponent('conventions'),
    new SubComponent('interior angles'),
    new SubComponent('exterior angles'),
    new SubComponent('measuring °'),
    new SubComponent('special angles °'),
    new SubComponent('why 360°?  '),
  ]),

  new TopicComponent('τ rad', [
    new SubComponent(`what's a radian?`),
    new SubComponent('measuring τ rad'),
    new SubComponent('special angles τ rad'),
    new SubComponent('° vs τ'),
  ]),
  new TopicComponent('π rad', [
    new SubComponent('measuring π rad'),
    new SubComponent('special angles π rad'),
    new SubComponent(`friggin' π  `),
  ]),

  new TopicComponent('angle conversions', [
    new SubComponent('° ⟷ τ rad'),
    new SubComponent('τ rad ⟷ π rad'),
  ]),
  new TopicComponent(` measurment  notes 📝  `),
]);

const ratios = new TopicSection('Ratios', [
  new TopicComponent('sin'),
  new TopicComponent('cos'),
  new TopicComponent('tangent & cotangent'),
  new TopicComponent('secant & cosecant'),
]);

const topicSections: TopicSection[] = [introduction, measurement, ratios];

// const initializeTopicComponentWithParents = (topicSection: TopicSection) => {
//   topicSection.topicComponents.forEach((topicComponent: TopicComponent) => {
//     topicComponent.parentTopicSection = introduction;
//   });
// };

export default topicSections;
