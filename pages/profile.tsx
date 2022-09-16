import React from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import useTrigUser from '../utils/hooks/useTrigUser';

const profile = () => {
  const trigUser = useTrigUser();
  console.log(trigUser);

  const display = trigUser?.name || 'nothing ';

  return (
    <div>
      <ResponsiveAppBar />
      {display}
    </div>
  );
};

export default profile;
