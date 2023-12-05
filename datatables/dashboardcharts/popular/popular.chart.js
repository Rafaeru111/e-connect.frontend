import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const EChartsChart_PopularNoSSR = dynamic(() => import('./no.ssr.popular.chart'), {
  ssr: false,
});

const Popular_Pie = () => {
  return <EChartsChart_PopularNoSSR />;
};

export default Popular_Pie;