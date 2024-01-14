

import React, { useState, useEffect,useRef } from "react";
import { 
    Available,
    addData,
    getOne,
    DeleteData,
    updateData,
    forDropdown,
    statusChange
        } from "../../../api/property/property.api"

import { handleFileUpload } from "../../../api/global.api";
import { Loadersplash } from "../../../helpers/splash";
import { 
    PlusCircleOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    PlusOutlined,
    InboxOutlined
    } from '@ant-design/icons';


    import ReactPlayer from 'react-player/lazy'

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
    Tag,
    theme,
    Space
  } from "antd";

  import ImgCrop from 'antd-img-crop';
  
  const { Text,Paragraph } = Typography;

  const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const Available_Data = () => {
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
const [property_type_id, setTypeId] = useState('');
const [property_name, setName] = useState('');
const [property_description, setDescription] = useState('');
const [starting_at, setStartingAt] = useState(0);
const [status, setStatus] = useState('');
//------------------| For Searching |------------------
const [searchCatValue, setSearchCatValue] = useState("");


//----------------|forda upload Ddata|---------------------------
const [imageHandler, setImage] = useState('');
const [imggroup, setImgGroup] = useState([]);

const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);

// tags array 
const { token } = theme.useToken();
const [tags, setTags] = useState([]);
const [inputVisible, setInputVisible] = useState(false);
const [inputValue, setInputValue] = useState('');

const inputRef = useRef(null);

useEffect(() => {
  if (inputVisible) {
    inputRef.current?.focus();
  }
}, [inputVisible]);


const handleClose = (removedTag) => {
  const newTags = tags.filter((tag) => tag !== removedTag);
  console.log(newTags);
  setTags(newTags);
};
const showInput = () => {
  setInputVisible(true);
};
const handleInputChange = (e) => {
  setInputValue(e.target.value);

};

const handleInputConfirm = () => {
  if (inputValue && tags.indexOf(inputValue) === -1) {
    setTags([...tags, inputValue]);
  }
  setInputVisible(false);
  setInputValue('');
};

const forMap = (tag) => {
  const tagElem = (
    <Tag
      closable
      onClose={(e) => {
        e.preventDefault();
        handleClose(tag);
      }}
    >
      {tag}
    </Tag>
  );
  return (
    <span
      key={tag}
      style={{
        display: 'inline-block',
      }}
    >
      {tagElem}
    </span>
    
  );
};

