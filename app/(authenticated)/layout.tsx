"use client";

import React from "react";
import {
  HomeFilled,
  InfoCircleFilled,
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  SmileOutlined,
  DownOutlined,
  BellOutlined,
  MessageOutlined,
  HistoryOutlined,
  LogoutOutlined,
  FacebookFilled,
  InstagramFilled,
  TwitterOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme, Avatar, Space, Dropdown } from "antd";
import { useRouter } from "next/navigation";
import Logo from "../components/images/logo";
import LogoBig from "../components/images/logoBig";
import Headers1 from "../components/images/header1";
import Headers2 from "../components/images/header2";

const { Header, Content, Footer } = Layout;
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
      <a rel="noopener noreferrer" href="">
        Obrolan
      </a>
    ),
    icon: <HistoryOutlined />,
  },
  {
    key: "5",
    label: (
      <a href="" rel="">
        LogOut
      </a>
    ),
    danger: true,
    icon: <LogoutOutlined />,
  },
];

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({
  children,
}) => {
  const router = useRouter();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header className="header flex bg-[#016255]" style={{height: '75px'}}>
        <div className={"flex mt-[-42x]"}>
          <Logo />
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[]}
          className={
            "flex-1 bg-[#016255] justify-end items-center gap-10 text-[18px] mt-[-2px]"
          }
        >
          <div className="flex items-center gap-6">
            <a className="text-white">About Us</a>
            <a className="text-white">Artikel</a>
            <a className="text-white">Psikolog</a>
            <a className="text-white">Seminar</a>
          </div>
          <div className="flex items-center gap-7 justify-end">
            <Avatar size="large" icon={<UserOutlined />} />
            <Dropdown
              menu={{ items }}
              overlayStyle={{ width: "150px", color: "white" }}
              className="text-white font-bold -mr-3 text-[16px]"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Reyner W.L
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </Menu>
      </Header>
      <Header className="header flex bg-[#EDEDED] justify-between mt-[-5px] h-[75px] text-2xl font-bold items-center">
       <Headers1/>
       <Headers2/>
      </Header>
      <Layout>
        <Layout
          style={{ padding: "0 24px 24px", height: "fit" }}
        >
          <Content
            style={{
              padding: 24,
              margin: "16px 0 0 0",
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
      </Layout>
        </Layout>
        <Layout>
          <Footer className="bg-[#016255] footer gap-5 items-center text-white text-lg font-bold">
            <div className="flex justify-between">
              <div  className="flex items-center">
                <div>
                  <LogoBig />
                </div>
                <div>
                  Tel(Wa) : 085695679128
                  <br />
                  Email : cs@youtzenconnect.com
                </div>
              </div>
              <div>
                <div className="flex gap-5 items-end">
                  <div>
                    <p>Ikuti Kami Di:</p>
                    <FacebookFilled /> YouthZen Connect
                    <br />
                    <br />
                    <TwitterOutlined /> youth.zen_connect
                  </div>
                  <div>
                    <br />
                    <InstagramFilled/> youth.zen_connect
                    <br />
                    <br />
                    <YoutubeFilled /> YouthZen Connect
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </Footer>
        </Layout>
    </Layout>
  );
};

export default AuthenticatedLayout;
