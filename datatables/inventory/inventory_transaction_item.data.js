import React, { useState, useEffect } from "react";
import { 
    getAllData,
    addData,
    getOne,
    DeleteData,
    updateData,
    forDropdown,
        } from "../../api/inventory/inventory_transaction_item.api"

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

export const Transaction_Item = ({getid}) => {

    const thisId = getid

    //managing state

    const [userRow, setUserRow] = useState([]);
    const [forDrop, setForDrop] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    //const [current, setCurrent] = useState(1);
    //const [currentPageSize, setcurrentPageSize] = useState(5);
    
    //--------------| Add states |-------------------- 
    const [addopen, setAddOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [formAdd] = Form.useForm(); 


    //-----------------| View States |-----------------------------
    const [openView, setOpenView] = useState(false);
    const [openEditView, setOpenEditView] = useState(false);
    const [viewData, setViewData] = useState({});

    
    // inventory_transaction_id: { type: "string", optional: false },
    // inventory_item_id: { type: "string", optional: false },
    // quantity: { type: "number", optional: false },
    // note: { type: "string", optional: false },

//------------------| For Edit Value |------------------
const [editId, seteditId] = useState('');
const [inventory_item_id, setInventoryItemId] = useState('');
const [quantity, setQuantity] = useState('');
const [note, setNote] = useState(0);

//------------------| For Searching |------------------
const [searchCatValue, setSearchCatValue] = useState("");
const [transaction_id, setTransactionId] = useState("");

    const actionColumn = [
            {
                dataIndex: "item_name",
                title: "Item Name",
                key: "item_name",
            },

            {
                dataIndex: "note",
                title: "Note",
                key: "note",
                ellipsis: true,
            },

            {
                dataIndex: "quantity",
                title: "Quantity",
                key: "quantity",
       
            },
        
            {
            dataIndex: "createdAt",
            title: "Date Added",
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
const fetchData = async (thisId) => {
    const thatId = thisId
    setTransactionId(thatId)
      try {
        const response = await getAllData(thatId);
        const data = await response.data;
            if (response.status === 200) {
                setUserRow(data);
                setIsLoading(false);
                }

            else if (response.status === 400) {
                setUserRow([]);
                setIsLoading(false);
            }
        
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
        fetchData(thisId);
        DropDown()

      }, [thisId]);
      
        if (isLoading) {
            return <Loadersplash/>;
        }
    
        if (error) {
            return <div>Error: {error.message}</div>;
        }


    //   const onChangePage = (page) => {
    //     setCurrent(page);
    //    if(!page){
    //     return false
    //    }else{
    //     fetchData(page, currentPageSize);
    //    }
    //   };

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
                inventory_item_id, 
                quantity,
                note,
              } = values;

                  const response = await addData(
                    transaction_id, 
                    inventory_item_id, 
                    quantity,
                    note,);
            
                    if (response.status === 200) {
                  
                            setAddOpen(false);

                            Swal.fire('Saved!', '', 'success')

                                fetchData(transaction_id);

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

                fetchData(transaction_id);
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
            setInventoryItemId(viewdata1.data.inventory_item_id)
            setQuantity(viewdata1.data.quantity)
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
            case 'inventory_transaction_id': 
                    setTransactionIdEdit(value)
            break;

            case 'inventory_item_id': 
                    setInventoryItemId(value)
            break;

            case 'quantity': 
                    setQuantity(value)
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
        
                    fetchData(transaction_id);; // Assuming the response object contains the data as an object
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
      return category.inventory_name.toLowerCase().includes(searchValue.toLowerCase());
    });
  };
  
  const filteredItems = filterMenuItems(forDrop, searchCatValue);

const convertId = (id) =>{
        const category = forDrop.find((cat) => cat._id === id);
        const categoryName = category ? category.inventory_name : "";
        return <span>{categoryName}</span>;
} 

    return(
       <>      
        <Divider orientation="right">
                  <Divider type="vertical" />
                  <Button type="primary" 
                  onClick={showModal}
                  disabled={transaction_id === ""}
                  >
                    <PlusCircleOutlined />    Add Inventory Item
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
                        <b>Inventory Item:</b>   <br/>
                                <Select 
                                        showSearch
                                        placeholder="Select a category" 
                                        allowClear
                                        defaultValue={viewData?.inventory_category_id}
                                        onSearch={handleCatSearch}
                                        onChange={(value) => editChange(value, 'inventory_category_id')}
                                        optionFilterProp="children"
                                        filterOption={false}
                                        >
                                                {filteredItems.map(category => (
                                                  <Select.Option 
                                                  key={category._id}
                                                  value={category._id}
                                                  >
                                                    {category.inventory_name}
                                                  </Select.Option>
                                                ))} 
                                        </Select>
                    </Col>
                    <Col span={12}>
                            <b>Quantity</b>   <br/>
                            <Paragraph
                            editable={{
                                onChange: (updatedValue) => editChange(updatedValue, 'quantity'),
                            }}
                            >
                            {quantity}
                        </Paragraph>
                    </Col>
              </Row> <br/>
              <Row gutter={16}>
                    <Col span={24}>
                            <b>note:</b>   <br/>
                            <Paragraph
                                editable={{
                                    onChange: (updatedValue) => editChange(updatedValue, 'note'),
                                }}
                                >
                                {note}
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
                        <b> Inventory Name:</b>   <br/>
                     
                           {convertId(viewData?.inventory_item_id)}
                    </Col>
                    <Col span={12}>
                            <b>Quantity:</b>   <br/>
                            {viewData?.quantity}
                    </Col>
              </Row> <br/>

              <br/>
              <Row gutter={16}>
                    <Col span={24}>
                        <b>Note:</b>   <br/>
                            {viewData?.note}
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
                                  label="Inventory Name"
                                  name="inventory_item_id"
                                  rules={[
                                    { required: true, message: "It's Required!" },
                                 ]}
                                  >
                                    <Select 
                                        showSearch
                                        placeholder="Select a Inventory" 
                                        allowClear
                                        onSearch={handleCatSearch}
                                        optionFilterProp="children"
                                        filterOption={false}
                                        >
                                                {filteredItems.map(category => (
                                                  <Select.Option 
                                                  key={category._id}
                                                  value={category._id}
                                                  >
                                                    {category.inventory_name}
                                                  </Select.Option>
                                                ))} 
                                        </Select>
                                       
                                    </Form.Item>


                                  <Form.Item
                                   label="Quantity"
                                   name="quantity"
                                   rules={[
                                      { required: true, message: "It's Required!" },
                                   ]}
                                  >
                                          <InputNumber placeholder="Quantity" />
                                  </Form.Item>

                                  <Form.Item
                                   label="Note"
                                   name="note"
                                   rules={[
                                      { required: true, message: "It's Required!" },
                                   ]}
                                  >
                                     <Input.TextArea />
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