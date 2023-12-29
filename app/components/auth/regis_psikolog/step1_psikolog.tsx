import React from "react";
import { DatePicker, Select } from "antd/lib/index";
import { Option } from "antd/es/mentions";
import { Form, Input } from "antd/lib/index";
import { FormInstance } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { RegisterPsikolog } from "#/app/types/typeRegisPsg";

type Props = {
  setData: any;
  dataInput: RegisterPsikolog;
  formStep1: FormInstance<any>;
};
function PsikologStep1({ setData, dataInput, formStep1 }: Props) {
  return (
    <Form form={formStep1}>
      <div className="flex flex-col space-y-2 w-full">
        <div>
          <div>
            <p className="text-teks text-2xl font-bold text-white">
              Nama Lengkap
            </p>
          </div>
          <div className="w-full regis">
            <Form.Item
              name="full_name"
              rules={[
                { required: true, message: "Harap masukan nama lengkap anda!" },
              ]}
            >
              <Input
                onChange={(e) => {
                  setData({ ...dataInput, fullName: e.target.value });
                }}
                placeholder="Masukan nama lengkap"
                className=" p-[10px] rounded-[10px] border border-rstroke regis text-xl "
              />
            </Form.Item>
          </div>
        </div>
        <div className="flex gap-x-5 grid-cols-1">
          <div className="w-1/2">
            <div>
              <p className="text-teks text-2xl font-bold text-white">
                Jenis Kelamin
              </p>
            </div>
            <div className="w-full regis">
              <Form.Item
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Harap masukan jenis kelamin anda!",
                  },
                ]}
              >
                <Select
                  onChange={(e) => {
                    setData({ ...dataInput, gender: e });
                  }}
                  placeholder="Pilih jenis kelamin"
                  className="w-full regis text-white"
                >
                  <Option value="pria">Pria</Option>
                  <Option value="wanita">Wanita</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <div className="w-1/2">
            <div>
              <p className="text-teks text-2xl font-bold text-white">Agama</p>
            </div>
            <div className="w-full regis">
              <Form.Item
                name="religion"
                rules={[
                  { required: true, message: "Harap masukan nama agama anda!" },
                ]}
              >
                <Select
                  onChange={(e) => {
                    setData({ ...dataInput, religion: e });
                  }}
                  placeholder="Pilih Agama"
                  className="w-full regis"
                >
                  <Option value="Islam">Islam</Option>
                  <Option value="Katolik">Katolik</Option>
                  <Option value="Prostestan">Prostestan</Option>
                  <Option value="Budha">Budha</Option>
                  <Option value="Hindu">Hindu</Option>
                  <Option value="Konghucu">Konghucu</Option>
                </Select>
              </Form.Item>
            </div>
          </div>
        </div>
        <div>
          <div>
            <p className="text-teks text-2xl font-bold text-white">
              Tanggal Lahir
            </p>
          </div>
          <div className="w-full regis">
            <Form.Item
              name="birth_date"
              rules={[
                {
                  required: true,
                  message: "Harap masukan tanggal lahir anda!",
                },
              ]}
            >
              <DatePicker
                onChange={(e: any) => {
                  console.log(e?.$d, 'isinya')
                  setData({ ...dataInput, birth_date: e?.$d });
                }}
                placeholder="Pilih tanggal"
                className="w-full regis text-white"
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <div>
            <p className="text-teks text-2xl font-bold text-white">
              Pendidikan Terakhir
            </p>
          </div>
          <div className="w-full regis">
            <Form.Item
              name="last_education"
              rules={[
                {
                  required: true,
                  message: "Harap masukan pendidikan terakhir anda!",
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  setData({ ...dataInput, last_education: e.target.value });
                }}
                placeholder="Masukan Pendidikan Terakhir"
                className=" p-[10px] rounded-[10px] border border-rstroke regis text-xl"
              />
            </Form.Item>
          </div>
        </div>
      </div>
    </Form>
  );
}

export default PsikologStep1;
