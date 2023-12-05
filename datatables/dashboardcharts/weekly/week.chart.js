import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const EChartsChartNoSSR = dynamic(() => import('./no.ssr.week.chart'), {
  ssr: false,
});

const Weekly_Bar = () => {
  return <EChartsChartNoSSR />;
};

export default Weekly_Bar;