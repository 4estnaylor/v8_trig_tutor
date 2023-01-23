import { useRouter } from 'next/router';
import React, { useState } from 'react';

const useCurrentSubComponent = () => {
  const [currentPath, setCurrrentPath] = useState();
  const router = useRouter();
  console.log('router', router);

  return;
};

export default useCurrentSubComponent;
