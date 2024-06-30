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
import RainbowExerciseHeading from './RainbowExerciseHeading';
import CompletenessTag from './CompletenessTag';

type Mode = 'linear' | 'exponential';

const Visibility = () => {
  const [numberOfDivisions, setNumberOfDivisions] = useState(10);
  const numberOfDivisionsRef = useRef(numberOfDivisions);

  const [radiusLength, setRadiusLength] = useState(50);
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
    <LinearSliderWrapper>
      <Slider
        min={0}
        max={10000}
        step={1}
        value={typeof numberOfDivisions === 'number' ? numberOfDivisions : 0}
        onChange={handleLinearSliderChange}
        aria-labelledby="input-slider"
        orientation="vertical"
      />
    </LinearSliderWrapper>
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
    setCurrentTestValueIndex(currentTestValueIndexRef.current);
  }, [currentTestValueIndexRef.current]);

  useEffect(() => {
    numberOfDivisionsRef.current = numberOfDivisions;
  }, [numberOfDivisions]);

  const initalRows: {
    pixelSize: number;
    maxDivisionsDistinguishable: number | null;
  }[] = [
    {
      pixelSize: 50,
      maxDivisionsDistinguishable: null,
    },
    {
      pixelSize: 100,
      maxDivisionsDistinguishable: null,
    },
    {
      pixelSize: 200,
      maxDivisionsDistinguishable: null,
    },
    {
      pixelSize: 400,
      maxDivisionsDistinguishable: null,
    },
    {
      pixelSize: 800,
      maxDivisionsDistinguishable: null,
    },
    {
      pixelSize: 1600,
      maxDivisionsDistinguishable: null,
    },
  ];

  const [rows, setRows] =
    useState<
      { pixelSize: number; maxDivisionsDistinguishable: number | null }[]
    >(initalRows);
  const rowsRef = useRef(rows);

  const [isVisibilityTestComplete, setIsVisibilityTestComplete] =
    useState(false);

  useEffect(() => {
    rowsRef.current = rows;

    let allRowsHaveDivisionsSoFar = true;
    rows.forEach((row) => {
      if (!row.maxDivisionsDistinguishable) {
        allRowsHaveDivisionsSoFar = false;
      }
    });
    if (allRowsHaveDivisionsSoFar) {
      setIsVisibilityTestComplete(true);
    }
  }, [rows]);

  // const [lineSlope, setLineSlope] = useState<null | number>(null);
  const lineSlopeRef = useRef<null | number>(null);

  const getLinearRegression = () => {
    if (rows.length < 1) return;

    let xValues: number[] = rows.map((row) => Number(row.pixelSize));
    let yValues: number[] = rows.map((row) =>
      Number(row.maxDivisionsDistinguishable)
    );

    let valuesToCalculate: { x: number; y: number }[] = [];

    yValues.forEach((value, index) => {
      if (value === 0) {
        return;
      } else {
        valuesToCalculate.push({ x: xValues[index], y: value });
      }
    });

    xValues.unshift(0);
    yValues.unshift(0);
    valuesToCalculate.unshift({ x: 0, y: 0 });

    const meanX =
      valuesToCalculate.reduce(
        (accumulator, currentValue) => accumulator + currentValue.x,
        0
      ) / xValues.length;

    const meanY =
      valuesToCalculate.reduce(
        (accumulator, currentValue) => accumulator + currentValue.y,
        0
      ) / yValues.length;

    let dividend = 0;
    let divisor = 0;
    for (let i = 0; i < valuesToCalculate.length; i++) {
      dividend +=
        (valuesToCalculate[i].x - meanX) * (valuesToCalculate[i].y - meanY);
      divisor += (valuesToCalculate[i].x - meanX) ** 2;
    }
    let slope;
    if (divisor !== 0) {
      slope = dividend / divisor;
    } else {
      slope = null;
    }
    // theorhetically it should be zero, so not gonna calculate for y-intercept;
    lineSlopeRef.current = slope;
    // setLineSlope(slope);
    console.log('getting new slope: ', lineSlopeRef.current);
    console.log('x values: ', xValues);
    console.log('y values: ', yValues);
    console.log('values to calculate: ', valuesToCalculate);
    // const meanX = xValues.reduce((previousValue, currentValue) => previousValue + currentValue, initalValue,);
  };

  const handleMarkValue = () => {
    // console.log('handling mark value');
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

  useEffect(() => {
    getLinearRegression();
  }, [rows]);

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
                  // setCurrentTestValueIndex(index);
                  setRadiusLength(row.pixelSize);
                }}
              >
                <HoverableDiv
                  style={{
                    color: `${
                      row.pixelSize === radiusLength
                        ? cl.getHSL(cl.purple)
                        : cl.getHSL(cl.black)
                    }`,
                  }}
                >
                  {row.pixelSize}
                </HoverableDiv>
              </TableCell>
              <TableCell align="left">
                {row.maxDivisionsDistinguishable || '?'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <div>
      {/* <CompletenessTag isComplete={isVisibilityTestComplete} /> */}
      <RainbowExerciseHeading isComplete={isVisibilityTestComplete}>
        A Quick Visibility Test abc
      </RainbowExerciseHeading>

      {/* <br />
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
      </h3> */}
      <Wrapper>
        <br />
        <br />

        <div style={{ position: 'relative' }}>
          <CanvasForTopicComponent
            sceneGetter={getSceneVisibility}
            width={100}
            objectPassedToScene={{
              numberOfDivisionsRef,
              angleInfoRef,
              valuesToTestRef,
              currentTestValueIndexRef,
              radiusLengthRef,
            }}
          />

          {/* <div style={{ position: 'absolute', top: 0 }}>
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
          </div> */}

          {/* {linearSlider} */}

          {/* {base10Value} */}

          {exponentialSlider}
          {/* {linearSlider} */}
          {/* <RadiusLengthSliderWrapper>
            <Slider
              value={radiusLength}
              step={1}
              min={1}
              max={2000}
              sx={{ color: 'inherit' }}
              onChange={handleRadiusLengthSlide}
            ></Slider>
          </RadiusLengthSliderWrapper> */}
        </div>
        {/* {radiusLength} */}
        <br />
        <br />
      </Wrapper>
      <MyStack>
        {rows.map((row, index) => {
          let isCurrentlySelected = row.pixelSize === radiusLength;
          let color = row.maxDivisionsDistinguishable
            ? cl.getHSL(cl.green)
            : cl.getHSLA(cl.purple, 0.5);
          return (
            <SizeChip>
              <div style={{ color: color }}>
                {row.maxDivisionsDistinguishable ? '✓' : '?'}
              </div>

              <Chip
                label={`${row.pixelSize}`}
                variant={
                  isCurrentlySelected || row.maxDivisionsDistinguishable
                    ? 'filled'
                    : 'outlined'
                }
                color={row.maxDivisionsDistinguishable ? 'success' : 'primary'}
                onClick={() => {
                  // setCurrentTestValueIndex(0);
                  setRadiusLength(row.pixelSize);
                  if (
                    row.maxDivisionsDistinguishable ||
                    row.maxDivisionsDistinguishable === 0
                  ) {
                    setNumberOfDivisions(row.maxDivisionsDistinguishable);
                  } else {
                  }
                }}
              ></Chip>
            </SizeChip>
          );
        })}
      </MyStack>
      <br />
      <br />
      <MyStackExtraPadding>
        <MarkValueButton variant="contained" onClick={handleMarkValue}>
          <BorderColorIcon /> {'   '} Mark Value
          <BlankOfBlank>0 of 6 marked</BlankOfBlank>
        </MarkValueButton>

        <DivisionsInput
          label="# of divisions"
          onChange={handleInputChange}
          onBlur={handleOutsideOfRange}
          value={Math.round(numberOfDivisions)}
          sx={{ width: '140px', fontSize: '1.5rem' }}
          inputProps={{ min: 1, max: 10000, fontSize: '1.5rem' }}
          type="number"
        ></DivisionsInput>
      </MyStackExtraPadding>

      <br />
      <br />
      {valuesTable}
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
  );
};

