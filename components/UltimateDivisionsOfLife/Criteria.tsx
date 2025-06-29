import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';
import cl, { color } from '../../colors';
import MyLink from '../MyLink';

export type CriterionObj = {
  name: string;
  color: color;
  summary: JSX.Element;
};

interface CriterionProps {
  criterionObj: CriterionObj;
  isSelectedCurrently: boolean;
}

const SummaryWrapper = styled.div``;

let visibilitySummary = (
  <SummaryWrapper>
    <h3>Visibility</h3>
    Ideally we would like to be able to see how we are dividing a cirlce with
    our own eyes. When dividing up small enough circles, there simply isn't
    enough space to see relatively large number of divisions. You will have to
    strike a balance somehow.
  </SummaryWrapper>
);

let computabilitySummary = (
  <SummaryWrapper>
    <h3>Computability</h3>
    Although modern computers can make computations with extremely large numbers
    a breeze, we often push them to their limits. Especially when it comes to
    graphics. Whatever number of divisions we choose to measure a circle, we
    want to keep it within bounds of what our computers can manage to compute
    and graphically render on our screens.
    <br />
    <br />
    {/* <CanvasForTopicComponent
  sceneGetter={getSceneInteriorAngles}
/> */}
    {/* <br />
<br /> */}
    {/* Not long ago, the gold standard for video games was around 60 times a second
    . Now some modern displays are pushing 4 times that recalculating pixel
    colorations 240 times each second. What all of this means is, so many
    calculations are happening so fast, that limiting the number of divisions to
    be calculated and displayed does make a difference.
    <br />
    <br />
    <MyLink href={'https://www.youtube.com/shorts/esIl_oMew8c'}>
      Here is a youtube video showing in slowmo the difference between a 60hz
      and 240hz display
    </MyLink> */}
  </SummaryWrapper>
);

let divisibilitySummary = (
  <SummaryWrapper>
    <h3>Divisibility</h3>
    Divisibility is really important for measuring partial circles without
    having to trouble ourselves with fractions or decimals. Sticking to nice
    whole numbers often makes life easier both conceptually and practically.
  </SummaryWrapper>
);

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
      <CriterionWrapper $colorString={cl.getHSLA(criterionObj.color, 0.5)}>
        {criterionObj.name.toUpperCase()}
        <Image src={imageString} height={50} width={100} />
      </CriterionWrapper>
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
  /* position: absolute; */
  /* top: 20px; */

  /* padding: 50px;
 background-color: rgba(0,0,0,0.5); */
  grid-row-start: 1;
  grid-column-start: 1;
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
  display: grid;
  grid-template-columns: 1fr;
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
