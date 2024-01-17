import React, { useState, useEffect } from "react";
import { 
    Processing,
    getOne,
    statusChange,
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

export const Processing_data = () => {
    //managing state
    const [userRow, setUserRow] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [current, setCurrent] = useState(1);
    const [currentPageSize, setcurrentPageSize] = useState(5);
    
    //-----------------| View States |-----------------------------
    const [openView, setOpenView] = useState(false);
    const [openEditView, setOpenEditView] = useState(false);
  
    const [viewData, setViewData] = useState({});





//------------------| For Edit Value |------------------
const [editId, seteditId] = useState('');


    const actionColumn = [
      {
        dataIndex: "reference_code",
        title: "Reference code",
        key: "reference_code",
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
        const response = await Processing(value1,value2);
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




 //-------------------------| HANDLE for MODALS Editing Viewing |----------------------------- 
    const handleStatusEdit = async (data) => {
        try {
            setOpenEditView(true);
            seteditId(data)
            
        } catch (error) {
        console.error("Error fetching user:", error);
        }
    };



  //-------------------------| HANDLE for Delete Data |----------------------------- 
  const handleStatusChange = async (status) => {
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
        text: `You want to change the status into ${status}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Change",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      });
  
      if (result.isConfirmed) {
        // Make the axios delete request
          const response = await statusChange(editId, status);
            if (response.status === 200) {
                swalWithBootstrapButtons.fire(
                  "Changed!!",
                  `the Payment Status Has changed into ${status}`,
                  "success"
                );
                fetchData(current, currentPageSize);
                setOpenEditView(false);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire("Cancelled", "Done", "error");
      }
    } catch (error) {
      console.error(error);
    }
  };

    return(
       <>      
       
  
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

                        <Card.Grid style={{ width: '25%', textAlign: 'center', backgroundColor:"#FFE600", borderRadius: "10px"}} 
                                onClick={() => handleStatusChange("pending")}><b>Pending</b></Card.Grid>

                        <Card.Grid style={{ width: '25%', textAlign: 'center', backgroundColor:"#87CEEB", borderRadius: "10px"}} 
                                onClick={() => handleStatusChange("processing")}><b>Processing</b></Card.Grid>

                        <Card.Grid style={{ width: '25%', textAlign: 'center', backgroundColor:"#228B22", borderRadius: "10px"}} 
                                onClick={() => handleStatusChange("completed")}><b>Completed</b></Card.Grid>

                        <Card.Grid style={{ width: '25%', textAlign: 'center',backgroundColor:"#B22222", borderRadius: "10px"}} 
                                onClick={() => handleStatusChange("failed")}><b>Failed</b></Card.Grid>

                        <Card.Grid style={{ width: '25%', textAlign: 'center', backgroundColor:"#808080", borderRadius: "10px"}} 
                                onClick={() => handleStatusChange("refunded")}><b>Refunded</b></Card.Grid>

                        <Card.Grid style={{ width: '25%', textAlign: 'center', backgroundColor:"#FFD800", borderRadius: "10px"}} 
                                onClick={() => handleStatusChange("partially")}><b>Partial</b></Card.Grid>

                        <Card.Grid style={{ width: '25%', textAlign: 'center', backgroundColor:"#708090", borderRadius: "10px"}} 
                                onClick={() => handleStatusChange("cancelled")}><b>Cancelled</b></Card.Grid>

                        <Card.Grid style={{ width: '25%', textAlign: 'center', backgroundColor:"#D8BFD8", borderRadius: "10px"}} 
                                onClick={() => handleStatusChange("expired")}><b>Expired</b></Card.Grid>
                        </Card>
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
                    <Col span={24}>
                        <b> Reference Code:</b>   <br/>
                           {viewData?.reference_code}  
                    </Col>
              </Row> <br/>
              <Row gutter={16}>
                    <Col span={12}>
                        <b>Client Id</b>   <br/>
                            {viewData?.client_id}
                    </Col>
                    <Col span={12}>
                        <b>Client Name</b>   <br/>
                            {viewData?.full_name}
                    </Col>
              </Row> <br/>
              <Row gutter={16}>
                    <Col span={12}>
                        <b>Payment Method</b>   <br/>
                            {viewData?.payment_method}
                    </Col>
                    <Col span={12}>
                        <b>Amount</b>   <br/>
                            Php {viewData?.payment_amount}
                    </Col>
              </Row> <br/>
              <Row gutter={16}>
                    <Col span={24}>
                        <b>note</b>   <br/>
                          {viewData?.note}
                    </Col>

              </Row> <br/>
              <Row gutter={16}>
                    <Col span={12}>
                        <b>Payment Date</b>   <br/>
                            {utils.convertDate(viewData?.payment_date)}
                    </Col>
                    <Col span={12}>
                        <b>Created At</b>   <br/>
                            {utils.convertDate(viewData?.createdAt)}
                    </Col>

              </Row>
            </Modal>

            <Divider orientation="left"><h3 style={{color: "#87CEEB"}}>Processing Payments</h3></Divider>     
      
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