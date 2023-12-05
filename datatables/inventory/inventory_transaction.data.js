import React, { useState, useEffect } from "react";
import { 
    getAllData,
    addData,
    getOne,
    DeleteData,
    updateData,
        } from "../../api/inventory/inventory_transaction.api"

import { Loadersplash } from "../../helpers/splash";

import { 
    CheckCircleOutlined,
    UserAddOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    } from '@ant-design/icons';
import Swal from 'sweetalert2'

import {
    Transaction_Item
} from './inventory_transaction_item.data'

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
    Pagination,
    DatePicker,
    Descriptions
  } from "antd";

  const { Text,Paragraph } = Typography;
  const { TextArea } = Input;
export const Inventory_Transaction_Data = () => {
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

    // transaction_type: { type: "string", optional: false },
    // transaction_date: { type: "string", optional: false },
    // note: { type: "string", optional: false },
//------------------| For Edit Value |------------------
const [editId, seteditId] = useState('');
const [transaction_type, setTransactionType] = useState('');
const [transaction_date, setTransactionDate] = useState('');
const [note, setNote] = useState('');

const [transaction_id, setTransactionId] = useState('');
const [transaction_info, setTransactionInfo] = useState({});

    const actionColumn = [
        {
            dataIndex: "transaction_type",
            title: "Transaction Type",
            key: "transaction_type",
        },

        {
            dataIndex: "transaction_date",
            title: "Transaction Date",
            key: "transaction_date",
            render: (transaction_date) => {
                const date = new Date(transaction_date);
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
                        <Divider type="vertical" />
                        <Button
                            size="middle"
                            shape="circle"
                            onClick={() => {
                                handleTrasaction(params._id)
                            }}
                            >
                            <CheckCircleOutlined style={{ color: 'FF90BC' }} />
                            </Button>
                    </div>
            );
          },
        },  
    ];

    // const [transaction_info, setTransactionInfo] = useState({});
//-----------------------------------------| HAndle Transaction Id| ----------------------------
    const handleTrasaction = async(id) => {

        try {
            const viewdata1 = await getOne(id);
           if (viewdata1.status === 200) {

                setTransactionInfo(viewdata1.data); // Assuming the response object contains the data as an object
                setTransactionId(id);
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "The Items showed",
                });
           }
         } catch (error) {
           console.error("Error fetching user:", error);
         }
           
        };
  



