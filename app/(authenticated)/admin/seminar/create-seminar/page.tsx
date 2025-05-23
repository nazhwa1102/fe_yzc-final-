"use client";

import LayoutAdmin from "#/app/components/layoutadmin";
import UploadPoster from "#/app/components/upload";
import type { CreateSeminar } from "#/app/types/typeCreateSeminar";
import { PsikologRepository } from "#/repository/psikolog";
import { SeminarRepository } from "#/repository/seminar";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  SelectProps,
  message,
} from "antd";
import FormItem from "antd/lib/form/FormItem";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CreateSeminar = () => {
  const router = useRouter();
  const [dataInput, setSeminar] = useState<CreateSeminar>({
    title: "",
    psikolog: [],
    price: 0,
    poster: "",
    link: "",
    datetime: new Date(),
    status: "",
    kuota: 0,
  });

  const onFinish = async (val: any) => {
    try {
      const data = {
        title: dataInput.title,
        psikolog: dataInput.psikolog,
        price: dataInput.price,
        poster: dataInput.poster,
        link: dataInput.link,
        datetime: dataInput.datetime,
        kuota: dataInput.kuota,
        status: "pending",
      };
      const create_seminar = await SeminarRepository.manipulateData.create(
        data
      );
      setTimeout(
        message.success("Anda Telah Berhasil Menambahkan Seminar"),
        5000
      );
      router.push("admin/seminar");
    } catch (error) {
      throw error;
    }
  };

  const { data: datapsikolog } = PsikologRepository.hooks.active();
  console.log(datapsikolog, "ini data");

  const parsePrice = (value: any) => {
    return parseInt(value.replace(/[^0-9]/g, ""), 10);
  };

  return (
    <LayoutAdmin>
      <div>
        <div className="text-3xl font-bold flex justify-center">
          Tambah Seminar
        </div>
        <div className="flex justify-center pt-5">
          <div>
            <div>
              <Form size="large" style={{ maxWidth: "500px" }} layout="vertical">
                <div className="font-bold text-2xl pt-5">Poster</div>
                <div className="w-[500px] h-[250px]">
                  <FormItem name="poster" label="Harap Masukan Poster Seminar" required={true}>
                    <UploadPoster setData={setSeminar} dataInput={dataInput} />
                  </FormItem>
                </div>
                <div className="pt-2.5">
                  <div className="font-bold text-2xl">Judul Seminar</div>
                  <div className="">
                    <Form.Item name="title" label="Harap Masukan Judul Seminar" rules={[{required:true}]}>
                      <Input
                        placeholder="Masukan Judul Seminar"
                        className="w-[500px] text-black black-text"
                        onChange={(e) => {
                          setSeminar({ ...dataInput, title: e.target.value });
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="font-bold text-2xl">Tanggal Seminar</div>
                  <div>
                    <Form.Item name="datetime" label="Harap Masukan Tanggal Seminar" required={true} className="black-text">
                      <DatePicker
                        className="w-[500px] h-10 text-black black-text"
                        onChange={(e: any) => {
                          setSeminar({ ...dataInput, datetime: e });
                        }}
                        placeholder="Pilih Tanggal"
                        style={{color: "black"}}
                      />
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </div>
          </div>
          <div className="flex pl-[100px]">
            <div>
              <div className="pt-5">
                <Form size="large" layout="vertical">
                  <div className="font-bold text-2xl">Harga Seminar</div>
                  <div>
                    <Form.Item name="price" label="Harap Masukan Harga Seminar" required={true}>
                      <InputNumber
                        placeholder="Masukan Harga Seminar"
                        className="w-[500px]"
                        onChange={(e: any) => {
                          setSeminar({ ...dataInput, price: e });
                        }}
                        min={0}
                        step={1}
                        formatter={(value) =>
                          `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                        }
                        parser={parsePrice}
                      />
                    </Form.Item>
                  </div>
                  <div className="font-bold text-2xl">Kuota Seminar</div>
                  <div>
                    <Form.Item name="kuota" label="Harap Masukan Kuota Seminar" required={true}>
                      <InputNumber
                        placeholder="Masukan Kuota Seminar"
                        className="w-[500px]"
                        onChange={(e: any) => {
                          setSeminar({ ...dataInput, kuota: e });
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="font-bold text-2xl">Tautan Seminar</div>
                  <div>
                    <Form.Item name="link" label="Harap Masukan Tautan Seminar" required={true}>
                      <Input
                        placeholder="Masukan Tautan Seminar"
                        className="w-[500px]"
                        onChange={(e) => {
                          setSeminar({ ...dataInput, link: e.target.value });
                        }}
                      />
                    </Form.Item>
                  </div>
                </Form>
                <div className="font-bold text-2xl pt-1">Pemateri</div>
                <div>
                  <Form size="large" layout="vertical">
                    <Form.Item name="psikolog" label="Harap Masukan Namam Pemateri Masksimal 3 Orang" required={true}>
                      <Select
                        mode="multiple"
                        allowClear
                        style={{ width: "500px"}}
                        placeholder="Please select"
                        options={datapsikolog?.data.map((val: any) => {
                          return {
                            value: val.id,
                            label: val.fullName,
                          };
                        })}
                        maxLength={3}
                        maxTagCount={3}
                        maxTagPlaceholder={3}
                        maxTagTextLength={3}
                        onChange={(e) => {
                          setSeminar({ ...dataInput, psikolog: e });
                        }}
                      />
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end pt-28 bottom-5 right-0">
        <Button
          type="text"
          className="bg-primary text-2xl h-fit w-[300px] rounded-[20px]"
          onClick={onFinish}
        >
          Ajukan Seminar
        </Button>
      </div>
    </LayoutAdmin>
  );
};
export default CreateSeminar;
