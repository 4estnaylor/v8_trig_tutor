import React, { useState } from 'react';
import TopicComponentBoilerPlate2 from '../../components/TopicComponents/TopicComponentBoilerPlate2';
import Video from '../../components/Video';
import styled from 'styled-components';
import ExpandableBullet from '../../components/ExpandableBullet';
import DraggableButton from '../../components/DraggableButton';
import CanvasForTopicComponent from '../../components/HomePage/MyCanvas/CanvasForTopicComponent';
import AddFactorsButtonBar from '../../components/Inputs/AddFactorsButtonsBar';
import InputForUserCircleDivisions from '../../components/Inputs/InputForUserCircleDivisions';
import getSceneUserCicrcleDivision from '../../components/getScenes/degrees/getSceneUserCircleDivision';
import cl from '../../colors';

const smallness_and_divisibility = () => {
  const [userCircleDivisions, setUserCircleDivisions] = useState(1);
  const scoreMultipliers = {
    Ten: 4,
    Hundred: 3,
    Thousand: 2,
  };

  const divisiblityPoints = {
    Ten: 8,
    Twenty: 4,
    Fifty: 2,
    Hundered: 1,
  };

  const [controlledPosition, setControlledPosition] = useState({
    x: 50,
    y: 50,
  });

  const notTooBigCollapsable = (
    <div>
      The advantage of smaller values is things become manageable for our
      computers and pencils. 10,000 is the largest allowable number for this
      exercise.
      <CollapsableList>
        <li>
          {`numbers up to 10 get base points `}
          <Multiplier>× {scoreMultipliers.Ten}</Multiplier>
        </li>
        <li>
          {`numbers up to 100 get base points `}

          <Multiplier>× {scoreMultipliers.Hundred}</Multiplier>
        </li>
        <li>
          {`numbers up to 1000 get base points `}

          <Multiplier>× {scoreMultipliers.Thousand}</Multiplier>
        </li>
        <li>{`numbers over 1000 get no bonus.`}</li>
      </CollapsableList>
    </div>
  );

  const dividesNeatlyCollapsable = (
    <div>
      Priority given to integers that divide into your selected value. The
      advantage is the utility in being able to divide a circle into many
      integer values i.e. halves, thirds, fifths, etc..
      <CollapsableList>
        <li>
          {`numbers up to 10 that divide the value`} reward{' '}
          <Points>+ {divisiblityPoints.Ten} points</Points>
        </li>
        <li>
          {`numbers up to 20 that divide the value`} reward{' '}
          <Points>+ {divisiblityPoints.Twenty} points</Points>
        </li>
        <li>
          {`numbers up to 50 that divide the value`} reward{' '}
          <Points>+ {divisiblityPoints.Fifty} points</Points>
        </li>
        <li>
          {`numbers up to 100 that divide the value`} reward{' '}
          <Points>+ {divisiblityPoints.Hundered} point</Points>
        </li>
        <li>{`numbers over 100`} rewarded no points.</li>
      </CollapsableList>
    </div>
  );

  const circleDivsionsCanvas = (
    <>
      <Criteria>
        <ExpandableBullet pre={2} title={'more divisible'}>
          {dividesNeatlyCollapsable}
        </ExpandableBullet>
        <ExpandableBullet pre={1} title={`smaller`}>
          {notTooBigCollapsable}
        </ExpandableBullet>
      </Criteria>

      <RelativeWrapper>
        <DraggableButton
          controlledPosition={controlledPosition}
          setControlledPosition={setControlledPosition}
        />

        <CanvasForTopicComponent
          sceneGetter={getSceneUserCicrcleDivision}
          height={400}
          objectPassedToScene={{
            userCircleDivisions,
            setUserCircleDivisions,
            setControlledPosition,
            controlledPosition,
          }}
        ></CanvasForTopicComponent>

        <AddFactorsButtonBar setUserEnteredValue={setUserCircleDivisions} />
        <InputForUserCircleDivisions
          value={userCircleDivisions}
          setValue={setUserCircleDivisions}
        />
      </RelativeWrapper>
    </>
  );
  return (
    <TopicComponentBoilerPlate2 title="Smallness and Divisibility">
      <>
        <Video href="https://player.vimeo.com/video/796468904?h=dc4303ab13&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" />
        <Spacer />
        {circleDivsionsCanvas}
      </>
    </TopicComponentBoilerPlate2>
  );
};

const Spacer = styled.div`
  height: 30px;
`;

const Criteria = styled.div`
  display: flex;
  flex-direction: column;
`;

const RelativeWrapper = styled.div`
  /* position: relative; */
  position: relative;
  /* position: static; */
`;

const CollapsableList = styled.ul`
  list-style: none;
  padding-left: 10px;

  & li {
    padding-top: 10px;
  }
`;
const Multiplier = styled.span`
  color: ${cl.getHSL(cl.purple)};
  display: inline;
`;

const Points = styled.div`
  color: ${cl.getHSL(cl.purple)};
`;
export default smallness_and_divisibility;
