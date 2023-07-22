import React from 'react';
import Variable from '../Variable';

const Pi = () => {
  return (
    <Variable
      value={Math.PI}
      description={`π pronounced "pi", is the ratio of a circle's circumference to its diameter. It is an irrational number, but is approximately 3.14159. `}
    >
      π
    </Variable>
  );
};

export default Pi;
