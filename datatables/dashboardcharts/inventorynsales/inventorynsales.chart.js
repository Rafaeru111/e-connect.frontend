import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const EChartsChart_InventoryNoSSR = dynamic(() => import('./no.ssr.inventorynsales.chart'), {
  ssr: false,
});

const Inventory_Line = () => {
  return <EChartsChart_InventoryNoSSR />;
};

export default Inventory_Line;