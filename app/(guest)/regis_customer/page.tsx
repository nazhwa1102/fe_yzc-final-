"use client";

import React, { useEffect, useState } from "react";
import { Button, Form, Input, Steps, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import CustomerStep1 from "#/app/components/auth/regis_customer/step1_customer";
import CustomerStep2 from "#/app/components/auth/regis_customer/step2_customer";
import Logo from "#/app/components/gambar/logo";
import Regis from "#/app/components/gambar/regis";
import { authRepository } from "#/repository/auth";
import { RegisterCustomer } from "#/app/types/typeRegisCstr";

function register_customer() {
const router = useRouter();

const [dataInput,setData] = useState<RegisterCustomer>({
  level_user: '',
  fullName:'',
  gender:'',
  email:'',
  password:'',
  birthDate: '',
  Religion: '',
  phone:'',
  lastEducation:'',
});

const [formStep1] = Form.useForm();
const [formStep2] = Form.useForm();

  const steps = [
    {
      title: 'Biodata',
      content: <CustomerStep1 
        setData={setData}
        dataInput={dataInput}
        formStep1={formStep1}
      />
    },
    {
      title: 'Akun',
      content: <CustomerStep2 
        setData={setData}
        dataInput={dataInput}
        formStep2={formStep2}/>
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
  const onFinish = async () => {
    try {
      const data = {
          level_user: '9109058c-3c51-4ce4-9415-e002357e9f18',
          full_name: dataInput?.fullName,
          gender: dataInput?.gender,
          email: dataInput?.email,
          password: dataInput?.password,
          birth_date: dataInput?.birthDate,
          religion: dataInput?.Religion,
          phone_number: dataInput?.phone,
          last_education: dataInput?.lastEducation
      };
      console.log (data ,"ini data");
      const register_customer = await authRepository.manipulateData.register(data);
      console.log(register_customer,"hasilnya ini");
      setTimeout(message.success("Anda Telah Berhasil Registrasi!"),5000)
      router.push("/login");
    } catch(err) {
      // message.error(err)
    }
  };

  return (
    <div className="">
      <div className="w-full h-full bg-white flex justify-between">
        <div className="w-1/2 relative bg-[#005449] rounded-tr-[200px]">
          <div className="w-full h-full flex justify-center">
            <div className="w-[710px] py-[100px]">
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
                    <div className="regisCustomer  flex justify-end w-full">
                      {current < steps.length - 1 && (
                        <Button
                          type="primary"
                          onClick={() => next()}
                          className="bg-primary flex justify-end" 
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
                          onClick={onFinish}
                          className="bg-primary"
                        >
                          Daftar
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="text-white text-xl">
                    <p className="mt-6">
                      Sudah punya akun di Youthzen Connect ?
                      <a href="/login" className="font-bold mb-3 ml-2">
                        Masuk
                      </a>
                    </p>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
          <div className="w-[1258px] h-[1258px] bg-primary rounded-e-full -my-32 -ml-72 blur-[2px] absolute top-0 left-0  -z-50"></div>
        </div>
        <div className="w-1/2 relative grid justify-items-stretch">
          <div className="justify-self-end p-8"></div>
          <div className="grid justify-items-center ml-50">
            <Regis />
          </div>
        </div>
      </div>
    </div>
  );
}

export default register_customer;