"use client";

import LayoutAdmin from "#/app/components/layoutadmin";
import UploadPoster from "#/app/components/upload";
import { CreateSeminar } from "#/app/types/typeCreateSeminar";
import { PsikologRepository } from "#/repository/psikolog";
import { SeminarRepository } from "#/repository/seminar";
import { Button, DatePicker, Form, Input, InputNumber, Select, SelectProps, message } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";


const CreateSeminar = () => {
  const router = useRouter()
  const [dataInput, setSeminar] = useState<CreateSeminar>({
    title: '',
    psikolog: [],
    price: 0,
    poster: '',
    link: '',
    datetime: new Date,
    status: '',
  })
  
  const onFinish = async (val: any) => {
   try {
    const data = {
      title: dataInput.title,
      psikolog: dataInput.psikolog,
      price: dataInput.price,
      poster: dataInput.poster,
      link: dataInput.link,
      datetime: dataInput.datetime,
      status: 'pending'
    }
    const create_seminar = await SeminarRepository.manipulateData.create(data);
    setTimeout(message.success("Anda Telah Berhasil Menambahkan Seminar"), 5000)
    router.push("seminar")
   } catch (error) {
    throw error
   }
  }

  const {data: datapsikolog} = PsikologRepository.hooks.get()
  console.log(datapsikolog, 'ini data');

  const parsePrice = (value: any) => {
    return parseInt(value.replace(/[^0-9]/g, ''), 10);
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
            <Form size="large" style={{ maxWidth: "500px" }}>
              <div className="font-bold text-2xl">Poster</div>
              <div>Harap Masukan Poster Seminar</div>
              <div className="w-[500px] h-[250px] pt-5">
                <FormItem name="poster">
                <UploadPoster setData={setSeminar} dataInput={dataInput}/>
                </FormItem>
              </div>
              <div className="">
                  <div className="font-bold text-2xl">Judul Seminar</div>
                  <div>Harap Masukan Judul Seminar</div>
                  <div className="pt-2">
                    <Form.Item name="title">
                      <Input
                        placeholder="Masukan Judul Seminar"
                        className="w-[500px] text-black"
                        onChange={(e) => {
                          setSeminar({...dataInput, title: e.target.value})
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="font-bold text-2xl">Tanggal Seminar</div>
                  <div>Harap Masukan Tanggal Seminar</div>
                  <div className="pt-2">
                    <Form.Item name="datetime">
                      <DatePicker className="w-[500px] h-10" onChange={(e: any) => {
                          setSeminar({...dataInput, datetime: e})
                        }}/>
                    </Form.Item>
                  </div>
              </div>
              </Form>
            </div>
          </div>
          <div className="flex pl-[100px]">
            <div>
              <div className="pt-5">
                <Form size="large">
                  <div className="font-bold text-2xl">Harga Seminar</div>
                  <div>Harap Masukan Harga Seminar</div>
                  <div className="pt-2">
                    <Form.Item name="price">
                      <InputNumber
                        placeholder="Masukan Harga Seminar"
                        className="w-[500px]"
                        onChange={(e: any) => {
                          setSeminar({...dataInput, price: e })
                        }}
                        min={0}
                        step={1}
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={parsePrice}
                      />
                    </Form.Item>
                  </div>
                  <div className="font-bold text-2xl">Tautan Seminar</div>
                  <div>Harap Masukan Tautan Seminar</div>
                  <div className="pt-2">
                    <Form.Item name="link">
                      <Input
                        placeholder="Masukan Judul Seminar"
                        className="w-[500px]"
                        onChange={(e) => {
                          setSeminar({...dataInput, link: e.target.value})
                        }}
                      />
                    </Form.Item>
                  </div>
                </Form>
                <div className="font-bold text-2xl">Pemateri</div>
                <div>Harap Masukan Namam Pemateri Masksimal 3 Orang</div>
                <div className="pt-2 flex">
                  <Form.Item name="psikolog">
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "500px", height: "40px" }}
                    placeholder="Please select"
                    options={datapsikolog?.data.map((val: any) => {
                      return{
                        value: val.id,
                        label: val.fullName
                      }
                    })}
                    maxLength={3}
                    maxTagCount={3}
                    maxTagPlaceholder={3}
                    maxTagTextLength={3}
                    onChange={(e) => {
                      setSeminar({...dataInput, psikolog: e})
                    }}
                  />
                  </Form.Item>
                </div>
                <div className="flex justify-center pt-20">
                  <Button type="text" className="bg-primary text-2xl h-fit w-[400px] rounded-[20px]" onClick={onFinish}>Ajukan Seminar</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutAdmin>
  );
};
export default CreateSeminar;
