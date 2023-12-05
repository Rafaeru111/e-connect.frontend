import React from "react";
import { Tabs } from 'antd';
import { Pending_data } from "./payment_data/pending.data";
const { TabPane } = Tabs;


export const Payment_Managements = () => {
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

    // Dummy content for each status
    const getStatusContent = (status) => {
        switch (status) {
            case "Pending":
                return <Pending_data />;
           
            default:
                return null;
        }
    };

    return (
        <>
            <Tabs tabBarGutter={50}  defaultActiveKey="1" centered>
                {paymentStatuses.map((status, index) => (
                    <TabPane tab={status} key={String(index + 1)} style={{padding:"15px"}}>
                        {getStatusContent(status)}
                    </TabPane>
                ))}
            </Tabs>
        </>
    );
};
