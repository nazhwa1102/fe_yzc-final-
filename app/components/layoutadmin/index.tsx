"use client";
import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme, Card, Col, Row } from "antd";
import Logo from "../images/logo";
import { Icon } from "@iconify/react";
import { parseJwt } from "#/utils/convert";
import { useRouter } from "next/navigation";

const { Header, Sider, Content } = Layout;
const LayoutAdmin = ({ children, menu } : any) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter()

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const token = localStorage.getItem("acces_token");
  console.log(token, "yuk bisa");
  let role: string = "kosong";
  console.log(token, "ini tokennya");
  if (token) {
    role = parseJwt(token).role;
    console.log(role, "role cocok");
  }

  return (
    <Layout className="slider" style={{ height: "fit" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="dashboard admin" />
        <div className="flex justify-center w-[100%]">
          <Logo />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          className="font-semibold"
          defaultSelectedKeys={[menu]}
          items={[
            {
              key: "/admin/dashboard",
              icon: <Icon icon="carbon:dashboard" />,
              label: "Dashboard",
            },
            {
              key: "/admin/seminar",
              icon: <Icon icon="octicon:people-24" />,
              label: "Seminar",
            },
            {
              key: "/admin/psikolog",
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
              key: "pembayaran",
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
          onClick={({key}) => {
            router.push(key);
            // console.log(`key ${key} route not found`);
          }}
        />
      </Sider>
      <Layout style={{ height: "100%" }}>
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
            minHeight: "850px",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutAdmin;