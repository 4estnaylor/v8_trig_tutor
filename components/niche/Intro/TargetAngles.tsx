import React from 'react';
import styled from 'styled-components';
import cl from '../../../colors';
import { Button } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import CheckIcon from '@mui/icons-material/Check';

interface TargetAnglesProps {
  targetAngleObjects: { angle: number; correct: boolean }[];
  displayIndex: number;
  setDisplayAngleIndex: React.Dispatch<React.SetStateAction<number>>;
}

const TargetAngles = (props: TargetAnglesProps) => {
  const { targetAngleObjects, displayIndex, setDisplayAngleIndex } = props;
  const handleDotClick = (value: number) => {
    setDisplayAngleIndex(value);
  };

  let canClickNext = displayIndex !== targetAngleObjects.length - 1;
  let canClickPrev = displayIndex > 0;

  const handleNextClick = () => {
    if (!canClickNext) return;
    setDisplayAngleIndex((prev) => prev + 1);
  };

  const handlePrevClick = () => {
    if (!canClickPrev) return;
    setDisplayAngleIndex((prev) => prev - 1);
  };

  const sequencedItems = targetAngleObjects.map((targetAngleObject, index) => {
    let isDisplayed = targetAngleObjects[displayIndex] === targetAngleObject;
    let isCorrect = targetAngleObject.correct;

    return (
      <DotWrapper key={index}>
        <Dot
          key={index}
          isDisplayed={isDisplayed}
          isCorrect={isCorrect}
          onClick={() => {
            handleDotClick(index);
          }}
        >
          {isCorrect ? <CheckIcon fontSize="small"></CheckIcon> : ' '}
        </Dot>
      </DotWrapper>
    );

    // if (isDisplayedAngleObj) {
    //   if (targetAngleObject.correct) {
    //     return (
    //       <CorrectDisplayedAngle>
    //         <CheckIcon fontSize="small" />
    //       </CorrectDisplayedAngle>
    //     );
    //   }
    //   if (!targetAngleObject.correct) {
    //     return <DisplayedAngle></DisplayedAngle>;
    //   }
    // }

    // if (!isDisplayedAngleObj) {
    //   if (targetAngleObject.correct) {
    //     return (
    //       <CorrectAngle>
    //         <CheckIcon fontSize="small"></CheckIcon>
    //       </CorrectAngle>
    //     );
    //   } else {
    //     return <UnansweredAngle></UnansweredAngle>;
    //   }
    // }
  });

  return (
    <Wrapper>
      {/* <DisplayedAngle>{targetAngleObjects[displayIndex].angle}°</DisplayedAngle> */}
      <Sequence>
        <SequenceButton onClick={handlePrevClick} canClick={canClickPrev}>
          <NavigateBeforeIcon></NavigateBeforeIcon>
        </SequenceButton>
        {sequencedItems}
        <SequenceButton onClick={handleNextClick} canClick={canClickNext}>
          <NavigateNextIcon></NavigateNextIcon>
        </SequenceButton>
      </Sequence>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const AngleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DotWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  width: 24px;
  border-radius: 12px;
  background-color: red;
`;

const Dot = styled.button<{ isDisplayed: boolean; isCorrect: boolean }>`
  -webkit-appearance: none;
  -webkit-text-size-adjust: unset;

  /* border-radius: 50%; */
  border: none;
  box-shadow: none;
  height: ${(p) => (p.isDisplayed || p.isCorrect ? '24px' : '16px')};
  width: ${(p) => (p.isDisplayed || p.isCorrect ? '24px' : '16px')};
  border-radius: ${(p) => (p.isDisplayed || p.isCorrect ? '12px' : '8px')};

  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  /* position: relative; */
  color: ${cl.getHSL(cl.white)};
  background-color: ${(p) =>
    p.isDisplayed
      ? cl.getHSL(cl.purple)
      : p.isCorrect
      ? cl.getHSL(cl.gray_mid)
      : cl.getHSL(cl.gray_light)};
  &:hover {
    cursor: pointer;
  }
  transition: all 0.2s ease-in-out;

  // border radius weird
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  /* border-radius: 50%; */
  -khtml-border-radius: 50%;
`;

// const DisplayedAngle = styled(Dot)`
//   height: 24px;
//   width: 24px;
//   background-color: ${cl.getHSL(cl.purple)};
// `;
// const CorrectAngle = styled(Dot)`
//   background-color: ${cl.getHSL(cl.gray_mid)};
//   height: 24px;
//   width: 24px;
// `;
// const CorrectDisplayedAngle = styled(DisplayedAngle)`
//   background-color: ${cl.getHSL(cl.green)};

//   font-size: larger;
//   border: none;
// `;
// const UnansweredAngle = styled(Dot)`
//   background-color: ${cl.getHSL(cl.gray_light)};
// `;

const ConnectingLine = styled.div`
  position: absolute;
`;

const Sequence = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: green;
`;

const SequenceButton = styled(Button)<{ canClick: boolean }>`
  color: ${(p) =>
    p.canClick ? cl.getHSL(cl.gray_dark) : cl.getHSL(cl.gray_light)};
  transition: all 0.2s ease-in-out;
`;

export default TargetAngles;
