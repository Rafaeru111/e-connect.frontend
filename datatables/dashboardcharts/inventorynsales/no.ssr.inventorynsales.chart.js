import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const EChartsChart_InventoryNoSSR = () => {


  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      // Initialize ECharts chart
      const chartDom = document.getElementById('main1');
      const myChart = echarts.init(chartDom);

      const colors = ['green', 'blue'];
      // Specify chart options
      const option = {
        color: colors,
        tooltip: {
          trigger: 'none',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {},
        grid: {
          top: 70,
          bottom: 50
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[1]
              }
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return (
                    'Expenses - ' +
                    params.value +
                    (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                  );
                }
              }
            },
            // prettier-ignore
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          },
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[0]
              }
            },
            axisPointer: {
              label: {
                formatter: function (params) {
                  return (
                    'Sales - ' +
                    params.value +
                    (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                  );
                }
              }
            },
            // prettier-ignore
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Sales',
            type: 'line',
            xAxisIndex: 1,
            smooth: false,
            emphasis: {
              focus: 'series'
            },
            data: [
              
              2000000.25,  
              1000000.25,  
              3000000.00,  
              4000000.25,  
              6000000.25, 
              7000000.25, 
              4000000.25,  
              4000000.25, 
              3000000.25, 
              3000000.25,  
              1000000.25, 
              5000000.25,  
              7000000.25, 
            ]
          },
          {
            name: 'Expenses',
            type: 'line',
            smooth: false,
            emphasis: {
              focus: 'series'
            },
            data: [
              3000000.25, 
              2000000.25, 
              2000000.25,
              2000000.25, 
              1000000.25, 
              3000000.25,  
              3000000.25, 
              2000000.25, 
              2000000.25, 
              1000000.25, 
              3000000.25,
              2000000.25,
            ]
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
  <h3 style={{textAlign:"center"}}> Expenses and Sales Tracking</h3>
  <p style={{textAlign:"center",  fontStyle: "italic", color:"gray"}}> as of 2023</p>
  <div id="main1" style={{ height: '400px', background:"white", padding:"10px" }} /></>
};

export default EChartsChart_InventoryNoSSR;