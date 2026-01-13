"use client";

import React, { useState } from "react";
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
import {
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Avatar,
  Space,
  Dropdown,
  Typography,
  Button,
} from "antd";
import { useRouter } from "next/navigation";
import Logo from "#/app/components/images/logo";
import LogoBig from "#/app/components/images/logoBig";
import Headers1 from "#/app/components/images/header1";
import Headers2 from "#/app/components/images/header2";
import Homehead from "#/app/components/images/homehead";
import ArtikelSlider from "#/app/components/artikelslider";
import Psikologlist from "#/app/components/psikologlist";
import SeminarSlider from "#/app/components/seminarslider";
import { Icon } from "@iconify/react";
import { parseJwt } from "#/utils/convert";
const { Paragraph } = Typography;
const { Header, Content, Footer } = Layout;

const Layout2 = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const router = useRouter();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const token = localStorage.getItem("access_token");
  console.log(token, "yuk bisa");
  let role: string = "";
  let email: string = "";
  let fullNameCus: string = "";

  if (token) {
    role = parseJwt(token).role;
    email = parseJwt(token).email;
    fullNameCus = parseJwt(token).fullNameCus;
    console.log(role, "role cocok");
    console.log(fullNameCus, "nama");
  }

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/");
  };

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
      label: (
        <a onClick={handleLogout} rel="noopener noreferrer">
          LogOut
        </a>
      ),
      danger: true,
      icon: <LogoutOutlined />,
    },
  ];

  const menu: MenuProps["items"] = [
    {
      key: "/about_us",
      label: <a className="text-white">Tentang Kami</a>,
    },
    {
      key: "/artikel",
      label: <a className="text-white">Artikel</a>,
    },
    {
      key: "/psikolog",
      label: <a className="text-white">Psikolog</a>,
    },
    {
      key: "/seminar",
      label: <a className="text-white">Seminar</a>,
    },
  ];

  return (
    <Layout>
      <Header className="header flex bg-[#016255]" style={{ height: "75px" }}>
        <div className={"flex mt-[-42x]"}>
          <a href="/home">
            <Logo />
          </a>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[]}
          className={
            "flex-1 bg-[#016255] justify-end items-center gap-4 text-[18px] mt-[-2px]"
          }
          items={menu}
          onClick={({ key }) => {
            router.push(key);
            // console.log(`key ${key} route not found`);
          }}
        ></Menu>
        <div className="flex items-center pl-5 justify-end">
          {token ? (
            <>
              <div className="text-white font-bold text-[16px] pr-1">Halo,</div>
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
            </>
          ) : (
            <>
              <Button
                style={{ background: "#22c55e" }}
                className="hover:bg-green-600 hover:font-bold text-white text-base font-bold"
                onClick={() => router.push("/")}
              >
                Masuk
              </Button>
            </>
          )}
        </div>
      </Header>
      <Header className="header flex bg-[#EDEDED] justify-center gap-[500px] h-[230px] items-center mt-[-5px]">
        <div>
          <Paragraph className="w-[600px] text-lg">
            <div className="text-3xl font-bold pb-2">YouthZen Connect</div>
            YouthZen Connect ( koneksi pemuda gen z) merupakan platform edukasi
            online yang memberikan layanan berupa kesehatan mental, khususnya
            untuk para anak anak muda. aplikasi ini dibangun untuk mempermudah
            membantu anak anak untuk memahami dan mengelola emosi.
          </Paragraph>
        </div>
        <Homehead />
      </Header>
      <Layout>
        <Layout style={{ padding: "0 24px 24px" }} className="h-fit">
          <Content
            style={{
              padding: 24,
              margin: "16px 0 0 0",
              minHeight: 280,
              background: colorBgContainer,
            }}
            className="justify-center"
          >
            <div>
              <div>
                <div className="pt-2">
                  <div className="font-bold text-2xl justify-center flex">
                    Seminar
                  </div>
                  <div className="flex justify-center pt-2">
                    <div className="w-[350px] text-center">
                      lebih kenal dengan dirimu lewat seminar menarik yuuk !!
                    </div>
                  </div>
                </div>
                <div className="flex justify-center pt-7">
                  <SeminarSlider />
                </div>
              </div>
              <div>
                <div className="justify-center flex pt-28">
                  <div>
                    <div className="font-bold text-2xl justify-center flex">
                      Rekomendasi Psikolog Terbaik Bulan ini
                    </div>
                    <div className="flex justify-center pt-2">
                      <div className="w-[200px] text-center">
                        Mau Mulai Konsultasi? Yuk Kenali Psikolog Kami!
                      </div>
                    </div>
                  </div>
                </div>
                <div className="justify-center">
                  <div>
                  <Psikologlist />
                  </div>
                  <div className="flex justify-center pt-10">
                    <Button
                      className="rounded-xl h-fit text-lg w-[200px] bg-yzc shadow-lg"
                      type="text"
                    >
                      Lihat Semua
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <div className="justify-center flex pt-28">
                  <div>
                    <div className="font-bold text-2xl justify-center flex">
                      Artikel
                    </div>
                    <div className="flex justify-center pt-2">
                      <div className="w-[320px] text-center">
                        Yuk belajar untuk memahami diri sendiri bareng youthzen
                        connect ! Kunjungi halaman artikel disini!
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div className="flex justify-center pt-2">
                  <ArtikelSlider />
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
      <Layout>
        <Footer className="bg-[#016255] footer gap-5 items-center text-white text-lg font-bold">
          <div className="flex justify-between">
            <div className="flex items-center">
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
                  <Icon icon="ic:baseline-facebook" color="white" /> YouthZen
                  Connect
                  <br />
                  <br />
                  <Icon icon="pajamas:twitter" color="white" />{" "}
                  youth.zen_connect
                </div>
                <div>
                  <br />
                  <Icon icon="mdi:instagram" color="white" /> youth.zen_connect
                  <br />
                  <br />
                  <Icon icon="mdi:youtube" color="white" /> YouthZen Connect
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

export default Layout2;
