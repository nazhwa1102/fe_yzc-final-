import React from 'react'
import { DatePicker, Select } from "antd/lib/index";
import { Option } from "antd/es/mentions";
import { Form, Input } from "antd/lib/index";
import { FormInstance } from "antd";
import FormItem from 'antd/lib/form/FormItem';
import {
    EyeInvisibleOutlined,
    EyeTwoTone,
    LockOutlined,
    MailOutlined,
    ArrowLeftOutlined,
  } from "@ant-design/icons";
import { RegisterPsikolog } from '#/app/types/typeRegisPsg';

  type Props = {
    setData: any;
    dataInput: RegisterPsikolog;
    formStep3: FormInstance<any>;
  };

function PsikologStep3({ setData, dataInput, formStep3 }: Props) {
  return (
    <div className="w-full h-full">
          <div className="w-full h-full flex justify-center">
                <div className="flex flex-col space-y-15 w-full">
                <div className="text-white text-2xl font-bold flex justify-center mb-9">
                    </div>
                    <p className="text-white text-2xl font-bold pb-3">Email</p>
                    <div className="w-full regis">
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Harap masukan email anda!",
                          },
                        ]}
                      >
                        <Input
                          onChange={(e) => {
                            setData({ ...dataInput, email: e.target.value });
                          }}
                          size="large"
                          placeholder="Masukan Email"
                          className=" p-[10px] bg-white bg-opacity-20 rounded-[10px] border border-white border-opacity-30 regis text-xl text-white"
                        />
                      </Form.Item>
                    </div>
                  <div>
                  <p className="text-white text-2xl font-bold pb-3">No Telepon</p>
                    <div className="w-full regis">
                      <Form.Item
                        name="phone"
                        rules={[
                          {
                            required: true,
                            message: "Harap masukan no telepon anda!",
                          },
                        ]}
                      >
                        <Input
                          onChange={(e) => {
                            setData({ ...dataInput, phone: e.target.value });
                          }}
                          size="large"
                          placeholder="Masukan No Telepon"
                          className=" p-[10px] bg-white bg-opacity-20 rounded-[10px] border border-white border-opacity-30 regis text-xl text-white"
                        />
                      </Form.Item>
                    </div>
                  <div>
                    <p className="text-white text-2xl font-bold pb-3">Kata Sandi</p>
                    <div className="w-full regis">
                      <Form.Item
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Harap masukan kata sandi anda!",
                          },
                        ]}
                      >
                        <Input.Password
                          onChange={(e) => {
                            setData({ ...dataInput, password: e.target.value });
                          }}
                          size="large"
                          placeholder="Masukan Kata Sandi"
                          className=" p-[10px] bg-white bg-opacity-20 rounded-[10px] border border-white border-opacity-30 login text-xl"
                          iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                          }
                        />
                      </Form.Item>
                    </div>
                    <div>
                    <p className="text-white text-2xl font-bold pb-3">Konfirmasi Kata Sandi</p>
                    <div className="w-full regis">
                      <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                          {
                            required: true,
                            message: "Harap masukan kata sandi anda!",
                          },
                          ({ getFieldValue}) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('password')=== value) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error(
                                  'kata sandi baru anda masukkan tidak cocok!'
                                )
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password
                          onChange={(e) => {
                            setData({ ...dataInput, password: e.target.value });
                          }}
                          size="large"
                          placeholder="Konfirmasi Kata Sandi"
                          className=" p-[10px] bg-white bg-opacity-20 rounded-[10px] border border-white border-opacity-30 login text-xl"
                          iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                          }
                        />
                      </Form.Item>
                    </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
          </div>
  )
}

export default PsikologStep3