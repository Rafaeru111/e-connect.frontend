import { useEffect, useState } from 'react';
import { Layout } from "antd";
const { Header } = Layout; 
import { CommentOutlined } from '@ant-design/icons';
import { Col, Row, Button } from 'antd';

import { useRouter } from 'next/router';

const HeaderNav = () => {
    const router = useRouter();

    const goChat=()=>{
        router.push("/pagers/chat")
    }
    

    return(
    <Header style={{  background: "white", borderRadius:"10px"}}>
        <Row>
            <Col span={6}>

            </Col>
            <Col span={6}>

            </Col>
            <Col span={6}>
   
            </Col>
            <Col span={6}>
                   <Button onClick={goChat}><CommentOutlined /> Chat Support Page</Button> 
            </Col>
        </Row>
            {/* {selectedKey === '/pagers/chat.ui.page' && <ChatUiPage />} */}
    </Header>
    );
}

export default HeaderNav;