import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const EChartsChart_PopularNoSSR = () => {
  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      // Initialize ECharts chart
      const chartDom = document.getElementById('main2');
      const myChart = echarts.init(chartDom);

      // Specify chart options
      const option = {
        title: {
          text: 'Popular Sales',
          subtext: 'Based on a Weekly Basis',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 1048, name: 'Search Engine' },
              { value: 735, name: 'Direct' },
              { value: 580, name: 'Email' },
              { value: 484, name: 'Union Ads' },
              { value: 300, name: 'Video Ads' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      
      option && myChart.setOption(option);

      // Cleanup on unmount
      return () => {
        myChart.dispose();
      };
    }
  }, []); // Empty dependency array means this effect runs once after the initial render

  return <>
  <div id="main2" style={{ height: '400px', background:"white", padding:"10px"  }} /></>
};

export default EChartsChart_PopularNoSSR;