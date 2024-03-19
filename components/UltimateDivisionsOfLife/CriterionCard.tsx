import React from 'react';
import { CriterionObj } from './Criteria';
import styled from 'styled-components';
import cl from '../../colors';

interface CriterionCardProps {
  criterionObj: CriterionObj;
}

const CriterionCard = (props: CriterionCardProps) => {
  const { criterionObj } = props;
  return <Wrapper>CriterionCard</Wrapper>;
};

const Wrapper = styled.div`
  min-width: 100px;
  min-height: 80px;
  background-color: ${cl.getHSLA(cl.purple, 0.8)};
`;

export default CriterionCard;
