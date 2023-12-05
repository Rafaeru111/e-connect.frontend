import React, { useState, useEffect } from "react";
import { 
    getEmployeeAllUser,
    addData,
    getOne,
    DeleteData,
    updateData,
        } from "../../api/user.api"

import { Loadersplash } from "../../helpers/splash";
import { 
    // UploadOutlined,
    // FilePdfOutlined,
    // ExceptionOutlined ,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    UserAddOutlined,
    } from '@ant-design/icons';
import Swal from 'sweetalert2'
import utils from '../../helpers/utils'


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
    Pagination 
  } from "antd";

  const { Text,Paragraph } = Typography;

export const Employee_User = () => {
    //managing state
    const [userRow, setUserRow] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [current, setCurrent] = useState(1);
    const [currentPageSize, setcurrentPageSize] = useState(5);
    
    //--------------| Add states |-------------------- 
    const [addopen, setAddOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [formAdd] = Form.useForm(); 


    //-----------------| View States |-----------------------------
    const [openView, setOpenView] = useState(false);
    const [openEditView, setOpenEditView] = useState(false);
  
    const [viewData, setViewData] = useState({});


//------------------| For Edit Value |------------------
const [editId, seteditId] = useState('');
const [firstname, setfirstname] = useState('');
const [lastname, setlastname] = useState('');
const [mobileNumber, setMobileNumber] = useState('');
const [email, setEmail] = useState('');
const [role, setRole] = useState('');

    const actionColumn = [
      {
        dataIndex: "firstName",
        title: "First Name",
        key: "firstName",
      },

      {
        dataIndex: "lastName",
        title: "Last Name",
        key: "lastName",
      },

        {
          dataIndex: "email",
          title: "Email",
          key: "email",
        },
    
        {
          dataIndex: "role",
          title: "Role",
          key: "role",
          //chnge the color
          render: (role) => {
            const roleData = utils.roleTag(role); // If roles is not an array, it will be a single string
            return roleData
          },
        },

        {
          dataIndex: "createdAt",
          title: "Date Created",
          key: "createdAt",
          render: (createdAt) => {
            const date = new Date(createdAt);
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
        },

        {
          dataIndex: "action",
          title: "Action",
          key: "_id",
          render: (_, params) => {
            return (
                <div>
                        <Button
                        size="middle"
                        shape="circle"
                        onClick={() => {
                            handleView(params._id);
                        }}
                        >
                        <EyeOutlined  style={{color:'green'}} />
                        </Button>
                        <Divider type="vertical" />
                        <Button
                            size="middle"
                            shape="circle"
                            onClick={() => {
                            handleEdit(params._id);
                            }}
                        >
                            <EditOutlined  style={{color:'blue'}}/>
                        </Button>
                        <Divider type="vertical" />
                        <Button
                        danger
                        size="middle"
                        shape="circle"
                        onClick={() => {
                            handleDelete(params._id);
                        }}
                        >
                        <DeleteOutlined/>
                        </Button>
                    </div>
            );
          },
        },  
    ];


//-----------------------------------------------------| HANDLE for Use_Effects |----------------------------------------------------------------
const fetchData = async (page, pageSize) => {
  const value1 = page
  const value2 = pageSize
      try {
        const response = await getEmployeeAllUser(value1,value2);
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
        fetchData(current, currentPageSize);
      }, []);
    
        if (isLoading) {
            return <Loadersplash/>;
        }
    
        if (error) {
            return <div>Error: {error.message}</div>;
        }


      const onChangePage = (page) => {
        setCurrent(page);
       if(!page){
        return false
       }else{
        fetchData(page, currentPageSize);
       }
      };

    //   const onChangePageSize = (page) => {
    //     setcurrentPageSize(page);
    //    if(!page){
    //     return false
    //    }else{
    //     fetchData(current, page);
    //    }
    //   };

//-----------------------------------------------------| HANDLE for Add MODALS |----------------------------------------------------------------
const showModal = () => {setAddOpen(true);}; //For showing the Modal upon clicking the data
                            //-------------------------| HANDLE for MODALS Submit |----------------------------- 
     const handleSubmit = async (values) => {
             try {
              const { 
                firstName, 
                lastName, 
                email,
                mobileNumber,
                role
              } = values;

                  const response = await addData(
                    firstName, 
                    lastName, 
                    email,
                    mobileNumber,
                    role);
            
                    if (response.status === 200) {
                  
                            setAddOpen(false);

                            Swal.fire('Saved!', '', 'success')

                            fetchData(1, currentPageSize);

                            formAdd.resetFields();

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

          const handleCancel = () => {
            console.log('Clicked cancel button');
            setAddOpen(false);
          };

//-------------------------| HANDLE for MODALS Viewing |----------------------------- 
  const handleView = async (data) => {
    try {
       const viewdata1 = await getOne(data);
      setOpenView(true);
      if (viewdata1.status === 200) {
        setViewData(viewdata1.data); // Assuming the response object contains the data as an object
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };


  //-------------------------| HANDLE for Delete Data |----------------------------- 
  const handleDelete = async (id, name) => {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "delete-button",
          cancelButton: "veiwButton1",
        },
        buttonsStyling: true,
      });
  
      const result = await swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You want to delete ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Delete",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      });
  
      if (result.isConfirmed) {
        // Make the axios delete request
          const response = await DeleteData(id);
            if (response.status === 200) {

                swalWithBootstrapButtons.fire(
                  "Deleted!",
                  "Your file has been deleted.",
                  "success"
                );

                fetchData(current, currentPageSize);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire("Cancelled", "Done", "error");
      }
    } catch (error) {
      console.error(error);
    }
  };

 
 //-------------------------| HANDLE for MODALS Editing Viewing |----------------------------- 
    const handleEdit = async (data) => {
        try {
        const viewdata1 = await getOne(data);
        setOpenEditView(true);
        if (viewdata1.status === 200) {
            setViewData(viewdata1.data); // Assuming the response object contains the data as an object
            seteditId(viewdata1.data._id)
            setfirstname(viewdata1.data.firstName)
            setlastname(viewdata1.data.lastName)
            setMobileNumber(viewdata1.data.mobileNumber)
            setEmail(viewdata1.data.email)
            setRole(viewdata1.data.role)
        }
        } catch (error) {
        console.error("Error fetching user:", error);
        }
    };


    //-----------------------|Edit handling Techniques|-----------------------------
    const editChange = async (value, field) => {
        const id = editId;
        switch(field){
            case 'firstName': 
                setfirstname(value)
            break;

            case 'lastName': 
                setlastname(value)
            break;

            case 'email': 
                setEmail(value)
             break;

             case 'mobileNumber': 
                setMobileNumber(value)
             break;

             case 'role': 
                setRole(value)
             break;

            default:
                alert("Error Accessing Value")
            break;
        }
       
        try {
            const data = {
                id: id,
                [field]: value
            };
    
            const Dataresponse = await updateData(data);
        
                if (Dataresponse.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Success!",
                        text: "Successfully Edited",
                    });
        
                    fetchData(current, currentPageSize); // Assuming the response object contains the data as an object
                }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Respond 500",
                text: error,
            });
        }
    };



    return(
       <>      
        <Divider orientation="right">
                  <Divider type="vertical" />
                  <Button type="primary" 
                  onClick={showModal}
                  >
                             <UserAddOutlined />      Add New Employee
                  </Button>
                  <Divider type="vertical" />
        </Divider>
    

      {/* ----------------------------------------------| Modal for Editing Datas |---------------------------------------------------  */}
            <Modal
              open={openEditView}
              onCancel={() => {
                setOpenEditView(false);
              }}
              footer={null}
              width={600}
            >

             <Divider><h3 style={{color: "Blue"}}>Edit Data</h3></Divider>
              <Row gutter={16}>
                    <Col span={12}>
                        <b> First Name:</b>   <br/>
                           <Paragraph
                            editable={{
                                onChange: (updatedValue) => editChange(updatedValue, 'firstName'),
                            }}
                        >
                            {firstname}
                        </Paragraph>
                    </Col>
                    <Col span={12}>
                            <b>Last Name:</b>   <br/>
                            <Paragraph
                            editable={{
                                onChange: (updatedValue) => editChange(updatedValue, 'lastName'),
                            }}
                            >
                            {lastname}
                        </Paragraph>
                    </Col>
              </Row> <br/>
              <Row gutter={16}>
                    <Col span={12}>
                            <b>Email Address:</b>   <br/>
                            <Paragraph
                            editable={{
                                onChange: (updatedValue) => editChange(updatedValue, 'email'),
                            }}
                            >
                            {email}
                        </Paragraph>
                    </Col>
                    <Col span={12}>
                        <b>Mobile Number:</b>   <br/>
                        <Paragraph
                            editable={{
                                onChange: (updatedValue) => editChange(updatedValue, 'mobileNumber'),
                            }}
                            >
                            {mobileNumber}
                        </Paragraph>
                    </Col>
              </Row> <br/>
              <Row gutter={16}>
                    <Col span={24}>
                        <b>role:</b>  <br/>
                        <Select  defaultValue={viewData?.role}
                            onChange={(value) => editChange(value, 'role')}
                        >
                             <Select.Option value="admin">Admin</Select.Option>
                              <Select.Option value="client">Client</Select.Option>
                               <Select.Option value="employee">Employee</Select.Option>
                         </Select>

                    </Col>
              </Row>
            </Modal>
            

  {/* ----------------------------------------------| Modal for Viewing Datas |---------------------------------------------------  */}
            <Modal
              open={openView}
              onCancel={() => {
                setOpenView(false);
              }}
              footer={null}
              width={600}
            >
             <Divider><h3 style={{color: "green"}}>Viewing Data</h3></Divider>
              <Row gutter={16}>
                    <Col span={12}>
                        <b> Full Name:</b>   <br/>
                           {viewData?.firstName}   {viewData?.lastName}
                    </Col>
                    <Col span={12}>
                            <b>Email Address:</b>   <br/>
                            {viewData?.email}
                    </Col>
              </Row> <br/>
              <Row gutter={16}>
                    <Col span={12}>
                        <b>Mobile Number:</b>   <br/>
                            {viewData?.mobileNumber}
                    </Col>
                    <Col span={12}>
                    <b>role:</b>  <br/>
                        {viewData?.role}
                    </Col>
                   
              </Row> <br/>
              <Row gutter={16}>
                    <Col span={24}>
                        <b>Created At</b>   <br/>
                            {utils.convertDate(viewData?.createdAt)}
                    </Col>

              </Row>
            </Modal>
            
       {/* ----------------------------------------------| Modal for Adding new Datas |---------------------------------------------------  */}            
       <Modal
                   open={addopen}
                   onOk={handleOk} 
                   confirmLoading={confirmLoading}
                   onCancel={handleCancel}
                >

                    <Divider><h3 h3 style={{color: "purple"}}>Adding new Employee</h3></Divider>
                            <Form
                              form={formAdd}
                              labelCol={{ span: 6 }}
                              wrapperCol={{ span: 14 }}
                              layout="horizontal"
                              style={{ maxWidth: 600 }}
                              onFinish={handleOk}
                            >
                                  <Form.Item
                                   label="First Name"
                                   name="firstName"
                                   rules={[
                                      { required: true, message: "It's Required!" },
                                   ]}
                                  >
                                          <Input placeholder="First Name" />
                                  </Form.Item>


                                  <Form.Item
                                   label="Last Name"
                                   name="lastName"
                                   rules={[
                                      { required: true, message: "It's Required!" },
                                   ]}
                                  >
                                          <Input placeholder="Last Name" />
                                  </Form.Item>

                                  <Form.Item
                                   label="Email Address"
                                   name="email"
                                   rules={[
                                      { required: true, message: "It's Required!" },
                                      {
                                        type: 'email',
                                        message: 'The input is not a valid email address!',
                                      },
                                   ]}
                                  >
                                          <Input placeholder="Email Address" />
                                  </Form.Item>
                
                
                                  <Form.Item
                                    label="MobileNumber"
                                    name="mobileNumber"
                                    rules={[
                                      { required: true, message: "It's Required!" },
                                    ]}
                                  >
                                            <Input placeholder="Mobile Number" />
                                  </Form.Item>
                                  
                                  <Form.Item 
                                  label="Role"
                                  name="role"
                                  rules={[
                                    { required: true, message: "It's Required!" },
                                 ]}
                                  >
                                        <Select>
                                                <Select.Option value="employee">Employee</Select.Option>
                                        </Select>
                                    </Form.Item>
                            </Form>
                      
                </Modal>
 
                <Table
                    columns={actionColumn}
                    dataSource={userRow?.rows}
                    pagination={false}
                    rowKey="_id"
                />

             <Divider>

                <Pagination 
                current={current}
                onChange={onChangePage} 
                pageSize={currentPageSize} 
                defaultPageSize={currentPageSize}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                total={userRow.total} 
                />
                </Divider>  
        </>
    );
};