"use client";
import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme, Card, Col, Row } from "antd";
import { Icon } from "@iconify/react";
import { parseJwt } from "#/utils/convert";
import { useRouter } from "next/router";
import Logo from "#/app/components/gambar/logo";



interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const { Header, Sider, Content } = Layout;
const App: React.FC<AuthenticatedLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

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

// const router = useRouter();

//   const showModal =() => {
//     if (!localStorage.getItem("acces_token")) {
//       alert("silahkan login");
//       router.push('login');
//     } else {
//       setIsModalOpen(true);
//     }
//   };

  return (
    <Layout style={{ height: "100%" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="dashboard admin" />
        <div className="flex justify-center w-[100%]">
          <Logo />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          className="font-semibold"
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
              label: "Private Konseling",
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
              key: "8",
              icon: <Icon icon="bi:clock" />,
              label: "Riwayat Transaksi",
            },
            {
              key: "10",
              icon: <Icon icon="solar:logout-broken" />,
              label: "Logout",
            },
          ]}
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
            height: "100%",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div className="w-[943] h-11 bg-yzc rounded-[10px] items-center">
            <p className="text-white text-base p-2 font-bold ">
             Seminar
            </p>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;