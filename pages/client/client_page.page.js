import { useState, useEffect } from 'react';
import { withAuth } from '../../helpers/withAuth';
import { 
    Card, 
    Modal, 
    Divider,
    Form,
DatePicker } from 'antd';
import { dropProperty } from '../../api/client_application.api';
import {addDataAsClient} from '../../api/visit.api'

import Swal from 'sweetalert2'

const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

const Client_Page = () => {
  // State to store the property data
  const [propertyData, setPropertyData] = useState([]);
  const [visitId, setVisitId] = useState('');

    //--------------| Add states |-------------------- 
    const [addopen, setAddOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [formAdd] = Form.useForm(); 


  const fetchData = async () => {
    try {
      const response = await dropProperty();

      if(response.status === 200){
        setPropertyData(response.data);
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  useEffect(() => {
  
    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // The empty dependency array ensures this effect runs only once, similar to componentDidMount

//-----------------------------------------------------| HANDLE for Add MODALS |----------------------------------------------------------------
const showModal = (id) => {
    setVisitId(id)
    setAddOpen(true);
   
}; //For showing the Modal upon clicking the data
                            //-------------------------| HANDLE for MODALS Submit |----------------------------- 
     const handleSubmit = async (values) => {
             try {
              const { 
                visit_date, 
              } = values;

                  const response = await addDataAsClient(
                    visit_date, 
                    visitId
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
  
  return (
    <div style={{ background: 'white', padding: 20, borderRadius: 20 }}>
      <h1>Welcome to Client's Page</h1>
      <Divider orientation="left">   <h2>Property List</h2></Divider>
   
      <Card>
        {propertyData.map((property) => (
          <Card.Grid key={property._id} style={gridStyle} onClick={()=> showModal(property._id)}>
            {property.propertyName}
          </Card.Grid>
        ))}
      </Card>

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
                                   label="Visit Date"
                                   name="visit_date"
                                   rules={[
                                      { required: true, message: "It's Required!" },
                                   ]}
                                  >
                                          <DatePicker />
                                  </Form.Item>

                            </Form>

                </Modal>

    </div>
  );
};

export default withAuth(Client_Page);
