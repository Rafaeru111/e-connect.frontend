import { useEffect, useState } from 'react';
import { withAuth } from '../helpers/withAuth';
import useAuthStore from "../store/auth.store";
import {checkToken} from '../api/global.api'
// import { Usertable } from './datatables/usertable';
import { Loadersplash } from "../helpers/splash";
// import { Navbar } from "./components/navbar/navbar";
import { useRouter } from 'next/router';
import { Layout, FloatButton  } from "antd";
import { getOneUser } from "../api/user.api"

import Swal from 'sweetalert2'
const { Header, Content, Footer } = Layout; 

//--------------------------------------------------------| COMPONENTS |--------------------------------------------------------------------------------
import { Sidebar } from "../components/sidebar/sidebar";
import HeaderNav from "../components/header/header";

//--------------------------------------------------------| PAGES |--------------------------------------------------------------------------------
import Dashboard from './pagers/dashboard.page'

//-------------------|User Managements|---------------------------

import All_Users from './pagers/users/all_users.page'
import All_Client from './pagers/users/client_user.page'
import All_Employee from './pagers/users/employee_users.page'


//------------------------------| Inventory Managements|---------------------------

import Inventory_Category from './pagers/inventory/inventory_category.page'
import Inventory_Item from './pagers/inventory/inventory_item.page'
import Inventory_Transaction from './pagers/inventory/inventory_transaction.page'
import Inventory_Transaction_Item from './pagers/inventory/inventory_transaction_item.page'
import Inventory_Sales_Report from './pagers/inventory/inventory_sales_report.page'

//------------------------| Payment Management |----------------------------------------
import Payment_Page from "./pagers/payment/payment.page"
import Billing_Page from './pagers/payment/billing.page'
//-----------------------------|Visitor Managements|---------------------------------
import Visitor_Page from './pagers/visitor/visitor.page'


//-------------------|Property Managements|----------------------------------
import Property_Page from './pagers/property/property.page';
import Property_Type from './pagers/property/property_type.page'

//-----------------| Client's Application |-----------------------------------
import Application_Page from './pagers/appointment/application.page'

import ChatUiPage from './pagers/chat.ui.page';

const Home = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [selectedKey, setSelectedKey] = useState("");
  //Loaders
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 800);

    
    // Retrieve the selectedKey from localStorage
    const storedKey = localStorage.getItem("selectedKey");
    if (storedKey) {
      setSelectedKey(storedKey);
    }

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    // Store the selectedKey in localStorage
    localStorage.setItem("selectedKey", selectedKey);
  }, [selectedKey]);





  const setLoggedOut = useAuthStore((state) => state.setLoggedOut);
  //useEffect for checking the token
  useEffect(() => {

    const token = localStorage.getItem('token');

  if (token) {

    checkToken(token)
      .then((checkTokenResponse) => {
        console.log(checkTokenResponse.data);
        const status = checkTokenResponse.data.status
        console.log(status);
        
        if(!status){
            Swal.fire({
              title: 'Session Expired!',
              text: 'Please Login Again',
              imageUrl: 'https://media.giphy.com/media/cNNsPXZAQtc9fmQvxA/giphy.gif',
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: 'Custom image',

              //action after clicking OK
            }).then((result) => {
              if (result.isConfirmed) {
                //remove the datas
                localStorage.removeItem('token');
                localStorage.removeItem('user-storage');
                setLoggedOut();
                router.push('/login/login')
              }
            })
        }

      })
      .catch((error) => {
        console.error('Error checking token:', error);
      });
  } else {
    console.log('Token not found in localStorage');
  }
}, []);

    
if (loading) {
  return <Loadersplash/>;
}

const handleMenuSelect = (key) => {
  setSelectedKey(key);
};

  return (
   <Layout
   style={{
    // minHeight: '100vh',
     width: "100%",
   }}
 >
  {/* getting the routed Selection */}
  <Sidebar onSelect={handleMenuSelect} selectedKey={selectedKey} />

   <Layout>
    <HeaderNav />
     <Content
       style={{
         margin: '0 16px',
       }}
     >
       <div
         style={{
           padding: 15,
           //marginTop:5,
           //minHeight: 360,
           width: '100%',
           background: "#f5f5f5",
         }}
       >
            {selectedKey === '/pagers/dashboard.page' && <Dashboard />}
            {/* {selectedKey === '/pagers/inventory/items.inventory.page' && <Inventory_Items />}*/}

            {/* users */}
            {selectedKey === '/pagers/users/all_users.page' && <All_Users />}
            {selectedKey === '/pagers/users/client_user.page' && <All_Client />}
            {selectedKey === '/pagers/users/employee_users.page' && <All_Employee />}

            {/* inventory */}
            {selectedKey === '/pagers/inventory/inventory_category.page' && <Inventory_Category />}
            {selectedKey === '/pagers/inventory/inventory_item.page' && <Inventory_Item />}
            {selectedKey === '/pagers/inventory/inventory_transaction.page' && <Inventory_Transaction />}
            {selectedKey === '/pagers/inventory/inventory_transaction_item.page' && <Inventory_Transaction_Item />}
            {selectedKey === '/pagers/inventory/inventory_sales_report.page' && <Inventory_Sales_Report />}
    
              {/* payment */}
              {selectedKey === '/pagers/payment/payment.page' && <Payment_Page />}
              {selectedKey === '/pagers/payment/billing.page' && <Billing_Page/>}


              {/* Visitor */}
              {selectedKey === '/pagers/visitor/visitor.page' && <Visitor_Page />}

              {/* Property */}
              {selectedKey === '/pagers/property/property.page' && <Property_Page />}
              {selectedKey === '/pagers/property/property_type.page' && <Property_Type />}

              {/* Client Application */}
              {selectedKey === '/pagers/appointment/application.page' && <Application_Page />}

              {selectedKey === '/pagers/chat.ui.page' && <ChatUiPage />}
              
            <FloatButton.BackTop  style={{color:"black", border:"solid black 1px"}}/>
          </div>
     </Content>
     {/* <Adminfooter /> */}
   </Layout>

 </Layout>
  );
}

export default withAuth(Home);