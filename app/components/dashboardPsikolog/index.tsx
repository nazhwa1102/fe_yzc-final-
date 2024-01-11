"use client";
import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme, Card, Col, Row } from "antd";
import { Icon } from "@iconify/react";
import { parseJwt } from "#/utils/convert";
import { useRouter } from "next/navigation";
import Logo from "#/app/components/gambar/logo";
import { keys } from "mobx";





const { Header, Sider, Content } = Layout;
const LayoutPsikolog = ({ children ,menu}: any) => {
  const [collapsed, setCollapsed] = useState(false);
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

  const token = localStorage.getItem("access_token");
  console.log(token, "yuk bisa");
  let role: string = "";
  let email: string = "";
  let fullNamePsi: string = "";
  let idPsi: string = ""
  
  if (token) {
    role = parseJwt(token).role;
    email = parseJwt(token).email;
    fullNamePsi = parseJwt(token).fullNamePsi;
    idPsi = parseJwt(token).idPsi
    console.log(role, "role cocok");
    console.log(fullNamePsi, "nama");
    console.log(idPsi, 'id');
  }
  const router = useRouter()
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  const handleLogout = () => {
    localStorage.removeItem('access_token');
    router.push('/');
  };

  return (
    <Layout style={{ height: "fit" }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div className="dashboard admin" />
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
              onClick: (() => {router.push('/psikolog/dashboard')})
            },
            {
              key: "seminar",
              icon: <Icon icon="octicon:people-24" />,
              label: "Seminar",
              onClick: (() => {router.push('/psikolog/seminar')})
            },
            {
              key: "3",
              icon: <Icon icon="pepicons-print:people" />,
              label: "Private Konseling",
              onClick: (() => {router.push('/psikolog/private-konselling')})
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
              onClick: (() => {router.push('/psikolog/pembayaran')})
            },
            {
              key: "10",
              icon: <Icon icon="solar:logout-broken" />,
              label: "Logout",
              onClick: handleLogout
            },
          ]}
        />
      </Sider>
      <Layout style={{ height: "100%" }}>
        <Header
          style={{
            padding: 0,
            background: "#016255",
            justifyContent: 'space-between'
          }}
        >
          <div className="flex justify-between items-center">
            <div>
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
            </div>
            <div className="pr-5 font-bold text-[22px] text-white items-center">
           Halo!, {fullNamePsi}
            </div>
          </div>
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
export default LayoutPsikolog;