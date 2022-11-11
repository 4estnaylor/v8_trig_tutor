import React from 'react';
import styled from 'styled-components';
import cl from '../../../colors';
import PrimaryListItem from './PrimaryListItem';

const CourseMap = () => {
  return (
    <Wrapper>
      <SubjectsList>
        <PrimaryListItem name="Introduction">
          <div></div>
        </PrimaryListItem>
        <PrimaryListItem name="Measurment">
          <div></div>
        </PrimaryListItem>
        <PrimaryListItem name="Ratios">
          <div></div>
        </PrimaryListItem>
      </SubjectsList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 5px;
  padding-top: 30px;
  color: ${cl.getHSL(cl.white)};
`;

const SubjectsList = styled.ol``;

export default CourseMap;
