import MCQuestion from '../../Inputs/MCQuestion';

const isPiNatural: MCQuestion = new MCQuestion(
  'Is π a value that is pre-determined by nature or a value that we get to choose',
  ['Determined by nature.'],
  ['We get to choose.']
);
const is360DegNatural: MCQuestion = new MCQuestion(
  'Is 360, as a value to divide circles, determined by nature or that we get to choose?',
  ['We get to choose.'],
  ['Determined by nature.']
);

const whereDoes360ComeFrom: MCQuestion = new MCQuestion(
  'Historically the origin of 360 for division of circles can be traced back to which two sources?  ',
  [
    'Babylonian astronomer-priests inspired by astrology',
    ' A greek astronomer applying Euclidean geometry to astronomy.',
  ],
  [
    'the Babylonian base-60 counting system',
    'snowboarding legend Shaun "Animal" White',
    'the Lost City of Atlantis',
  ]
);

// const whoWereThey: MCQuestion = new MCQuestion('Why')

const MCQuestionsFor360 = [isPiNatural, is360DegNatural, whereDoes360ComeFrom];
export default MCQuestionsFor360;
