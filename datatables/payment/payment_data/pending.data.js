import React, { useState, useEffect } from "react";
import { 
    Pending,
    // addData,
    // getOne,
    // DeleteData,
    // updateData,
        } from "../../../api/payment/payment_manangement.api"

import { Loadersplash } from "../../../helpers/splash";

import { 
    PlusCircleOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    } from '@ant-design/icons';
import Swal from 'sweetalert2'
import utils from '../../../helpers/utils'


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
    Pagination,
    Card 
  } from "antd";

  const { Text,Paragraph } = Typography;

export const Pending_data = () => {
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



//     params: {
//         application_id: { type: "string", optional: false },
//         payment_method: { type: "string", optional: false },
//         payment_amount: { type: "string", optional: false },
//         description: { type: "string", optional: true },
//         payment_date: { type: "string", optional: false },
//     },
    
// /** @param {Context} ctx */

// roles: ["admin", "client"],
// async handler(ctx) {
//     const user = ctx.meta.user
//     const params = utils.getDate(ctx.params);
//     const reference = utils.create_reference()
//             const insert_data =   await this.adapter.insert({
//                 ...params,
//                 reference_code: reference,
//                 client_id: user.id,
//                 payment_status: "pending"
//             });

//         return insert_data


//------------------| For Edit Value |------------------
const [editId, seteditId] = useState('');
const [category_name, setCategoryName] = useState('');
const [category_description, setCategoryDescription] = useState('');


    const actionColumn = [
      {
        dataIndex: "application_id",
        title: "Application Id",
        key: "application_id",
      },

      {
        dataIndex: "payment_method",
        title: "Payment Method",
        key: "payment_method",
      },
      {
        dataIndex: "payment_amount",
        title: "Amount",
        key: "payment_amount",
      },

      {
        dataIndex: "payment_status",
        title: "status",
        key: "payment_status",
        render: (payment_status) => {
            const status = utils.statusTag(payment_status); // If roles is not an array, it will be a single string
            return status
          },
      },
      
        {
          dataIndex: "payment_date",
          title: "Payment Date",
          key: "payment_date",
          render: (payment_date) => {
            const date = new Date(payment_date);
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
                                handleStatusEdit(params._id);
                            }}
                        >
                            <EditOutlined  style={{color:'blue'}}/>
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
        const response = await Pending(value1,value2);
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

//-----------------------------------------------------| HANDLE for Add MODALS |----------------------------------------------------------------
const showModal = () => {setAddOpen(true);}; //For showing the Modal upon clicking the data
                            //-------------------------| HANDLE for MODALS Submit |----------------------------- 
     const handleSubmit = async (values) => {
             try {
              const { 
                category_name, 
                category_description, 
              } = values;

                  const response = await addData(
                    category_name, 
                    category_description, 
                    );
            
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
  const handleDelete = async (id) => {
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
    const handleStatusEdit = async (data) => {
        try {
            setOpenEditView(true);
            seteditId(data)
            
        } catch (error) {
        console.error("Error fetching user:", error);
        }
    };



    //-----------------------|Edit handling Techniques|-----------------------------
    // const editChange = async (value, field) => {
    //     const id = editId;
    //     switch(field){
    //         case 'category_name': 
    //             setCategoryName(value)
    //         break;

    //         case 'category_description': 
    //             setCategoryDescription(value)
    //         break;
            
    //         default:
    //             alert("Error Accessing Value")
    //         break;
    //     }
       
    //     try {
    //         const data = {
    //             id: id,
    //             [field]: value
    //         };
    
    //         const Dataresponse = await updateData(data);
        
    //             if (Dataresponse.status === 200) {
    //                 Swal.fire({
    //                     icon: "success",
    //                     title: "Success!",
    //                     text: "Successfully Edited",
    //                 });
        
    //                 fetchData(current, currentPageSize); // Assuming the response object contains the data as an object
    //             }
    //     } catch (error) {
    //         Swal.fire({
    //             icon: "error",
    //             title: "Respond 500",
    //             text: error,
    //         });
    //     }
    // };

    return(
       <>      
        {/* <Divider orientation="right">
                  <Divider type="vertical" />
                  <Button type="primary" 
                  onClick={showModal}
                  >
                     < PlusCircleOutlined />     Add New Inventory Category
                  </Button>
                  <Divider type="vertical" />
        </Divider> */}
    

      {/* ----------------------------------------------| Modal for Editing Datas |---------------------------------------------------  */}
                    <Modal
                    open={openEditView}
                    onCancel={() => {
                        setOpenEditView(false);
                    }}
                    footer={null}
                    width={700}
                    >
                        <Card style={{padding:"20px"}} bordered={false}>
                        <Divider><h3 style={{color: "blue"}}>Change Payment Status</h3></Divider>

                        <Card.Grid style={{ width: '25%', textAlign: 'center',color:"FFE600"}} 
                                onClick={() => alert("pending")}>Pending</Card.Grid>

                        <Card.Grid style={{ width: '25%', textAlign: 'center',}} 
                                onClick={() => alert("processing")}>Processing</Card.Grid>

                        <Card.Grid style={{ width: '25%', textAlign: 'center',}} 
                                onClick={() => alert("completed")}>Completed</Card.Grid>

                        <Card.Grid style={{ width: '25%', textAlign: 'center',}} 
                                onClick={() => alert("failed")}>Failed</Card.Grid>

                        <Card.Grid style={{ width: '25%', textAlign: 'center',}} 
                                onClick={() => alert("refunded")}>Refunded</Card.Grid>

                        <Card.Grid style={{ width: '25%', textAlign: 'center',}} 
                                onClick={() => alert("partially")}>Partial Payment</Card.Grid>

                        <Card.Grid style={{ width: '25%', textAlign: 'center',}} 
                                onClick={() => alert("cancelled")}>Cancelled</Card.Grid>

                        <Card.Grid style={{ width: '25%', textAlign: 'center',}} 
                                onClick={() => alert("expired")}>Expired</Card.Grid>

                        </Card>
                    </Modal>


                    
                    {/* switch (status) {
          case "pending":
            color = "#FFE600";
            break;
          case "processing":
            color = "#87CEEB"; 
            break;
          case "completed":
            color = "#228B22"; 
            break;
          case "failed":
            color = "#B22222"; 
            break;
          case "refunded":
            color = "#808080"; 
            break;
          case "partially":
            color = "#FFD700"; 
            break;
          case "cancelled":
            color = "#708090"; 
            break;
          case "expired":
            color = "#D8BFD8";
            break;
          default:
            color = "default"; // Set a default color for unknown statuses
            break;
        } */}
            
  {/* ----------------------------------------------| Modal for Viewing Datas |---------------------------------------------------  */}
            {/* <Modal
              open={openView}
              onCancel={() => {
                setOpenView(false);
              }}
              footer={null}
              width={600}
            >
             <Divider><h3 style={{color: "green"}}>Viewing Data</h3></Divider>
              <Row gutter={16}>
                    <Col span={24}>
                        <b> Category Name:</b>   <br/>
                           {viewData?.category_name}  
                    </Col>
              </Row> <br/>
              <Row gutter={16}>
                    <Col span={24}>
                        <b>Category Description:</b>   <br/>
                            {viewData?.category_description}
                    </Col>
              </Row> <br/>
              <Row gutter={16}>
                    <Col span={24}>
                        <b>Created At</b>   <br/>
                            {utils.convertDate(viewData?.createdAt)}
                    </Col>

              </Row>
            </Modal> */}
            
       {/* ----------------------------------------------| Modal for Adding new Datas |---------------------------------------------------  */}            
       {/* <Modal
                   open={addopen}
                   onOk={handleOk} 
                   confirmLoading={confirmLoading}
                   onCancel={handleCancel}
                >
                    <Divider><h3 h3 style={{color: "purple"}}>Adding new Category</h3></Divider>
                            <Form
                              form={formAdd}
                              labelCol={{ span: 6 }}
                              wrapperCol={{ span: 14 }}
                              layout="horizontal"
                              style={{ maxWidth: 600 }}
                              onFinish={handleOk}
                            >
                                  <Form.Item
                                   label="Category Name"
                                   name="category_name"
                                   rules={[
                                      { required: true, message: "It's Required!" },
                                   ]}
                                  >
                                          <Input placeholder="Category Name" />
                                  </Form.Item>


                                  <Form.Item
                                    label="Description"
                                   name="category_description"
                                   rules={[
                                      { required: true, message: "It's Required!" },
                                   ]}
                                  >
                                          <Input.TextArea />
                                  </Form.Item>
                            </Form>
                      
                </Modal> */}
 
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