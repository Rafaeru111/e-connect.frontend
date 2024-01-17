import React, { useState, useEffect } from "react";
import { 
    getBillingUsers,
    addBilling,
    checkBilling,
        } from "../api/user.api"

import { Loadersplash } from "../helpers/splash";
import { 
    PlusOutlined,
    EyeOutlined,
    } from '@ant-design/icons';
import Swal from 'sweetalert2'
import utils from '../helpers/utils'


import {
    Table,
    Button,
    Modal,
    Input,
    Form,
    Select,
    Row,
    Col,
    Typography,
    Divider,
    Tag,
    InputNumber,
    DatePicker
  } from "antd";

  const { Text,Paragraph } = Typography;

export const Billing_Users = () => {
    //managing state
    const [userRow, setUserRow] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    //--------------| Add states |-------------------- 
    const [addopen, setAddOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [formAdd] = Form.useForm(); 

    //-----------------| View States |-----------------------------
    const [openView, setOpenView] = useState(false);
  
    const [viewData, setViewData] = useState([]);

//------------------| For Edit Value |------------------
    const [getId, setId] = useState('');


    const actionColumn = [
      {
        dataIndex: "fullName",
        title: "Full Name",
        key: "fullName",
      },

      {
        dataIndex: "email",
        title: "Email",
        key: "email",
      },
    
        {
            dataIndex: "mobileNumber",
            title: "Mobile Number",
            key: "emamobileNumberil",
          },

          {
            dataIndex: "isBilled",
            title: "Is Billed",
            key: "isBilled",
            render: (isBilled) => (
              <Tag color={isBilled ? 'green' : 'red'}>
                {isBilled ? 'Yes' : 'No'}
              </Tag>
            ),
          },

        {
          dataIndex: "action",
          title: "Action",
          key: "_id",
          render: (_, params) => {
            const isBilled = params.isBilled;
            return (
                <div>
                       <Button
                            size="middle"
                            shape="circle"
                            onClick={() => {
                                handleView(params._id);
                            }}
                            disabled={!isBilled}
                            >
                            <EyeOutlined style={{ color: isBilled ? 'green' : 'red' }} />
                            </Button>
                        <Divider type="vertical" />
                        <Button
                            size="middle"
                            shape="circle"
                            onClick={() => {
                            showModal(params._id);
                            }}
                        >
                            <PlusOutlined   style={{color:'green'}}/>
                        </Button>

                    </div>
            );
          },
        },  
    ];


//-----------------------------------------------------| HANDLE for Use_Effects |----------------------------------------------------------------
const fetchData = async () => {
      try {
        const response = await getBillingUsers();
        const data = await response.data;
        setUserRow(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

// kukunin mo yung Data sa API
    useEffect(() => {
        fetchData();
      }, []);
    
        if (isLoading) {
            return <Loadersplash/>;
        }
    
        if (error) {
            return <div>Error: {error.message}</div>;
        }



//-----------------------------------------------------| HANDLE for Add MODALS |----------------------------------------------------------------
const showModal = (id) => {
    setAddOpen(true);
    setId(id)
}; //For showing the Modal upon clicking the data
   
const cancelModal = () => {
    setAddOpen(true);
    setId('')
    formAdd.resetFields();
}; //For
//-------------------------| HANDLE for MODALS Submit |----------------------------- 

     const handleSubmit = async (values) => {
             try {
              const { 
                billing_type, 
                bill, 
                billing_date
              } = values;

                  const response = await addBilling(
                    getId,
                    billing_type, 
                    bill, 
                    billing_date);
            
                    if (response.status === 200) {
                  
                            setAddOpen(false);

                            Swal.fire('Saved!', '', 'success')
                            fetchData();
                            formAdd.resetFields();
                            setId('')

                      } else {
                        Swal.fire({
                          icon: "error",
                          title: "Oops...",
                          text: response.data.message,
                        });
                      }
                } catch (error) {
                  console.error("Error inserting user:", error);
               }
           };


          const handleOk = () => {
            setConfirmLoading(true)
            formAdd
                  .validateFields()
                    .then((values) => {
                      handleSubmit(values);
                    })
                    
                  .catch((error) => {
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "There is something in yur Input",
                      error,
                    });

                    return Promise.reject(); // Prevents the modal from closing
                  })
                  
                  .finally(() => {
                    setAddOpen(true);
                    setConfirmLoading(false);
                  });
              };

        //   const handleCancel = () => {
        //     console.log('Clicked cancel button');
        //     setAddOpen(false);
        //   };



//-------------------------| HANDLE for MODALS Viewing |----------------------------- 
  const handleView = async (data) => {
    try {
       const viewdata1 = await checkBilling(data);
      if (viewdata1.status === 200) {
        //setViewData(viewdata1.data); // Assuming the response object contains the data as an object
            console.log(viewdata1.data)
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };



    return(
       <>      
        <Divider orientation="right">
                  <Divider type="vertical" />
                
                  <Divider type="vertical" />
        </Divider>
    

  {/* ----------------------------------------------| Modal for Viewing Datas |---------------------------------------------------  */}
            <Modal
              open={openView}
              onCancel={() => {
                setOpenView(false);
              }}
              footer={null}
              width={800}
            >
             <Divider><h3 style={{color: "green"}}>Viewing Data</h3></Divider>
              
            </Modal>
            
       {/* ----------------------------------------------| Modal for Adding new Datas |---------------------------------------------------  */}            
       <Modal
                   open={addopen}
                   onOk={handleOk} 
                   confirmLoading={confirmLoading}
                   onCancel={cancelModal}
                >
                    <Divider><h3 h3 style={{color: "purple"}}>Adding new Client</h3></Divider>
                            <Form
                              form={formAdd}
                              labelCol={{ span: 6 }}
                              wrapperCol={{ span: 14 }}
                              layout="horizontal"
                              style={{ maxWidth: 600 }}
                              onFinish={handleOk}
                            >
                                  <Form.Item
                                   label="Billing Type"
                                   name="billing_type"
                                   rules={[
                                      { required: true, message: "It's Required!" },
                                   ]}
                                  >
                                          <Input placeholder="" />
                                  </Form.Item>

                                  <Form.Item
                                    label="Bill"
                                    name="bill"
                                    rules={[
                                      { required: true, message: "It's Required!" },
                                    ]}
                                  >
                                            <InputNumber placeholder="Billi Number" />
                                  </Form.Item>
                                          
                                  <Form.Item
                                   label="billing Date"
                                   name="billing_date"
                                   rules={[
                                      { required: true, message: "It's Required!" },
                                   ]}
                                  >
                                          <DatePicker />
                                  </Form.Item>

                            </Form>
                      
                </Modal>
 
                <Table
                    columns={actionColumn}
                    dataSource={userRow}
                    pagination={false}
                    rowKey="_id"
                />

 
        </>
    );
};