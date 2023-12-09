import React, { useState, useEffect } from "react";
import { 
    Pending,
    addData,
    getOne,
    DeleteData,
    updateData,
    forDropdown,
    statusChange,
    dropProperty,
    dropClient,
    toVerify
        } from "../../../api/visit.api"

import { Loadersplash } from "../../../helpers/splash";
import { 
    PlusCircleOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    PlusOutlined,
    InboxOutlined
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
    InputNumber,
    Upload,
    Image,
    Card,
    DatePicker
  } from "antd";

  import ImgCrop from 'antd-img-crop';
  
  const { Text,Paragraph } = Typography;

export const Pending_Data = () => {
    //managing state
    const [userRow, setUserRow] = useState([]);
    const [forDrop, setForDrop] = useState([]);
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
const [openChange, setOpenChange] = useState(false)
const [property_id, setProperty] = useState('');
const [visit_date, setDate] = useState('');
const [status, setStatus] = useState('');


//------------------| For Searching |------------------
 const [clientDrop, setClientDrop] = useState([]);
const [propertyDrop, setPropertyDrop] = useState([]);
const [handleSearchClient, sethandleSearchClient] = useState("");
const [handleSearchProperty, sethandleSearchProperty] = useState("");

    const actionColumn = [
     
            {
                dataIndex: "reference_code",
                title: "Reference Code",
                key: "reference_code",
            },
            {
              dataIndex: "client_id",
              title: "Client Id",
              key: "client_id",
              render: (client_id) => {
                const category = clientDrop.find((cat) => cat._id === client_id);
                const categoryName = category ? category.fullName : "";
                return <span>{categoryName}</span>;
              },
          },
          {
            dataIndex: "property_id",
            title: "Property Id",
            key: "property_id",
            render: (property_id) => {
              const category = propertyDrop.find((cat) => cat._id === property_id);
              const categoryName = category ? category.propertyName : "";
              return <span>{categoryName}</span>;
            },
        },

        {
          dataIndex: "visit_date",
          title: "Visit Date",
          key: "visit_date",
          render: (visit_date) => {
            const date = new Date(visit_date);
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
                            {/* <Divider type="vertical" />
                            <Button
                                size="middle"
                                shape="circle"
                                onClick={() => {
                                handleEdit(params._id);
                                }}
                            >
                                <EditOutlined  style={{color:'blue'}}/>
                            </Button> */}
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
        const response = await Pending(value1,value2);
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

//-----------------------------------------------------| HANDLE for Add MODALS |----------------------------------------------------------------
const showModal = () => {setAddOpen(true);}; //For showing the Modal upon clicking the data
                            //-------------------------| HANDLE for MODALS Submit |----------------------------- 
     const handleSubmit = async (values) => {
             try {
              const { 
                property_id, 
                visit_date, 
                client_id
              } = values;

                  const response = await addData(
                    property_id, 
                    visit_date, 
                    client_id
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
            setProperty(viewdata1.data.property_type_id)
            setDate(viewdata1.data.property_name)
            setStatus(viewdata1.data.status)
        }
        } catch (error) {
        console.error("Error fetching user:", error);
        }
    };



    //-----------------------|Edit handling Techniques|-----------------------------
    const editChange = async (value, field) => {
        const id = editId;
        switch(field){

            case 'visit_date': 
            setDate(value)
            break;

            case 'status': 
            setStatus(value)
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

const handleToVerify = async () => {
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
    text: `You want to change the status into verify?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Change",
    cancelButtonText: "Cancel",
    reverseButtons: true,
  });
  
  if (result.isConfirmed) {
    // Make the axios delete request
      const response = await toVerify(editId);
        if (response.status === 200) {
            swalWithBootstrapButtons.fire(
              "Changed!!",
              `the Property Status Has changed into verified`,
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


  const GenerateQr = () => {

  }

//------------------------------------| Forda Property |--------------------------------------
//------------------------------------| Fetching The Property |--------------------------------------

//   const [clientDrop, setClientDrop] = useState([]);
    //   const [propertyDrop, setPropertyDrop] = useState([]);
    // dropProperty,
    // dropClient
//-----------------------------------------------------| HANDLE for Search |----------------------------------------------------------------


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

    return(
       <>      
        <Divider orientation="right">
                  <Divider type="vertical" />
                  <Button type="primary" 
                  onClick={showModal}
                  >
                    <PlusCircleOutlined />    Add New Visitation
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
                        <b>Reference Code:</b>   <br/>
                        {viewData?.reference_code}
                    </Col>
                    
              </Row> <br/>
              <Row gutter={16}>
                  

                    <Col span={12}>
                            <b>Property Id:</b>   <br/>

                            
                            <Select 
                                            showSearch
                                            placeholder="Select Type" 
                                            allowClear
                                            onSearch={handlePropSearch}
                                            onChange={(value) => editChange(value, 'property_id')}
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
                    </Col>
                    <Col span={12}>
                        <b>Visit Date </b>   <br/>
                        <Paragraph
                            editable={{
                                onChange: (updatedValue) => editChange(updatedValue, 'visit_date'),
                            }}
                            >
                            {visit_date}
                        </Paragraph>
                    </Col>
              </Row> <br/>
              <Row gutter={16}>
                    <Col span={12}>
                    <b>Client:</b>   <br/>
                          <Select 
                                            showSearch
                                            placeholder="Select Type" 
                                            allowClear
                                            onSearch={handleClientSearch}
                                            onChange={(value) => editChange(value, 'client_id')}
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
                    </Col>
                    <Col span={12}>
                    <b>Status:</b>   <br/>
                        <Select  defaultValue={viewData?.status}
                            onChange={(value) => editChange(value, 'status')}
                            style={{width:'100%'}}
                        >
                             <Select.Option value="pending">Pending</Select.Option>
                              <Select.Option value="verified">Verified</Select.Option>
                               <Select.Option value="visited">Visited</Select.Option>
                               <Select.Option value="cancelled">Cancelled</Select.Option>
                         </Select>
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
                    <Col span={12}>
                        <b> Reference Code:</b>   <br/>
                     
                           {convertId(viewData?.reference_code)}
                    </Col>

              </Row> <br/>
              <Row gutter={16}>
                    <Col span={12}>
                        <b> Property Type:</b>   <br/>
                     
                           {convertId(viewData?.property_id)}
                    </Col>
                    <Col span={12}>
                        <b> Client:</b>   <br/>
                     
                           {convertClientId(viewData?.client_id)}
                    </Col>
                   
              </Row> <br/>
              
              <Row gutter={16}>
                    <Col span={12}>
                        <b>Visit Day:</b>   <br/>
                            {utils.convertDate(viewData?.visit_date)}
                    </Col>
                    <Col span={12}>
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

                    <Divider><h3 h3 style={{color: "purple"}}>Add New</h3></Divider>
                            <Form
                              form={formAdd}
                              labelCol={{ span: 6 }}
                              wrapperCol={{ span: 14 }}
                              layout="horizontal"
                              style={{ maxWidth: 600 }}
                              onFinish={handleOk}
                            >
                                 <Form.Item 
                                  label="Property Type"
                                  name="property_id"
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
                                   label="Visit Date"
                                   name="visit_date"
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

                        <Card.Grid style={{ width: '20%', textAlign: 'center', backgroundColor:"blue", borderRadius: "10px", margin:"10px"}} 
                                onClick={() => handleStatusChange("pending")}><b>Pending</b></Card.Grid>

                        <Card.Grid style={{ width: '20%', textAlign: 'center', backgroundColor:"#9ACD32", borderRadius: "10px",margin:"10px"}} 
                                onClick={() => handleToVerify()}><b>Verified</b></Card.Grid>

                        <Card.Grid style={{ width: '20%', textAlign: 'center', backgroundColor:"green", borderRadius: "10px",margin:"10px"}} 
                                onClick={() => handleStatusChange("visited")}><b>Visited</b></Card.Grid>
                        
                        <Card.Grid style={{ width: '20%', textAlign: 'center', backgroundColor:"yellow", borderRadius: "10px",margin:"10px"}} 
                                onClick={() => handleStatusChange("cancelled")}><b>Cancelled</b></Card.Grid>
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