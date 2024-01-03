"use client";
import React, { useState } from "react";
import { BellOutlined, DownOutlined, HistoryOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MessageOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme, Card, Col, Row } from "antd";
import Logo from "../images/logo";
import { Icon } from "@iconify/react";
import { parseJwt } from "#/utils/convert";
import { useRouter } from "next/navigation";
import { MenuProps } from "antd";
import { Avatar, Dropdown, Space } from "antd/lib";

const { Header, Sider, Content } = Layout;
const LayoutCustomer = ({ children, menu }: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const token = localStorage.getItem('access_token');
  console.log(token, "yuk bisa");
  let role: string = '';
  let email: string = '';
  let fullNameCus: string = ''

  if (token) {
    role = parseJwt(token).role;
    email = parseJwt(token).email;
    fullNameCus = parseJwt(token).fullNameCus
    console.log(role, "role cocok");
    console.log(fullNameCus, 'nama');
    
  }


  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    router.push('/');
  };

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a rel="" href="">
          Profile Saya
        </a>
      ),
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: (
        <a rel="noopener noreferrer" href="">
          Notifikasi
        </a>
      ),
      icon: <BellOutlined />,
    },
    {
      key: "3",
      label: (
        <a rel="noopener noreferrer" href="">
          Obrolan
        </a>
      ),
      icon: <MessageOutlined />,
    },
    {
      key: "4",
      label: (
        <a rel="noopener noreferrer" href="/riwayat_transaksi">
          Riwayat Transaksi
        </a>
      ),
      icon: <HistoryOutlined />,
    },
    {
      key: "5",
      label: (<a rel="noopener noreferrer" onClick={handleLogout}>LogOut</a>),
      danger: true,
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Layout style={{ height: "fit" }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div className="dashboard admin" />
        <div className="flex justify-center w-[100%]">
          <a onClick={() => router.push('/home')}>
          <Logo />
          </a>
        </div>
        <Menu
          theme="light"
          mode="inline"
          className="font-semibold"
          defaultSelectedKeys={[menu]}
          items={[
            {
              key: "/profil",
              icon: <Icon icon="carbon:dashboard" />,
              label: "Profil",
            },
            {
              key: "/notifikasi",
              icon: <Icon icon="mdi:bell-ring-outline" />,
              label: "Notifikasi",
            },
            {
              key: "/obrolan",
              icon: <Icon icon="fluent:chat-12-regular" />,
              label: "Obroloan",
            },
            {
              key: "/riwayat_transaksi",
              icon: <Icon icon="bi:clock" />,
              label: "Riwayat Transaksi",
            },
            {
              key: "/ubah-sandi",
              icon: <Icon icon="bi:lock" />,
              label: "Ubah Kata Sandi",
            },
            {
              key: "/logout",
              icon: <Icon icon="solar:logout-broken" />,
              label: "Logout",
            },
          ]}
          onClick={({ key }) => {
            router.push(key);
            // console.log(`key ${key} route not found`);
          }}
        />
      </Sider>
      <Layout style={{ height: "100%" }}>
        <Header
          className="header flex bg-[#016255] justify-between"
          style={{
            padding: 0,
            background: "#016255",
          }}
        >
          <div className="justify-between flex">
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
            <div className="flex items-center gap-7 justify-end right-0">
              <Avatar size="large" icon={<UserOutlined />} />
              <Dropdown
                menu={{ items }}
                overlayStyle={{ width: "170px", color: "white" }}
                className="text-white font-bold -mr-3 text-[16px]"
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {fullNameCus}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
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
export default LayoutCustomer;
