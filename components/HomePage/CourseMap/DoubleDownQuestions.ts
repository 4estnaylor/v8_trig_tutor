import MCQuestion from '../../Inputs/MCQuestion';
import { TopicComponent } from './Courses';

{
  /* <MultipleChoiceQuestion
            question="What one single piece of math advice would the author give to his former self?"
            correctOptions={['double-down on trig']}
            incorrectOptions={[
              'Establish dominance by using crayon instead of pencil on math tests.',
              'Try extreme dietry fads to enhance your ability to think fast.',
              'Forget about math. Math is for robots now.',
              'Pursue your interests and ask lots of questions along the way.',
            ]}
            answerState={adviceQuestionState}
            setAnswerState={setAdviceQuestionState}
          /> */
}

const LoginFeatureGainQ = new MCQuestion(
  'What one single piece of math advice would the author give to his former self?',
  ['double-down on trig'],
  [
    'Establish dominance by using crayon instead of pencil on math tests.',
    'Try extreme dietry fads to enhance your ability to think fast.',
    'Forget about math. Math is for robots now.',
    'Pursue your interests and ask lots of questions along the way.',
  ]
);

export const doubleDownQuestions = [LoginFeatureGainQ];

export default doubleDownQuestions;
