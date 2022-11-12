import React from 'react';
import styled from 'styled-components';
import cl from '../../../colors';
import PrimaryListItem from './PrimaryListItem';

const CourseMap = () => {
  return (
    <Wrapper>
      <SubjectsList>
        <PrimaryListItem
          name="Introduction"
          secondaryItems={[
            { name: 'welcome', subItems: [] },
            { name: 'course structure', subItems: [] },
            { name: 'mathematical fluency', subItems: [] },
          ]}
        />

        <PrimaryListItem
          name="Measurment"
          secondaryItems={[
            {
              name: ' ° ( degrees )',
              subItems: [
                { name: 'angle conventions' },
                { name: 'Why 360°, Why not 100°?' },
                { name: 'measuring with °' },
                { name: 'special angles °' },
              ],
            },
            {
              name: 'τ rad ( Tau )',
              subItems: [
                { name: 'Why  τ, Why not degrees?' },
                { name: 'measuring with τ rad ' },
                { name: 'special angles with τ rad' },
              ],
            },

            {
              name: 'π rad ( Pi )',
              subItems: [
                { name: 'Why  π, Why not τ?' },
                { name: 'measuring' },
                { name: 'sepcial angles' },
              ],
            },
            {
              name: 'angle conversions',
              subItems: [{ name: '° ⟷  τ rad' }, { name: 'τ rad ⟷ π rad' }],
            },
          ]}
        />
        <PrimaryListItem
          name="Ratios"
          secondaryItems={[
            { name: 'sin (sine)', subItems: [] },
            {
              name: 'cos (cosine)',
              subItems: [
                { name: 'tangent & cotangent' },
                { name: 'secant & cosecant' },
              ],
            },
          ]}
        />
      </SubjectsList>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 5px;
  padding-top: 30px;
  color: ${cl.getHSL(cl.white)};
  max-width: 350px;

  l & * {
    font-size: 1rem;
  }
`;

const SubjectsList = styled.div``;

export default CourseMap;
