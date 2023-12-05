import React, { useState, useEffect } from "react";
import { 
    getAllData,
    addData,
    getOne,
    DeleteData,
    updateData,
    forDropdown,
        } from "../../api/inventory/inventory_item.api"

import { Loadersplash } from "../../helpers/splash";
import { 
    // UploadOutlined,
    // FilePdfOutlined,
    // ExceptionOutlined ,
    PlusCircleOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
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
    Pagination,
    InputNumber 
  } from "antd";

  const { Text,Paragraph } = Typography;

export const Inventory_Item_Data = () => {
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
const [inventory_category_id, setCategoryId] = useState('');
const [inventory_name, setInventoryName] = useState('');
const [description, setDescription] = useState('');
const [stock_onhand, setStock] = useState(0);

//------------------| For Searching |------------------
const [searchCatValue, setSearchCatValue] = useState("");


    const actionColumn = [
      {
        dataIndex: "inventory_category_id",
        title: "Category Name",
        key: "inventory_category_id",
        render: (inventory_category_id) => {
            const category = forDrop.find((cat) => cat._id === inventory_category_id);
            const categoryName = category ? category.category_name : "";
            return <span>{categoryName}</span>;
          },
      },

      {
        dataIndex: "inventory_name",
        title: "Inventory Name",
        key: "inventory_name",
      },

        {
          dataIndex: "description",
          title: "Description",
          key: "description",
          ellipsis: true,
        },
      
        {
            dataIndex: "stock_onhand",
            title: "Stock On Hand",
            key: "stock_onhand",
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
        const response = await getAllData(value1,value2);
        const data = await response.data;
        setUserRow(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    const DropDown = async () => {
            try {
              const response = await forDropdown();
              const data = await response.data;
              setForDrop(data);
            } catch (error) {
              setError(error);
            }
          };


// kukunin mo yung Data sa API
    useEffect(() => {
        fetchData(current, currentPageSize);
        DropDown()
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
                inventory_category_id, 
                inventory_name, 
                description,
                stock_onhand,
              } = values;

                  const response = await addData(
                    inventory_category_id, 
                    inventory_name, 
                    description,
                    stock_onhand,);
            
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
            setCategoryId(viewdata1.data.inventory_category_id)
            setInventoryName(viewdata1.data.inventory_name)
            setDescription(viewdata1.data.description)
            setStock(viewdata1.data.stock_onhand)
        }
        } catch (error) {
        console.error("Error fetching user:", error);
        }
    };


    //-----------------------|Edit handling Techniques|-----------------------------
    const editChange = async (value, field) => {
        const id = editId;
        switch(field){
            case 'inventory_category_id': 
            setCategoryId(value)
            break;

            case 'inventory_name': 
            setInventoryName(value)
            break;

            case 'description': 
            setDescription(value)
             break;

             case 'stock_onhand': 
             setStock(value)
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

//-----------------------------------------------------| HANDLE for Search |----------------------------------------------------------------

const handleCatSearch = (value) => {
    setSearchCatValue(value);
  };
  
      // const [forDrop, setForDrop] = useState([]);
  const filterMenuItems = (categories, searchValue) => {
    return categories.filter((category) => {
      return category.category_name.toLowerCase().includes(searchValue.toLowerCase());
    });
  };
  
  const filteredItems = filterMenuItems(forDrop, searchCatValue);

const convertId = (id) =>{
        const category = forDrop.find((cat) => cat._id === id);
        const categoryName = category ? category.category_name : "";
        return <span>{categoryName}</span>;
} 

    return(
       <>      
        <Divider orientation="right">
                  <Divider type="vertical" />
                  <Button type="primary" 
                  onClick={showModal}
                  >
                    <PlusCircleOutlined />    Add New Inventory Item
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
                        <b>Category:</b>   <br/>
                        <Select 
                                        showSearch
                                        placeholder="Select a category" 
                                        allowClear
                                        defaultValue={viewData?.inventory_category_id}
                                        onSearch={handleCatSearch}
                                        onChange={(value) => editChange(value, 'inventory_category_id')}
                                        optionFilterProp="children"
                                        filterOption={false}
                                        // dropdownRender={menu => (
                                        //   <div>
                                        //     {menu}
                                        //     {/* <div style={{ padding: '8px', cursor: 'pointer' }} 
                                        //    // onClick={handleAddNewCategory}
                                        //     >
                                        //       <Button type="text" block onClick={showDrawer}>
                                        //         Add Category
                                        //       </Button>
                                        //     </div> */}
                                        //   </div>
                                        // )}
                                        >
                                                {filteredItems.map(category => (
                                                  <Select.Option 
                                                  key={category._id}
                                                  value={category._id}
                                                  >
                                                    {category.category_name}
                                                  </Select.Option>
                                                ))} 
                                        </Select>
                    </Col>
                    <Col span={12}>
                            <b>Inventory Name:</b>   <br/>
                            <Paragraph
                            editable={{
                                onChange: (updatedValue) => editChange(updatedValue, 'inventory_name'),
                            }}
                            >
                            {inventory_name}
                        </Paragraph>
                    </Col>
              </Row> <br/>
              <Row gutter={16}>
                    <Col span={12}>
                    <b>Stock Onhand:</b>   <br/>
                        <Paragraph
                            editable={{
                                onChange: (updatedValue) => editChange(updatedValue, 'stock'),
                            }}
                            >
                            {stock_onhand}
                        </Paragraph>
                    </Col>
              </Row> <br/>
              <Row gutter={16}>
                    <Col span={24}>
                            <b>Description:</b>   <br/>
                            <Paragraph
                                editable={{
                                    onChange: (updatedValue) => editChange(updatedValue, 'description'),
                                }}
                                >
                                {description}
                        </Paragraph>
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
                        <b> Category:</b>   <br/>
                     
                           {convertId(viewData?.inventory_category_id)}
                    </Col>
                    <Col span={12}>
                            <b>Inventory Name:</b>   <br/>
                            {viewData?.inventory_name}
                    </Col>
              </Row> <br/>

              <Row gutter={16}>
                    <Col span={12}>
                        <b>Stock On hand</b>   <br/>
                            {viewData?.stock_onhand}
                    </Col>
                    <Col span={12}>
                        <b>Created At</b>   <br/>
                            {utils.convertDate(viewData?.createdAt)}
                    </Col>

              </Row>
              <br/>
              <Row gutter={16}>
                    <Col span={24}>
                        <b>Description:</b>   <br/>
                            {viewData?.description}
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

                    <Divider><h3 h3 style={{color: "purple"}}>Adding new User</h3></Divider>
                            <Form
                              form={formAdd}
                              labelCol={{ span: 6 }}
                              wrapperCol={{ span: 14 }}
                              layout="horizontal"
                              style={{ maxWidth: 600 }}
                              onFinish={handleOk}
                            >
                                 <Form.Item 
                                  label="Category"
                                  name="inventory_category_id"
                                  rules={[
                                    { required: true, message: "It's Required!" },
                                 ]}
                                  >
                                    <Select 
                                        showSearch
                                        placeholder="Select a category" 
                                        allowClear
                                        onSearch={handleCatSearch}
                                        optionFilterProp="children"
                                        filterOption={false}
                                        // dropdownRender={menu => (
                                        //   <div>
                                        //     {menu}
                                        //     {/* <div style={{ padding: '8px', cursor: 'pointer' }} 
                                        //    // onClick={handleAddNewCategory}
                                        //     >
                                        //       <Button type="text" block onClick={showDrawer}>
                                        //         Add Category
                                        //       </Button>
                                        //     </div> */}
                                        //   </div>
                                        // )}
                                        >
                                                {filteredItems.map(category => (
                                                  <Select.Option 
                                                  key={category._id}
                                                  value={category._id}
                                                  >
                                                    {category.category_name}
                                                  </Select.Option>
                                                ))} 
                                        </Select>
                                       
                                    </Form.Item>

                                  <Form.Item
                                   label="Inventory Name"
                                   name="inventory_name"
                                   rules={[
                                      { required: true, message: "It's Required!" },
                                   ]}
                                  >
                                          <Input placeholder="Inventory Name" />
                                  </Form.Item>


                                  <Form.Item
                                   label="Description"
                                   name="description"
                                   rules={[
                                      { required: true, message: "It's Required!" },
                                   ]}
                                  >
                                     <Input.TextArea />
                                  </Form.Item>

                                  <Form.Item
                                   label="Stock On Hand"
                                   name="stock_onhand"
                                   rules={[
                                      { required: true, message: "It's Required!" },
                                   ]}
                                  >
                                          <InputNumber placeholder="Stock On Hand" />
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