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
  'Why did I make a website about trig?',
  [
    `Trig is the point of greatest leverage for most students in highschool math.`,
  ],
  [
    'It has many applications useful in every day life, engineering, and architecture.',
    'It gives insight into complex systems like few other subjects.',
    "It's my favorite.",
    'I had a vivid, lifechanging dream telling me to make a website about trig.',
  ]
);

export const mathKrakenQuestions = [LoginFeatureGainQ];

export default mathKrakenQuestions;
