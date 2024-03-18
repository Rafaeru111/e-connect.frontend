import React from 'react'
import { withAuth } from '../../helpers/withAuth';
import ChatUiPage from '../../datatables/chat.ui.page';
import { Col, Row, Layout, Button } from 'antd';
const { Header } = Layout; 
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';


const Chat = () => {
    const router = useRouter();

    const goBack=()=>{
        router.push("/")
    }
    
  return (
    <div  style={{
        padding: 15,
        //marginTop:5,
        //minHeight: 360,
        background: "#f5f5f5",
      }}>
        <Header style={{ padding: 10, background: "white", borderRadius:"10px"}}>
        <Row>
            <Col span={6}>
            <Button onClick={goBack}><ArrowLeftOutlined /> Go Back</Button> 
            </Col>
            <Col span={6}>

            </Col>
            <Col span={6}>
   
            </Col>
            <Col span={6}>
           
            </Col>
        </Row>
            {/* {selectedKey === '/pagers/chat.ui.page' && <ChatUiPage />} */}
    </Header>
        <ChatUiPage/>
    </div>
  )
}

export default withAuth(Chat);
