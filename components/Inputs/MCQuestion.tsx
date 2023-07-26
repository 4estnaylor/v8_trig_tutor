import { useState } from 'react';
import useCheckQuestionForUser, {
  UseCheckReturnType,
} from '../../utils/hooks/useCheckQuestionForUser';
import useTrigUser from '../../utils/hooks/useTrigUser';
import MultipleChoiceQuestion, { AnswerState } from './MultipleChoiceQuestion';
import MultipleChoiceQuestionForSeries from './MultipleChocieQuestionForSeries';

type Option = string | JSX.Element | React.ReactElement;

export default class MCQuestion {
  answerState: AnswerState | null;
  setAnswerState: React.Dispatch<React.SetStateAction<AnswerState>> | null;
  additionalContent: string | JSX.Element | React.ReactElement;
  isOrdered: boolean;
  constructor(
    public question: string,
    public correctOptions: Option[],
    public incorrectOptions: Option[]
  ) {
    this.question = question;
    this.correctOptions = correctOptions;
    this.incorrectOptions = incorrectOptions;
    this.answerState = null;
    this.setAnswerState = null;
    this.isOrdered = false;
    // const test = useCheckQuestionForUser({
    //   question: this.question,
    // });

    // this.answerState = answerState;
    // this.setAnswerState = setAnswerState;

    // this.answerState = 'unanswered';
  }

  createMCQuestionElement = () => {
    const [answerState, setAnswerState, questionId] = useCheckQuestionForUser({
      question: this.question,
    });

    this.answerState = answerState;
    this.setAnswerState = setAnswerState;

    // const trigUser = useTrigUser();

    return (
      <MultipleChoiceQuestion
        question={this.question}
        correctOptions={this.correctOptions}
        incorrectOptions={this.incorrectOptions}
        answerState={this.answerState}
        setAnswerState={this.setAnswerState}
        questionId={questionId}
      />
    );
  };

  createMCQuestionElementForSeries = (
    index?: number,
    setIndex?: any,
    Serieslength?: number
  ) => {
    const [answerState, setAnswerState, questionId] = useCheckQuestionForUser({
      question: this.question,
    });

    this.answerState = answerState;
    this.setAnswerState = setAnswerState;

    // const trigUser = useTrigUser();

    return (
      <MultipleChoiceQuestionForSeries
        question={this.question}
        correctOptions={this.correctOptions}
        incorrectOptions={this.incorrectOptions}
        answerState={this.answerState}
        setAnswerState={this.setAnswerState}
        questionId={questionId}
        setIndex={setIndex}
      />
    );
  };
}
