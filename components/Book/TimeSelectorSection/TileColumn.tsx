import React from 'react';
import styled from 'styled-components';

interface TileColumnProps {
  timeSlotTiles: JSX.Element[];
}

const TileColumn = (props: TileColumnProps) => {
  const { timeSlotTiles } = props;
  return <Wrapper>{timeSlotTiles}</Wrapper>;
};

const Wrapper = styled.div`
  width: 50px;
`;

export default TileColumn;
