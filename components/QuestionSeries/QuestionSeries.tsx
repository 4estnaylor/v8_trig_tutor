import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MCQuestion from '../Inputs/MCQuestion';
import { Button, MobileStepper } from '@mui/material';
import cl from '../../colors';
import MultipleChoiceQuestionForSeries from '../Inputs/MultipleChocieQuestionForSeries';

type QuestionSeriesProps = {
  questions: MCQuestion[];
};

const QuestionSeries = (props: QuestionSeriesProps) => {
  const { questions } = props;
  const questionObjs = questions.map((question, index) => {
    return question.createMCQuestionElementForSeries(index, questions.length);
  });
  const [questionIndex, setQuestionIndex] = useState(0);

  const handleNext = () => {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (questionIndex > 0) {
      setQuestionIndex((prev) => prev - 1);
    }
  };

  const stepper = (
    <MyStepper
      variant="text"
      steps={questions.length}
      position="static"
      activeStep={questionIndex}
      sx={{
        flexGrow: 1,
        width: '100%',
        maxWidth: '500px',
        background: cl.getHSLA(cl.purple_dark, 0),
        color: cl.getHSL(cl.purple_light),
      }}
      color="inherit"
      nextButton={
        <Button onClick={handleNext} sx={{ color: cl.getHSL(cl.purple_light) }}>
          next
        </Button>
      }
      backButton={
        <Button onClick={handleBack} sx={{ color: cl.getHSL(cl.purple_light) }}>
          back
        </Button>
      }
    />
  );

  // useEffect(() => {
  //   setQuestionDisplay(questions[questionIndex].createMCQuestionElement());
  // }, [questionIndex]);
  return (
    <Wrapper>
      {stepper}
      {questionObjs[questionIndex]}
    </Wrapper>
  );
};

const StepButton = styled(Button)`
  color: 'inherit';
`;

const MyStepper = styled(MobileStepper)`
  position: absolute;
`;

const Wrapper = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: -20px;
`;
export default QuestionSeries;
