import { Button, Layout, Input, Avatar } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

import useFetch from "../../hooks/useFetch";

import { NavLink } from "react-router-dom";

const { Header } = Layout;
const { Search } = Input;

const HeaderComponent = ({ collapsed, handleToggleCollapsed }) => {
  const [data] = useFetch("/auth/profile"); // fetch user data from backend using useFetch hook and store it in data variable

  const handleSearch = (value) => {
    console.log("Search:", value);
  };

  return (
    <Header style={{ padding: 0, display: "flex", alignItems: "center", gap: "20px" }}>

      <Button
        type="text"
        onClick={handleToggleCollapsed}
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        style={{ fontSize: "16px", width: 64, height: 64, color: "#fff" }}/>

      <div style={{ flex: 1, display: "flex", alignItems: "center", }}></div>

      <NavLink to="/dashboard/profile">
        <div className="bg-[#ff5722] ">
          <div className="flex items-center text-white gap-[15px] ml-[20px] mr-[20px]">
            <Avatar size="large" style={{ cursor: "pointer", color: "#f56a00", backgroundColor: "#fde3cf" }}>{data?.first_name.at(0)}</Avatar>
            <span>{data?.first_name}</span>
          </div>
        </div>
      </NavLink>
      
    </Header>
  )
}

export default HeaderComponent