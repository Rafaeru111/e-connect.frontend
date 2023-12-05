import { Layout } from "antd";
const { Footer } = Layout; 

import {
  CopyrightOutlined
} from "@ant-design/icons";

const Adminfooter = () => {
    return(
    
   
       <div
        style={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          textAlign: 'center',
          padding: 14,
          background: 'white',
          fontWeight: 'bold',
          
        }} ><CopyrightOutlined /> Developed By our Beloved group Software Developers @ 2023 </div> 

    );
} 

export default Adminfooter;