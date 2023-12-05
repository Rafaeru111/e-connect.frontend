import React, { useState } from "react";
import useAuthStore from "../../store/auth.store";
import Swal from "sweetalert2";
import {
  DashboardOutlined,
  DollarCircleOutlined,
  UserOutlined,
  SettingOutlined,
  FileSearchOutlined,
  UsergroupAddOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  LogoutOutlined,
  EditOutlined,
  CalendarOutlined,
  HistoryOutlined,
  DeleteOutlined,
  AuditOutlined
} from "@ant-design/icons";
import { 
  Layout, 
  Menu, 
  Input, 
  Tooltip,
  Divider } from "antd";
import { useRouter } from 'next/router';

const { Sider } = Layout;

function getItem(label, key, icon = null, children = null) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Dashboard", "/pagers/dashboard.page", <DashboardOutlined />),

  getItem("Users Management", "3", <UserOutlined />, [
    getItem("All Users", "/pagers/users/all_users.page", <UsergroupAddOutlined />),
    getItem("Client Users", "/pagers/users/client_user.page", <UsergroupAddOutlined />),
    getItem("Employee Users", "/pagers/users/employee_users.page", <UsergroupAddOutlined />),
  ]),

  // getItem("Tables, Products, Categories", "3", <ShoppingCartOutlined />, [
  // getItem("Table Management", "/pagers/tcp/tables.page"),
  // getItem("Category Management", "/pagers/tcp/category.page"),
  // getItem("Product Management", "/pagers/tcp/product.page"),

  // //getItem("Reservation Tables", "/pagers/tables.page"),
  // ]),
  // getItem("Reservation Calendar", "/pagers/calendar.page",  <CalendarOutlined />),


  getItem("Inventory Management", "4", <FileSearchOutlined />, [
    getItem("Inventory Category Management", "/pagers/inventory/inventory_category.page",<FileSearchOutlined />),
    getItem("Inventory Items Management", "/pagers/inventory/inventory_item.page",<FileSearchOutlined />),
    getItem("Inventory Transaction Management", "/pagers/inventory/inventory_transaction.page",<AuditOutlined />),
    getItem("Sales Report", "/pagers/inventory/inventory_sales_report.page",<DollarCircleOutlined />),,
  ]),


  // getItem("Miscellaneous", "5", <CopyOutlined />, [
  //   getItem("Discount Management", "/pagers/computation/discount.page"),
  //   //getItem("Tax Management", "/pagers/computation/tax.page"),
  //   getItem("Package List", "/pagers/computation/package.page"),
  //   getItem("QR-Link ", "/pagers/computation/qr.page"),
  // ] ),
  getItem("Payment Record", "5", <DollarCircleOutlined />, [
    getItem("Payment Management", "/pagers/payment/payment.page"),
   // getItem("Sales Per Month", "/pagers/reports/monthly-sales.page"),
  ]),

  // {
  //   label: "CMS (For Update)",
  //   key: "7",
  //   icon:<EditOutlined />,
  //   disabled: true, // Add the "disabled" property
  //   tooltip: "Under Development",
  // },

  // {
  //   label: "Settings (For Update)",
  //   key: "8",
  //   icon: <SettingOutlined />,
  //   disabled: true, // Add the "disabled" property
  //   tooltip: "Under Development",
  // },

  // {
  //   label: "Trash (For Update)",
  //   key: "10",
  //   icon: <DeleteOutlined />,
  //   disabled: true, // Add the "disabled" property
  //   tooltip: "Under Development",
  // },

  //getItem("Trash", "/pagers/history/recentdeleted.page",<DeleteOutlined />),
  

  // {
  //   label: "Activity History (For Update)",
  //   key: "11",
  //   icon: <HistoryOutlined />,
  //   disabled: true, // Add the "disabled" property
  //   tooltip: "Under Development",
  // },

  // getItem("Activity History", "9", <HistoryOutlined />, [
  //   getItem("Dashboard", "/pagers/history/dashboard.page"),
  //   getItem("Activity Log", "/pagers/history/myactivity.page"),
  // ]),

  getItem("Settings", "12", <SettingOutlined />, [
    getItem("Profile", "/pagers/users/profile.page"),
    getItem("Password", "/password"),
  ]),

  

  getItem("Logout", "/logout", <LogoutOutlined />),
];

export const Sidebar = ({ onSelect, selectedKey }) => {
  const [activeKey, setActiveKey] = useState([""]);
  const setLoggedOut = useAuthStore((state) => state.setLoggedOut);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const router = useRouter();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Your session will be closed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("comp");
        setLoggedOut();
        router.push('/login/login')
      }
    });
  };

  const menuChanged = (value) => {
    if (value.key === "/logout") {
      handleLogout();
    } else {
      onSelect(value.key); // Call the onSelect function with the selected key
      setActiveKey([value.key]);
    }
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const filterMenuItems = (menuItems, searchValue) => {
    return menuItems.filter((item) => {
      const filteredItem = {
        //gett also the childs
        ...item,
        children: item.children
          ? filterMenuItems(item.children, searchValue)
          : null,
      };
      return (
        filteredItem.label.toLowerCase().includes(searchValue.toLowerCase()) ||
        (filteredItem.children && filteredItem.children.length > 0)
      );
    });
  };

  const filteredItems = filterMenuItems(items, searchValue);


  return (
    <Sider

      width={300}
      theme="light"
      collapsible
      onCollapse={(cola) => {
        setIsCollapsed(cola);
      }}
    >
      
      <img
        src="/logo.png"
        width={isCollapsed ? 70 : 150}
        alt=""
        style={isCollapsed ? {
          marginLeft: 0
          }
          :{
            marginLeft: 60
          }
    }
      />

<Divider />
      
      <Input
        placeholder="Search Menu"
        allowClear
        onChange={(e) => handleSearch(e.target.value)}
        style={isCollapsed ? {
          marginBottom: 10,
             padding: 10,
             width: 70
          }
          :{
            marginBottom: 10,
            padding: 10,
            width: 290
          }
        }
      />

      
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%"}}
        selectedKeys={activeKey}
        items={filteredItems}
        onClick={menuChanged}
      />
    </Sider>
  );
};
