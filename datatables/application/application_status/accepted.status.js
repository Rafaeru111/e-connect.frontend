import React, { useState, useEffect } from "react";
import { 
    Accepted,
    addData,
    getOne,
    DeleteData,
    updateData,
    dropProperty,
    dropClient,
    statusChange
        } from "../../../api/client_application.api"

import { Loadersplash } from "../../../helpers/splash";
import { 
    PlusCircleOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    PlusOutlined,
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
    DatePicker,
    Card
  } from "antd";

  const { Text,Paragraph } = Typography;

export const Accepted_Application = () => {
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
const [property_item_id, setItemId] = useState('');
const [application_type, setType] = useState('');
const [application_date, setDate] = useState('');
const [openChange, setOpenChange] = useState(false)


//---------------------------------| drop down ng user, |-----------------------------------
const [clientDrop, setClientDrop] = useState([]);
const [propertyDrop, setPropertyDrop] = useState([]);
const [handleSearchClient, sethandleSearchClient] = useState("");
const [handleSearchProperty, sethandleSearchProperty] = useState("");

    const actionColumn = [
        {
            dataIndex: "property_item_id",
            title: "Property",
            key: "property_item_id",
            render: (property_item_id) => {
                const category = propertyDrop.find((cat) => cat._id === property_item_id);
                const categoryName = category ? category.propertyName : "";
                return <span>{categoryName}</span>;
              },
        },

        {
            dataIndex: "application_type",
            title: "Application Type",
            key: "application_type",
            ellipsis: true,
        },
        {
            dataIndex: "client_id",
            title: "Client",
            key: "client_id",
            render: (client_id) => {
                const category = clientDrop.find((cat) => cat._id === client_id);
                const categoryName = category ? category.fullName : "";
                return <span>{categoryName}</span>;
              },
        },
        {
            dataIndex: "application_date",
            title: "Application Date",
            key: "application_date",
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
                        style={{color: 'violet'}}
                        size="middle"
                        shape="circle"
                        onClick={() => {
                          handleStatusEdit(params._id);
                        }}
                        >
                        <PlusOutlined/>
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
        const response = await Accepted(value1,value2);
        const data = await response.data;
        setUserRow(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    const property_drop = async () => {
        try {
          const response = await dropProperty();
          const data = await response.data;
          setPropertyDrop(data);
        } catch (error) {
          setError(error);
        }
      };

      const client_drop = async () => {
        try {
          const response = await dropClient();
          const data = await response.data;
          setClientDrop(data);
        } catch (error) {
          setError(error);
        }
      };

// kukunin mo yung Data sa API
    useEffect(() => {
        fetchData(current, currentPageSize);
        property_drop()
        client_drop()
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
                property_item_id, 
                application_type, 
                application_date, 
                client_id, 
              } = values;

                  const response = await addData(
                    property_item_id, 
                    application_type, 
                    application_date, 
                    client_id,
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
    const handleEdit = async (data) => {
        try {
        const viewdata1 = await getOne(data);
        setOpenEditView(true);
        if (viewdata1.status === 200) {
            setViewData(viewdata1.data); // Assuming the response object contains the data as an object
            seteditId(viewdata1.data._id)
            setItemId(viewdata1.data.property_item_id)
            setType(viewdata1.data.application_type)
            setDate(viewdata1.data.application_date)
        }
        } catch (error) {
        console.error("Error fetching user:", error);
        }
    };




    //-----------------------|Edit handling Techniques|-----------------------------
    const editChange = async (value, field) => {
        const id = editId;
        switch(field){
            case 'property_item_id': 
            setItemId(value)
            break;

            case 'application_type': 
            setType(value)
            break;

            case 'application_date': 
            setDate(value)
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


//------------------------------------| Forda Property |--------------------------------------
//------------------------------------| Fetching The Property |--------------------------------------

//   const [clientDrop, setClientDrop] = useState([]);
    //   const [propertyDrop, setPropertyDrop] = useState([]);
    // dropProperty,
    // dropClient
//-----------------------------------------------------| HANDLE for Search |----------------------------------------------------------------


// const [clientDrop, setClientDrop] = useState([]);
// const [propertyDrop, setPropertyDrop] = useState([]);
// const [handleSearchClient, sethandleSearchClient] = useState("");
// const [handleSearchProperty, sethandleSearchProperty] = useState("");

const handlePropSearch = (value) => {
    sethandleSearchProperty(value);
  };

  const filterMenuItems = (categories, searchValue) => {
    return categories.filter((category) => {
      return category.propertyName.toLowerCase().includes(searchValue.toLowerCase());
    });
  };
  
  const filteredItems = filterMenuItems(propertyDrop, handleSearchProperty);

const convertId = (id) =>{
        const category = propertyDrop.find((cat) => cat._id === id);
        const categoryName = category ? category.propertyName : "";
        return <span>{categoryName}</span>;
} 

//-----------------------------------------|Handle set Client|-----------------------------------------------
//------------------------------------| Fetching The Property |--------------------------------------

//   const [clientDrop, setClientDrop] = useState([]);
    //   const [propertyDrop, setPropertyDrop] = useState([]);
    // dropProperty,
    // dropClient
//-----------------------------------------------------| HANDLE for Search |----------------------------------------------------------------
// const [clientDrop, setClientDrop] = useState([]);
// const [propertyDrop, setPropertyDrop] = useState([]);
// const [handleSearchClient, sethandleSearchClient] = useState("");
// const [handleSearchProperty, sethandleSearchProperty] = useState("");
const handleClientSearch = (value) => {
    sethandleSearchClient(value);
  };

  const filterMenu = (categories, searchValue) => {
    return categories.filter((category) => {
      return category.fullName.toLowerCase().includes(searchValue.toLowerCase());
    });
  };
  
  const filtered = filterMenu(clientDrop, handleSearchClient);

const convertClientId = (id) =>{
        const category = clientDrop.find((cat) => cat._id === id);
        const categoryName = category ? category.fullName : "";
        return <span>{categoryName}</span>;
} 



//-------------------------| HANDLE for MODALS Editing Viewing |----------------------------- 
const handleStatusEdit = async (data) => {
    try {
        setOpenChange(true);
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
              `the Property Status Has changed into ${status}`,
              "success"
            );
            fetchData(current, currentPageSize);
            setOpenChange(false);
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
        <Divider orientation="right">
                  <Divider type="vertical" />
                  <Button type="primary" 
                  onClick={showModal}
                  >
                     < PlusCircleOutlined />     Add New Client Application 
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
                    <Col span={24}>
                        <b> Property Name:</b>   <br/>
                           <Paragraph
                            editable={{
                                onChange: (updatedValue) => editChange(updatedValue, 'property_item_id'),
                            }}
                        >
                            {property_item_id}
                        </Paragraph>
                    </Col>
                   
              </Row> <br/>
              <Row gutter={16}>
                <Col span={24}>
                                <b>Application Type:</b>   <br/>
                                <Paragraph
                                editable={{
                                    onChange: (updatedValue) => editChange(updatedValue, 'application_type'),
                                }}
                                >
                                {application_type}
                            </Paragraph>
                        </Col>
              </Row> <br/>

              <Row gutter={16}>
                <Col span={24}>
                                <b>Date:</b>   <br/>
                                <Paragraph
                                editable={{
                                    onChange: (updatedValue) => editChange(updatedValue, 'application_date'),
                                }}
                                >
                                {application_date}
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
                    <Col span={24}>
                        <b>Reference Code: </b>   
                            {viewData?.reference_code}
                    </Col>
              </Row> <br/>
              <Row gutter={16}>
                    <Col span={12}>
                        <b> Property Name:</b>   <br/>
                           {viewData?.property_item_id}  
                    </Col>
                    <Col span={12}>
                        <b> Client:</b>   <br/>
                           {viewData?.client_id}  
                    </Col>
              </Row> <br/>
              <Row gutter={16}>
                    <Col span={12}>
                        <b>  Application Date:</b>   <br/>
                           {viewData?.application_date}  
                    </Col>
                    <Col span={12}>
                        <b> Status:</b>   <br/>
                           {viewData?.status}  
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

                    <Divider><h3 h3 style={{color: "purple"}}>Adding new Client Appointment</h3></Divider>
                            <Form
                              form={formAdd}
                              labelCol={{ span: 6 }}
                              wrapperCol={{ span: 14 }}
                              layout="horizontal"
                              style={{ maxWidth: 800 }}
                              onFinish={handleOk}
                            >
                                  <Form.Item
                                   label="Property Item Id"
                                   name="property_item_id"
                                   rules={[
                                      { required: true, message: "It's Required!" },
                                   ]}
                                  >
                                          <Select 
                                            showSearch
                                            placeholder="Select Type" 
                                            allowClear
                                            onSearch={handlePropSearch}
                                            optionFilterProp="children"
                                            filterOption={false}
                                            >
                                                    {filteredItems.map(category => (
                                                    <Select.Option 
                                                    key={category._id}
                                                    value={category._id}
                                                    >
                                                        {category.propertyName}
                                                    </Select.Option>
                                                    ))} 
                                            </Select>
                                    </Form.Item>

                                  <Form.Item
                                   label="Type"
                                   name="application_type"
                                   rules={[
                                      { required: true, message: "It's Required!" },
                                   ]}
                                  >
                                          <Input placeholder="Type" />
                                  </Form.Item>

                                  <Form.Item
                                    label="Application Date"
                                   name="application_date"
                                   rules={[
                                      { required: true, message: "It's Required!" },
                                   ]}
                                  >
                                           <DatePicker />
                                  </Form.Item>

                                      <Form.Item
                                        label="Client Id"
                                      name="client_id"
                                      rules={[
                                          { required: true, message: "It's Required!" },
                                      ]}
                                      >
                                               <Select 
                                                showSearch
                                                placeholder="Select Type" 
                                                allowClear
                                                onSearch={handleClientSearch}
                                                optionFilterProp="children"
                                                filterOption={false}
                                                >
                                                        {filtered.map(category => (
                                                        <Select.Option 
                                                        key={category._id}
                                                        value={category._id}
                                                        >
                                                            {category.fullName}
                                                        </Select.Option>
                                                        ))} 
                                                </Select>
                                      </Form.Item>
                              
                                </Form>
                                
                      
                </Modal>

                <Modal
                    open={openChange}
                    onCancel={() => {
                        setOpenChange(false);
                    }}
                    footer={null}
                    width={700}
                    >
                        <Card style={{padding:"20px"}} bordered={false}>
                        <Divider><h3 style={{color: "blue"}}>Change Payment Status</h3></Divider>

                        <Card.Grid style={{ width: '30%', textAlign: 'center', backgroundColor:"yellow", borderRadius: "10px", margin:"10px"}} 
                                onClick={() => handleStatusChange("pending")}><b>Pending</b></Card.Grid>

                        <Card.Grid style={{ width: '30%', textAlign: 'center', backgroundColor:"green", borderRadius: "10px",margin:"10px"}} 
                                onClick={() => handleStatusChange("accepted")}><b>Accepted</b></Card.Grid>

                        <Card.Grid style={{ width: '30%', textAlign: 'center', backgroundColor:"red", borderRadius: "10px",margin:"10px"}} 
                                onClick={() => handleStatusChange("denied")}><b>Denied</b></Card.Grid>
                        </Card>
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