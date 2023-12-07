
import React from "react";
import { Tabs } from 'antd';

//status Tables

import { Pending_Data } from "./visit_status/pending.status";

const { TabPane } = Tabs;


export const Visitor_Data = () => {

    const paymentStatuses = [
        "Pending",
        "Verified",
        "Cancelled",
        "Visited",
    ];

    const [activeTab, setActiveTab] = React.useState("1");

    const getStatusContent = (status) => {
        switch (status) {
            case "Pending":
                return <Pending_Data key={activeTab} />;
            case "Verified":
                return <Pending_Data key={activeTab} />;
            case "Cancelled":
                return <Pending_Data key={activeTab} />;

            case "Visited":
                    return <Pending_Data key={activeTab} />;
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