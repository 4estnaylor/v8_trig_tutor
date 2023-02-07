import MCQuestion from '../../Inputs/MCQuestion';
import { TopicComponent } from './Courses';

// correctOptions={[
//   'Trig holds a central and pervasive role within the math universe.',
//   `Trig is a point of great leverage in a student's math education.`,
// ]}
// incorrectOptions={[
//   'It has many applications useful in every day life, engineering, and architecture.',
//   'It gives insight into complex systems like few other subjects.',
// ]}

const LoginFeatureGainQ = new MCQuestion(
  'Why is trig especially important for math students according to me?',
  [
    'Trig holds a central and pervasive role within the math universe.',
    `Trig is a point of great leverage in a student's math education.`,
  ],
  [
    'It has many applications useful in every day life, engineering, and architecture.',
    'It gives insight into complex systems like few other subjects.',
  ]
);

export const mathKrakenQuestions = [LoginFeatureGainQ];

export default mathKrakenQuestions;
