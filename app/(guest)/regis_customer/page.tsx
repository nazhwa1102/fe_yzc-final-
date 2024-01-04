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
  level_user: '2b9814f9-befa-41e4-9f95-1f759b411801',
  fullName:'',
  gender:'',
  email:'',
  password:'',
  birth_date: new Date,
  religion: '',
  phone:'',
  last_education:'',
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
          level_user: '2b9814f9-befa-41e4-9f95-1f759b411801',
          full_name: dataInput?.fullName,
          gender: dataInput?.gender,
          email: dataInput?.email,
          password: dataInput?.password,
          birth_date: dataInput?.birth_date,
          religion: dataInput?.religion,
          phone: dataInput?.phone,
          last_education: dataInput?.last_education
      };
      
      // console.log (
      //     'full_name', dataInput.fullName.length,
      //     'gender', dataInput.gender.length,
      //     'email', dataInput.email.length,
      //     'password', dataInput.password.length,
      //     'birth_date', !dataInput.birthDate.length,
      //     'religion',dataInput.Religion.length,
      //     'phone_number', dataInput.phone.length,
      //     'last_education', dataInput.lastEducation.length );
          
      // console.log (data ,"ini data");
      const register_customer = await authRepository.manipulateData.register(data);
      console.log(register_customer,"hasilnya ini");
      setTimeout(message.success("Anda Telah Berhasil Registrasi!"),5000)
      router.push("/login");
    } catch(err) {
      // message.error(err)
    }
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full bg-white flex justify-between">
        <div className="w-1/2 bg-[#005449] rounded-tr-[200px]">
          <div className="w-full flex justify-center">
            <div className="w-[800px] py-[20px]">
              <div className="flex flex-col space-y-15 w-full h-fit">
                <div className="mb-35 flex">
                  <div>
                    <ArrowLeftOutlined className="text-white text-5xl" />
                  </div>
                  <div className="flex justify-center w-[100%]">
                    <Logo />
                  </div>
                </div>
                <div>
                  <div className="text-white text-2xl font-bold flex justify-center space-y-5">
                    <p> Buat Akun di Youthzen Connect,Yuk!</p>
                  </div>
                </div>
                <div>
                  <Steps
                    current={current}
                    items={items}
                    className="mb-[20px]"
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
                  <div className="text-white text-xl absolute bottom-0">
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
        </div>
        <div className="w-1/2 relative grid justify-items-stretch">
          <div className="grid justify-items-center ml-50">
            <Regis />
          </div>
        </div>
      </div>
    </div>
  );
}

export default register_customer;