const tagChild = tags.map(forMap);
  const tagPlusStyle = {
    background: token.colorBgContainer,
    borderStyle: 'dashed',
  };



  // const [imggroup, setImgGroup] = useState([]);
            const customFileUpload = async (info) => {
                if (info.file.status !== 'uploading') {
                console.log(info.file);
                }
                const file = info.file
                console.log(file);
                if (file) {
                    try {
                          const response = await handleFileUpload(file);
                          console.log(response)
                          const img = response.data[0]
                          const url = response.data[0].uri;
                         
                          setFileList((prevFileList) => [
                            ...prevFileList.filter((prevFile) => prevFile.status !== 'uploading' || prevFile.status !== 'uploading'),
                            {
                              uid: img._id,
                              name: file.filename,
                              status: 'done',
                              url: url,
                            },
                          ]);


                          console.log('Server response data: hehehehe --', fileList);
                        
                          //setImage(url);
                      
                          if (url && imggroup.indexOf(url) === -1) {
                            setImgGroup([...imggroup, url]);
                          
                          }

                          Swal.fire('Uploaded!', '', 'success')
                       
                    } catch (error) {
                      
                        console.log(`Upload Failed`);
                        Swal.fire({
                          icon: "error",
                          title: "Oops...",
                          text: `Upload Failed with an unknown error --- ${error}`,
                        });

                    }
            
                } else{
                    console.log(`${info.file.name} file upload failed with the Under this New Updated Code`);
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: `${info.file.name} file upload failed with the Under this New Updated Code`,
                    });
                }
            };

            const customFileUploadEdit = async (info) => {
              if (info.file.status !== 'uploading') {
              console.log(info.file);
              }
              const file = info.file
              
                  if (file) {
                  try {
                      const response = await handleFileUpload(file);
                      const url = response.data[0].uri;
                         
                      editChange(url, 'property_image')
                    
                      Swal.fire('Saved!', '', 'success')
                    
                  } catch (error) {
                    console.log(`${info.file.name} Error ${error}`);
                  }
              
                  } else{
                      console.log(`${info.file.name} file upload failed with the Under this New Updated Code`);
                      Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: `${info.file.name} file upload failed with the Under this New Updated Code`,
                      });
                  }
          };

          const customFileUploadVideo = async (info) => {
            if (info.file.status !== 'uploading') {
            console.log(info.file);
            }
            const file = info.file
            
                if (file) {
                try {


                      const loadingAlert = Swal.fire({
                        title: 'Uploading...',
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        onBeforeOpen: () => {
                          Swal.showLoading();
                      }
                    });
                    
                    //adding restriction for file too large
                    if (file.size > 100 * 1024 * 1024) { // 300 MB in bytes
                      loadingAlert.close();
                      Swal.fire({
                          icon: "error",
                          title: "File too large",
                          text: "Your file size is larger than 100 MB. Please choose a smaller file or You can compress your video here until it gets below 100mb",
                          footer: '<a href="https://www.freeconvert.com/video-compressor" target="_blank">Convert it Here for Free</a>'
                          
                        });
                      return false;
                  }

                    //const compressed_file = await utils.compressedFile(file)

           
                    const response = await handleFileUpload(file);
                    const url = response.data[0].uri;
                    loadingAlert.close();
                    Swal.fire('Uploaded!', '', 'success')

                    setImage(url);
               
                } catch (error) {
                  console.log(`${info.file.name} Error ${error}`);
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: `Error -- ${error}`,
                  });
                }
            
                } else{
                    console.log(`${info.file.name} file upload failed with the Under this New Updated Code`);
                    Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: `${info.file.name} file upload failed with the Under this New Updated Code`,
                    });
                }
        };


            const uploadProps = {
                name: 'vidupload',
                showUploadList: false,
                customRequest: customFileUploadVideo,
                };

              const uploadPropsEdit = {
                  name: 'imgupload',
                  showUploadList: false,
                  customRequest: customFileUploadEdit,
                  };

                  
                  const actionColumn = [
                    {
                      dataIndex: "property_type_id",
                      title: "Property Type",
                      key: "property_type_id",
                      render: (property_type_id) => {
                          const category = forDrop.find((cat) => cat._id === property_type_id);
                          const categoryName = category ? category.property_type_name : "";
                          return <span>{categoryName}</span>;
                        },
                    },

            {
                dataIndex: "property_name",
                title: "Property Name",
                key: "property_name",
            },

            {
            dataIndex: "property_image",
            title: "Property Image",
            key: "property_image",
            render: (_, params) => {
              const firstImageSrc = Array.isArray(params.property_image) && params.property_image.length > 0
              ? params.property_image[0]
              : "/logo.png";
                return (
                  <Image
                    src={firstImageSrc}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "/logo.png";
                    }}
                    alt="img"
                    style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: '10px' }}
                  />
                );
              },
          },

          {
            dataIndex: "starting_at",
            title: "Starting At",
            key: "starting_at",
            ellipsis: true,
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
        const response = await Available(value1,value2);
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
                property_type_id, 
                property_name, 
                property_description,
                starting_at,
              } = values;

              const arrayOfURIs = fileList.map(item => item.url);
              //const 

                  const response = await addData(
                    property_type_id, 
                    property_name, 
                    property_description,
                    tags,
                    arrayOfURIs,
                    imageHandler,
                    starting_at

                    );
            
                    if (response.status === 200) {
                  
                            setAddOpen(false);

                            Swal.fire('Saved!', '', 'success')

                            fetchData(1, currentPageSize);

                            formAdd.resetFields();
                            setTags([])
                            setFileList([])
                            setImage('')

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


            const tagslength = tags.length
              if(tagslength===0){
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Give atleast 1 Spec",
                  error,
                });

                  return false
              }

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


              //close modal
          const handleCancel = async() => {
       
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
                    text: "You want to Discard Changes?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Ok",
                    cancelButtonText: "Cancel",
                    reverseButtons: true,
                  });
              
                  if (result.isConfirmed) {
                  
                    setAddOpen(false);
                    setTags([])
                    setFileList([])
                    setImage('')
                    formAdd.resetFields();

                  } else if (result.dismiss === Swal.DismissReason.cancel) {
                    //swalWithBootstrapButtons.fire("Cancelled", "Done", "error");
                    return false
                  }
                } catch (error) {
                  console.error(error);
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
            setTypeId(viewdata1.data.property_type_id)
            setName(viewdata1.data.property_name)
            setDescription(viewdata1.data.property_description)
            setStartingAt(viewdata1.data.starting_at)
            setStatus(viewdata1.data.status)
            setImage(viewdata1.data.property_image)
        }
        } catch (error) {
        console.error("Error fetching user:", error);
        }
    };



    //-----------------------|Edit handling Techniques|-----------------------------
    const editChange = async (value, field) => {
        const id = editId;
        switch(field){
            case 'property_type_id': 
            setTypeId(value)
            break;

            case 'property_name': 
            setName(value)
            break;

            case 'property_description': 
            setDescription(value)
             break;

             case 'starting_at': 
             setStartingAt(value)
             break;

             case 'status': 
             setStatus(value)
             break;

             case 'property_image': 
              setImage(value)
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
      return category.property_type_name.toLowerCase().includes(searchValue.toLowerCase());
    });
  };
  
  const filteredItems = filterMenuItems(forDrop, searchCatValue);

