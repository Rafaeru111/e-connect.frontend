import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import { getPopData } from '../../../api/global.api'


const EChartsChart_PopularNoSSR = () => {
  const popData = async() =>{
    const popular = await getPopData()
            
    const pop = popular.data
    
    return pop
   
}
  useEffect(() => {
    
    const fetchData = async()=>{
      if (typeof window !== 'undefined') {
        // Initialize ECharts chart
        const chartDom = document.getElementById('main2');
        const myChart = echarts.init(chartDom);
  
        const piedata = await popData()
        // Specify chart options
        const option = {
          title: {
            text: 'Popular Designs',
            subtext: 'Most Viewed Design',
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
              // data: [
              //   { value: 1048, name: 'Search Engine' },
              //   { value: 735, name: 'Direct' },
              //   { value: 580, name: 'Email' },
              //   { value: 484, name: 'Union Ads' },
              //   { value: 300, name: 'Video Ads' }
              // ],

              data:piedata,
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
    }
    // Check if window is defined (client-side)
   
    fetchData()
  }, []); // Empty dependency array means this effect runs once after the initial render

  return <>
  <div id="main2" style={{ height: '400px', background:"white", padding:"10px"  }} /></>
};

export default EChartsChart_PopularNoSSR;