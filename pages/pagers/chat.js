import { useEffect, useState } from "react";
import { withAuth } from '../../helpers/withAuth';
import ChatUiPage from '../../datatables/chat.ui.page';
import { Col, Row, Layout, Button } from 'antd';
const { Header } = Layout; 
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import {checkToken} from '../../api/global.api'

const Chat = () => {
    const router = useRouter();

    const goBack=()=>{
        router.push("/")
    }
    
    useEffect(() => {

        const token = localStorage.getItem('token');
    
      if (token) {
    
        checkToken(token)
          .then((checkTokenResponse) => {
            console.log(checkTokenResponse.data);
            const status = checkTokenResponse.data.status
            console.log(status);
            
            if(!status){
                Swal.fire({
                  title: 'Session Expired!',
                  text: 'Please Login Again',
                  imageUrl: 'https://media.giphy.com/media/cNNsPXZAQtc9fmQvxA/giphy.gif',
                  imageWidth: 400,
                  imageHeight: 200,
                  imageAlt: 'Custom image',
    
                  //action after clicking OK
                }).then((result) => {
                  if (result.isConfirmed) {
                    //remove the datas
                    localStorage.removeItem('token');
                    localStorage.removeItem('user-storage');
                    setLoggedOut();
                    router.push('/login/login')
                  }
                })
            }
    
          })
          .catch((error) => {
            console.error('Error checking token:', error);
          });
      } else {
        console.log('Token not found in localStorage');
      }
    }, []);
    
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
