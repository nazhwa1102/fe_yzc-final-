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
  const [dataInput, setDataInput] = useState<RegisterPsikolog>({
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
  const onFinish = async () => {
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
          email: dataInput.email,
          phone_number: dataInput?.phone,
          password: dataInput?.password,
      };
      console.log(register_psikolog,"hasilnya ini");
      setTimeout(message.success("Anda Telah Berhasil Registrasi!"),5000)
      router.push("/login");
    } catch(err) {
      // message.error(err)
    }
  };
  return (
    <div className="w-full">
      <div className="w-full bg-white flex justify-between">
        <div className="w-1/2 relative bg-[#005449] rounded-tr-[200px]">
          <div className="w-full flex justify-center">
            <div className="w-[710px] py-[100px]">
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
                      <div className="regisCustomer  flex justify-end w-full">
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
                          // disable={
                          //   dataInput.level_user.length <= 1 ||
                          //   dataInput.fullName.length <= 1 ||
                          //   dataInput.birthDate.length <= 1 ||
                          //   dataInput.Religion.length <=  1 ||
                          //   dataInput.birthDate.length <= 1 ||
                          //   dataInput.lastEducation.length <= 1 ||
                          //   dataInput.caseHandled.length <= 1 ||
                          //   dataInput.aboutMe.length <= 1 ||
                          //   dataInput.legality.length <= 1 ||
                          //   dataInput.photo.length <= 1 ||
                          //   dataInput.email.length <= 1 ||
                          //   dataInput.phone.length <= 1 ||
                          //   dataInput.password.length <= 1 ||

                          // }
                          onClick={onFinish}
                          className="bg-primary"
                        >
                          Daftar
                        </Button>
                      )}
                    </div>
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
                  <div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div className="w-1/2 relative grid justify-items-stretch">
          <div className="grid justify-items-center ml-50">
            <Regis/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default register_psikolog;