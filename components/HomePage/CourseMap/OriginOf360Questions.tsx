import MCQuestion from '../../Inputs/MCQuestion';

const isPiNatural: MCQuestion = new MCQuestion(
  'Is π a value that determined by nature or people?',
  ['nature'],
  ['people']
);
const is360DegNatural: MCQuestion = new MCQuestion(
  'Is 360, as a value to divide circles, determined by nature or humans?',
  ['people'],
  ['nature']
);

const whereDoes360ComeFrom: MCQuestion = new MCQuestion(
  '360 as a vaue to divide circles can be traced back to which of the following? ',
  ['Babylonian calendars used for astronomy'],
  [
    'the Babylonian base-60 counting system',

    'snowboarding legend Shaun White',
    'the Lost City of Atlantis',
  ]
);

const MCQuestionsFor360 = [isPiNatural, is360DegNatural];
export default MCQuestionsFor360;
