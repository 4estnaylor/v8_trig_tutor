import React, { useEffect, useState } from 'react';

const useParentElementSize = (canvasRef: any) => {
  const [width, setWidth] = useState<number>(0);
  useEffect(() => {
    const canvas = canvasRef?.current;
    const parent = canvas.parentElement;

    console.log(parent);

    setWidth(parent.clientWidth);
  }, []);

  return width;
};

export default useParentElementSize;
