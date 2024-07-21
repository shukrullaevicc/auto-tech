import { Button, Layout, Input, Avatar } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined  } from "@ant-design/icons";

const { Header } = Layout;
const { Search } = Input;

const HeaderComponent = (collapsed, setCollapsed) => {
  const handleSearch = (value) => {
    console.log("Search:", value);
  };

  return (
    <Header style={{ padding: 0, display: "flex", alignItems: "center", gap: "20px" }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
          color: "#fff",
        }}
      />

      <div style={{ flex: 1, display: "flex", alignItems: "center", }}>
        <Search
          placeholder="Search..."
          onSearch={handleSearch}
          style={{ maxWidth: "400px", width: "100%", marginRight: "20px" }}
        />
      </div>

      <Avatar size="large" style={{ cursor: "pointer", color: "#f56a00", backgroundColor: "#fde3cf", marginRight: "20px" }} icon={<UserOutlined />} />
    </Header>
  )
}

export default HeaderComponent