//-----------------------------------------------------| HANDLE for Use_Effects |----------------------------------------------------------------
const fetchData = async (page, pageSize) => {
  const value1 = page
  const value2 = pageSize
      try {
        const response = await getAllData(value1,value2);
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
                transaction_type, 
                transaction_date, 
                note
              } = values;

                  const response = await addData(
                    transaction_type, 
                    transaction_date, 
                    note);
            
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
    const handleEdit = async (data) => {
        try {
        const viewdata1 = await getOne(data);
        setOpenEditView(true);
        if (viewdata1.status === 200) {
            setViewData(viewdata1.data); // Assuming the response object contains the data as an object
            seteditId(viewdata1.data._id)
            setTransactionType(viewdata1.data.transaction_type)
            setTransactionDate(viewdata1.data.transaction_date)
            setNote(viewdata1.data.note)
        }
        } catch (error) {
        console.error("Error fetching user:", error);
        }
    };



    //-----------------------|Edit handling Techniques|-----------------------------
    const editChange = async (value, field) => {
        const id = editId;
        switch(field){
            case 'transaction_type': 
                setTransactionType(value)
            break;

            case 'transaction_date': 
                setTransactionDate(value)
            break;

            case 'note': 
                setNote(value)
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

    const transactionDescription = [
        {
          key: '1',
          label: 'Reference Number',
          children: <span>{transaction_info?.reference_code}</span>,
        },
        {
          key: '2',
          label: 'Transaction Type',
          children: <span>{transaction_info?.transaction_type}</span>,
        },
        {
          key: '3',
          label: 'Transaction Date',
          children: <span>{utils.convertDate(transaction_info?.transaction_date)}</span>,
        },
      ];


    return(
       <>      
        <Divider orientation="right">
                  <Divider type="vertical" />
                  <Button type="primary" 
                  onClick={showModal}
                  >
                     <UserAddOutlined />    Add New Transaction Data
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
              <Divider orientation="left">{viewData?.reference_code}</Divider>
                    <Col span={12}>
                        <b> Transaction Type:</b>   <br/>
                            <Select  defaultValue={viewData?.transaction_type}
                                onChange={(value) => editChange(value, 'transaction_type')}
                            >
                                <Select.Option value="purchase">Purchase</Select.Option>
                                <Select.Option value="consumption">Consumption</Select.Option>
                                <Select.Option value="adjustment">Adjustment</Select.Option>
                            </Select>

                    </Col>
                    <Col span={12}>
                            <b>Transaction Date:</b>   <br/>
                            <Paragraph
                                editable={{
                                    onChange: (updatedValue) => editChange(updatedValue, 'transaction_date'),
                                }}
                                >
                                {transaction_date}
                            </Paragraph>
                    </Col>
              </Row> <br/>
              <Row gutter={16}>
                    <Col span={12}>
                            <b>Note:</b>   <br/>
                            <Paragraph
                            editable={{
                                onChange: (updatedValue) => editChange(updatedValue, 'note'),
                            }}
                            >
                            {note}
                        </Paragraph>
                    </Col>
              </Row> <br/>
      
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
              <Divider orientation="left">REFERENCE CODE: {viewData?.reference_code}</Divider>
                    <Col span={12}>
                        <b> Transaction Type:</b>   <br/>
                           {viewData?.transaction_type} 
                    </Col>
                    <Col span={12}>
                            <b>Transaction Date</b>   <br/>
                            {utils.convertDate(viewData?.transaction_date)}
                    </Col>
              </Row> <br/>
              <Row gutter={16}>
                    <Col span={24}>
                        <b>Note:</b>   <br/>
                            {viewData?.note}
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
                    width={700}
                >

                    <Divider><h3 h3 style={{color: "purple"}}>Add New Transaction</h3></Divider>
                            <Form
                              form={formAdd}
                              labelCol={{ span: 6 }}
                              wrapperCol={{ span: 14 }}
                              layout="horizontal"
                              style={{ maxWidth: 700 }}
                              onFinish={handleOk}
                            >
                                     <Form.Item 
                                  label="Transaction Type"
                                  name="transaction_type"
                                  rules={[
                                    { required: true, message: "It's Required!" },
                                 ]}
                                  >
                                        <Select defaultValue="purchase">
                                                <Select.Option value="purchase">Purchase</Select.Option>
                                                <Select.Option value="consumption">Consumption</Select.Option>
                                                <Select.Option value="adjustment">Adjustment</Select.Option>
                                        </Select>
                                    </Form.Item>


                                  <Form.Item
                                   label="Transaction Date"
                                   name="transaction_date"
                                   rules={[
                                      { required: true, message: "It's Required!" },
                                   ]}
                                  >
                                          <DatePicker />
                                  </Form.Item>

                                  <Form.Item
                                   label="Note"
                                   name="note"
                                   rules={[
                                      { required: true, message: "It's Required!" },

                                   ]}
                                  >
                                        <TextArea rows={4} />
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


{/* -------------------------------------------------------------------| TRANSACTION ITEMS |----------------------------------------------------------------------------------------------------------------------------------------------------------------         */}
                    
                <Divider>
                                 <h3>TRANSACTION ITEMS</h3>
                                
                </Divider>  
                <Descriptions title="Transaction Info" layout="vertical" bordered items={transactionDescription} />

                <Transaction_Item getid={transaction_id} />
     
        </>
    );
};