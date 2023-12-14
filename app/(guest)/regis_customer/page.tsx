"use client";

import React, { useEffect, useState } from "react";
import { Button, Form, Input, Steps, message } from "antd";
import {} from "@ant-design/icons";
import { useRouter } from "next/router";
import CustomerStep1 from "#/app/components/auth/regis_customer/step1_customer";
import CustomerStep2 from "#/app/components/auth/regis_customer/step2_customer";
import Logo from "#/app/components/gambar/logo";
import Regis from "#/app/components/gambar/regis";


function register_customer() {
  const steps = [
    {
      title: "Biodata", 
      content: <CustomerStep1/>,
    },
    {
      title: "Akun",
      content: <CustomerStep2 />,
    },
  ];

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <div className="w-full h-full">
      <div className="w-full h-full fixed bg-white flex justify-between">
        <div className="w-1/2 relative bg-[#005449] rounded-tr-[200px]">
          <div className="w-full h-full flex justify-center">
            <div className="w-[710px] py-[100px]">
                <div className="flex flex-col space-y-15 w-full">
                  <div className="mb-35 flex">
                    <div className="mb-[50px] "></div>
                    <div className="flex justify-center w-[100%]">
                      <Logo />
                    </div>
                  </div>
                  <div>
                    <div className="text-white text-2xl font-bold flex justify-center space-y-15">
                      <p> Buat Akun di Youthzen Connect,Yuk!</p>
                    </div>
                  </div>
                  <div className="w-[653px]">
                    <Steps
                      current={current}
                      items={items}
                      className="mb-[33px]"
                    />
                    <div>{steps[current].content}</div>
                    <div
                      style={{ marginTop: 34 }}
                      className="flex justify-between"
                    >
                      <div className="regisCustomer">
                        {current > 0 && (
                          <Button
                            style={{ margin: "0 8px" }}
                            onClick={() => prev()}
                          >
                            Kembali
                          </Button>
                        )}
                      </div>
                      <div></div>
                      <div className="regisCustomer">
                        {current < steps.length - 1 && (
                          <Button
                            type="primary"
                            onClick={() => next()}
                            className="bg-primary"
                          >
                            Lanjut
                          </Button>
                        )}
                      </div>
                    <div className="regisCustomer">
                    {current === steps.length - 1 && (
                        <Button
                          type="primary"
                          htmlType="submit"
                          onClick={() =>
                            message.success("Anda Telah Berhasil Registrasi!")
                          }
                          className="bg-primary"
                        >
                          Daftar
                        </Button>
                      )}
                    </div>
                    </div>
                  </div>
                  <div>
                  </div>
                </div>
            </div>
          </div>
          <div className="w-[1258px] h-[1258px] bg-primary rounded-e-full -my-32 -ml-72 blur-[2px] absolute top-0 left-0  -z-50"></div>
        </div>
        <div className="w-1/2 relative grid justify-items-stretch">
          <div className="justify-self-end p-8"></div>
          <div className="grid justify-items-center ml-50">
            <Regis/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default register_customer;
