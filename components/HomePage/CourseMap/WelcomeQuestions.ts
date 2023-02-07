import MCQuestion from '../../Inputs/MCQuestion';
import { TopicComponent } from './Courses';

const LoginFeatureGainQ = new MCQuestion(
  'What one feature is gained by login into Google on this website',
  ['recording your progress'],
  [
    'additional content',
    `earn bitcoin ₿ by answering questions`,
    'personalized ads',
  ]
);

export const welcomeQuestions = [LoginFeatureGainQ];

export default welcomeQuestions;
