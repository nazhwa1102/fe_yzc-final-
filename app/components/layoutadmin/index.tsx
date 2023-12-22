"use client";
import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme, Card, Col, Row } from "antd";
import Logo from "#/app/components/images/logo";
import { Icon } from "@iconify/react";
import { parseJwt } from "#/utils/convert";
import { useRouter } from "next/navigation";

const { Header, Sider, Content } = Layout;
const LayoutAdmin = ({children,menu}: any) => {
  const [collapsed, setCollapsed] = useState(false);
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();
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
    <Layout style={{ height: "fit" }}>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{height: '1010px'}} theme="light">
        <div className="dashboard admin"/>
        <div className="flex justify-center w-[100%]">
          <Logo />
        </div>
        <Menu
          theme="light"
          mode="inline"
          className="font-semibold"
          defaultSelectedKeys={[menu]}
          items={[
            {
              key: "dashboard",
              icon: <Icon icon="carbon:dashboard" />,
              label: "Dashboard",
            },
            {
              key: "seminar",
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
          onClick={({key}) => {
            router.push(key);
            // console.log(`key ${key} route not found`);
          }}
        />
      </Sider>
      <Layout style={{ height: "full" }}>
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
            height: " ",
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