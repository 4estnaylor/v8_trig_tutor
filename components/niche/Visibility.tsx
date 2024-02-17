import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import CanvasForTopicComponent from '../HomePage/MyCanvas/CanvasForTopicComponent';
import getSceneVisibility from '../getScenes/degrees/getSceneVisibility';
import { Button, Chip, Input, Slider, Stack, TextField } from '@mui/material';
import { AngleInfo } from './Intro/DragToBigAngles';
import { Tau } from '../HomePage/MyCanvas/CanvasObjects/UsefulConstants';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import cl from '../../colors';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import getSceneVisibilityGraph from '../getScenes/degrees/getSceneVisibilityGraph';
import AsideNote from '../AsideNote/AsideNote';

type Mode = 'linear' | 'exponential';

const Visibility = () => {
  const [numberOfDivisions, setNumberOfDivisions] = useState(100);
  const numberOfDivisionsRef = useRef(numberOfDivisions);

  const [radiusLength, setRadiusLength] = useState(100);
  const radiusLengthRef = useRef(radiusLength);

  useEffect(() => {
    radiusLengthRef.current = radiusLength;
  }, [radiusLength]);

  const [base10Value, setBase10Value] = useState(1);

  const [mode, setMode] = useState('linear');

  let angleInfo: AngleInfo = {
    inputControl: true,
    angle: Tau * 0.999,
    angleOffset: 0,
    divisions: numberOfDivisions,
    units: 'degrees',
    color: cl.blue,
  };

  let angleInfoRef = useRef(angleInfo);

  useEffect(() => {
    angleInfoRef.current = {
      ...angleInfoRef.current,
      divisions: numberOfDivisions,
    };
  }, [numberOfDivisions]);

  function createData(pixelSize: number, maxDivisionsDistinguishable: number) {
    return { pixelSize, maxDivisionsDistinguishable };
  }

  const handleLinearSliderChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    let value = newValue as number;
    setNumberOfDivisions(value as number);
    setBase10Value(value === 0 ? 0 : Math.log10(value));
    // setBase10Valvue(
    //   event.target.value === '' ? 0 : Math.log10(Number(event.target.value))
    // );
  };

  const handleRadiusLengthSlide = (
    event: Event,
    newValue: number | number[]
  ) => {
    let value = newValue as number;
    setRadiusLength(value);

    // setBase10Valvue(
    //   event.target.value === '' ? 0 : Math.log10(Number(event.target.value))
    // );
  };

  const handleExpSliderChange = (event: Event, newValue: number | number[]) => {
    let value = newValue as number;
    setBase10Value(value);
    setNumberOfDivisions(10 ** value);
    // setNumberOfDivisions(newValue as number);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (Number(event.target.value) > 10000) {
      setNumberOfDivisions(10000);
      setBase10Value(4);
      return;
    }
    setNumberOfDivisions(
      event.target.value === '' ? 1 : Number(event.target.value)
    );
    setBase10Value(
      event.target.value === '' ? 0 : Math.log10(Number(event.target.value))
    );
  };

  const handleOutsideOfRange = () => {
    if (numberOfDivisions < 0) {
      setNumberOfDivisions(0);
    } else if (numberOfDivisions > 10000) {
      setNumberOfDivisions(10000);
    }
  };

  function valueLabelFormat(value: number) {
    const units = ['', 'K'];

    let unitIndex = 0;
    let scaledValue = value;

    while (scaledValue >= 1000 && unitIndex < units.length - 1) {
      unitIndex += 1;
      scaledValue /= 1000;
    }

    return `${scaledValue} ${units[unitIndex]}`;
  }

  function calculateDivisionValue(value: number) {
    return 10 ** base10Value;
  }

  const linearSlider = (
    <ExponentialSliderWrapper>
      <Slider
        min={0}
        max={10000}
        step={1}
        value={typeof numberOfDivisions === 'number' ? numberOfDivisions : 0}
        onChange={handleLinearSliderChange}
        aria-labelledby="input-slider"
        orientation="vertical"
      />
    </ExponentialSliderWrapper>
  );

  const exponentialSlider = (
    <ExponentialSliderWrapper>
      <Slider
        value={typeof base10Value === 'number' ? base10Value : 0}
        min={0}
        max={4}
        step={4 / 1000}
        onChange={handleExpSliderChange}
        scale={calculateDivisionValue}
        aria-labelledby="input-slider"
        orientation="vertical"
      />
    </ExponentialSliderWrapper>
  );

  //effects
  const initialValuesToTest = [{ size: 0, userRecordedValue: 0 }];

  const [valuesToTest, setValuesToTest] = useState(initialValuesToTest);

  const valuesToTestRef = useRef(valuesToTest);

  useEffect(() => {
    valuesToTestRef.current = valuesToTest;
  }, [valuesToTest]);

  const [currentTestValueIndex, setCurrentTestValueIndex] = useState(0);
  const currentTestValueIndexRef = useRef(currentTestValueIndex);

  useEffect(() => {
    currentTestValueIndexRef.current = currentTestValueIndex;
  }, [currentTestValueIndex]);

  useEffect(() => {
    numberOfDivisionsRef.current = numberOfDivisions;
  }, [numberOfDivisions]);

  const initalRows: {
    pixelSize: number;
    maxDivisionsDistinguishable: number;
  }[] = [
    {
      pixelSize: 0,
      maxDivisionsDistinguishable: 0,
    },
  ];

  const [rows, setRows] =
    useState<{ pixelSize: number; maxDivisionsDistinguishable: number }[]>(
      initalRows
    );
  const rowsRef = useRef(rows);

  useEffect(() => {
    rowsRef.current = rows;
  }, [rows]);

  const [lineSlope, setLineSlope] = useState<null | number>(null);
  const lineSlopeRef = useRef<null | number>(null);

  const getLinearRegression = () => {
    if (rows.length < 1) return;
    let xValues: number[] = rows.map((row) => Number(row.pixelSize));
    let yValues: number[] = rows.map((row) =>
      Number(row.maxDivisionsDistinguishable)
    );
    const meanX =
      xValues.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      ) / xValues.length;

    const meanY =
      yValues.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      ) / yValues.length;

    let dividend = 0;
    let divisor = 0;
    for (let i = 0; i < xValues.length; i++) {
      dividend += (xValues[i] - meanX) * (yValues[i] - meanY);
      divisor += (xValues[i] - meanX) ** 2;
    }
    let slope = dividend / divisor;
    // theorhetically it should be zero, so not gonna calculate for y-intercept;
    console.log(slope);
    setLineSlope(slope);
    lineSlopeRef.current = slope;
    // const meanX = xValues.reduce((previousValue, currentValue) => previousValue + currentValue, initalValue,);
  };

  const handleMarkValue = () => {
    let rowsClone = [...rows];
    let pixelSize = Math.round(radiusLength);

    // gets rid of previous values for same radius pixelsize
    rowsClone = rowsClone.filter((row) => row.pixelSize !== pixelSize);

    if (Math.round(numberOfDivisions) === null) return;
    let newRow = createData(pixelSize, Math.round(numberOfDivisions));
    rowsClone.push(newRow);
    rowsClone.sort((a, b) => a.pixelSize - b.pixelSize);
    // rowsClone[currentTestValueIndex].maxDivisionsDistinguishable =
    //   Math.round(numberOfDivisions);
    setRows(rowsClone);
    getLinearRegression();
  };

  const [linearRegressionSlope, setLinearRegressionSlope] = useState<
    null | number
  >(null);

  useEffect(() => {}, [rows]);

  const valuesTable = (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>radius size {`(in pixels)`}</TableCell>
            <TableCell align="left">Max Divsions Visible</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={row.pixelSize}
              sx={{
                ' &:last-child td, &:last-child th': { border: 0 },
              }}
            >
              <TableCell
                component="th"
                scope="row"
                onClick={() => {
                  setCurrentTestValueIndex(index);
                }}
              >
                <HoverableDiv
                  style={{
                    color: `${
                      index === currentTestValueIndex
                        ? cl.getHSL(cl.purple)
                        : cl.getHSL(cl.black)
                    }`,
                  }}
                >
                  {row.pixelSize}
                </HoverableDiv>
              </TableCell>
              <TableCell align="left">
                {row.maxDivisionsDistinguishable}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <div>
      <br />
      <br />
      Instructions: Adjust the value as high as you can visibly see the lines
      distinctly at the five different sizes prompted for
      <h3>
        A quick visibility test: What value can you no longer distinguish the
        marks on your display for the following sizes of circle.
        <AsideNote>
          <>
            This is not a vision test. The limiting factor will likely be due to
            the amount or density of pixels visible on your device.
          </>
        </AsideNote>
      </h3>
      <Wrapper>
        <MyStack>
          {rows.map((row, index) => {
            return (
              <div>
                <Chip
                  label={`${row.pixelSize} px`}
                  variant={'filled'}
                  color={currentTestValueIndex === 0 ? 'primary' : 'default'}
                  onClick={() => {
                    // setCurrentTestValueIndex(0);
                    setRadiusLength(row.pixelSize);
                  }}
                ></Chip>
              </div>
            );
          })}
        </MyStack>
        <br />
        <br />

        <div style={{ position: 'relative', height: '700px' }}>
          <CanvasForTopicComponent
            sceneGetter={getSceneVisibility}
            objectPassedToScene={{
              numberOfDivisionsRef,
              angleInfoRef,
              valuesToTestRef,
              currentTestValueIndexRef,
              radiusLengthRef,
            }}
          />
          <div style={{ position: 'absolute', top: 0 }}>
            <CanvasForTopicComponent
              sceneGetter={getSceneVisibilityGraph}
              objectPassedToScene={{
                rowsRef,
                currentTestValueIndexRef,
                numberOfDivisionsRef,
                radiusLengthRef,
                lineSlopeRef,
              }}
            />
          </div>
          {/* {linearSlider} */}

          {/* {base10Value} */}

          {exponentialSlider}
          <RadiusLengthSliderWrapper>
            <Slider
              value={radiusLength}
              step={1}
              min={1}
              max={2000}
              sx={{ color: 'inherit' }}
              onChange={handleRadiusLengthSlide}
            ></Slider>
          </RadiusLengthSliderWrapper>
        </div>
        {radiusLength}
        <br />
        <br />
      </Wrapper>
      <MyStack>
        <MarkValueButton variant="contained" onClick={handleMarkValue}>
          <BorderColorIcon /> {'   '} Mark Value
        </MarkValueButton>
        <DivisionsInput
          onChange={handleInputChange}
          onBlur={handleOutsideOfRange}
          value={Math.round(numberOfDivisions)}
          sx={{ width: '140px', fontSize: '1.5rem' }}
          inputProps={{ min: 1, max: 10000, fontSize: '1.5rem' }}
          type="number"
        ></DivisionsInput>
      </MyStack>
      <br />
      <br />
      {valuesTable}
    </div>
  );
};

const Wrapper = styled.div`
  position: relative;
`;

const HoverableDiv = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const MyStack = styled.div`
  display: flex;
  flex-wrap: wrap;

  /* gap: 10px;
  flex-wrap: wrap; */
  justify-content: space-between;
  padding-right: 30px;
`;

const MarkValueButton = styled(Button)`
  display: flex;
  gap: 20px;
  width: fit-content;
`;
const DivisionsInput = styled(TextField)`
  width: 100px;
`;

const ExponentialSliderWrapper = styled(Stack)`
  position: absolute;
  /* top: 150px; */
  top: 50%;
  height: 300px;
  right: 0px;
  transform: translateY(-50%);
`;

const RadiusLengthSliderWrapper = styled(Stack)`
  position: absolute;
  bottom: 0px;
  left: 50%;
  min-width: 300px;
  transform: translateX(-50%);
  color: ${cl.getHSL(cl.red)};
`;

export default Visibility;
