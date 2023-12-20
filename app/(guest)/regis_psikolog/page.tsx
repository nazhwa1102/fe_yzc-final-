"use client";

import React, { useEffect, useState } from "react";
import { Button, Form, Input, Steps, message } from "antd";
import {
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Logo from "#/app/components/gambar/logo";
import Regis from "#/app/components/gambar/regis";
import PsikologStep1 from "#/app/components/auth/regis_psikolog/step1_psikolog";
import PsikologStep2 from "#/app/components/auth/regis_psikolog/step2_psikolog";
import PsikologStep3 from "#/app/components/auth/regis_psikolog/step3_psikolog";
import { RegisterPsikolog } from "#/app/types/typeRegisPsg";
import { authRepository } from "#/repository/auth";


function register_psikolog() {
  const router = useRouter();
  const [dataInput,setDataInput] = useState<RegisterPsikolog>({
    level_user: '',
    fullName:'',
    gender:'',
    Religion: '',
    birthDate:'',
    lastEducation:'',
    caseHandled: '',
    aboutMe: '',
    legality:'',
    photo:'',
    email:'',
    phone:'',
    password:'',
  })
  
const [formStep1] = Form.useForm();
const [formStep2] = Form.useForm();
const [formStep3] = Form.useForm();

  const steps = [
    {
      title: "Biodata", 
      content: <PsikologStep1
      setData={setDataInput}
      dataInput={dataInput}
        formStep1={formStep1}
      />,

    },
    {
      title: "Verifikasi",
      content: <PsikologStep2
      setData={setDataInput}
      dataInput={dataInput}
      formStep2={formStep2}
      />,
    },
    {
      title: "Akun",
      content: <PsikologStep3
      setData={setDataInput}
      dataInput={dataInput}
      formStep3={formStep3}
      />,
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
  const onFinish = async (values: any) => {
    try {
      const data = {
          level_user: 'cedf2abb-bd61-4314-9075-d42f9303a88c',
          full_name: dataInput?.fullName,
          gender: dataInput?.gender,
          religion: dataInput?.Religion,
          birth_date: dataInput?.birthDate,
          last_education: dataInput?.lastEducation,
          case_handled: dataInput?.caseHandled,
          about_me: dataInput?.aboutMe,
          legality: dataInput?.legality,
          photo: dataInput?.photo,
          email: dataInput?.email,
          phone_number: dataInput?.phone,
          password: dataInput?.password,
      };
      console.log (data ,"ini data");
      const register_psikolog = await authRepository.manipulateData.register2(data);
      console.log(register_psikolog,"hasilnya ini");
      setTimeout(message.success("Anda Telah Berhasil Registrasi!"),5000)
      router.push("/home");
    } catch(err) {
      // message.error(err)
    }
  };
  return (
    <div className="w-full h-full">
      <div className="w-full h-full fixed bg-white flex justify-between">
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
                          onClick={onFinish}
                          className="bg-primary"
                        >
                          Daftar
                        </Button>
                      )}
                    </div>
                    </div>
                  </div>
                  <div className="text-white text-xl">
                    <p className="mb-2">
                      Sudah punya akun di Youthzen Connect ?
                      <a href="/login" className="font-bold mb-3">
                        Masuk
                      </a>
                    </p>
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

export default register_psikolog;
