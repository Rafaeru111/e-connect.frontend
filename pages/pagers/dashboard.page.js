import { useEffect, useState } from "react";
import { 
  getDashboard,
  getVisitorsToday
} from "../../api/global.api";
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
  const [boxdashboard, setBoxdashboard] = useState({});
  const [userRow, setUserRow] = useState([]);
  const actionColumn = [
     
    {
        dataIndex: "reference_code",
        title: "Reference Code",
        key: "reference_code",
    },
    {
      dataIndex: "client_id",
      title: "Client Id",
      key: "client_id",
      render: (client_id) => {
        const category = clientDrop.find((cat) => cat._id === client_id);
        const categoryName = category ? category.fullName : "";
        return <span>{categoryName}</span>;
      },
  },
  {
    dataIndex: "property_id",
    title: "Property Id",
    key: "property_id",
    render: (property_id) => {
      const category = propertyDrop.find((cat) => cat._id === property_id);
      const categoryName = category ? category.propertyName : "";
      return <span>{categoryName}</span>;
    },
},

{
  dataIndex: "visit_date",
  title: "Visit Date",
  key: "visit_date",
  render: (visit_date) => {
    const date = new Date(visit_date);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return <span>{date.toLocaleString(undefined, options)}</span>;

  },
}
];



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

 const getboxData = async() =>{
    try {
      const response = await getDashboard();
      const data = await response.data;
      setBoxdashboard(data);
      setLoading(false);
    } catch (error) {

      setLoading(false);
    }
 }

 const getvisitData = async() =>{
  try {
    const response = await getVisitorsToday();
    const data = await response.data;
    setUserRow(data);
    setLoading(false);
  } catch (error) {

    setLoading(false);
  }
}

 

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 5); // Adjust the timeout value as needed
    
    getboxData()
    getvisitData()

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
              title="All Users"
              value={boxdashboard.all_user}
              //formatter={formatter}
            />
          </Card></Col>
        <Col span={6}> 
        <Card bordered={true} style={{borderRadius: 0}}>
            <Statistic
              title="Visitation this Month"
              value={boxdashboard.all_visit}
              //formatter={formatter}
            />
          </Card></Col>
        <Col span={6} > 
        <Card bordered={true} style={{borderRadius: 0}}>
            <Statistic
              title="Billed Users this Month"
              value={boxdashboard.billed}
              //formatter={formatter}
            />
          </Card></Col>
        <Col span={6} > 
        <Card bordered={true} style={{borderRadius: 0}}>
            <Statistic
              title="Not-Billed Users this Month"
              value={boxdashboard.notBilled}
             
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
                    columns={actionColumn}
                    dataSource={userRow}
                    pagination={{ pageSize: 5, position:"bottomCenter" }}
                    rowKey="_id"
                />
            </Card>
      </Col>
    </Row>

    {/* <Divider /> */}
    {/* <Spin spinning={true} size="large" indicator={{ fontSize: 44,}} tip="Under Construction! "> */}
  
    {/* <Row style={{  padding: 10, borderRadius: 0,  background:"white", width:"100%", marginTop: '10px' }} >
      <Col span={24}>    
     <Inventory_Line />
      </Col>
    </Row> */}

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

