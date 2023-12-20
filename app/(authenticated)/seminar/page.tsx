"use client";
import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Card, Col, Row } from "antd";
import { Icon } from "@iconify/react";
import Logo from "#/app/components/gambar/logo";


interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}
const { Header, Sider, Content } = Layout;
const App :React.FC<AuthenticatedLayoutProps> = ({
  children,
}) => { 
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
 
  return (
    <Layout style={{ height: "100%" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="dashboard admin" />
        <div className="flex justify-center w-[100%] font-bold">
          <Logo />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <Icon icon="carbon:dashboard" />,
              label: "Dashboard",
            },
            {
              key: "2",
              icon: <Icon icon="octicon:people-24" />,
              label: "Seminar",
            },
            {
              key: "3",
              icon: <Icon icon="pepicons-print:people" />,
              label: "Psikolog",
            },
            {
              key: "4",
              icon: <Icon icon="grommet-icons:article" />,
              label: "Artikel",
            },
            {
              key: "5",
              icon: <Icon icon="fluent:chat-12-regular" />,
              label: "Obroloan",
            },
            {
              key: "6",
              icon: <Icon icon="mdi:bell-ring-outline" />,
              label: "Notifikasi",
            },
            {
              key: "7",
              icon: <Icon icon="material-symbols:payments-outline-sharp" />,
              label: "Pembayaran",
            },
            {
              key: "8",
              icon: <Icon icon="bi:clock" />,
              label: "Riwayat Transaksi",
            },
            {
              key: "9",
              icon: <Icon icon="fluent-mdl2:people-add" />,
              label: "Pengguna",
            },
            {
              key: "10",
              icon: <Icon icon="solar:logout-broken" />,
              label: "Logout",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: "#016255",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
              backgroundColor: "#016255",
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            height: "100%",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >

        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
