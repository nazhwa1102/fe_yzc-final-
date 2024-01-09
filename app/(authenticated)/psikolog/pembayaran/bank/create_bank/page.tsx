"use client";

import LayoutPsikolog from "#/app/components/dashboardPsikolog";
import LayoutAdmin from "#/app/components/layoutadmin";
import { bankRepository } from "#/repository/bank";
import { parseJwt } from "#/utils/convert";
import { InboxOutlined } from "@ant-design/icons";
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
import { UploadChangeParam, UploadFile } from "antd/lib/upload";
import Dragger from "antd/lib/upload/Dragger";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type createBank = {
  psikolog: string;
  bank_name: string;
  qr: string;
  account_owner_name: string;
  account_number: string;
};

const CreateBank = () => {
  const token = localStorage.getItem("access_token");
  console.log(token, "yuk bisa");
  let role: string = "";
  let email: string = "";
  let fullNamePsi: string = "";
  let idPsi: string = "";

  console.log(parseJwt(token));

  if (token) {
    role = parseJwt(token).role;
    email = parseJwt(token).email;
    fullNamePsi = parseJwt(token).fullNamePsi;
    idPsi = parseJwt(token).idPsi;
    console.log(role, "role cocok");
    console.log(fullNamePsi, "nama");
    console.log(idPsi, "id");
  }
  const router = useRouter();

  const [dataInput, setBank] = useState<createBank>({
    psikolog: idPsi,
    bank_name: "",
    qr: "",
    account_owner_name: "",
    account_number: "",
  });

  const onFinish = async (val: any) => {
    try {
      const data = {
        psikolog: idPsi,
        bank_name: dataInput.bank_name,
        qr: dataInput.qr,
        account_owner_name: dataInput.account_owner_name,
        account_number: dataInput.account_number,
      };
      const create_bank = await bankRepository.manipulateData.createBankPsi(
        data
      );
      setTimeout(message.success("Anda Telah Berhasil Menambahkan Bank"), 5000);
      router.push("seminar");
    } catch (error) {
      throw error;
    }
  };

  const props = {
    name: "file",
    action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    headers: {
      authorization: "authorization-text",
    },

    onChange(info: any) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const [image, setImage] = useState<string | null>(null);
  const images = async (args: UploadChangeParam<UploadFile<any>>) => {
    const file = args.file;
    try {
      if (file.status === "done") {
        if (file.size && file.size > 2097152) {
          message.error("ukuran file terlalu besar");
        } else {
          if (
            file.type === "image/png" ||
            file.type === "image/jpg" ||
            file.type === "image/jpeg"
          ) {
            const response = await bankRepository.manipulateData.UploadImage(
              file?.originFileObj
            );
            console.log(response.body.fileName, "hasilnya");
            setImage(response.body.fileName);
            setBank({
              ...dataInput,
              qr: response.body.fileName,
            });
          } else {
            message.error(
              "Anda Hanya Dapat Mengunggah dengan ektensi JPG/JPEG/PNG"
            );
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LayoutPsikolog>
      <div>
        <div className="text-3xl font-bold flex justify-center">
          Tambah Bank
        </div>
        <div className="flex justify-evenly pt-10">
          <Form size="large" style={{ maxWidth: "500px" }} layout="vertical">
            <div>
              <div className="font-bold text-2xl">Poster</div>
              <div className="w-[500px] h-[250px]">
                <FormItem
                  name="poster"
                  label="Harap Masukan Poster Seminar"
                  required={true}
                >
                  <Dragger
                    {...props}
                    onChange={images}
                    className="shadow-lg"
                    height={300}
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Klik Atau Seret File Ke Area Ini
                    </p>
                    <p className="ant-upload-hint">
                      Masukan File Berformat jpg/jpeg/png
                    </p>
                  </Dragger>
                </FormItem>
              </div>
            </div>
          </Form>
          <Form size="large" style={{ maxWidth: "500px" }} layout="vertical">
            <div>
              <div>
                <div className="font-bold text-2xl">Nama Bank</div>
                <Form.Item
                  name="title"
                  label="Harap Masukan Nama Bank"
                  rules={[{ required: true }]}
                >
                  <Input
                    placeholder="Masukan Nama Bank"
                    className="w-[500px] text-black"
                    onChange={(e) => {
                      setBank({ ...dataInput, bank_name: e.target.value });
                    }}
                  />
                </Form.Item>
              </div>
              <div>
                <div className="font-bold text-2xl">Nomer Rekening</div>
                <Form.Item
                  name="title"
                  label="Harap Masukan Nomer Rekening"
                  rules={[{ required: true }]}
                >
                  <Input
                    placeholder="Masukan Nomer Rekening"
                    className="w-[500px] text-black"
                    onChange={(e) => {
                      setBank({ ...dataInput, account_number: e.target.value });
                    }}
                  />
                </Form.Item>
              </div>
              <div>
                <div className="font-bold text-2xl">Nama Pemilik</div>
                <Form.Item
                  name="title"
                  label="Harap Masukan Nama Pemilik"
                  rules={[{ required: true }]}
                >
                  <Input
                    placeholder="Masukan Nama Pemilik"
                    className="w-[500px] text-black"
                    onChange={(e) => {
                      setBank({ ...dataInput, account_owner_name: e.target.value });
                    }}
                  />
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <div className="flex justify-end pt-28 bottom-0 right-0">
        <Button
          type="text"
          className="bg-primary text-2xl h-fit w-[400px] rounded-[20px]"
          onClick={onFinish}
        >
          Ajukan Seminar
        </Button>
      </div>
    </LayoutPsikolog>
  );
};
export default CreateBank;

{
  /* <div>
  <div>
    <Form
      size="large"
      style={{ maxWidth: "500px" }}
      layout="vertical"
    >
      <div className="font-bold text-2xl pt-5">Poster</div>
      <div className="w-[500px] h-[250px]">
        <FormItem
          name="poster"
          label="Harap Masukan Poster Seminar"
          required={true}
        >
          <UploadPoster setData={setSeminar} dataInput={dataInput} />
        </FormItem>
      </div>
      <div className="">
        <div className="font-bold text-2xl">Judul Seminar</div>
        <div className="">
          <Form.Item
            name="title"
            label="Harap Masukan Judul Seminar"
            rules={[{ required: true }]}
          >
            <Input
              placeholder="Masukan Judul Seminar"
              className="w-[500px] text-black"
              onChange={(e) => {
                setSeminar({ ...dataInput, title: e.target.value });
              }}
            />
          </Form.Item>
        </div>
        <div className="font-bold text-2xl">Tanggal Seminar</div>
        <div>
          <Form.Item
            name="datetime"
            label="Harap Masukan Tanggal Seminar"
            required={true}
          >
            <DatePicker
              className="w-[500px] h-10"
              onChange={(e: any) => {
                setSeminar({ ...dataInput, datetime: e });
              }}
              placeholder="Pilih Tanggal"
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
          <Form.Item
            name="price"
            label="Harap Masukan Harga Seminar"
            required={true}
          >
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
        <div className="font-bold text-2xl">Tautan Seminar</div>
        <div>
          <Form.Item
            name="link"
            label="Harap Masukan Tautan Seminar"
            required={true}
          >
            <Input
              placeholder="Masukan Judul Seminar"
              className="w-[500px]"
              onChange={(e) => {
                setSeminar({ ...dataInput, link: e.target.value });
              }}
            />
          </Form.Item>
        </div>
      </Form>
      <div className="font-bold text-2xl">Pemateri</div>
      <div className="flex">
        <Form size="large" layout="vertical">
          <Form.Item
            name="psikolog"
            className="h-[50px]"
            label="Harap Masukan Namam Pemateri Masksimal 3 Orang"
            required={true}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: "500px", height: "25px" }}
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
</div> */
}
