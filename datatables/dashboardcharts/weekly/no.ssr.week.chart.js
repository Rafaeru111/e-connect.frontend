import React, { useEffect } from 'react';
import * as echarts from 'echarts';
// import { 
//   getTodayMonthlyYearly,
// } from "../../../api/global.api";


const EChartsChartNoSSR = () => {



// const weekData = async() =>{
//       const weeksale = await getTodayMonthlyYearly()
              
//       const weekdata = weeksale.data
//       const weekly = weekdata.weeksale

//       return weekly
// }

  useEffect(() => {
    
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      // Initialize ECharts chart
      const chartDom = document.getElementById('main');
      const myChart = echarts.init(chartDom);

      //const weekly = weekData()

      // Specify chart options
      const option = {
        title: {
          text: 'Popular Sales',
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
            // data: [ 
            //   weekly?.Sunday,  
            //   weekly?.Monday,  
            //   weekly?.Tuesday,  
            //   weekly?.Wednesday, 
            //   weekly?.Thursday, 
            //   weekly?.Friday, 
            //   weekly?.Saturday
            // ],
            data:[1,2,3,4,5,6,7],
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
  }, []); // Empty dependency array means this effect runs once after the initial render

  return <>
  <div id="main" style={{ height: '400px', background:"white", padding:"10px" }} /></>;
};

export default EChartsChartNoSSR;