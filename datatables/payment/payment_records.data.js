import React, {useState} from "react";
import { Tabs, Button, Space, Input } from 'antd';

import Swal from 'sweetalert2'

//status Tables
import { Pending_data } from "./payment_data/pending.data";
import { Processing_data } from "./payment_data/processing.data";
import { Partial_data } from "./payment_data/partial.data";
import { Complete_data } from "./payment_data/completed.data";
import { Failed_data } from "./payment_data/failed.data";
import { Refunded_data } from "./payment_data/refunded.data";
import { Cancel_data } from "./payment_data/cancelled.data";
import { Expired_data } from "./payment_data/expired.data";

const { TabPane } = Tabs;
import { 
    Verify,
        } from "../../api/payment/payment_manangement.api"

export const Payment_Managements = () => {
    const [getCode1, setCode1] = useState('');
    const [getCode2, setCode2] = useState('');

    const paymentStatuses = [
        "Pending",
        "Processing",
        "Completed",
        "Failed",
        "Refunded",
        "Partially Paid",
        "Cancelled",
        "Expired",
    ];

    const [activeTab, setActiveTab] = React.useState("1");
    const [refreshKey, setRefreshKey] = useState(Date.now());
    const getStatusContent = (status) => {
        switch (status) {
            case "Pending":
                return <Pending_data key={activeTab} />;
            case "Processing":
                return <Processing_data key={activeTab} />;
            case "Completed":
                return <Complete_data key={activeTab} />;
            case "Failed":
                return <Failed_data key={activeTab} />;
            case "Refunded":
                return <Refunded_data key={activeTab} />;
            case "Partially Paid":
                return <Partial_data key={activeTab} />;
            case "Cancelled":
                return <Cancel_data key={activeTab} />;
            case "Expired":
                return <Expired_data key={activeTab} />;
            default:
                return null;
        }
    };

    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    const handleVerify = async () => {
        const code = `MJC-${getCode1}-${getCode2}`


            if(!getCode1 || !getCode2){
                Swal.fire('Failed', 'Verifying Failed! There are blank Data', 'error')
                return false
            }else{
                    try{
                        const viewdata1 = await Verify(code);
                           if (viewdata1.status === 200) {
                                setCode1('')
                                setCode2('')      
                                Swal.fire('Payment Verified!', '', 'success')    
                                setRefreshKey(Date.now());
                           }else{
                                Swal.fire('Verifying Failed!', 'Not Code Existing', 'error')
                                return false
                           }

                    }catch(e){
                        Swal.fire('Verifying Failed!', '', 'error')
                    }
            }
           
       
    } 
   

    return (
        <>
        <Space direction="horizontal">
           <b>Reference Code =  MJC-</b>
        <Input
          value={getCode1}
          onChange={(e) => setCode1(e.target.value)}
          allowClear
        />
            <b>-</b>
          <Input
          value={getCode2}
          onChange={(e) => setCode2(e.target.value)}
          allowClear
        />
        <Button
          style={{
            width: 150,
          }}
          onClick={handleVerify}
        >
         Verify
        </Button>
      </Space>

            <Tabs
                tabBarGutter={50}
                defaultActiveKey={activeTab}
                centered
                onChange={handleTabChange}
            >
                {paymentStatuses.map((status, index) => (
                    <TabPane
                        tab={status}
                        key={`${String(index + 1)}-${refreshKey}`}
                        style={{ padding: "15px" }}
                    >
                        {getStatusContent(status)}
                    </TabPane>
                ))}
            </Tabs>
        </>
    );
};