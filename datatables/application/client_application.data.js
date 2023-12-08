
import React from "react";
import { Tabs } from 'antd';

//status Tables


import { Pending_Application } from './application_status/pending.status' 
import { Denied_Application } from "./application_status/denied.status";
import { Accepted_Application } from "./application_status/accepted.status";



const { TabPane } = Tabs;


export const Client_Application = () => {

        const paymentStatuses = [
            "Pending",
            "Accepted",
            "Denied",
        ];

    const [activeTab, setActiveTab] = React.useState("1");

    const getStatusContent = (status) => {
        switch (status) {
            case "Pending":
                return <Pending_Application key={activeTab} />;
            case "Accepted":
                return <Accepted_Application key={activeTab} />;
            case "Denied":
                return <Denied_Application key={activeTab} />;
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