import React from 'react';
import styled from 'styled-components';
import cl from '../../../colors';

export interface ListItemProps {
  selectedSessions: Date[];
  setSelectedSessions: React.Dispatch<React.SetStateAction<Date[]>>;
  session: Date;
}

const ListItem = (props: ListItemProps) => {
  const { selectedSessions, setSelectedSessions, session } = props;

  const handleDeleteButtonClick = () => {
    setSelectedSessions((prev) => {
      const filtered = prev.filter((e) => e?.getTime() !== session.getTime());

      return filtered;
    });
  };

  const weekDayDisplay = session.toLocaleDateString('en-US', {
    weekday: 'short',
  });

  const monthDisplay = session.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });

  const dayDisplay = session.toLocaleDateString('en-US', {
    day: 'numeric',
  });

  const hourDisplay = session.toLocaleTimeString('en-US', {
    hour: 'numeric',
  });

  const [digitDisplay, ampmDisplay] = hourDisplay.split(' ');

  return (
    <Wrapper>
      <FullDate>
        <Hour>
          <InnerHour>
            <Digit>{digitDisplay}</Digit>
            <AMPM>{ampmDisplay}</AMPM>
          </InnerHour>
        </Hour>
        <Weekday>{weekDayDisplay}</Weekday>
        <Month>{monthDisplay}</Month>
        <DeleteButton onClick={handleDeleteButtonClick}>✕</DeleteButton>
      </FullDate>
    </Wrapper>
  );
};

const Weekday = styled.div`
  width: 100px;
  padding-left: 30px;
  font-size: 1.25rem;
`;
const Month = styled.div`
  width: 100px;
  font-size: 1.25rem;
  /* padding-left: 20px; */
`;

const Hour = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
`;
const InnerHour = styled.div`
  height: 50px;
  width: 50px;
  border: 2px solid ${cl.getHSL(cl.white)};
  color: ${cl.getHSL(cl.white)};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  background-color: transparent;
`;

const Digit = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
`;
const AMPM = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
`;

const Wrapper = styled.div`
  color: ${cl.getHSL(cl.white)};
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  padding-right: 0px;
  border-radius: 8px;
  margin: 5px;

  &:hover {
    background-color: ${cl.getHSLA(cl.white, 0.2)};
  }
`;

const FullDate = styled.div`
  flex: 2;
  align-items: center;
  display: flex;
  position: relative;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${cl.getHSL(cl.white)};
  width: 50px;
  height: 100%;

  cursor: pointer;
  font-size: 1.25rem;

  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;

  &:hover {
    color: ${cl.getHSL(cl.black)};
  }
`;

export default ListItem;
