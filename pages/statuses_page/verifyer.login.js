import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useAuthStore from "../../store/auth.store";
import useUserStore from "../../store/user.store";

import {
  login,
} from "../../api/login.api";

import {
  ArrowLeftOutlined,
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined } from '@ant-design/icons';

import React from 'react';
// import {
//   Card,
//   Spacer,
//   Button,
//   Text,
//   Input,
//   Row,
//   Col,
//   Checkbox,
//   Container,
//   Modal,
//   message, 
//   CardFooter,
//   Link
// } from '@nextui-org/react';

import { 
  Button, 
  Checkbox, 
  Form, 
  Input, 
  Card,
  Row,
  Col,
  Divider,
  Image,
  Tooltip,
  InputNumber} from 'antd';
import Swal from 'sweetalert2'


export default function Login() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');
  const [visible, setVisible] = React.useState(false);

 const setLoggedIn = useAuthStore((state) => state.setLoggedIn);
 const setUserData = useUserStore((state) => state.setUserData);
 
  // useEffect(() => {
    const [handleLoading, setHandleLoading] = useState(false);
  // }, []);

//useState 


 //--------------------------------------------------|Checking the Modal|------------------------------------------------------------
 
  //this is login using email and password

  const [email, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const [isLoged, setisLoged] = useState(false);
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const [isDisabled, setIsDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleSubmit = async (values) => {
    
    setHandleLoading(true)

    setLoading(true)
    const response = await login(values.email, values.password);

    if (response.code === 200 || response.data?.success === true) {
      
   
                localStorage.setItem("token", response.data.data.token);
                localStorage.setItem("selectedKey", "/pagers/dashboard.page");
                console.log(response);
                setUserData(response.data.data.userData);
                setLoggedIn();
                router.push('/statuses_page/well_done.page');
         
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.data.message,
      });
      setHandleLoading(false)
       setLoading(false)
    }
  
  };

  useEffect(() => {
    let interval;
    if (isDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isDisabled, timer]);

  useEffect(() => {
    if (timer === 0) {
      setIsDisabled(false);
    }
  }, [timer]);

//------------------------|Disable the Timer|--------------------------
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 800);

    checkAuthentication();
    return () => clearTimeout(timeout);
  }, []);
  
    //check kung may token
  const checkAuthentication = () => {
    const token = localStorage.getItem('token');
    //restrict the user if logged in na sya restric na makapunta sa login
    if (token) {
      router.push('/statuses_page/well_done.page');
    }
  };

  // Login page content
  return (
    <div>
       
      <Card style={{ margin: 'auto', maxWidth: '600px', marginTop:"150px"}}>
        
        <Divider>  <h1 style={{textAlign:"center"}}>
         E-Connect Verifyer
        </h1></Divider>
        <Row gutter={[8,8]}>
            <Col span={10}>
            <Image
                preview={false}
                style={{maxWidth:"200px", borderRadius:"10px"}}
                src="/logo.png"
              />
            </Col>
            <Col span={14}>
            <Form
                name="normal_login"
                onFinish={handleSubmit}
                >
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your Username!',
                          },
                        ]}
                      >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                      </Form.Item>
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: 'Please input your Password!',
                          },
                        ]}
                      >
                        <Input.Password
                          prefix={<LockOutlined className="site-form-item-icon" />}
                          type="password"
                          placeholder="Password"
                          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Row>
                          <Col span={24}>
                              <Button type="primary" htmlType="submit" className="login-form-button" block>
                              Log in 
                            </Button>
                          </Col>
                        </Row>
                      </Form.Item>
                  </Form>
            </Col>
        </Row>
        
      </Card>
       

  </div>
  );
}