const BlankOfBlank = styled.div`
  position: absolute;
  height: 20px;
  bottom: -20px;
  color: ${cl.getHSL(cl.gray_mid)};
`;

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
  padding-right: 10px;
`;

const MyStackExtraPadding = styled(MyStack)`
  padding-left: 30px;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;

const MarkValueButton = styled(Button)`
  display: flex;
  gap: 20px;
  width: fit-content;
  position: relative;
`;
const DivisionsInput = styled(TextField)`
  width: 100px;
`;

const WrapperForCircleVisual = styled.div`
  /* background-color: teal; */
  /* padding-left: 50px; */
  background-color: teal;
  width: 100vw;
  border: 2px solid black;
`;

const ExponentialSliderWrapper = styled(Stack)`
  position: absolute;
  /* top: 150px; */
  top: 50%;
  /* height: 500px; */
  height: 100%;
  left: 0px;
  transform: translateY(-50%);
`;

const SizeChip = styled.div`
  /* padding: 20px; */
  width: 16.66%;
  /* height: 80px; */
  /* background-color: red; */
  /* border: 2px solid black; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CompletnessIndicator = styled.div``;

const LinearSliderWrapper = styled(Stack)`
  position: absolute;

  /* top: ; */
  /* height: 500px; */
  height: 100%;
  left: 0px;
  bottom: 30px;
  /* transform: translateY(-50%); */
`;

const RadiusLengthSliderWrapper = styled(Stack)`
  position: absolute;
  bottom: 0px;
  left: 50%;
  /* width: calc((100vw)-60px); */
  /* width: calc('100vw - 60px'); */
  width: 100%;
  padding-left: 50px;
  padding-right: 30px;
  transform: translateX(-50%);
  color: ${cl.getHSL(cl.gray_dark)};
  /* width: 100vw; */
  /* background-color: green; */
`;

export default Visibility;
