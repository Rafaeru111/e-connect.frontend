import { useEffect, useState } from "react";
// import { 
//   getRecentActivity,
//   getTodayMonthlyYearly,
//   getTodayData,
// } from "../../api/global.api";
import { 
  Statistic, 
  Row, 
  Col, 
  Card, 
  Space, 
  Typography, 
  Button, 
  Dropdown, 
  Radio, 
  Timeline,
  Modal,
  Calendar,
  Badge,
  Spin,
  Table,
  Divider } from "antd";
import { Loadersplash } from "../../helpers/splash";

import CountUp from "react-countup";

import {
  DownloadOutlined,
  DeleteOutlined,
  LogoutOutlined,
  RedoOutlined,
  EyeOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const { Title } = Typography;
import { withAuth } from '../../helpers/withAuth';
import utils from '../../helpers/utils'

//importing charts
import Weekly_Bar from "../../datatables/dashboardcharts/weekly/week.chart";
import Popular_Pie from "../../datatables/dashboardcharts/popular/popular.chart";
import Inventory_Line from "../../datatables/dashboardcharts/inventorynsales/inventorynsales.chart";


const DateToday = new Date()

const  Dashboard = ({ type, data }) => {

  //const [data, setData] = useState({});
  //const [rfqData, setRfqData] = useState({});
  const [recentData, setRecentData] = useState([]);
  const [loading, setLoading] = useState(true);

  // const actionColumn = [

  //   {
  //     dataIndex: "transactionNumber",
  //     title: "Transaction Number",
  //     key: "transactionNumber",
  //   },

  //   {
  //     dataIndex: "total",
  //     title: "Total Sale",
  //     key: "total",
  //   },

  //     {
  //       dataIndex: "payment_method",
  //       title: "Payment Method",
  //       key: "payment_method",
  //     },
      
  //     {
  //       dataIndex: "staffId",
  //       title: "Staff",
  //       key: "staffId",
  //     },
  
  //     {
  //       dataIndex: "action",
  //       title: "Action",
  //       width: 150,
  //       key: "_id",
  //       render: (_, params) => {
  //         return (
  //           <Space direction="horizontal" align="center">
              
  //             <Button
  //               size="large"
  //               shape="circle"
  //               onClick={() => {
  //                 handleView(params._id);
  //               }}
  //             >
  //                 <EyeOutlined  style={{color:'green'}} />
  //             </Button>

  //             <Button
  //               size="large"
  //               shape="circle"
  //               onClick={() => {
  //                 handleView(params._id);
  //               }}
  //               tooltip="void"
  //             >    
  //                 <CloseCircleOutlined  style={{color:'red'}} />
  //             </Button>

        
  //           </Space>
  //         );
  //       },
  //     },  
  // ];


  const getListData = (value) => {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          {
            type: 'warning',
            content: 'This is warning event.',
          },
          {
            type: 'success',
            content: 'This is usual event.',
          },
        ];
        break;
      case 10:
        listData = [
          {
            type: 'warning',
            content: 'This is warning event.',
          },
        ];
        break;
    
      default:
    }
    return listData || [];
  };

  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };




  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5); // Adjust the timeout value as needed
  
    return () => clearTimeout(timeout);
  }, []);


  if (loading) {
    return <Loadersplash/>;
  }
  

const monthCellRender = (value) => {
  const num = getMonthData(value);
  return num ? (
    <div className="notes-month">
      <section>{num}</section>
      <span>Backlog number</span>
    </div>
  ) : null;
};

const dateCellRender = (value) => {
  const listData = getListData(value);
  return (
    <ul className="events">
      {listData.map((item) => (
        <li key={item.content}>
          <Badge status={item.type} text={item.content} />
        </li>
      ))}
    </ul>
  );
};


  const formatter = (value) =>   
  <span>
  {'₱ '}
  <CountUp end={value}  decimals={2} separator="," />
</span>;



const formatter2 = (value) =>   
  <span>
  <CountUp end={value} separator="," />
</span>;
  
  return (
 <>


  <Row style={{background: 'white'}}>

        <Col span={24}> 
        <Card bordered={true} style={{borderRadius: 0}}>
          <Divider orientation="left">
            <Title level={3} >
                Admin Dashboard 
            </Title>
          </Divider>
       
        </Card></Col>

      </Row>

    {/* cards dividers */}
    <Row
      gutter={[8, 8]}
    >
        <Col span={6}> 
          <Card bordered={true} style={{borderRadius: 0}}>
            <Statistic
              title="Appointment this Month"
              value={45}
              //formatter={formatter}
            />
          </Card></Col>
        <Col span={6}> 
        <Card bordered={true} style={{borderRadius: 0}}>
            <Statistic
              title="Visitation this Month"
              value={23}
              //formatter={formatter}
            />
          </Card></Col>
        <Col span={6} > 
        <Card bordered={true} style={{borderRadius: 0}}>
            <Statistic
              title="Billed Users this Month"
              value={99}
              //formatter={formatter}
            />
          </Card></Col>
        <Col span={6} > 
        <Card bordered={true} style={{borderRadius: 0}}>
            <Statistic
              title="Not-Billed Users this Month"
              value={0}
              formatter={formatter2}
            />
          </Card>
          </Col>
      </Row>
      {/* <Divider /> */}
    {/* this is for the  */}
      <Row gutter={[8, 8]} style={{marginTop: '10px'}}>
      {/* <Col span={12}>    <ReactECharts option={lineChartOption} style={{ maxHeight: 500, width:"100%" }} /> </Col> */}
   
          <Col 
          span={12}
          >
             <Weekly_Bar />
              
          </Col>

        
          <Col span={12}>
            <Popular_Pie />
            </Col>
        </Row>
    <Row style={{  padding: 10, borderRadius: 0,  background:"white", width:"100%", marginTop: '10px' }} >

      <Col span={24}>
        <h3 style={{textAlign:"center"}}>Scheduled Visitation Today.</h3>
          <Card bordered={false} title={"Date Today: " + utils.convertDate(DateToday)} style={{borderRadius: 0}}>
              <Table
                    style={{width: "100%"}}
                    //columns={actionColumn}
                    //dataSource={getTransacToday}
                    //pagination={{ pageSize: 5, position:"bottomCenter" }}
                    rowKey="_id"
                />
            </Card>
      </Col>
    </Row>

    {/* <Divider /> */}
    {/* <Spin spinning={true} size="large" indicator={{ fontSize: 44,}} tip="Under Construction! "> */}
  
    <Row style={{  padding: 10, borderRadius: 0,  background:"white", width:"100%", marginTop: '10px' }} >
      <Col span={24}>    
     <Inventory_Line />
      </Col>
    </Row>

    {/* </Spin> */}
    {/* It should be dynamic i checks if there are may workers */}
    <Row
      gutter={[8,8]}
      style={{marginTop: '10px'}}
    >
        <Col span={12}> 
    
      </Col>
        <Col span={12}> 
      </Col>
      </Row>
      <Row
      gutter={{
        xs: 8,
        sm: 16,
        md: 24,
        lg: 32,
      }}
      style={{marginTop: 40, textAlign:"center"}}
    >
        <Col span={24}> 
      </Col>
      </Row>
    
    </>
  );
};
export default withAuth(Dashboard);

