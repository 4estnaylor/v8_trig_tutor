import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';
import cl, { color } from '../../colors';

export type CriterionObj = {
  name: string;
  color: color;
  summary: JSX.Element;
};

interface CriterionProps {
  criterionObj: CriterionObj;
  isSelectedCurrently: boolean;
}

let visibilitySummary = (
  <div>
    Ideally we would like to be able to see how we are dividing a cirlce with
    our own eyes. When dividing up small enough circles, there simply isn't
    enough space to see relatively large number of divisions.
  </div>
);

let computabilitySummary = <div>This is the computability summary</div>;

let divisibilitySummary = <div>this is the divisibility summary</div>;

let criteria: CriterionObj[] = [
  { name: 'visibility', color: cl.green, summary: visibilitySummary },
  { name: 'computability', color: cl.blue, summary: computabilitySummary },
  { name: 'divisibility', color: cl.red, summary: divisibilitySummary },
];

const Criterion = (props: CriterionProps) => {
  const { criterionObj, isSelectedCurrently } = props;
  let imageString = `/${criterionObj.name}.svg`;
  return (
    <CriterionColorBoxShadowWrapper>
      {/* <CriterionWrapper>
        {criterionObj.name.toUpperCase()}
        <Image src={imageString} height={50} width={100} />
      </CriterionWrapper> */}
      <div style={{ background: 'red' }}>
        <Image src={imageString} height={50} width={100} />
      </div>
    </CriterionColorBoxShadowWrapper>
  );
};

const Criteria = () => {
  const [selectedCriteriaName, setSelectedCriteriaName] = useState('');
  return (
    <OuterWrapper>
      <CriteriaWrapper>
        {criteria.map((criterionObj) => {
          return (
            <div
              onClick={() => {
                setSelectedCriteriaName(criterionObj.name);
              }}
              // onMouseOver={() => {
              //   setSelectedCriteriaName(criterionObj.name);
              // }}
            >
              {' '}
              <Criterion
                criterionObj={criterionObj}
                isSelectedCurrently={true}
              />
            </div>
          );
        })}
      </CriteriaWrapper>
      <CriteriaSummary>
        {criteria.map((criterionObj) => {
          return (
            <Summary
              opactiy={selectedCriteriaName === criterionObj.name ? 1 : 0}
            >
              {criterionObj.summary}
            </Summary>
          );
        })}
      </CriteriaSummary>
    </OuterWrapper>
  );
};

const Summary = styled.div<{ opactiy: number }>`
  opacity: ${(p) => p.opactiy};
  transition: opacity 0s ease-in-out;
  position: absolute;
  top: 20px;
`;

const OuterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CriteriaSummary = styled.div`
  border: 2px solid ${cl.getHSL(cl.gray_light)};
  padding: 20px;
  border-radius: 8px;
  min-height: 100px;
  position: relative;
`;

const CriteriaWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const CriterionColorBoxShadowWrapper = styled.div`
  border-radius: 8px;

  &:hover {
    box-shadow: 2px 4px 4px ${(p) => cl.getHSLA(cl.black, 0.5)};
  }
  transition: box-shadow 0.5s ease-in-out;
`;

const CriterionWrapper = styled.div<{ $colorString: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 10px;
  min-height: 50px;
  font-weight: 600;
  color: ${(p) => {
    return cl.getHSL(cl.white);
  }};
  background-color: ${(p) => {
    return p.$colorString;
  }};

  border-radius: 8px;
  padding: 10px;

  &:hover {
    box-shadow: 2px 4px 5px ${(p) => p.$colorString};
    cursor: pointer;
  }
  transition: box-shadow 0.5s ease-in-out;

  /* border: 2px solid green; */
`;

export default Criteria;
