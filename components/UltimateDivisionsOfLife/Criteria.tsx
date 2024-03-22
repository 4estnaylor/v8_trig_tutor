import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import cl, { color } from '../../colors';

export type CriterionObj = {
  name: string;
  color: color;
};

interface CriterionProps {
  criterionObj: CriterionObj;
}

let criteria: CriterionObj[] = [
  { name: 'visibility', color: cl.green },
  { name: 'computability', color: cl.blue },
  { name: 'divisibility', color: cl.red },
];

const Criterion = (props: CriterionProps) => {
  const { criterionObj } = props;
  let imageString = `/${criterionObj.name}.svg`;
  return (
    <CriterionColorBoxShadowWrapper>
      <CriterionWrapper $colorString={cl.getHSLA(criterionObj.color, 0.5)}>
        {criterionObj.name.toUpperCase()}
        <Image src={imageString} height={50} width={100} />
      </CriterionWrapper>
    </CriterionColorBoxShadowWrapper>
  );
};

const Criteria = () => {
  return (
    <CriteriaWrapper>
      {criteria.map((criterionObj) => {
        return <Criterion criterionObj={criterionObj} />;
      })}
    </CriteriaWrapper>
  );
};

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
