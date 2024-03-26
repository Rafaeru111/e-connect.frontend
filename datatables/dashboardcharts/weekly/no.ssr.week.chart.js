import React, { useEffect, } from 'react';
import * as echarts from 'echarts';
import { getBarData } from '../../../api/global.api'


const EChartsChartNoSSR = () => {



const barData = async() =>{
      const weeksale = await getBarData()
              
      const weekdata = weeksale.data
      const weekly = weekdata.days
      
      return weekly
     
}

  useEffect(() => {
    
    const fetchData = async()=>{
      if (typeof window !== 'undefined') {
        // Initialize ECharts chart
        const chartDom = document.getElementById('main');
        const myChart = echarts.init(chartDom);
  
        const weeklysample = await barData()
        console.log(weeklysample)
        // Specify chart options
        const option = {
          title: {
            text: 'Total Visitation',
            subtext: 'Based on a Weekly Basis',
            left: 'center'
          },
          xAxis: {
            type: 'category',
            data: ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: [ 
                weeklysample?.Sunday,  
                weeklysample?.Monday,  
                weeklysample?.Tuesday,  
                weeklysample?.Wednesday, 
                weeklysample?.Thursday, 
                weeklysample?.Friday, 
                weeklysample?.Saturday
              ],
              //data:[1,2,3,4,5,6,7],
              type: 'bar',
              showBackground: true,
              backgroundStyle: {
                color: 'rgba(180, 180, 180, 0.2)',
              },
            },
          ],
        };
  
        // Set chart options
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
  <div id="main" style={{ height: '400px', background:"white", padding:"10px" }} /></>;
};

export default EChartsChartNoSSR;