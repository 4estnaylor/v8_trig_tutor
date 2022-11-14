export class TopicSection {
  topicComponents: TopicComponent[];
  constructor(public title: string, topicComponents: TopicComponent[]) {
    this.topicComponents = topicComponents || [];
  }
}

export class TopicComponent {
  subComponents?: SubComponent[];
  constructor(public title: string, subComponents?: SubComponent[]) {
    this.subComponents = subComponents;
    this.title = title;
  }
}

export class SubComponent {
  tags: 'grind' | 'deep thinking' | 'important'[] | null;
  constructor(
    public title: string,
    tags?: 'grind' | 'deep thinking' | 'important'[]
  ) {}
}

const introduction = new TopicSection('Introduction', [
  new TopicComponent('welcome'),
  new TopicComponent('course structure'),
  new TopicComponent('mathematical fluency'),
]);

const measurement = new TopicSection('Measuring Angles ∡', [
  new TopicComponent('degrees or °', [
    new SubComponent('measuring with °'),
    new SubComponent('special angles in °'),
    new SubComponent('why 360°? why not 100°? '),
  ]),

  new TopicComponent('tau radians or τ rad', [
    new SubComponent('measuring with τ rad'),
    new SubComponent('special angles with τ rad'),
    new SubComponent('why have both τ rad and °'),
  ]),
  new TopicComponent('pi radians or  π rad', [
    new SubComponent('measuring with  π rad'),
    new SubComponent('special angles with  π rad'),
    new SubComponent('why have both  π rad and °'),
  ]),

  new TopicComponent('angle conversions', [
    new SubComponent('° ⟷ τ rad'),
    new SubComponent('τ rad ⟷ π rad'),
  ]),
]);

const ratios = new TopicSection('The Ratios of  Power', [
  new TopicComponent('sin'),
  new TopicComponent('cos'),
  new TopicComponent('tangent & cotangent'),
  new TopicComponent('secant & cosecant'),
]);

const topicSections: TopicSection[] = [introduction, measurement, ratios];

export default topicSections;
