
import React from "react";
import { Tabs } from 'antd';

//status Tables
// import { Pending_data } from "./payment_data/pending.data";
// import { Processing_data } from "./payment_data/processing.data";
// import { Partial_data } from "./payment_data/partial.data";
// import { Complete_data } from "./payment_data/completed.data";
// import { Failed_data } from "./payment_data/failed.data";
// import { Refunded_data } from "./payment_data/refunded.data";
// import { Cancel_data } from "./payment_data/cancelled.data";
// import { Expired_data } from "./payment_data/expired.data";

import {Available_Data} from './property_status.data.js/available.data'
import { Pending_Data } from "./property_status.data.js/pending.data";
import { Sold_Data } from "./property_status.data.js/sold.data";

const { TabPane } = Tabs;


export const Property_Data = () => {

    const paymentStatuses = [
        "Available",
        "Pending",
        "Sold",
    ];

    const [activeTab, setActiveTab] = React.useState("1");

    const getStatusContent = (status) => {
        switch (status) {
            case "Available":
                return <Available_Data key={activeTab} />;
            case "Pending":
                return <Pending_Data key={activeTab} />;
            case "Sold":
                return <Sold_Data key={activeTab} />;
            default:
                return null;
        }
    };

    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    return (
        <>
            <Tabs
                tabBarGutter={150}
                defaultActiveKey={activeTab}
                centered
                onChange={handleTabChange}
            >
                {paymentStatuses.map((status, index) => (
                    <TabPane
                        tab={status}
                        key={String(index + 1)}
                        style={{ padding: "15px" }}
                    >
                        {getStatusContent(status)}
                    </TabPane>
                ))}
            </Tabs>
        </>
    );
};