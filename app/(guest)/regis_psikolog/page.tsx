"use client";

import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Steps, message } from "antd";
import {
  ArrowLeftOutlined, CheckCircleTwoTone,
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
    level_user: '703f41b0-1004-4965-a3ff-9c71f5fc4f6f',
    fullName:'',
    gender:'',
    religion: '',
    birth_date:new Date,
    last_education:'',
    caseHandled: '',
    aboutMe: '',
    legality:'',
    photo:'',
    email:'',
    phone:'',
    password:'',
    spesialis:''
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
          level_user: '703f41b0-1004-4965-a3ff-9c71f5fc4f6f',
          full_name: dataInput?.fullName,
          gender: dataInput?.gender,
          religion: dataInput?.religion,
          birth_date: dataInput?.birth_date,
          last_education: dataInput?.last_education,
          caseHandled: dataInput?.caseHandled,
          aboutMe: dataInput?.aboutMe,
          legality: dataInput?.legality,
          photo: dataInput?.photo,
          email: dataInput.email,
          phone: dataInput?.phone,
          password: dataInput?.password,
          spesialis: dataInput?.spesialis
      };
      console.log (data ,"ini data");
      const register_psikolog = await authRepository.manipulateData.register2(data);
      console.log(register_psikolog,"hasilnya ini");
      setTimeout(message.success("Anda Telah Berhasil Registrasi!"),5000)
      Modal.success({
        icon:(
          <div className="justify-center">
            <div className="flex justify-center">
            <CheckCircleTwoTone twoToneColor="lightgreen" style={{fontSize: '90px'}}/>
            </div>
          </div>
        ),
        title:(
          <div className="justify-center text-lg font-bold flex">
            <div className="justify-center">
            Pendaftaran Berhasil
            </div>
          </div>
        ),
        content: (
          <div className="justify-center text-xl font-bold flex">
            <div className="justify-center">
            Harap tunggu aktivasi dari Admin
            </div>
          </div>
        ),
      })
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
            <div className="w-[800px] py-[100px]">
                <div className="flex flex-col space-y-15 w-full h-fit">
                  <div className="mb-35 flex">
                    <div>
                    <ArrowLeftOutlined className="text-white text-5xl" onClick={() => {router.back()}} />
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
                      className="mb-[33px] justify-center flex pl-10 pr-10"
                    />
                    <div>{steps[current].content}</div>
                    <div
                      style={{ marginTop: 34 }}
                      className="flex justify-between"
                    >
                      <div className="regisCustomer pl-9">
                        {current > 0 && (
                          <Button
                            style={{ margin: "0 8px" }}
                            onClick={() => prev()}
                          >
                            Kembali
                          </Button> 
                        )}
                      </div>
                      <div className="regisCustomer flex float-right justify-end pl-[500px]">
                        {current < steps.length - 1 && (
                          <Button
                            type="primary"
                            onClick={() => next()}
                            className="bg-primary float-right"
                          >
                            Lanjut
                          </Button>
                        )}
                      </div>
                    <div className="regisCustomer pr-10">
                    {current === steps.length - 1 && (
                        <Button
                          type="primary"
                          htmlType="submit"
                          // disabled={
                          //   dataInput.fullName.length <= 1 ||
                          //   dataInput.religion.length <=  1 ||
                          //   dataInput.last_education.length <= 1 ||
                          //   dataInput.caseHandled.length <= 1 ||
                          //   dataInput.aboutMe.length <= 1 ||
                          //   dataInput.legality.length <= 1 ||
                          //   dataInput.photo.length <= 1 ||
                          //   dataInput.email.length <= 1 ||
                          //   dataInput.phone.length <= 1 ||
                          //   dataInput.password.length <= 1 

                          // }
                          onClick={onFinish}
                          // onClick={() => {
                          //   console.log(
                          //     'fullname',dataInput.fullName.length,
                          //     'birtdate', !dataInput.birthDate,
                          //     'agama',dataInput.Religion.length,
                          //     'pendidikan lo',dataInput.lastEducation.length,
                          //     'kasus',dataInput.caseHandled.length,
                          //     'tentang',dataInput.aboutMe.length,
                          //     'legalitas',dataInput.legality.length,
                          //     'photo',dataInput.photo.length,
                          //     'email',dataInput.email.length,
                          //     'hp',dataInput.phone.length,
                          //     'pw',dataInput.password.length );
                            
                          // }}
                          className="bg-primary"
                        >
                          Daftar
                        </Button>
                      )}
                    </div>
                    </div>
                  </div>
                  <div className="text-white text-xl absolute bottom-0 pl-10">
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