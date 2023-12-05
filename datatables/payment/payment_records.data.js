import React from "react";
import { Tabs } from 'antd';

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

    const [activeTab, setActiveTab] = React.useState("1");

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

    return (
        <>
            <Tabs
                tabBarGutter={50}
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