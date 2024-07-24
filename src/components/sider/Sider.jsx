import "./Sider.css";

import { Layout, Menu, Typography, Button, Modal } from "antd";
import { DropboxOutlined, UserOutlined, SettingOutlined, LoginOutlined } from "@ant-design/icons";

import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { SIGN_OUT } from "../../redux/actions/action-types";

const { Sider } = Layout;
const { Title } = Typography;

const SiderComponent = ({ collapsed }) => {
   const dispatch = useDispatch(); // allows functional components to dispatch actions to the Redux store
   const [isModalVisible, setIsModalVisible] = useState(false);

   const showModal = () => {
      setIsModalVisible(true);
   };

   const handleOk = () => {
      dispatch({ type: SIGN_OUT });
      setIsModalVisible(false);
   };

   const handleCancel = () => {
      setIsModalVisible(false);
   };

   return (
      <Sider trigger={null} collapsed={collapsed} className="sider">

         <Title level={3} className="text-center pt-3"><span className="text-white">LOGO</span></Title>

         <Menu
         theme="dark"
         mode="inline"
         defaultSelectedKeys={["1"]}
         items={[
            {
               key: "1",
               icon: <DropboxOutlined />,
               label: <NavLink to="">Products</NavLink>,
            },
            {
               key: "2",
               icon: <UserOutlined />,
               label: <NavLink to="/dashboard/users">Users</NavLink>,
            },
            {
               key: "3",
               icon: <SettingOutlined />,
               label: <NavLink to="/dashboard/settings">Settings</NavLink>,
            },
         ]}
         />

         <div className="text-center p-3 flex-1 flex items-end">
            <Button onClick={showModal} className="w-full" danger type="primary">
               <LoginOutlined />{!collapsed && "Sign Out"}
            </Button>
         </div>
         
         <Modal
            title="Confirm Sign Out"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
            maskClosable={false}
         >
         <p>Do you want to exit the platform?</p>
         </Modal>
      </Sider>
   );
};

export default SiderComponent;