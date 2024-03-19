import React from 'react';

type CriterionObj = {
  name: string;
};

let criteria: CriterionObj[] = [
  { name: 'visibility' },
  { name: 'computability' },
  { name: 'divisibility' },
];

const Criterion = () => {
  return <div>Criterion</div>;
};

let CriteriaDisplay = criteria.map((criterionObj) => {
  return <div>{criterionObj.name}</div>;
});

const Criteria = () => {
  return (
    <div>
      {CriteriaDisplay} <Criterion />
    </div>
  );
};

export default Criteria;
