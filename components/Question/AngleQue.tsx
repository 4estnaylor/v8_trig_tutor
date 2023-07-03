import React from 'react';
import styled from 'styled-components';
import cl from '../../colors';
import { TargetValueObj } from '../../pages/%C2%B0';
import ProgressBar from '../HomePage/ProgressBar';
import InteractiveProgressBar from './InteractiveProgressBar';

interface AngleQueProps {
  targetValueObjs: TargetValueObj[];
}

const AngleQue = (props: AngleQueProps) => {
  const { targetValueObjs } = props;

  const incompleteTargetValues = targetValueObjs.filter(
    (obj) => obj.completed != true
  );
  const targetValueDisplays = incompleteTargetValues.map(
    (targetValueObj, index) => {
      if (index === 0) {
        return (
          <TargetValueContainer key={targetValueObj.value}>
            {targetValueObj.value}°
          </TargetValueContainer>
        );
      }
    }
  );

  const completeDisplay = <CompleteContainer>Complete!</CompleteContainer>;

  return (
    <Wrapper>
      <BackgroundBlur />
      <InteractiveProgressBar targetValueObjs={targetValueObjs} />
      <Prompt>
        {incompleteTargetValues.length !== 0 ? 'set the angle to' : null}
        {targetValueDisplays}
        {incompleteTargetValues.length === 0 ? completeDisplay : null}
      </Prompt>
    </Wrapper>
  );
};

const Prompt = styled.div`
  display: flex;
  align-items: center;
  color: ${cl.getHSL(cl.white)};
`;

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  width: 100%;
  /* background-color: pink; */
  height: 50px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  background-color: ${cl.getHSL(cl.gray_dark)};

  /* position: absolute; */

  /* transform: translateY(-100%); */
  pointer-events: none;
  color: ${cl.getHSL(cl.white)};

  /* background-color: green; */

  /* padding: 20px; */
  /* padding-bottom: 5px; */
`;

const BackgroundBlur = styled.div`
  /* filter: blur(10px); */

  background-color: ${cl.getHSL(cl.purple_dark)};
  height: 100%;
  z-index: -20;
  background: linear-gradient(
    0deg,
    ${cl.getHSLA(cl.purple_dark, 0.1)},
    ${cl.getHSLA(cl.purple_dark, 0.7)} 10%,
    ${cl.getHSLA(cl.purple_dark, 0.1)} 90%
  );
`;

const TargetValueContainer = styled.div`
  min-height: 40px;
  min-width: 40px;
  /* border: 4px solid black; */
  /* background-color: ${cl.getHSLA(cl.white, 0.5)}; */
  /* box-shadow: 2px 2px 2px black; */
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${cl.getHSL(cl.purple_light)};
  /* font-weight: 800; */
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const CompleteContainer = styled(TargetValueContainer)`
  color: ${cl.getHSL(cl.blue_light)};
`;

const Blurred = styled(TargetValueContainer)`
  filter: blur(5px);
  display: none;
`;

export default AngleQue;
