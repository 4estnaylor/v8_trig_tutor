import { Topic } from '@mui/icons-material';
import MCQuestion from '../../Inputs/MCQuestion';
import welcomeQuestions from './WelcomeQuestions';

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

  constructor(
    public title: string,
    subComponents?: SubComponent[],
    public questions?: MCQuestion[]
  ) {
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
  public questions?: MCQuestion[];

  constructor(
    public title: string,
    tags?: 'grind' | 'deep thinking' | 'important'[]
  ) {}
}

export const introduction = new TopicSection('Intro: Sharpen your axe 🪓', [
  new TopicComponent('welcome 🖖'),
  new TopicComponent('motivation', [
    new SubComponent('why you should study trig'),
    new SubComponent("why you shouldn't not study trig"),
  ]),

  // new TopicComponent('double down'),
  // new TopicComponent('math kraken 🐙'),
  new TopicComponent('strategy', [
    new SubComponent('conceptual'),
    new SubComponent('fluency'),
  ]),
  new TopicComponent('mindset'),
]);

export const measurement = new TopicSection('Measuring Angles ∡', [
  new TopicComponent('°', [new SubComponent("Let's invent a unit")]),

  new TopicComponent('negative angles'),
  new TopicComponent(`big angles`),
  new TopicComponent('radians', [
    new SubComponent('τ radians'),
    new SubComponent('π radians'),
  ]),
  new TopicComponent('conversions', [
    new SubComponent('τ radians ↔ π radians'),
    new SubComponent('° ↔ τ radians'),
    new SubComponent('° ↔ π radians'),
  ]),

  // new TopicComponent('rad with τ'),
  // new TopicComponent('special angles τ'),
  // new TopicComponent('special angles π'),
  // new TopicComponent('°', [
  //   new SubComponent('conventions'),
  //   new SubComponent('interior angles'),
  //   new SubComponent('exterior angles'),
  //   new SubComponent('measuring °'),
  //   new SubComponent('special angles °'),
  //   new SubComponent('why 360°?  '),
  // ]),

  // new TopicComponent('τ rad', [
  //   new SubComponent(`what's a radian?`),
  //   new SubComponent('measuring τ rad'),
  //   new SubComponent('special angles τ rad'),
  //   new SubComponent('° vs τ'),
  // ]),
  // new TopicComponent('π rad', [
  //   new SubComponent('measuring π rad'),
  //   new SubComponent('special angles π rad'),
  //   new SubComponent(`friggin' π  `),
  // ]),

  // new TopicComponent('angle conversions', [
  //   new SubComponent('° ⟷ τ rad'),
  //   new SubComponent('τ rad ⟷ π rad'),
  // ]),
  // new TopicComponent(` measurment  notes 📝  `),
]);

export const specialAngles = new TopicSection('Special Angles', [
  new TopicComponent('°', [
    new SubComponent('halves'),
    new SubComponent('thirds'),
    new SubComponent('quarters'),
    new SubComponent('sixths'),
    new SubComponent('twelfths'),
    new SubComponent('all together'),
  ]),
  new TopicComponent('τ', [
    new SubComponent('halves'),
    new SubComponent('thirds'),
    new SubComponent('quarters'),
    new SubComponent('sixths'),
    new SubComponent('twelfths'),
    new SubComponent('all together'),
  ]),
  new TopicComponent('π', [
    new SubComponent('halves'),
    new SubComponent('thirds'),
    new SubComponent('quarters'),
    new SubComponent('sixths'),
    new SubComponent('twelfths'),
    new SubComponent('all together'),
  ]),
]);

export const sideLengths = new TopicSection('Sides', [
  new TopicComponent('hypotenuse (the big one)'),
  new TopicComponent('opposite'),
  new TopicComponent('adjacent'),
]);

export const ratios = new TopicSection('Ratios', [
  new TopicComponent('100% natural & organic goodness', [
    new SubComponent('sin'),
    new SubComponent('cos'),
    new SubComponent('tan (& cot)'),
    new SubComponent('sec (& cosec)'),
  ]),
]);

const topicSections: TopicSection[] = [
  introduction,
  measurement,
  specialAngles,
  sideLengths,
  ratios,
];

// const initializeTopicComponentWithParents = (topicSection: TopicSection) => {
//   topicSection.topicComponents.forEach((topicComponent: TopicComponent) => {
//     topicComponent.parentTopicSection = introduction;
//   });
// };

export default topicSections;