const convertId = (id) =>{
        const category = forDrop.find((cat) => cat._id === id);
        const categoryName = category ? category.property_type_name : "";
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

const handleCancel_image = () => setPreviewOpen(false);

      const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
      };

  const handleChange_image = (
    { fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );


  // const handlcheck_arrays = ()=>  {
    
  //   console.log("This is Tags", tags)
  //   console.log("This is file list", fileList)
  //   console.log("this is the video", imageHandler)
  // }


    return(
       <>      
        <Divider orientation="right">
                  <Divider type="vertical" />
                  <Button type="primary" 
                  onClick={showModal}
                  >
                    <PlusCircleOutlined />    Add New Property
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
                                        placeholder="Select Type" 
                                        allowClear
                                        defaultValue={viewData?.inventory_category_id}
                                        onSearch={handleCatSearch}
                                        onChange={(value) => editChange(value, 'property_type_id')}
                                        optionFilterProp="children"
                                        filterOption={false}
                                        >
                                                {filteredItems.map(category => (
                                                  <Select.Option 
                                                  key={category._id}
                                                  value={category._id}
                                                  >
                                                    {category.property_type_name}
                                                  </Select.Option>
                                                ))} 
                                        </Select>
                    </Col>

                    <Col span={12}>
                            <b>Property Name:</b>   <br/>
                            <Paragraph
                            editable={{
                                onChange: (updatedValue) => editChange(updatedValue, 'property_name'),
                            }}
                            >
                            {property_name}
                        </Paragraph>
                    </Col>
              </Row> <br/>
              <Row gutter={16}>
                    <Col span={12}>
                    <b>Starting At:</b>   <br/>
                        <Paragraph
                            editable={{
                                onChange: (updatedValue) => editChange(updatedValue, 'starting_at'),
                            }}
                            >
                            {starting_at}
                        </Paragraph>
                    </Col>
                    <Col span={12}>
                    <b>Status:</b>   <br/>
                        <Select  defaultValue={viewData?.status}
                            onChange={(value) => editChange(value, 'status')}
                            style={{width:'100%'}}
                        >
                             <Select.Option value="available">Available</Select.Option>
                              <Select.Option value="pending">Pending</Select.Option>
                               <Select.Option value="sold">Sold</Select.Option>
                         </Select>
                    </Col>
                   
              </Row> <br/>
              <Row gutter={16}>
                    <Col span={24}>
                            <b>Description:</b>   <br/>
                            <Paragraph
                                editable={{
                                    onChange: (updatedValue) => editChange(updatedValue, 'property_description'),
                                }}
                                >
                                {property_description}
                        </Paragraph>
                    </Col>
              </Row>
              
              <Row gutter={16}>
              <Col span={12}>
                                
                                <ImgCrop
                                    modalTitle="Finalize Image Upload"
                                    rotationSlider
                                    aspectSlider
                                    showGrid
                                    showReset
                                    >
                                      <Upload.Dragger name="files" {...uploadPropsEdit}>
                                          <p className="ant-upload-drag-icon" >
                                            <InboxOutlined />
                                          </p>
                                          <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                        </Upload.Dragger>
                                    </ImgCrop>

                                    


                          </Col> 
                            <Col span={12} style={{ textAlign: 'center' }}>
                                  <Image 
                                    width={150}
                                    src={imageHandler}
                                    preview={false}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = "/logo.png";
                                    }}
                                    alt="img"
                                  />
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
                        <b> Property Type:</b>   <br/>
                     
                           {convertId(viewData?.property_type_id)}
                    </Col>
                    <Col span={12}>
                            <b>Property Name:</b>   <br/>
                            {viewData?.property_name}
                    </Col>
              </Row> <br/>

              <Row gutter={16}>
                    <Col span={24}>
                        <b>Property Specs</b>   <br/>
                        <Space size={[0, 'small']} wrap> 
                            {
                         
                            viewData?.property_specs?.map((tag, index) => (
                              <Tag key={index} bordered={false} closable={index >= 2}>
                                {tag}
                              </Tag>
                            ))}
                          </Space>
                           
                    </Col>
              </Row>
                <br/>

              <Row gutter={16}>
                    <Col span={12}>
                        <b>Starting At:</b>   <br/>
                            {viewData?.starting_at}
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
                            {viewData?.property_description}
                    </Col>  
                    <Col span={24}>
                    <b>Image:</b>   <br/>
                                    
                               <Image.PreviewGroup
                                  preview={{
                                    onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                                  }}
                                >
                                  {viewData?.property_image?.map((imageUrl, index) => (
                                    <Image
                                      key={index}
                                      width={100}
                                      style={{padding: '5px'}}
                                      src={imageUrl}
                                      preview={{
                                        mask: <EyeOutlined/>,
                                      }}
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "/logo.png";
                                      }}
                                    />
                                  ))}
                                </Image.PreviewGroup>
                    </Col>
                   
                    <Col span={24}>
                    <b>Video:</b>   <br/>
                                          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                  <ReactPlayer
                                                      url={viewData?.property_video?.startsWith('https://') ? viewData?.property_video : `https://${viewData?.property_video}`}
                                                      controls // Optional: Show video controls
                                                      width="100%" // Optional: Set video width
                                                      height="auto" // Optional: Set video height
                                                    />
                                          </div>
                    </Col>  
              </Row> 
              <br/>
            </Modal>


       {/* ----------------------------------------------| Modal for Adding new Datas |---------------------------------------------------  */}            
                <Modal
                   open={addopen}
                   onOk={handleOk} 
                   confirmLoading={confirmLoading}
                   onCancel={handleCancel}
                >

                    <Divider><h3 h3 style={{color: "purple"}}>Add New Item</h3></Divider>
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
                                  name="property_type_id"
                                  rules={[
                                    { required: true, message: "It's Required!" },
                                 ]}
                                  >
                                    <Select 
                                        showSearch
                                        placeholder="Select Type" 
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
                                                    {category.property_type_name}
                                                  </Select.Option>
                                                ))} 
                                        </Select>
                                       
                                    </Form.Item>
                                    
                                  <Form.Item
                                   label="Property Name"
                                   name="property_name"
                                   rules={[
                                      { required: true, message: "It's Required!" },
                                   ]}
                                  >
                                          <Input placeholder="Inventory Name" />
                                  </Form.Item>


                                  <Form.Item
                                   label="Description"
                                   name="property_description"
                                   rules={[
                                      { required: true, message: "It's Required!" },
                                   ]}
                                  >
                                     <Input.TextArea />
                                  </Form.Item>           
                               <p>Specs:</p>
                                      <div style={{ marginBottom: 16 }}>
                                      
                                          {tagChild}
                                       
                                      </div>
                                      {inputVisible ? (
                                     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Input
                                          ref={inputRef}
                                          type="text"
                                          size="small"
                                          style={{
                                            width: 200,
                                          }}
                                          value={inputValue}
                                          onChange={handleInputChange}
                                          onBlur={handleInputConfirm}
                                          onPressEnter={handleInputConfirm}
                                        />
                                      </div>
                                      ) : (
                                       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Tag onClick={showInput} style={tagPlusStyle}>
                                          <PlusOutlined /> Add Property Specs
                                        </Tag>
                                        </div>
                                      )}
                                
                                    <br/>
                                  <Form.Item
                                   label="Starts At"
                                   name="starting_at"
                                   rules={[
                                      { required: true, message: "It's Required!" },
                                   ]}
                                   
                                  >
                                          <InputNumber style={{width:"100%"}} placeholder="Input currency" defaultValue={0} step={0.01} />
                                  </Form.Item>
                                  <Divider> Images </Divider>  
                                  
                                  {/* <Button onClick={() => handlcheck_arrays()}>
                                                       check Arays
                                                      </Button> */}
                                  <Row>
                                          <Col span={24}>
                                                  <ImgCrop
                                                      modalTitle="Finalize Image Upload"
                                                      rotationSlider
                                                      aspectSlider
                                                      showGrid
                                                      showReset
                                                      >
                                                       <Upload
                                                          //action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                                          listType="picture-card"
                                                          fileList={fileList}
                                                          onPreview={handlePreview}
                                                          onChange={handleChange_image}
                                                          customRequest = {customFileUpload}
                                                          // {...uploadProps}
                                                        >
                                                          {fileList.length >= 8 ? null : uploadButton}
                                                        </Upload>
                                           </ImgCrop>

                                                   <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel_image}>
                                                          <img
                                                            alt="example"
                                                            style={{
                                                              width: '100%',
                                                            }}
                                                            src={previewImage}
                                                          />
                                                        </Modal>

                                          </Col>
                                </Row>

                                <Divider> Video <span>(Optional)</span></Divider>
                                  <Row>
                                    <Col span={24}>
                                
                                        
                                                <Upload.Dragger name="files" {...uploadProps}>
                                                    <p className="ant-upload-drag-icon" >
                                                      <InboxOutlined />
                                                    </p>
                                                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                                  </Upload.Dragger>
                                      
                                    </Col> 
                                    Preview:
                                          <Col span={24} style={{ textAlign: 'center' }}>
                                            {/* https://www.youtube.com/watch?v=aoGgsP4VrcM&list=RDaoGgsP4VrcM&start_radio=1&rv=j2k1Iqo5xw4 */}
                                            
                                             {/* <ReactPlayer url='https://www.youtube.com/watch?v=aoGgsP4VrcM&list=RDaoGgsP4VrcM&start_radio=1&rv=j2k1Iqo5xw4' /> */}
                                             <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                  <ReactPlayer
                                                      url={imageHandler.startsWith('https://') ? imageHandler : `https://${imageHandler}`}
                                                      controls // Optional: Show video controls
                                                      width="100%" // Optional: Set video width
                                                      height="auto" // Optional: Set video height
                                                    />
                                                    </div>

                                                    
                                          </Col>
                                  </Row>

                              

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

                        <Card.Grid style={{ width: '30%', textAlign: 'center', backgroundColor:"blue", borderRadius: "10px", margin:"10px"}} 
                                onClick={() => handleStatusChange("available")}><b>Available</b></Card.Grid>

                        <Card.Grid style={{ width: '30%', textAlign: 'center', backgroundColor:"yellow", borderRadius: "10px",margin:"10px"}} 
                                onClick={() => handleStatusChange("pending")}><b>Pending</b></Card.Grid>

                        <Card.Grid style={{ width: '30%', textAlign: 'center', backgroundColor:"green", borderRadius: "10px",margin:"10px"}} 
                                onClick={() => handleStatusChange("sold")}><b>Sold</b></Card.Grid>
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