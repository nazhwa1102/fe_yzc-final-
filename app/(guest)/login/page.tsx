"use client";

import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Typography } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  MailOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import Logo from "#/app/components/gambar/logo";
import Login from "#/app/components/gambar/login";

interface ErrorLogin {
  reponse: {
    body: {
      statusCode: number;
      error: string;
    };
  };
}

interface SuccesLogin {
  body: {
    data: {
      acces_token: string;
    };
    statusCode: number;
    message: string;
  };
}

const LoginPage = () => {
  useEffect(() => {
    document.title = "Login - Youthzenconnect";
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // const ruoter = useRouter()
  // const [loading,setLoading] = useState(false)

  const onFinish = async (values: any) => {
    console.log("Received values of from", values);
    try {
      const data = {
        email: values?.email,
        passwoard: values?.password,
      };

      // const login = await authRepository.manipulatedata.login(data)
      // const token = (login as SuccessLogin)?.body?.data

      // localStorage.setItem("acces_token", login?.body?.data?.acces_token)
      // setLoading(false)
      //     ruoter.push("/adm/dashboard")
    } catch (err) {
      // console.log(err.reponse.body?.error);
      // message.error(err.reponse.body?.error)
    }
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full fixed bg-white flex justify-between">
        <div className="w-1/2 relative bg-[#005449] rounded-tr-[200px]">
          <div className="w-full h-full flex justify-center">
            <div className="w-[710px] py-[100px]">
              <Form name="login" className="login" onFinish={onFinish}>
                <div className="flex flex-col space-y-15 w-full">
                  <div className="mb-35 flex">
                    <div className="mb-[50px] ">
                      <ArrowLeftOutlined className="text-white text-5xl" />
                    </div>
                    <div className="flex justify-center w-[100%]">
                      <Logo />
                    </div>
                  </div>
                  <div>
                    <div className="text-white text-2xl font-bold flex justify-center mb-9">
                      <p> Yuk, Masuk ke Akunmu Dulu!</p>
                    </div>
                    <p className="text-white text-2xl font-bold pb-3">Email</p>
                    <div className="w-full">
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Harap Masukan EmailAnda!",
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder="Masukan Email"
                          prefix={
                            <MailOutlined className="text-white text-2xl mr-5" />
                          }
                          className=" p-[10px] bg-white bg-opacity-20 rounded-[10px] border border-white border-opacity-30 login text-xl"
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div>
                    <p className="text-white text-2xl font-bold pb-3">
                      Kata Sandi
                    </p>
                    <div className="w-full">
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Harap Masukan Kata Sandi Anda!",
                          },
                        ]}
                      >
                        <Input.Password
                          size="large"
                          placeholder="Masukan Kata Sandi"
                          prefix={
                            <LockOutlined className="text-white text-3xl mr-5" />
                          }
                          className=" p-[10px] bg-white bg-opacity-20 rounded-[10px] border border-white border-opacity-30 login text-xl"
                          iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                          }
                        />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="text-white text-xl">
                    <div className="mb-2 flex">
                      Kamu belum punya akun?
                      <Typography
                        onClick={showModal}
                        className="font-bold mb-2 ml-2 text-white text-xl"
                      >
                        Buat akun sekarang
                      </Typography>
                    </div>
                  </div>
                </div>
                <div>
                  <Modal
                    title="Masuk Sebagai ?"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    <p className="mb-2"><a href="/regis_customer" className="font-bold mb-2">
                        Masuk Sebagai Customer
                      </a>
                    </p>
                    <p className="mb-2"><a href="/regis_psikolog" className="font-bold mb-2">
                        Masuk Sebagai Psikolog
                      </a>
                    </p>
                  </Modal>
                </div>
                <div className="w-full mt-20">
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      className="bg-tranparant border border-white rounded-full text-2xl font-bold py-3 h-max"
                    >
                      Masuk
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
          <div className="w-[1258px] h-[1258px] bg-primary rounded-e-full -my-32 -ml-72 blur-[2px] absolute top-0 left-0  -z-50"></div>
        </div>
        <div className="w-1/2 relative grid justify-items-stretch">
          <div className="justify-self-end p-8"></div>
          <div className="grid justify-items-center ml-50">
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
