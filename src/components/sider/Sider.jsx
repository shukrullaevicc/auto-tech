import "./Sider.css"

import { Layout, Menu, Typography } from "antd"

import { NavLink } from "react-router-dom"
import { DropboxOutlined, UserOutlined } from "@ant-design/icons"

const { Sider } = Layout;
const { Title } = Typography

const SiderComponent = (collapsed) => {
  return (
   <Sider trigger={null} collapsible collapsed={collapsed}>
      <Title level={3} className="text-center pt-3"><span className="text-white">LOGO</span></Title>
      <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={["1"]}
      items={[
         {
            key: "1",
            icon: <DropboxOutlined />,
            label: <NavLink to="">Products</NavLink>
         },
         {
            key: "2",
            icon: <UserOutlined />,
            label: <NavLink to="/dashboard/users">Users</NavLink>
         }
      ]}
      />
   </Sider>
  )
}

export default SiderComponent